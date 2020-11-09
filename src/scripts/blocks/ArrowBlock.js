import { EventTypes } from 'starting-blocks';

import LottieBlock from 'blocks/LottieBlock';
import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class ArrowBlock extends LottieBlock {
	initEvents() {
		super.initEvents();

		window.addEventListener(EventTypes.AFTER_SPLASHSCREEN_HIDE, () => {
			Scroll.on('call', (value, way) => {
				if ('arrow' === value && 'enter' === way) {
					this.animation.goToAndPlay(0);
					this.rootElement.classList.add('is-active');
				}

				if ('arrow' === value && 'exit' === way) {
					this.rootElement.classList.remove('is-active');
				}
			});
		});
	}
}
