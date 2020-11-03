import AbstractLottieBlock from 'blocks/AbstractLottieBlock';
import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class ArrowBlock extends AbstractLottieBlock {
	initEvents() {
		super.initEvents();

		Scroll.on('call', (value, way) => {
			if ('arrow' === value && 'enter' === way) {
				this.animation.goToAndPlay(0);
			}
		});
	}
}
