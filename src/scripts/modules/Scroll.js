import { module } from 'modujs';
import LocomotiveScroll from 'locomotive-scroll';

import { elements } from 'scripts/config';

const imagesLoaded = require('imagesloaded');

class Scroll extends module {
	init() {
		const imgLoad = imagesLoaded(this.el);


		this.scroll = new LocomotiveScroll({
			el: this.el,
			smooth: JSON.parse(this.el.getAttribute('data-scroll-smooth')),
			getDirection: true,
		});

		this.scroll.on('scroll', ({ direction, scroll }) => {
			elements.html.setAttribute('data-direction', direction);

			if (0 >= scroll.y) {
				elements.html.classList.add('is-ontop');
			} else {
				elements.html.classList.remove('is-ontop');
			}
		});

		this.update = this.update.bind(this);

		imgLoad.on('always', () => {
			console.info('📸 All images have been loaded');

			this.update();
		});
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
		this.scroll.destroy();
	}

	scroll() {
		return this.scroll;
	}
}

export default Scroll;
