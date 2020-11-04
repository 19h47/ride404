import { AbstractBlock } from 'starting-blocks';
import Grain from 'common/Grain';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class VideoBlock extends AbstractBlock {
	constructor(container) {
		// console.info('VideoBlock.constructor');

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

		this.rootElement.addEventListener('mouseover', ({ target }) => {
			if ('BUTTON' === target.nodeName) {
				this.rootElement.classList.add('is-over');
			} else {
				this.rootElement.classList.remove('is-over');
			}

			return false;
		});
	}
}
