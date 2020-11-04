import LocomotiveScroll from 'locomotive-scroll';
import { elements } from 'scripts/config';

const imagesLoaded = require('imagesloaded');

const el = document.querySelector('[data-scroll-container]');

/**
 * @file    common/Scroll.js
 *
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

const Scroll = new LocomotiveScroll({
	el,
	smooth: true,
	getDirection: true,
});

imagesLoaded(el, () => {
	elements.html.classList.add('is-ready');
	Scroll.update();
});

Scroll.on('scroll', obj => {
	if (0 >= obj.scroll.y) {
		elements.html.classList.add('is-ontop');
	} else {
		elements.html.classList.remove('is-ontop');
	}
});

export default Scroll;
