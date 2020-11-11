import AbstractLottieBlock from 'abstracts/AbstractLottieBlock';

/**
 * MiniCart
 *
 * @constructor
 */
export default class MiniCart extends AbstractLottieBlock {
	initEvents() {
		super.initEvents();

		this.rootElement.addEventListener('mouseenter', () => {
			this.animation.setDirection(1);
			this.animation.play();
		});

		this.rootElement.addEventListener('mouseleave', () => {
			this.animation.setDirection(-1);
			this.animation.play();
		});
	}
}
