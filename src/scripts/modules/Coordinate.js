import { module as M } from 'modujs';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

/**
 *
 * @constructor
 * @param {object} container
 */
class Coordinate extends M {
	init() {
		this.number = JSON.parse(this.el.getAttribute('data-number'));

		this.initEvents();
	}

	initEvents() {
		const counter = { value: 0 };
		const timeline = gsap.timeline({ paused: true });

		timeline.to(counter, {
			value: this.number,
			roundProps: 'value',
			duration: 2,
			onUpdate: () => {
				this.el.textContent = counter.value.toLocaleString('en-US', {
					minimumFractionDigits: 2,
				});
			},
		});

		this.modules.Scroll.main.scroll.on('call', value => {
			if (this.el.id === value) {
				timeline.restart();
			}
		});
	}
}

export default Coordinate;
