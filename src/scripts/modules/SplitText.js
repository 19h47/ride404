import { module as M } from 'modujs';
import { gsap } from 'gsap';

import S from 'vendors/SplitText';

gsap.registerPlugin(S);

/**
 *
 * @constructor
 * @param {object} container
 */
export default class SplitText extends M {
	init() {
		super.init();

		this.delay = JSON.parse(this.el.getAttribute('data-delay')) || 0;

		this.initPlugins();
		this.initEvents();
	}

	initPlugins() {
		const { lines } = new S(this.el, { type: 'lines', linesClass: 'line' });
		new S(this.el, { type: 'lines' }); // eslint-disable-line no-new

		this.timeline = gsap.timeline({
			paused: true,
			delay: this.delay,
			onComplete: () => this.el.classList.add('is-active'),
		});
		this.timeline.fromTo(lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.15 });
	}

	initEvents() {
		this.modules.Scroll.main.scroll.on('call', (value, way) => {
			if (this.el.id === value && 'enter' === way) {
				this.timeline.play();
			}
		});
	}
}
