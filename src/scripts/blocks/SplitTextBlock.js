import { AbstractBlock, EventTypes } from 'starting-blocks';
import { gsap } from 'gsap';

import Scroll from 'common/Scroll';
import SplitText from 'vendors/SplitText';

gsap.registerPlugin(SplitText);

/**
 *
 * @constructor
 * @param {object} container
 */
export default class SplitTextBlock extends AbstractBlock {
	init() {
		super.init();

		this.delay = JSON.parse(this.rootElement.getAttribute('data-delay')) || 0;

		this.initPlugins();
	}

	initPlugins() {
		const { lines } = new SplitText(this.rootElement, { type: 'lines', linesClass: 'line' });
		new SplitText(this.rootElement, { type: 'lines' }); // eslint-disable-line no-new

		this.timeline = gsap.timeline({
			paused: true,
			delay: this.delay,
			onComplete: () => this.rootElement.classList.add('is-active'),
		});
		this.timeline.fromTo(lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.15 });
	}

	initEvents() {
		super.initEvents();

		window.addEventListener(EventTypes.START_SPLASHSCREEN_HIDE, () => {
			Scroll.on('call', (value, way) => {
				if (this.rootElement.id === value && 'enter' === way) {
					this.timeline.play();
				}
			});
		});
	}
}
