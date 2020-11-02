import { AbstractPage } from 'starting-blocks';

export default class DefaultPage extends AbstractPage {
	constructor(container) {
		super(container, 'DefaultPage');
	}

	async init() {
		await super.init();
	}
}
