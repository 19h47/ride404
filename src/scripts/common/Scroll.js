import LocomotiveScroll from 'locomotive-scroll';

const imagesLoaded = require('imagesloaded');

const el = document.querySelector('[data-scroll-container]');

/**
 * @file    common/Scroll.js
 *
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
setTimeout(() => {
	const Scroll = new LocomotiveScroll({
		el,
		smooth: true,
		getDirection: true,
	});

	setTimeout(() => {
		imagesLoaded(el, () => Scroll.update());
	}, 1000);

	const answers = [...document.querySelectorAll('.js-answer')];

	Scroll.on('call', (value, way, obj) => {
		if ('answer' === value && 'enter' === way) {
			const hash = `#${obj.el.id}`;
			const $parent = document.querySelector(`a[href="${hash}"]`).parentElement;

			answers.forEach(answer => answer.parentElement.classList.remove('is-active'));
			$parent.classList.add('is-active');
		}
	});

	answers.forEach($answer => {
		$answer.addEventListener('click', event => {
			const target = document.querySelector(event.target.hash);

			Scroll.scrollTo(target);
		});
	});
}, 1000);
