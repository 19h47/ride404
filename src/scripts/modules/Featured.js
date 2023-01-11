import { module as M } from '@19h47/modular';
import { gsap } from 'gsap';

/**
 *
 * @constructor
 */
class Featured extends M {
	init() {
		this.modules.Scroll.main.scroll.on('scroll', ({ scroll: { y }, limit }) => {
			gsap.to(this.el, { duration: 0.1, rotate: (y * 360) / limit.y });
		});
	}
}

export default Featured;
