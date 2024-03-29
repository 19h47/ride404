import { module as M } from '@19h47/modular';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class Shipping extends M {
	init() {
		this.el.addEventListener(
			'change',
			event => {
				const { target } = event;

				if (target.matches('.input-checkbox')) {
					setTimeout(() => this.call('update', false, 'Scroll', 'main'));
				}
			},
			false,
		);
	}
}
