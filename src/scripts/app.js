/* global rider404, YT */
import modular from '@19h47/modular';
import { gsap } from 'gsap';

import Guid from 'common/Guid';
import Splashscreen from 'common/Splashscreen';
import { elements } from 'scripts/config';

const url = 'https://www.youtube.com/iframe_api';

const createTag = () => {
	const tag = document.createElement('script');
	const $script = document.getElementsByTagName('script')[0];

	tag.src = url;

	return $script.parentNode.insertBefore(tag, $script);
};

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

	createTag();

	window.onYouTubeIframeAPIReady = () => {
		[...Object.entries(app.currentModules)].forEach(([name, module]) => {
			if (name.startsWith('YouTube')) {
				module.player = new YT.Player(module.el, {
					height: 360,
					width: 640,
					videoId: module.videoId,
				});
			}
		})
	};

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
