import { AbstractSplashscreen, Dispatcher, EventTypes } from 'starting-blocks';
import { gsap } from 'gsap';

import { elements } from 'scripts/config';
// import Scroll from 'common/Scroll';

export default class SplashScreen extends AbstractSplashscreen {
	constructor(container) {
		super(container, 'SplashScreen');

		// Elements
		this.rootElement = document.getElementById('splashscreen');
		this.children = [...this.rootElement.children];

		this.timeline = gsap.timeline({ paused: true });

		this.timeline.to(this.children[0], { duration: 0.8, scaleY: 0, ease: 'power3.inOut' });
		this.timeline.to(
			this.children[1],
			{ duration: 0.8, scaleY: 0, ease: 'power3.inOut' },
			'-=0.4',
		);

		// Values
		this.minimalDuration = 500; // ms
		this.minimalDurationPromise = new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, this.minimalDuration);
		});
	}

	async hide() {
		await Promise.all([this.minimalDurationPromise]);

		return this.launchHideAnimation();
	}

	launchHideAnimation() {
		return new Promise(resolve => {
			Dispatcher.commit(EventTypes.START_SPLASHSCREEN_HIDE);

			// Scroll.update();

			this.timeline.play();

			this.timeline.eventCallback('onComplete', () => {
				gsap.set(this.rootElement, {
					display: 'none',
				});

				elements.html.classList.add('is-loaded');
				elements.html.classList.remove('is-loading');

				resolve();
			});
		});
	}
}
