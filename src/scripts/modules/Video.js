import { module } from 'modujs';
import Grain from 'common/Grain';
import { gsap } from 'gsap';

/**
 *
 * @constructor
 * @param {object} container
 */
class Video extends module {
	constructor(m) {
		super(m);

		this.animated = JSON.parse(this.el.getAttribute('data-animated'));

		this.events = {
			click: {
				button: 'click',
			},
			mouseout: {
				button: 'out',
			},
			mouseover: {
				button: 'over',
			},
		};
	}

	init() {
		this.grain = new Grain(this.$('canvas')[0]);

		if (this.animated) {
			this.$('button')[0].classList.add('is-hidden');

			const first = this.$('overlay')[0].getBoundingClientRect();

			this.$('body')[0].classList.add('is-fixed');

			const last = this.$('overlay')[0].getBoundingClientRect();

			console.log({ first, last });

			const scaleX = window.innerWidth / first.width;
			const scaleY = window.innerHeight / first.height;
			const y = -first.top / (window.innerHeight / first.height);

			this.$('body')[0].classList.remove('is-fixed');

			gsap.set(this.$('body')[0], { y, scaleX, scaleY });

			gsap.to(this.$('body')[0], {
				y: 0,
				scaleX: 1,
				scaleY: 1,
				duration: 0.4,
				delay: 1.3,
				clearProps: 'all',
				onComplete: () => {
					this.$('body')[0].closest('.row').setAttribute('data-scroll-section', true);
					this.$('button')[0].classList.remove('is-hidden');
					this.call('update', false, 'Scroll', 'main');
				},
			});
		}
	}

	out() {
		this.el.classList.remove('is-over');
	}

	over() {
		this.el.classList.add('is-over');
	}

	click() {
		console.log('Video.click');

		const event = new CustomEvent('Video.open', { detail: { id: this.el.id } });
		return document.dispatchEvent(event);
	}
}

export default Video;
