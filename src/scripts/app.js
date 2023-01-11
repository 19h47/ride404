/* global rider404 */
import modular from '@19h47/modular';
import { gsap } from 'gsap';

import Guid from 'common/Guid';
import Splashscreen from 'common/Splashscreen'
import { elements } from 'scripts/config';

const dev = 'production' !== process.env.NODE_ENV;

if (dev) {
	const guid = new Guid(12);

	guid.init();
}

// eslint-disable-next-line new-cap
const app = new modular({ modules: [] });

const splashscreen = new Splashscreen();
splashscreen.init();

const init = async () => {
	app.init(app);

	await splashscreen.play();

	elements.html.classList.add('is-loaded');
	elements.html.classList.add('is-ready');
	elements.html.classList.remove('is-loading');
};

window.onload = () => {
	const $style = document.getElementById(`${rider404.text_domain}-main-css`);

	if ($style) {
		if ($style.isLoaded) {
			init();
		} else {
			$style.addEventListener('load', () => init());
		}
	} else {
		console.warn(`The "${rider404.text_domain}-main-css" stylesheet not found`);
	}
};

window.onbeforeunload = () => {
	gsap.to(document.querySelector('.Site-content'), {
		duration: 0.5,
		opacity: 0,
	});
};
