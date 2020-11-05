import { AbstractBlock } from 'starting-blocks';
import Flickity from 'flickity';
import { gsap } from 'gsap';

import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class CarouselBlock extends AbstractBlock {
	constructor(container) {
		super(container, 'CarouselBlock');

		this.render = this.render.bind(this);
	}

	init() {
		super.init();

		this.$items = this.rootElement.querySelector('.js-items');
		this.$cursor = document.querySelector('.js-cursor');

		this.clientX = 0;
		this.clientY = 0;

		this.carousel = false;
		this.options = {};

		this.initPlugins();

		gsap.ticker.add(this.render);
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
					console.log(target.matches('.next'));
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

	initPlugins() {
		this.options = {
			pageDots: false,
			prevNextButtons: true,
			cellSelector: '.js-item',
			draggable: true,
			freeScroll: false,
			initialIndex: 1,
			arrowShape: '',
			on: {
				ready() {
					if (1 === window.startingBlocksDebugLevel) {
						console.debug(
							`%c[SB]\t\t%c✳️ Flickity ready`,
							'color:#749f73',
							'color:debug',
						);
					}
					Scroll.update();
				},
			},
		};

		this.carousel = new Flickity(this.$items, this.options);
	}
}
