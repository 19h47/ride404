import { AbstractBlock } from 'starting-blocks';
import Flickity from 'flickity';

import Scroll from 'common/Scroll';
import debug from 'utils/debug';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class AbstractCarouselBlock extends AbstractBlock {
	init() {
		super.init();

		this.$items = this.rootElement.querySelector('.js-items');

		this.carousel = false;
		this.options = {
			pageDots: false,
			prevNextButtons: false,
			cellSelector: '.js-item',
			draggable: true,
			freeScroll: false,
			arrowShape: '',
			on: {
				ready() {
					debug('\t\t%c✳️ Flickity.on.ready');

					Scroll.update();
				},
			},
		};

		this.onResize();
	}

	onResize() {
		super.onResize();
		this.initPlugins();
	}

	initPlugins() {
		this.carousel = new Flickity(this.$items, this.options);
	}
}
