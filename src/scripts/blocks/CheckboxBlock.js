import { AbstractBlock } from 'starting-blocks';
import Checkbox from '@19h47/checkbox';
import $ from 'jquery';

import debug from 'utils/debug';

/**
 * CheckboxBlock
 *
 * @constructor
 * @param {object} container
 */
export default class CheckboxBlock extends AbstractBlock {
	constructor(container) {
		super(container, 'CheckboxBlock');
	}

	init() {
		super.init();

		this.initPlugins();
	}

	initPlugins() {
		debug('\t\t%c✳️ CheckboxBlock.initPlugins');

		this.checkbox = new Checkbox(this.rootElement);
		this.checkbox.init();

		console.log(this);
	}

	initEvents() {
		super.initEvents();

		this.checkbox.$input.addEventListener('activate', () => {
			$(this.checkbox.$input).trigger('change');
		});
		this.checkbox.$input.addEventListener('deactivate', () =>
			$(this.checkbox.$input).trigger('change'),
		);
	}
}
