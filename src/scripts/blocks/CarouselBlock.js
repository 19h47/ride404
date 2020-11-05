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

		this.up = this.up.bind(this);
		this.down = this.down.bind(this);
		this.render = this.render.bind(this);
	}

	init() {
		super.init();

		this.$items = this.rootElement.querySelector('.js-items');

		// this.$cursor = document.querySelector('.js-cursor');

		// this.itemsRect = this.$items.getBoundingClientRect();
		this.clientX = 0;
		this.clientY = 0;

		this.carousel = false;
		this.options = {};

		this.initPlugins();

		// requestAnimationFrame(this.render);
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

		// this.$items.addEventListener('mouseenter', () => gsap.to(this.$cursor, { scale: 1 }));
		// this.$items.addEventListener('mouseleave', () => gsap.to(this.$cursor, { scale: 0 }));

		// this.carousel.on('dragStart', this.down);
		// this.carousel.on('pointerDown', this.down);
		// this.carousel.on('dragEnd', this.up);
		// this.carousel.on('pointerUp', this.up);
	}

	render() {
		gsap.to(this.$cursor, { x: this.clientX, y: this.clientY, duration: 0.1 });

		return requestAnimationFrame(this.render);
	}

	down() {
		return gsap.to(this.$cursor, { scale: 0.7 });
	}

	up() {
		return gsap.to(this.$cursor, { scale: 1 });
	}

	initPlugins() {
		this.options = {
			pageDots: false,
			prevNextButtons: false,
			cellSelector: '.js-item',
			draggable: true,
			freeScroll: false,
		};

		this.carousel = new Flickity(this.$items, this.options);
	}
}
