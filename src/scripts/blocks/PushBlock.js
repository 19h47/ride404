import AbstractCarouselBlock from 'abstracts/AbstractCarouselBlock';
import mediaBreakpointUp from 'utils/mediaBreakpointUp';

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
		if (1 === window.startingBlocksDebugLevel) {
			console.debug(`%c[SB]\t\t%c✳️ PushBlock.onResize`, 'color:#749f73', 'color:debug');
		}

		if (this.carousel && mediaBreakpointUp('sm')) {
			this.carousel.destroy();
		}

		if (!mediaBreakpointUp('sm')) {
			super.onResize();
		}
	}
}
