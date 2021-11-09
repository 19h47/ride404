import AbstractLottieModule from 'abstracts/AbstractLottieModule';

/**
 * Add to cart
 *
 * @constructor
 */
class AddToCart extends AbstractLottieModule {
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
		this.call('activate', false, 'AddToCartHover');
	}

	deactivate() {
		this.animation.setDirection(-1);
		this.animation.play();
		this.call('deactivate', false, 'AddToCartHover');
	}
}

export default AddToCart;
