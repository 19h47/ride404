import AbstractLottieModule from 'abstracts/AbstractLottieModule';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class AboutMapBlock extends AbstractLottieModule {
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
