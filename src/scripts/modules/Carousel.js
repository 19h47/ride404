import AbstractCarouselModule from 'abstracts/AbstractCarouselModule';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class CarouselBlock extends AbstractCarouselModule {
	constructor(m) {
		super(m);

		// this.$cursor = document.querySelector('.js-cursor');
		// this.clientX = 0;
		// this.clientY = 0;

		// this.render = this.render.bind(this);

		// this.onResize();

		this.initEvents();
	}

	// onResize() {
	// 	// this.options.initialIndex = 1;

	// 	if (mediaBreakpointUp('sm')) {
	// 		// this.options.prevNextButtons = true;
	// 		gsap.ticker.add(this.render);
	// 	}

	// 	// if (this.carousel) {
	// 	// 	this.swiper.destroy();
	// 	// }

	// 	// super.onResize();
	// }

	initEvents() {
		this.el.addEventListener(
			'mouseleave',
			({ target }) => {
				if (target.matches('.next')) {
					this.modules.Cursor.main.el.classList.remove('next');
				}

				if (target.matches('.previous')) {
					this.modules.Cursor.main.el.classList.remove('previous');
				}

				if (target.matches('.next') || target.matches('.previous')) {
					// this.$cursor.classList.remove('is-active');
					this.modules.Cursor.main.deactivate();
					this.swiper.$wrapperEl[0].classList.remove('is-pointer-down');
					this.modules.Cursor.main.scale();
				}

				if (this.el.classList.contains('js-carousel-stories')) {
					this.modules.Cursor.main.deactivate();
				}
			},
			true,
		);

		this.el.addEventListener(
			'mouseenter',
			({ target }) => {
				if (target.matches('.next')) {
					this.modules.Cursor.main.activate();
					this.modules.Cursor.main.el.classList.add('next');
				}
				if (target.matches('.previous')) {
					this.modules.Cursor.main.activate();
					this.modules.Cursor.main.el.classList.add('previous');
				}

				if (this.el.classList.contains('js-carousel-stories')) {
					this.modules.Cursor.main.activate();
				}
			},
			true,
		);

		this.el.addEventListener(
			'pointerdown',
			({ target }) => {
				this.swiper.$wrapperEl[0].classList.add('is-pointer-down');

				if (target.matches('.next') || target.matches('.previous')) {
					this.modules.Cursor.main.scale(0.7);
				}
			},
			false,
		);

		this.el.addEventListener(
			'pointerup',
			({ target }) => {
				this.swiper.$wrapperEl[0].classList.remove('is-pointer-down');

				if (target.matches('.previous') || target.matches('.next')) {
					this.modules.Cursor.main.scale();
				}
			},
			false,
		);

		// console.log(this.$cursor('next')[0]);

		this.el.addEventListener(
			'click',
			({ target }) => {
				if (target.matches('.next') && target.classList.contains('swiper-button-disabled')) {
					this.modules.Cursor.main.deactivate();
					this.modules.Cursor.el.classList.remove('next');
				}

				if (target.matches('.previous') && target.classList.contains('swiper-button-disabled')) {
					this.modules.Cursor.main.deactivate();
					this.modules.Cursor.el.classList.remove('previous');
				}
			},
			false,
		);
	}
}
