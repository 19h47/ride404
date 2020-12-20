import AbstractCarouselModule from 'abstracts/AbstractCarouselModule';
import mediaBreakpointUp from 'utils/mediaBreakpointUp';

/**
 *
 * @constructor
 * @param {object} container
 */
class Push extends AbstractCarouselModule {
	constructor(m) {
		super(m);

		this.onResize();
	}

	onResize() {
		if (this.carousel && mediaBreakpointUp('sm')) {
			this.carousel.destroy();
		}

		if (!mediaBreakpointUp('sm')) {
			super.onResize();
		}
	}
}

export default Push;
