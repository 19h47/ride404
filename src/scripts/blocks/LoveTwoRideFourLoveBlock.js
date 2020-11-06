import { EventTypes } from 'starting-blocks';
import AbstractLottieBlock from 'abstracts/AbstractLottieBlock';

/**
 *
 * @constructor
 */
export default class LoveTwoRideFourLoveBlock extends AbstractLottieBlock {
	initEvents() {
		super.initEvents();

		window.addEventListener(EventTypes.START_SPLASHSCREEN_HIDE, () => {
			setTimeout(() => this.animation.play(), 1500);
		});
	}
}
