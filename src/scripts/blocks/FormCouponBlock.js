import { AbstractBlock } from 'starting-blocks';

import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class FormCouponBlock extends AbstractBlock {
	constructor(container) {
		super(container, 'FormCouponBlock');
	}

	initEvents() {
		super.initEvents();

		this.rootElement.addEventListener(
			'click',
			event => {
				const { target } = event;

				if (target.matches('.showcoupon')) {
					event.preventDefault();
					setTimeout(() => Scroll.update(), 400);
				}
			},
			false,
		);
	}
}
