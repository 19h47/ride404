import LottieBlock from 'blocks/LottieBlock';
import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class Rider404Block extends LottieBlock {
	initEvents() {
		super.initEvents();

		Scroll.on('call', (value, way) => {
			if ('rider-404' === value && 'enter' === way) {
				setTimeout(() => this.animation.play(), 1500);
			}
		});
	}
}
