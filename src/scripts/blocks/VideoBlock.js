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
		this.canvas = this.rootElement.querySelector('canvas');
		this.grain = new Grain(this.canvas);
	}
}
