import { EventTypes } from 'starting-blocks';

import AbstractLottieBlock from 'abstracts/AbstractLottieBlock';
import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class ArrowBlock extends AbstractLottieBlock {
	init() {
		super.init();

		this.direction = JSON.parse(this.rootElement.getAttribute('data-lottie-loop')) ? 1 : -1;
	}

	initEvents() {
		super.initEvents();

		window.addEventListener(EventTypes.AFTER_SPLASHSCREEN_HIDE, () => {
			Scroll.on('call', (value, way) => {
				if (this.rootElement.id === value && 'enter' === way) {
					this.animation.goToAndPlay(0);
					this.rootElement.parentElement.classList.add('is-active');
				}

				if (this.rootElement.id === value && 'exit' === way) {
					this.rootElement.parentElement.classList.remove('is-active');
				}
			});
		});

		this.rootElement.addEventListener('mouseenter', () => {
			this.direction = 1 === this.direction ? -1 : 1;
			this.animation.setDirection(this.direction);
			this.animation.play();
		});
		this.rootElement.addEventListener('mouseleave', () => {
			this.direction = 1 === this.direction ? -1 : 1;
			this.animation.setDirection(this.direction);
			this.animation.play();
		});
	}
}
