import AbstractLottieBlock from 'abstracts/AbstractLottieBlock';

/**
 *
 * @constructor
 */
export default class LogoBlock extends AbstractLottieBlock {
	initEvents() {
		super.initEvents();
		this.rootElement.addEventListener('mouseover', () => this.animation.goToAndPlay(0));
	}
}
