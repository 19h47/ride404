import { gsap } from 'gsap';

import AbstractCarouselModule from 'abstracts/AbstractCarouselModule';
import mediaBreakpointUp from 'utils/mediaBreakpointUp';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class CarouselBlock extends AbstractCarouselModule {
	constructor(m) {
		super(m);

		this.$cursor = document.querySelector('.js-cursor');
		this.clientX = 0;
		this.clientY = 0;

		this.render = this.render.bind(this);

		this.onResize();
		this.initEvents();
	}

	onResize() {
		this.options.initialIndex = 1;

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
		window.addEventListener('mousemove', event => {
			this.clientX = event.clientX;
			this.clientY = event.clientY;
		});

		this.el.addEventListener(
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

		this.el.addEventListener(
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

		this.el.addEventListener(
			'pointerdown',
			({ target }) => {
				if (target.matches('.next') || target.matches('.previous')) {
					this.carousel.viewport.classList.add('is-pointer-down');

					gsap.to(this.$cursor, { scale: 0.7 });
				}
			},
			false,
		);

		this.el.addEventListener(
			'pointerup',
			({ target }) => {
				if (target.matches('.previous') || target.matches('.next')) {
					this.carousel.viewport.classList.remove('is-pointer-down');

					gsap.to(this.$cursor, { scale: 1 });
				}
			},
			false,
		);

		this.el.addEventListener(
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
