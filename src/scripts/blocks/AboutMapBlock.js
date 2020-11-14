import { EventTypes } from 'starting-blocks';

import AbstractLottieBlock from 'abstracts/AbstractLottieBlock';
// import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class AboutMapBlock extends AbstractLottieBlock {
	initEvents() {
		super.initEvents();

		window.addEventListener(EventTypes.AFTER_SPLASHSCREEN_HIDE, () => {
			// console.log(this.duration);
			// Scroll.on('scroll', ({ scroll, limit }) => {
			// const { height, top } = this.rootElement.getBoundingClientRect();
			// console.log(height, top);
			// const distance = scroll.y + limit - top;
			// const percentage = Math.round(distance / ((limit + height) / 100));
			// console.log(Math.min(100, Math.max(0, percentage)));
			// this.animation.goToAndStop((percentage * this.duration) / 100);
			// });
		});
	}
}
