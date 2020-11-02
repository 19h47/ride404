import LocomotiveScroll from 'locomotive-scroll';

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

imagesLoaded(el, () => Scroll.update());

export default Scroll;
