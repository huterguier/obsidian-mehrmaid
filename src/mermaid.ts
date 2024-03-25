import { MarkdownRenderChild, MarkdownRenderer, Plugin, MarkdownPostProcessorContext } from 'obsidian';
import mermaid from 'mermaid';
import { randomBytes, randomInt } from 'crypto';
import { THEME_DARK, THEME_LIGHT } from './themes';


function renderMarkdown(str: string, el: HTMLElement, ctx: MarkdownPostProcessorContext, app: any) {
    const markdownRenderChild = new MarkdownRenderChild(el);
    const markdownEl = el.createDiv();
    markdownEl.style.display = "inline-block";
    markdownEl.style.textAlign = "left";
    if (ctx && !(typeof ctx == "string")) {
        ctx.addChild(markdownRenderChild);
    }
    MarkdownRenderer.render(app, str, markdownEl, ctx.sourcePath, markdownRenderChild);
    return markdownEl;
}


export async function renderMehrmaid(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
    
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
            let markdownEl = renderMarkdown(match, el, ctx, this.app);
            return markdownEl;
        });
        await new Promise(r => setTimeout(r, 100));
        // iterate over all children of el and measure their sizes
        let widths = [];
        let heights = [];
        for(let markdownEl of markdownEls){
            widths.push((markdownEl as HTMLElement).offsetWidth);
            heights.push((markdownEl as HTMLElement).offsetHeight);
        }
        
        el.empty();

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

        
        const { svg } = await mermaid.render(graph_id, source, (el as Element));
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