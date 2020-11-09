import AbstractLottieBlock from 'abstracts/AbstractLottieBlock';
import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class StarCircleBlock extends AbstractLottieBlock {
	initEvents() {
		super.initEvents();

		Scroll.on('call', (value, way) => {
			if ('star-circle' === value && 'enter' === way) {
				this.animation.play();
			}
		});
	}
}
