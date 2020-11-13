import { AbstractBlock } from 'starting-blocks';
import Grain from 'common/Grain';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class VideoBlock extends AbstractBlock {
	constructor(container) {
		super(container, 'VideoBlock');
	}

	init() {
		super.init();
		this.$canvas = this.rootElement.querySelector('canvas');

		this.initPlugins();
	}

	initPlugins() {
		this.grain = new Grain(this.$canvas);
	}

	initEvents() {
		super.initEvents();

		this.rootElement.addEventListener('mouseout', ({ target }) => {
			if ('BUTTON' === target.nodeName) {
				this.rootElement.classList.remove('is-over');
			}
		});

		this.rootElement.addEventListener('mouseover', ({ target }) => {
			if ('BUTTON' === target.nodeName) {
				this.rootElement.classList.add('is-over');
			}
		});

		this.rootElement.addEventListener('click', ({ target }) => {
			if ('BUTTON' === target.nodeName) {
				const event = new CustomEvent('Video.open', { detail: { id: this.id } });
				return document.dispatchEvent(event);
			}

			return true;
		});
	}
}
