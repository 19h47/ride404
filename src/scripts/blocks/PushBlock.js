import AbstractCarouselBlock from 'abstracts/AbstractCarouselBlock';
import mediaBreakpointUp from 'utils/mediaBreakpointUp';
import debug from 'utils/debug';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class PushBlock extends AbstractCarouselBlock {
	constructor(container) {
		super(container, 'PushBlock');
	}

	onResize() {
		debug('\t\t%c✳️ PushBlock.onResize');

		if (this.carousel && mediaBreakpointUp('sm')) {
			this.carousel.destroy();
		}

		if (!mediaBreakpointUp('sm')) {
			super.onResize();
		}
	}
}
