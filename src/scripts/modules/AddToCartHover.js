import AbstractLottieModule from 'abstracts/AbstractLottieModule';

/**
 * MiniCart
 *
 * @constructor
 */
export default class AddToCartHover extends AbstractLottieModule {
	constructor(m) {
		super(m);

		this.events = {
			mouseenter: {
				button: 'activate',
			},
			mouseleave: {
				button: 'deactivate',
			},
			focus: {
				button: 'activate',
			},
			blur: {
				button: 'deactivate',
			},
		};
	}

	activate() {
		this.animation.setDirection(1);
		this.animation.play();
	}

	deactivate() {
		this.animation.setDirection(-1);
		this.animation.play();
	}
}
