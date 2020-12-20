import { module } from 'modujs';
import Grain from 'common/Grain';

/**
 *
 * @constructor
 * @param {object} container
 */
class Video extends module {
	constructor(m) {
		super(m);

		this.events = {
			click: {
				button: 'click',
			},
			mouseout: {
				button: 'out',
			},
			mouseover: {
				button: 'over',
			},
		};
	}

	init() {
		this.grain = new Grain(this.$('canvas')[0]);
	}

	out() {
		this.el.classList.remove('is-over');
	}

	over() {
		this.el.classList.add('is-over');
	}

	click() {
		console.log('Video.click');

		const event = new CustomEvent('Video.open', { detail: { id: this.el.id } });
		return document.dispatchEvent(event);
	}
}

export default Video;
