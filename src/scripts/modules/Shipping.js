import { module } from 'scripts/modujs';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class Shipping extends module {
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
