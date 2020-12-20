import AbstractLottieModule from 'abstracts/AbstractLottieModule';

class Logo extends AbstractLottieModule {
	constructor(m) {
		super(m);

		this.events = {
			mouseover: {
				button: 'goToAndPlay',
			},
		};
	}
}

export default Logo;
