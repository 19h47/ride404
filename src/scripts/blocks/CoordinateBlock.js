import { AbstractBlock } from 'starting-blocks';
import { gsap } from 'gsap';

import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class CoordinateBlock extends AbstractBlock {
	constructor(container) {
		super(container, 'CoordinateBlock');
	}

	init() {
		super.init();

		this.number = JSON.parse(this.rootElement.getAttribute('data-number'));
	}

	initEvents() {
		super.initEvents();

		Scroll.on('call', value => {
			if (this.rootElement.id === value) {
				const counter = { value: 0 };

				gsap.to(counter, {
					value: this.number,
					roundProps: 'value',
					duration: 2,
					onUpdate: () => {
						this.rootElement.textContent = counter.value.toLocaleString();
					},
				});
			}
		});
	}
}
