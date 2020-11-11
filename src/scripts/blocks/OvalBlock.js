import AbstractLottieBlock from 'abstracts/AbstractLottieBlock';

/**
 * MiniCart
 *
 * @constructor
 */
export default class OvalBlock extends AbstractLottieBlock {
	constructor(container) {
		super(container, 'OvalBlock');

		this.activate = this.activate.bind(this);
		this.deactivate = this.deactivate.bind(this);
	}

	initEvents() {
		super.initEvents();

		this.rootElement.addEventListener('mouseenter', this.activate);
		this.rootElement.addEventListener('focus', this.activate);
		this.rootElement.addEventListener('mouseleave', this.deactivate);
		this.rootElement.addEventListener('blur', this.deactivate);
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
