import { module as M } from 'modujs';
import { gsap } from 'gsap';

import { elements } from 'scripts/config';

/**
 *
 * @constructor
 * @param {object} container
 */
class Navigation extends M {
	constructor(m) {
		super(m);

		// this.items = [...this.el.querySelectorAll('.js-item')];
		this.isOpen = elements.body.classList.contains('Navigation--is-open');

		this.timeline = gsap.timeline({
			paused: true,
			onReverseComplete: () => {
				document.dispatchEvent(new Event('Navigation.close'));

				elements.body.classList.remove('Navigation--is-open');
				this.call('start', false, 'Scroll', 'main');
			},
		});

		this.close = this.close.bind(this);
	}

	init() {
		this.items = [...this.el.querySelectorAll('.js-item')];
		this.$footer = this.el.querySelector('.js-footer');
		this.$video = this.el.querySelector('.js-video');

		this.timeline.fromTo(
			this.$video,
			{ autoAlpha: 0, ease: 'power4.inOut', duration: 0.5 },
			{ autoAlpha: 1 },
		);
		this.timeline.fromTo(
			this.items.map(item => item.children),
			{ autoAlpha: 0, y: 100, duration: 0.01 },
			{ autoAlpha: 1, y: 0, stagger: 0.05 },
			'-=0.5',
		);
		this.timeline.fromTo(
			this.$footer,
			{ autoAlpha: 0, ease: 'power4.inOut', duration: 0.1 },
			{ autoAlpha: 1 },
			'-=0.5',
		);

		this.buttons = document.querySelectorAll('.js-menu-button') || [];

		this.initEvents();
	}

	/**
	 * Navigation.initEvents
	 */
	initEvents() {
		// On click
		[...this.buttons].forEach(button => {
			button.addEventListener('click', () => this.toggle());
		});

		// On esc key
		document.onkeydown = ({ keyCode }) => {
			if (27 === keyCode) {
				this.close();
			}
		};
	}

	/**
	 * Navigation.toggle
	 */
	toggle() {
		// console.info('Navigation.toggle');

		if (this.isOpen) {
			return this.close();
		}

		return this.open();
	}

	/**
	 * Navigation.open
	 */
	open() {
		if (this.isOpen) {
			return false;
		}

		this.isOpen = true;

		document.dispatchEvent(new Event('Navigation.open'));

		elements.body.classList.add('Navigation--is-open');
		this.call('stop', false, 'Scroll', 'main');

		setTimeout(() => this.timeline.play(), 500);

		return true;
	}

	/**
	 * Navigation.close
	 */
	close() {
		if (!this.isOpen) {
			return false;
		}

		this.isOpen = false;

		this.timeline.reverse();

		return true;
	}
}

export default Navigation;
