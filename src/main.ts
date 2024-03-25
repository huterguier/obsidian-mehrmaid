import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { renderMehrmaid } from './mermaid';

// Remember to rename these classes and interfaces!

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

		this.addSettingTab(new MehrmaidSettingsTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor('mehrmaid', async (source, el, ctx) => {
			try {
				await renderMehrmaid(source, el, ctx);
			} catch(e) {
				console.error(e);
				new Notice('Mehrmaid: Error rendering mermaid diagram');
			}
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

class MehrmaidModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class MehrmaidSettingsTab extends PluginSettingTab {
	plugin: Mehrmaid;

	constructor(app: App, plugin: Mehrmaid) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
