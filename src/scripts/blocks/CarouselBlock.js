import { AbstractBlock } from 'starting-blocks';
import Flickity from 'flickity';
import { gsap } from 'gsap';

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

		// this.itemsRect = this.$items.getBoundingClientRect();
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

		this.carousel.on('dragMove', event => {
			this.clientX = event.clientX;
			this.clientY = event.clientY;
		});

		this.carousel.nextButton.element.addEventListener('pointerdown', () =>
			this.carousel.viewport.classList.add('is-pointer-down'),
		);
		this.carousel.nextButton.element.addEventListener('pointerup', () =>
			this.carousel.viewport.classList.remove('is-pointer-down'),
		);

		this.carousel.prevButton.element.addEventListener('pointerdown', () =>
			this.carousel.viewport.classList.add('is-pointer-down'),
		);
		this.carousel.prevButton.element.addEventListener('pointerup', () =>
			this.carousel.viewport.classList.remove('is-pointer-down'),
		);

		// this.$items.addEventListener('mouseenter', () => gsap.to(this.$cursor, { scale: 1 }));
		// this.$items.addEventListener('mouseleave', () => gsap.to(this.$cursor, { scale: 0 }));

		this.carousel.prevButton.element.addEventListener('mouseenter', () => {
			this.$cursor.classList.add('is-active');
			this.$cursor.classList.add('previous');
		});

		this.carousel.prevButton.element.addEventListener('mouseleave', () => {
			this.$cursor.classList.remove('is-active');
			this.$cursor.classList.remove('previous');
		});

		this.carousel.prevButton.element.addEventListener('click', () => {
			if (false === this.carousel.prevButton.isEnabled) {
				this.$cursor.classList.remove('is-active');
				this.$cursor.classList.remove('previous');
			}
		});

		this.carousel.prevButton.element.addEventListener('pointerdown', () => {
			gsap.to(this.$cursor, { scale: 0.7 });
		});

		this.carousel.prevButton.element.addEventListener('pointerup', () => {
			gsap.to(this.$cursor, { scale: 1 });
		});

		this.carousel.nextButton.element.addEventListener('mouseenter', () => {
			this.$cursor.classList.add('is-active');
			this.$cursor.classList.add('next');
		});

		this.carousel.nextButton.element.addEventListener('mouseleave', () => {
			this.$cursor.classList.remove('is-active');
			this.$cursor.classList.remove('next');
		});

		this.carousel.nextButton.element.addEventListener('click', () => {
			if (false === this.carousel.nextButton.isEnabled) {
				this.$cursor.classList.remove('is-active');
				this.$cursor.classList.remove('next');
			}
		});

		this.carousel.nextButton.element.addEventListener('pointerdown', () => {
			gsap.to(this.$cursor, { scale: 0.7 });
		});

		this.carousel.nextButton.element.addEventListener('pointerup', () => {
			gsap.to(this.$cursor, { scale: 1 });
		});
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
		};

		this.carousel = new Flickity(this.$items, this.options);
	}
}
