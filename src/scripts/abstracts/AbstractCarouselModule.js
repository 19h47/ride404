import { module as M } from '@19h47/modular';
import Swiper, { Navigation } from 'swiper';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class AbstractCarouselModule extends M {
	constructor(m) {
		super(m);

		const parameters = JSON.parse(this.getData('parameters')) || {};

		this.swiper = new Swiper(this.el, {
			...{ modules: [Navigation], slidesPerView: 'auto' },
			...parameters,
		});
	}
}
