import { module } from 'modujs';
import { gsap } from 'gsap';

/**
 *
 * @constructor
 */
class Featured extends module {
	init() {
		this.modules.Scroll.main.scroll.on('scroll', ({ scroll: { y }, limit }) => {
			gsap.to(this.el, { duration: 0.1, rotate: (y * 360) / limit.y });
		});
	}
}

export default Featured;
