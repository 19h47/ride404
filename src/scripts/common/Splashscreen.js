import { gsap } from 'gsap';

class Splashscreen {
	constructor() {
		this.timeline = null
	}

	init() {
		this.el = document.getElementById('splashscreen');

		this.children = [...this.el.children];

		this.timeline = gsap.timeline({ paused: true });

		this.timeline.to(this.children[0], { transformOrigin: '50% top', duration: 0.8, scaleY: 0, ease: 'power3.inOut' });
		this.timeline.to(
			this.children[1],
			{ transformOrigin: '50% top', duration: 0.8, scaleY: 0, ease: 'power3.inOut' },
			'-=0.4',
		);

		// Values
		this.minimalDuration = 300; // ms
		this.minimalDurationPromise = new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, this.minimalDuration);
		});
	}

	play() {
		return this.timeline.play()
	}
}

export default Splashscreen;
