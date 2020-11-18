import LocomotiveScroll from 'locomotive-scroll';

import { elements } from 'scripts/config';
import debug from 'utils/debug';

const imagesLoaded = require('imagesloaded');

const el = document.querySelector('[data-scroll-container]');

debug('🛤 Locomotive Scroll');
debug('⬆️ Scroll is on top');

const Scroll = new LocomotiveScroll({
	el,
	smooth: JSON.parse(elements.body.getAttribute('data-scroll-smooth')) || true,
	getDirection: true,
});
const imgLoad = imagesLoaded(el);

imgLoad.on('always', () => {
	debug('📸 All images have been loaded');

	elements.html.classList.add('is-ready');
	Scroll.update();
});

Scroll.on('scroll', instance => {
	elements.html.setAttribute('data-direction', instance.direction || 'up');
});

Scroll.on('scroll', obj => {
	if (0 >= obj.scroll.y) {
		elements.html.classList.add('is-ontop');
	} else {
		elements.html.classList.remove('is-ontop');
	}
});

document.addEventListener('Navigation.open', () => {
	elements.body.classList.add('Navigation--is-open');
	Scroll.stop();
});

document.addEventListener('Navigation.close', () => {
	elements.body.classList.remove('Navigation--is-open');
	Scroll.start();
});

document.addEventListener('Modal.open', () => {
	Scroll.stop();
});

document.addEventListener('Modal.close', () => {
	Scroll.start();
});

export default Scroll;
