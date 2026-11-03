import { MarkdownPostProcessorContext, loadMermaid } from 'obsidian';
import { THEME_DARK, THEME_LIGHT } from './themes';

function convertMathSyntax(source: string): string {
    if (!source) return "";
    return source.replace(/"([^"]*?)"/g, (_match: string, content: string) => {
        // Convert single $...$ to $$...$$ while preserving already existing $$...$$
        const converted = content.replace(/(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g, (_m: string, math: string) => `$$${math}$$`);
        return `"${converted}"`;
    });
}

export async function renderMehrmaid(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
    const mermaid = await loadMermaid();

    let config = {};
    if (document.body.classList.contains("theme-dark")) {
        config = THEME_DARK;
    } else {
        config = THEME_LIGHT;
    }

    if (mermaid && typeof mermaid.initialize === "function") {
        mermaid.initialize(config);
    }

    const processedSource = convertMathSyntax(source);
    const lineStart = ctx?.getSectionInfo?.(el)?.lineStart ?? 0;
    const graphId = `mehrmaid-${lineStart}-${Date.now()}`;

    const { svg } = await mermaid.render(graphId, processedSource);
    el.empty();
    el.addClass("mermaid");
    el.insertAdjacentHTML('beforeend', svg);

    // Optional integration with mermaid-zoom plugin if installed
    const zoomPlugin = (window as any).app?.plugins?.plugins?.["mermaid-zoom"];
    if (zoomPlugin && typeof zoomPlugin.decorateMermaidBlock === "function") {
        zoomPlugin.decorateMermaidBlock(el);
    }
}
