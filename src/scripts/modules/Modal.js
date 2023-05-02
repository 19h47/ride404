import { module as M } from '@19h47/modular';

/**
 * Modal
 *
 * @constructor
 * @param {object} container
 */
class Modal extends M {
	constructor(m) {
		super(m);

		this.events = {
			click: {
				button: 'close',
			},
		};
	}

	init() {
		this.control = this.el.getAttribute('data-video-control');
	}

	close() {
		this.el.classList.remove('is-active');

		this.call('stop', null, 'YouTube', this.control);
		this.call('start', false, 'Scroll', 'main');

		document.dispatchEvent(new Event('Modal.close'));
	}

	open() {
		this.el.classList.add('is-active');

		this.call('play', null, 'YouTube', this.control);
		this.call('stop', false, 'Scroll', 'main');

		document.dispatchEvent(new Event('Modal.open'));
	}
}

export default Modal;
