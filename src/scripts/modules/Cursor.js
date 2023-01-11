import { module as M } from '@19h47/modular';
import { gsap } from 'gsap';
import mediaBreakpointUp from 'utils/mediaBreakpointUp';

/**
 *
 * @constructor
 * @param {object} container
 */
class Cursor extends M {
	constructor(m) {
		super(m);

		this.clientX = 0;
		this.clientY = 0;
		this.scrollY = 0;

		this.render = this.render.bind(this);
	}

	init() {
		console.log(this);
		this.modules.Scroll.main.scroll.on('scroll', ({ delta }) => {
			this.scrollY = delta.y;
		});

		window.addEventListener('mousemove', ({ pageX, pageY }) => {
			this.clientX = pageX;
			this.clientY = pageY;
		});

		this.onResize();
	}

	onResize() {
		if (mediaBreakpointUp('sm')) {
			return gsap.ticker.add(this.render);
		}

		return gsap.ticker.remove(this.render);
	}

	render() {
		return gsap.to(this.el, {
			x: this.clientX,
			y: this.clientY + this.scrollY,
			duration: 0.3,
		});
	}

	activate() {
		return this.el.classList.add('is-active');
	}

	deactivate() {
		return this.el.classList.remove('is-active');
	}

	scale(scale = 1) {
		return gsap.to(this.el, { scale });
	}
}

export default Cursor;
