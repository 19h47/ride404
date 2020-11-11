import { gsap } from 'gsap';

import AbstractCarouselBlock from 'abstracts/AbstractCarouselBlock';
import mediaBreakpointUp from 'utils/mediaBreakpointUp';
import debug from 'utils/debug';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class CarouselBlock extends AbstractCarouselBlock {
	constructor(container) {
		super(container, 'CarouselBlock');

		this.render = this.render.bind(this);
	}

	init() {
		super.init();

		this.$cursor = document.querySelector('.js-cursor');

		this.clientX = 0;
		this.clientY = 0;
	}

	onResize() {
		this.options.initialIndex = 1;

		debug('\t\t%c✳️ CarouselBlock.onResize');

		if (mediaBreakpointUp('sm')) {
			this.options.prevNextButtons = true;
			gsap.ticker.add(this.render);
		}

		if (this.carousel) {
			this.carousel.destroy();
		}

		super.onResize();
	}

	initEvents() {
		super.initEvents();

		window.addEventListener('mousemove', event => {
			this.clientX = event.clientX;
			this.clientY = event.clientY;
		});

		this.rootElement.addEventListener(
			'mouseleave',
			({ target }) => {
				if (target.matches('.next')) {
					this.$cursor.classList.remove('is-active');
					this.$cursor.classList.remove('next');

					this.carousel.viewport.classList.remove('is-pointer-down');

					gsap.to(this.$cursor, { scale: 1 });
				}
				if (target.matches('.previous')) {
					this.$cursor.classList.remove('is-active');
					this.$cursor.classList.remove('previous');

					this.carousel.viewport.classList.remove('is-pointer-down');

					gsap.to(this.$cursor, { scale: 1 });
				}
			},
			true,
		);

		this.rootElement.addEventListener(
			'mouseleave',
			({ target }) => {
				if (target.matches('.next')) {
					this.$cursor.classList.remove('is-active');
					this.$cursor.classList.remove('next');
				}
				if (target.matches('.previous')) {
					this.$cursor.classList.remove('is-active');
					this.$cursor.classList.remove('previous');
				}
			},
			true,
		);

		this.rootElement.addEventListener(
			'mouseenter',
			({ target }) => {
				if (target.matches('.next')) {
					this.$cursor.classList.add('is-active');
					this.$cursor.classList.add('next');
				}
				if (target.matches('.previous')) {
					this.$cursor.classList.add('is-active');
					this.$cursor.classList.add('previous');
				}
			},
			true,
		);

		this.rootElement.addEventListener(
			'pointerdown',
			({ target }) => {
				if (target.matches('.next') || target.matches('.previous')) {
					this.carousel.viewport.classList.add('is-pointer-down');

					gsap.to(this.$cursor, { scale: 0.7 });
				}
			},
			false,
		);

		this.rootElement.addEventListener(
			'pointerup',
			({ target }) => {
				if (target.matches('.previous') || target.matches('.next')) {
					this.carousel.viewport.classList.remove('is-pointer-down');

					gsap.to(this.$cursor, { scale: 1 });
				}
			},
			false,
		);

		this.rootElement.addEventListener(
			'click',
			({ target }) => {
				if (target.matches('.next') && false === this.carousel.nextButton.isEnabled) {
					this.$cursor.classList.remove('is-active');
					this.$cursor.classList.remove('next');
				}

				if (target.matches('.previous') && false === this.carousel.prevButton.isEnabled) {
					this.$cursor.classList.remove('is-active');
					this.$cursor.classList.remove('previous');
				}
			},
			false,
		);
	}

	render() {
		gsap.to(this.$cursor, { x: this.clientX, y: this.clientY, duration: 0.1, force3D: true });

		return gsap.ticker.add(this.render);
	}
}
