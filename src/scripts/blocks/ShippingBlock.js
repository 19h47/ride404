import { AbstractBlock } from 'starting-blocks';

import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class ShippingBlock extends AbstractBlock {
	constructor(container) {
		super(container, 'ShippingBlock');
	}

	initEvents() {
		super.initEvents();

		this.rootElement.addEventListener(
			'change',
			event => {
				const { target } = event;

				console.log(target);

				if (target.matches('.input-checkbox')) {
					setTimeout(() => Scroll.update(), 400);
				}
			},
			false,
		);
	}
}
