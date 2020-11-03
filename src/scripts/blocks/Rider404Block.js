import AbstractLottieBlock from 'blocks/AbstractLottieBlock';
import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class Rider404 extends AbstractLottieBlock {
	constructor(container) {
		super(container, { autoplay: true });
	}

	init() {
		super.init();

		this.json.then(() => Scroll.update());
	}
}
