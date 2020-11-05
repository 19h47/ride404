import { AbstractBlock } from 'starting-blocks';
import { gsap } from 'gsap';

import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class FeaturedBlock extends AbstractBlock {
	initEvents() {
		super.initEvents();

		Scroll.on('scroll', ({ scroll: { y }, limit }) => {
			gsap.to(this.rootElement, { duration: 0.1, rotate: (y * 360) / limit });
		});
	}
}
