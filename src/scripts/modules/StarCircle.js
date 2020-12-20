import AbstractLottieModule from 'abstracts/AbstractLottieModule';


/**
 *
 * @constructor
 * @param {object} container
 */
class StarCircle extends AbstractLottieModule {
	init() {

		super.init();

		this.modules.Scroll.main.scroll.on('call', (value, way) => {
			if ('star-circle' === value && 'enter' === way) {
				this.animation.play();
			}
		});
	}
}

export default StarCircle
