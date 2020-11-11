import AbstractLottieBlock from 'abstracts/AbstractLottieBlock';

/**
 * MiniCart
 *
 * @constructor
 */
export default class MiniCart extends AbstractLottieBlock {
	initEvents() {
		super.initEvents();

		this.rootElement.addEventListener('mouseenter', () => this.animation.goToAndPlay(0));
		this.rootElement.addEventListener('mouseleave', () => this.animation.goToAndStop(0));
	}
}
