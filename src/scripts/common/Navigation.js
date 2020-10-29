import { disableScroll, enableScroll } from 'utils/scroll';
import { elements } from 'scripts/config';

import { gsap } from 'gsap';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class Navigation {
	constructor(element) {
		// console.info('Navigation.constructor');

		this.rootElement = element;
		this.items = [...this.rootElement.querySelectorAll('.js-item')];
		this.isOpen = elements.body.classList.contains('navigation--is-open');

		// Scroll
		this.disableScroll = disableScroll;
		this.enableScroll = enableScroll;

		this.timeline = gsap.timeline({
			paused: true,
		});

		this.timeline.fromTo(
			this.rootElement,
			{ autoAlpha: 0, ease: 'power4.inOut', duration: 0.8 },
			{
				autoAlpha: 1,
			},
		);
		this.timeline.fromTo(
			this.items,
			{ autoAlpha: 0, y: 100, duration: 0.01 },
			{ autoAlpha: 1, y: 0, stagger: 0.05 },
			'-=0.4',
		);

		this.close = this.close.bind(this);
	}

	init() {
		this.buttons = document.querySelectorAll('.js-navigation-button') || [];

		this.initEvents();
	}

	/**
	 * Navigation.initEvents
	 */
	initEvents() {
		// console.info('Navigation.setupEvents');

		// On click
		[...this.buttons].forEach(button => {
			button.addEventListener('click', () => this.toggle());
		});

		this.items.forEach(item => {
			item.addEventListener('click', event => {
				event.preventDefault();
				this.close();

				setTimeout(() => {
					window.location = event.target.href;
				}, (0.4 + this.items.length * 0.01 + this.items.length * 0.05) * 1000);
			});
		}, false);

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
		if (this.isOpen) return this.close();

		return this.open();
	}

	/**
	 * Navigation.open
	 */
	open() {
		console.info('Navigation.open');
		if (this.isOpen) return false;

		this.isOpen = true;

		elements.body.classList.add('navigation--is-open');

		this.timeline.play();

		// When menu is open, disableScroll
		this.disableScroll();

		return true;
	}

	/**
	 * Navigation.close
	 */
	close() {
		// console.info('Navigation.close');
		if (!this.isOpen) return false;

		this.isOpen = false;

		elements.body.classList.remove('navigation--is-open');

		this.timeline.reverse();

		// When menu is closed, enableScroll
		this.enableScroll();

		return true;
	}
}
