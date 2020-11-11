import AbstractLottieBlock from 'abstracts/AbstractLottieBlock';

/**
 * MiniCart
 *
 * @constructor
 */
export default class MiniCart extends AbstractLottieBlock {
	constructor(container) {
		super(container, 'MiniCart');

		this.activate = this.activate.bind(this);
		this.deactivate = this.deactivate.bind(this);
	}

	initEvents() {
		super.initEvents();

		this.rootElement.parentElement.addEventListener('mouseenter', this.activate);
		this.rootElement.parentElement.addEventListener('mouseleave', this.deactivate);
		this.rootElement.parentElement.addEventListener('focus', this.activate);
		this.rootElement.parentElement.addEventListener('blur', this.deactivate);
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
