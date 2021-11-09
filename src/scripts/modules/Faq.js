import { module as M } from 'modujs';

/**
 *
 * @constructor
 * @param {object} container
 */
class Faq extends M {
	init() {
		this.$link = document.querySelector(`[data-id="${this.el.id}"]`);
	}

	inview({ way }) {
		if ('enter' === way) {
			this.call('deactive', false, 'Faq');
			this.active();
		}

		if ('exit' === way) {
			this.deactive();
		}
	}

	deactive() {
		this.$link.classList.remove('is-active');
	}

	active() {
		this.$link.classList.add('is-active');
	}
}

export default Faq;
