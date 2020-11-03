import { AbstractBlock } from 'starting-blocks';
import lottie from 'lottie-web';

const json = import('@/json/logo.json');

/**
 *
 * @constructor
 * @param {object} container
 */
export default class LogoBlock extends AbstractBlock {
	constructor(container) {
		// console.info('LogoBlock.constructor');

		super(container, 'LogoBlock');

		this.animation = null;
	}

	init() {
		super.init();

		const params = {
			container: this.rootElement.querySelector('div'),
			renderer: 'svg',
			name: `${this.rootElement.getAttribute('id')}_animation`,
			loop: false,
			// autoplay: false,
		};

		json.then(animationData => {
			params.animationData = animationData;
			this.animation = lottie.loadAnimation(params);
			this.initEvents();
		});
	}

	initEvents() {
		this.rootElement.addEventListener('mouseover', () => this.animation.goToAndPlay(0));
	}
}
