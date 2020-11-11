import AbstractLottieBlock from 'abstracts/AbstractLottieBlock';

/**
 * MiniCart
 *
 * @constructor
 */
export default class MenuBlock extends AbstractLottieBlock {
	constructor(container) {
		super(container, 'MenuBlock');

		this.activate = this.activate.bind(this);
		this.deactivate = this.deactivate.bind(this);
	}

	initEvents() {
		super.initEvents();

		document.addEventListener('Navigation.open', this.activate);
		document.addEventListener('Navigation.close', this.deactivate);
	}

	activate() {
		this.animation.setDirection(1);
		this.animation.goToAndPlay(0);
	}

	deactivate() {
		this.animation.setDirection(-1);
		this.animation.play();
	}
}
