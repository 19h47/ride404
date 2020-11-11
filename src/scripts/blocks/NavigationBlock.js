import { AbstractBlock } from 'starting-blocks';
import { gsap } from 'gsap';

import { elements } from 'scripts/config';
import debug from 'utils/debug';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class NavigationBlock extends AbstractBlock {
	constructor(container) {
		super(container, 'NavigationBlock');

		// this.items = [...this.rootElement.querySelectorAll('.js-item')];
		this.isOpen = elements.body.classList.contains('Navigation--is-open');

		this.timeline = gsap.timeline({
			paused: true,
		});

		// this.timeline.fromTo(
		// 	this.rootElement,
		// 	{ autoAlpha: 0, ease: 'power4.inOut', duration: 0.8 },
		// 	{
		// 		autoAlpha: 1,
		// 	},
		// );
		// this.timeline.fromTo(
		// this.items,
		// 	{ autoAlpha: 0, y: 100, duration: 0.01 },
		// 	{ autoAlpha: 1, y: 0, stagger: 0.05 },
		// 	'-=0.4',
		// );

		this.close = this.close.bind(this);
	}

	init() {
		super.init();

		this.buttons = document.querySelectorAll('.js-menu-button') || [];
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
		debug(' 🚩 Dispatched NavigationBlock.open');
		if (this.isOpen) {
			return false;
		}

		this.isOpen = true;

		// this.timeline.play();

		document.dispatchEvent(new Event('Navigation.open'));

		return true;
	}

	/**
	 * NavigationBlock.close
	 */
	close() {
		debug(' 🚩 Dispatched NavigationBlock.close');
		if (!this.isOpen) {
			return false;
		}

		this.isOpen = false;

		// this.timeline.reverse();

		document.dispatchEvent(new Event('Navigation.close'));

		return true;
	}
}
