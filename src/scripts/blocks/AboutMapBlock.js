import { EventTypes } from 'starting-blocks';

import AbstractLottieBlock from 'abstracts/AbstractLottieBlock';
import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class AboutMapBlock extends AbstractLottieBlock {
	initEvents() {
		super.initEvents();

		window.addEventListener(EventTypes.AFTER_SPLASHSCREEN_HIDE, () => {
			Scroll.on('scroll', ({ currentElements }) => {
				// eslint-disable-next-line valid-typeof
				if (currentElements['about-map']) {
					const { progress } = currentElements['about-map'];

					this.animation.goToAndStop(progress * this.duration, true);
				}
			});
		});
	}
}
