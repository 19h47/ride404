import LottieBlock from 'blocks/LottieBlock';

/**
 *
 * @constructor
 */
export default class LoveTwoRideFourLove extends LottieBlock {
	init() {
		super.init();

		setTimeout(() => {
			this.animation.play();
		}, 400);
	}
}
