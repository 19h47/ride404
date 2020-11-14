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

		this.active = JSON.parse(this.rootElement.getAttribute('data-lottie-active'));

		this.rootElement.addEventListener('mouseenter', this.activate);
		this.rootElement.addEventListener('focus', this.activate);
		this.rootElement.addEventListener('mouseleave', this.deactivate);
		this.rootElement.addEventListener('blur', this.deactivate);

		document.addEventListener('Navigation.open', () => {
			if (this.active) {
				setTimeout(() => this.animation.play(), 1100);
			}
		});
	}

	activate() {
		if (this.active) {
			return;
		}

		this.animation.setDirection(1);
		this.animation.play();
	}

	deactivate() {
		if (this.active) {
			return;
		}

		this.animation.setDirection(-1);
		this.animation.play();
	}
}
