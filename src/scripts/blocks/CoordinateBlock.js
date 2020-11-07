import { AbstractBlock } from 'starting-blocks';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

import Scroll from 'common/Scroll';

gsap.registerPlugin(TextPlugin);

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

		const counter = { value: 0 };
		const timeline = gsap.timeline({ paused: true });

		timeline.to(counter, {
			value: this.number,
			roundProps: 'value',
			duration: 2,
			onUpdate: () => {
				this.rootElement.textContent = counter.value.toLocaleString('en-US', {
					minimumFractionDigits: 2,
				});
			},
		});

		Scroll.on('call', value => {
			if (this.rootElement.id === value) {
				timeline.restart();
			}
		});
	}
}
