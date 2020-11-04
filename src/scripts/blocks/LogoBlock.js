import LottieBlock from 'blocks/LottieBlock';

/**
 *
 * @constructor
 */
export default class LogoBlock extends LottieBlock {
	initEvents() {
		super.initEvents();
		this.rootElement.addEventListener('mouseover', () => this.animation.goToAndPlay(0));
	}
}
