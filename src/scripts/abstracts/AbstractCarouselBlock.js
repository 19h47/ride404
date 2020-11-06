import { AbstractBlock } from 'starting-blocks';
import Flickity from 'flickity';

import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class AbstractCarouselBlock extends AbstractBlock {
	constructor(container) {
		super(container, 'AbstractCarouselBlock');
	}

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
					if (1 === window.startingBlocksDebugLevel) {
						console.debug(
							`%c[SB]\t\t%c✳️ Flickity.on.ready`,
							'color:#749f73',
							'color:debug',
						);
					}
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
