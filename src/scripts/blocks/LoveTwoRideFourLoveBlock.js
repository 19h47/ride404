import { EventTypes } from 'starting-blocks';
import LottieBlock from 'blocks/LottieBlock';

/**
 *
 * @constructor
 */
export default class LoveTwoRideFourLoveBlock extends LottieBlock {
	initEvents() {
		super.initEvents();

		window.addEventListener(EventTypes.START_SPLASHSCREEN_HIDE, () => {
			setTimeout(() => this.animation.play(), 1500);
		});
	}
}
