import AbstractLottieBlock from 'abstracts/AbstractLottieBlock';
import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class Rider404Block extends AbstractLottieBlock {
	initEvents() {
		super.initEvents();

		Scroll.on('call', (value, way) => {
			if ('rider-404' === value && 'enter' === way) {
				setTimeout(() => this.animation.play(), 1500);
			}
		});
	}
}
