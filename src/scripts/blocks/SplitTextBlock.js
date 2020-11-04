import { AbstractBlock } from 'starting-blocks';
import { gsap } from 'gsap';

import SplitText from 'vendors/SplitText';
import Scroll from 'common/Scroll';

gsap.registerPlugin(SplitText);

/**
 *
 * @constructor
 * @param {object} container
 */
export default class SplitTextBlock extends AbstractBlock {
	constructor(container) {
		// console.info('SplitTextBlock.constructor');

		super(container, 'SplitTextBlock');
	}

	init() {
		super.init();

		this.initPlugins();
	}

	initPlugins() {
		const { lines } = new SplitText(this.rootElement, { type: 'lines', linesClass: 'line' });
		new SplitText(this.rootElement, { type: 'lines' }); // eslint-disable-line no-new

		this.timeline = gsap.timeline({ paused: true });

		this.timeline.fromTo(lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.15 });
	}

	initEvents() {
		super.initEvents();

		Scroll.on('call', (value, way) => {
			if (this.rootElement.id === value && 'enter' === way) {
				this.timeline.play();
			}
		});
	}
}
