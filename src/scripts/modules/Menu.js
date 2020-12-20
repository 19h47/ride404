import AbstractLottieModule from 'abstracts/AbstractLottieModule';

/**
 * MiniCart
 *
 * @constructor
 */
export default class Menu extends AbstractLottieModule {
	constructor(m) {
		super(m);

		this.activate = this.activate.bind(this);
		this.deactivate = this.deactivate.bind(this);

		this.initEvents();
	}

	initEvents() {
		// console.info('Menu.initEvents');

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
