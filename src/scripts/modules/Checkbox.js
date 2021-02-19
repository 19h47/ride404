import { module } from 'scripts/modujs';
import C from '@19h47/checkbox';
import $ from 'jquery';

/**
 * Checkbox
 *
 * @constructor
 * @param {object} container
 */
class Checkbox extends module {
	init() {
		this.change = this.change.bind(this);

		this.events = {
			activate: {
				input: 'change',
			},
			deactivate: {
				input: 'change',
			},
		};

		this.initPlugins();
		this.initEvents();
	}

	initPlugins() {
		this.checkbox = new C(this.el);
		this.checkbox.init();
	}

	initEvents() {
		this.checkbox.$input.addEventListener('activate', this.change);
		this.checkbox.$input.addEventListener('deactivate', this.change);
	}

	change() {
		return $(this.checkbox.$input).trigger('change');
	}
}

export default Checkbox;
