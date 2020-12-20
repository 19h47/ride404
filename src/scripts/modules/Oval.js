import AbstractLottieModule from 'abstracts/AbstractLottieModule';

/**
 * MiniCart
 *
 * @constructor
 */
class Oval extends AbstractLottieModule {
	constructor(m) {
		super(m);

		this.activate = this.activate.bind(this);
		this.deactivate = this.deactivate.bind(this);

		this.initEvents();
	}

	initEvents() {

		this.active = JSON.parse(this.el.getAttribute('data-lottie-active'));

		this.el.addEventListener('mouseenter', this.activate);
		this.el.addEventListener('focus', this.activate);
		this.el.addEventListener('mouseleave', this.deactivate);
		this.el.addEventListener('blur', this.deactivate);

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

export default Oval
