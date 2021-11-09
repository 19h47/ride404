import AbstractLottieModule from 'abstracts/AbstractLottieModule';

/**
 * About map
 *
 * @constructor
 * @param {object} container
 */
class AboutMap extends AbstractLottieModule {
	init() {
		super.init();

		this.modules.Scroll.main.scroll.on('scroll', ({ currentElements }) => {
			if (currentElements['about-map']) {
				const { progress } = currentElements['about-map'];

				this.animation.goToAndStop(progress * this.duration, true);
			}
		});
	}
}

export default AboutMap;
