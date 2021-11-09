import { module as M } from 'modujs';
import Flickity from 'flickity';
import debounce from 'utils/debounce';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class AbstractCarouselModule extends M {
	constructor(m) {
		super(m);

		this.$items = this.el.querySelector('.js-items');

		this.carousel = false;
		this.options = {
			pageDots: false,
			prevNextButtons: false,
			cellSelector: '.js-item',
			draggable: true,
			freeScroll: false,
			arrowShape: '',
		};

		this.onResize = this.onResize.bind(this);
		this.onResizeDebounce = debounce(this.onResize, 50, false);

		window.addEventListener('resize', this.onResizeDebounce);
	}

	initPlugins() {
		this.carousel = new Flickity(this.$items, this.options);

		this.carousel.on('ready', () => this.call('update', false, 'Scroll', 'main'));
	}

	onResize() {
		this.initPlugins();
	}
}
