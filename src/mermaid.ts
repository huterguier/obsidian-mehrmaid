import { MarkdownRenderChild, MarkdownRenderer, Plugin, MarkdownPostProcessorContext } from 'obsidian';
import mermaid from 'mermaid';
import { randomBytes, randomInt } from 'crypto';


const THEME_DARK = {
	theme: 'dark',
	'themeVariables': {
		'primaryColor': '#BB2528',
		'primaryTextColor': '#fff',
		'primaryBorderColor': '#7C0000',
		'lineColor': '#dadada',
		'secondaryColor': '#006100',
		'tertiaryColor': '#fff',
		'clusterBkg': "#242424",
		'clusterBorder': "#2d2d2d",
		'nodeBorder': '#dadada',
	  },
	securityLevel: 'loose',
	startOnLoad:true,
	flowchart:{
			htmlLabels:true
		}
};

const THEME_LIGHT = {
	theme: 'neutral',
	'themeVariables': {
		'primaryBorderColor': '#000',
		'clusterBorder': "#2d2d2d",
		'lineColor': '#000',
		'nodeBorder': '#000',
	  },
	securityLevel: 'loose',
	startOnLoad:true,
	flowchart:{
			htmlLabels:true
		}
};


async function renderMehrmaid(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
    function renderMarkdown(str: string, el: HTMLElement, app: any) {
        let markdownRenderChild = new MarkdownRenderChild(el);
        console.log(markdownRenderChild.containerEl);
        markdownRenderChild.containerEl = el;
        if (ctx && !(typeof ctx == "string")) {
            ctx.addChild(markdownRenderChild);
        }
        //el.innerHTML = "";
        let parentEl = el.createDiv();
        parentEl.style.marginTop = "0px";
        parentEl.style.display = "inline-block";
        parentEl.style.textAlign = "left";
        MarkdownRenderer.render(app, str, parentEl, ctx.sourcePath, markdownRenderChild);
        let markdownEl = parentEl;
        (markdownEl as HTMLElement).style.marginTop = "0px";
        (markdownEl as HTMLElement).style.marginBottom = "0px";
        return markdownEl;
    }

    async function measureSizes(htmls : string[]) {
        var widths = [];
        var heights = [];
        var htmlEls = [];
        for (var html of htmls) {
            var htmlEl = document.createElement('div');
            htmlEl.innerHTML = html;
            htmlEl.style.display = "inline-block";
            (el.parentElement as HTMLElement).appendChild(htmlEl);
            htmlEls.push(htmlEl);
        }
        await new Promise(r => setTimeout(r, 100));
        for (var htmlEl of htmlEls) {
            var mathEl = htmlEl.getElementsByClassName("MJX-TEX")[0];
            if (mathEl && htmlEl.children[0].childElementCount == 1) {
                widths.push((mathEl as HTMLElement).offsetWidth);
                heights.push((mathEl as HTMLElement).offsetHeight);
            }
            else{
                widths.push(htmlEl.offsetWidth);
                heights.push(htmlEl.offsetHeight - 24);
            }
            htmlEl.remove();
        }
        return [widths, heights];
    }
    
    var config = {}
    // if darkmode is enabled, use dark theme
    if (document.body.classList.contains("theme-dark")) {
        config = THEME_DARK;
        source += "\n" + "classDef primary fill:#8a5cf5";
    }
    else {
        config = THEME_LIGHT;
        source += "\n" + "classDef primary fill:#a68afa";
    }


    mermaid.initialize(config);
    mermaid.mermaidAPI.setConfig(config);
    var graph_id = randomBytes(32).toString('hex');
    graph_id = graph_id.replace(/\d/g, '');
    let matches = source.match(/"([^"]*?)"/g);
    if (matches) {
        let markdownEls = matches.map((match) => {
            match = match.substring(1, match.length - 1);
            let markdownEl = renderMarkdown(match, el, this.app);
            return markdownEl;
        });
        await new Promise(r => setTimeout(r, 10));
        // iterate over all children of el and measure their sizes
        let widths = [];
        let heights = [];
        for(let markdownEl of markdownEls){
            widths.push((markdownEl as HTMLElement).offsetWidth);
            console.log((markdownEl as HTMLElement).offsetWidth);
            heights.push((markdownEl as HTMLElement).offsetHeight);
            console.log((markdownEl as HTMLElement).offsetHeight);
        }
        
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }

        for(let i = 0; i < matches.length; i++){
            let match = matches[i];
            let markdownEl = markdownEls[i];
            let width = widths[i];
            width = Math.max(width, 10);
            
            let height = heights[i];
            height = Math.max(height, 10);

            let id = match.replace(/[^a-zA-Z0-9]/g, "") + i;
            source = source.replace(match, `<div class="${graph_id}${id} cm-sizer" style="width: ${width}px; height: ${height-7}px; display: inline-block;"></div>`);
        }
        const { svg } = await mermaid.render(graph_id, source, el);
        el.innerHTML += svg;
        for(let i = 0; i < markdownEls.length; i++){
            let id = matches[i].replace(/[^a-zA-Z0-9]/g, "") + i;
            let markdownEl = markdownEls[i];
            let htmlEl = document.getElementsByClassName(graph_id + id)[0];
            console.log(markdownEl);
            htmlEl.appendChild(markdownEl);
        }
    }
};