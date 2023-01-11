import { module as M } from '@19h47/modular';
import lottie from 'lottie-web';

/**
 *
 * @constructor
 * @param {object} container
 */
class AbstractLottieBlock extends M {
	// constructor(m) {
	// 	super(m);

	// 	this.animation = null;
	// }

	init() {
		this.params = {
			renderer: 'svg',
			loop: JSON.parse(this.el.getAttribute('data-lottie-loop')) || false,
			autoplay: JSON.parse(this.el.getAttribute('data-lottie-autoplay')) || false,
			name: `${this.el.getAttribute('id')}_animation`,
			container: this.el,
			rendererSettings: {
				preserveAspectRatio:
					this.el.getAttribute('data-lottie-preserveaspectratio') || 'xMinYMin slice',
			},
		};

		this.delay = JSON.parse(this.el.getAttribute('data-lottie-delay')) || false;

		this.json = import(`@/json/${this.el.getAttribute('data-lottie-json')}.json`);
		// console.log(this.json);

		this.json.then(animationData => {
			this.params.animationData = animationData;
			this.animation = lottie.loadAnimation(this.params);
			this.duration = this.animation.getDuration(true);
		});
	}

	goToAndPlay() {
		return this.animation.goToAndPlay(0);
	}
}

export default AbstractLottieBlock;
