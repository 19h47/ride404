import { AbstractBlock } from 'starting-blocks';
import lottie from 'lottie-web';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class AbstractLottieBlock extends AbstractBlock {
	constructor(container, params = {}) {
		super(container, 'AbstractLottieBlock');

		this.animation = null;

		this.params = {
			renderer: 'svg',
			loop: false,
			autoplay: false,
			...params,
		};
	}

	init() {
		super.init();

		this.params = {
			...this.params,
			...{
				container: this.rootElement,
				name: `${this.rootElement.getAttribute('id')}_animation`,
			},
		};

		this.json = import(`@/json/${this.rootElement.getAttribute('data-lottie-json')}.json`);

		this.json.then(animationData => {
			this.params.animationData = animationData;
			this.animation = lottie.loadAnimation(this.params);
		});
	}
}
