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
				if (this.rootElement.id === value && 'enter' === way) {
					console.log(this.rootElement.id);
					this.animation.goToAndPlay(0);
					this.rootElement.parentElement.classList.add('is-active');
				}

				if (this.rootElement.id === value && 'exit' === way) {
					this.rootElement.parentElement.classList.remove('is-active');
				}
			});
		});
	}
}
