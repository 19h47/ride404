import AbstractLottieModule from 'abstracts/AbstractLottieModule';

/**
 * MiniCart
 *
 * @constructor
 */
export default class AddToCartHover extends AbstractLottieModule {
	activate() {
		this.animation.setDirection(1);
		this.animation.play();
	}

	deactivate() {
		this.animation.setDirection(-1);
		this.animation.play();
	}
}
