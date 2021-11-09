import Modular from 'modujs';
import * as modules from 'modules';
import { gsap } from 'gsap';

import Guid from 'common/Guid';
import Splashscreen from 'common/Splashscreen'
import { elements } from 'scripts/config';

const production = 'production' !== process.env.NODE_ENV;

if (production) {
	const guid = new Guid(12);

	guid.init();
}

const app = new Modular({ modules });

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
	const $style = document.getElementById('rider404-main-css');

	if ($style.isLoaded) {
		init();
	} else {
		$style.addEventListener('load', () => init());
	}
};

window.onbeforeunload = () => {
	gsap.to(document.querySelector('.Site-content'), {
		duration: 0.5,
		opacity: 0,
	});
};
