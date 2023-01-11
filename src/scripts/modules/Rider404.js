import AbstractLottieModule from 'abstracts/AbstractLottieModule';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class Rider404 extends AbstractLottieModule {
	init() {
		super.init();
		// console.dir(this.el)

		this.modules.Scroll.main.scroll.on('call', (value, way) => {
			if ('rider-404' === value && 'enter' === way) {
				setTimeout(() => this.animation.play(), 1500);
			}
		});
	}
}
