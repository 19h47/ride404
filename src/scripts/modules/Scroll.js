import { module as M } from '@19h47/modular';
import LocomotiveScroll from 'locomotive-scroll';

import { elements } from 'scripts/config';

const imagesLoaded = require('imagesloaded');

class Scroll extends M {
	init() {
		const imgLoad = imagesLoaded(this.el);

		this.scroll = new LocomotiveScroll({
			el: this.el,
			smooth: JSON.parse(this.el.getAttribute('data-scroll-smooth')),
			getDirection: true,
		});

		this.direction = 'down';

		this.scroll.on('scroll', ({ direction, scroll }) => {
			elements.html.setAttribute('data-direction', direction);
			this.direction = direction;

			if (0 === scroll.y) {
				elements.html.classList.add('is-ontop');
			} else {
				elements.html.classList.remove('is-ontop');
			}
		});

		this.scroll.on('call', (func, way, obj) => {
			if (obj.el.id) {
				this.call(func[0], { way, obj, direction: this.direction }, func[1], obj.el.id);
			}
		});

		imgLoad.on('always', () => this.update());
	}

	update() {
		return this.scroll.update();
	}

	stop() {
		return this.scroll.stop();
	}

	start() {
		return this.scroll.start();
	}

	destroy() {
		return this.scroll.destroy();
	}

	scroll() {
		return this.scroll;
	}
}

export default Scroll;
