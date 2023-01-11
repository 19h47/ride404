import AbstractLottieModule from 'abstracts/AbstractLottieModule';

/**
 * MiniCart
 *
 * @constructor
 */
export default class MiniCart extends AbstractLottieModule {
	constructor(m) {
		super(m);

		if ('A' === this.el.parentNode.tagName) {
			this.events = {
				mouseenter: {
					button: 'activate'
				},
				mouseleave: {
					button: 'deactivate'
				},
				focus: {
					button: 'activate'
				},
				blur: {
					button: 'deactivate'
				}
			}
		}
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
