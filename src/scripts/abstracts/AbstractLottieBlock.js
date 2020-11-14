import { AbstractBlock } from 'starting-blocks';
import lottie from 'lottie-web';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class AbstractLottieBlock extends AbstractBlock {
	constructor(container) {
		super(container, 'AbstractLottieBlock');

		this.animation = null;
	}

	init() {
		super.init();

		this.params = {
			renderer: 'svg',
			loop: JSON.parse(this.rootElement.getAttribute('data-lottie-loop')) || false,
			autoplay: JSON.parse(this.rootElement.getAttribute('data-lottie-autoplay')) || false,
			name: `${this.rootElement.getAttribute('id')}_animation`,
			container: this.rootElement,
			rendererSettings: {
				preserveAspectRatio:
					this.rootElement.getAttribute('data-lottie-preserveaspectratio') ||
					'xMinYMin slice',
			},
		};

		this.json = import(`@/json/${this.rootElement.getAttribute('data-lottie-json')}.json`);

		this.json.then(animationData => {
			this.params.animationData = animationData;
			this.animation = lottie.loadAnimation(this.params);
			this.duration = this.animation.getDuration();
		});
	}
}
