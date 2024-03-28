import { Notice, Plugin } from 'obsidian';
import { renderMehrmaid } from './mermaid';


export default class Mehrmaid extends Plugin {
	
	async onload() {
		this.app.workspace.onLayoutReady(() => {
			this.registerMarkdownCodeBlockProcessor('mehrmaid', async (source, el, ctx) => {
				try {
					await renderMehrmaid(source, el, ctx);
				} catch(e) {
					console.error(e);
					new Notice('Mehrmaid: Error rendering mermaid diagram');
				}
			});
		});
	}
}

