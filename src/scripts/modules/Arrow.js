import AbstractLottieModule from 'abstracts/AbstractLottieModule';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class Arrow extends AbstractLottieModule {
	init() {
		super.init();

		this.enter = this.enter.bind(this);
		this.leave = this.leave.bind(this);

		this.direction = JSON.parse(this.el.getAttribute('data-lottie-loop')) ? 1 : -1;

		this.json.then(() => {
			this.initEvents();
		});
	}

	initEvents() {
		this.modules.Scroll.main.scroll.on('call', (value, way) => {
			if (this.el.id === value && 'enter' === way) {
				this.animation.goToAndPlay(0);
				this.el.parentElement.classList.add('is-active');
			}

			if (this.el.id === value && 'exit' === way) {
				this.el.parentElement.classList.remove('is-active');
			}
		});

		this.el.addEventListener('mouseenter', () => this.enter);
		this.el.addEventListener('mouseleave', () => this.leave);
	}

	enter() {
		this.direction = 1 === this.direction ? -1 : 1;
		this.animation.setDirection(this.direction);
		this.animation.play();
	}

	leave() {
		this.direction = 1 === this.direction ? -1 : 1;
		this.animation.setDirection(this.direction);
		this.animation.play();
	}
}
