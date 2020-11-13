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
			onReverseComplete: () => {
				debug(' 🚩 Dispatched NavigationBlock.close');
				document.dispatchEvent(new Event('Navigation.close'));
			},
		});

		this.close = this.close.bind(this);
	}

	init() {
		super.init();

		this.items = [...this.rootElement.querySelectorAll('.js-item')];
		this.$footer = this.rootElement.querySelector('.js-footer');
		this.$video = this.rootElement.querySelector('.js-video');

		this.timeline.fromTo(
			this.$video,
			{ autoAlpha: 0, ease: 'power4.inOut', duration: 0.5 },
			{ autoAlpha: 1 },
		);
		this.timeline.fromTo(
			this.items,
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
	}

	/**
	 * Navigation.initEvents
	 */
	initEvents() {
		// console.info('Navigation.setupEvents');
		super.initEvents();

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

		debug(' 🚩 Dispatched NavigationBlock.open');
		document.dispatchEvent(new Event('Navigation.open'));

		setTimeout(() => this.timeline.play(), 500);

		return true;
	}

	/**
	 * NavigationBlock.close
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
