import { AbstractBlock } from 'starting-blocks';
import Scroll from 'common/Scroll';
import { elements } from 'scripts/config';

import { gsap } from 'gsap';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class MenuBlock extends AbstractBlock {
	constructor(container) {
		super(container, 'MenuBlock');

		// this.items = [...this.rootElement.querySelectorAll('.js-item')];
		this.isOpen = elements.body.classList.contains('Menu--is-open');

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
	 * Menu.initEvents
	 */
	initEvents() {
		// console.info('Menu.setupEvents');

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
	 * Menu.toggle
	 */
	toggle() {
		// console.info('Menu.toggle');
		if (this.isOpen) {
			return this.close();
		}

		return this.open();
	}

	/**
	 * Menu.open
	 */
	open() {
		// console.info('Menu.open');
		if (this.isOpen) {
			return false;
		}

		this.isOpen = true;

		elements.body.classList.add('Menu--is-open');

		// this.timeline.play();

		Scroll.stop();

		return true;
	}

	/**
	 * Menu.close
	 */
	close() {
		// console.info('Menu.close');
		if (!this.isOpen) {
			return false;
		}

		this.isOpen = false;

		elements.body.classList.remove('Menu--is-open');

		// this.timeline.reverse();

		Scroll.start();

		return true;
	}
}
