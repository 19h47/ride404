import AbstractLottieModule from 'abstracts/AbstractLottieModule';

/**
 *
 * @constructor
 */
class LoveTwoRideFourLove extends AbstractLottieModule {
	init() {
		super.init();

		this.json.then(() => setTimeout(() => this.animation.play(), this.delay));
	}
}

export default LoveTwoRideFourLove;
