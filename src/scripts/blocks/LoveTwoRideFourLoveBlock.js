import AbstractLottieBlock from 'blocks/AbstractLottieBlock';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class LoveTwoRideFourLove extends AbstractLottieBlock {
	init() {
		super.init();

		setTimeout(() => {
			this.animation.play();
		}, 400);
	}
}
