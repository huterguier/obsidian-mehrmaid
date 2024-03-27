import { Notice, Plugin } from 'obsidian';
import { renderMehrmaid } from './mermaid';

interface MehrmaidSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MehrmaidSettings = {
	mySetting: 'default'
}

export default class Mehrmaid extends Plugin {
	settings: MehrmaidSettings;
	
	async onload() {
		await this.loadSettings();

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

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

