import AbstractLottieBlock from 'blocks/AbstractLottieBlock';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class GlobeBlock extends AbstractLottieBlock {
	constructor(container) {
		super(container, { loop: true, autoplay: true });
	}
}
