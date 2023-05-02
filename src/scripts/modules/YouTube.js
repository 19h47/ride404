import { module as M } from '@19h47/modular';

/**
 * YouTube
 *
 * @constructor
 * @param {object} container
 */
class YouTube extends M {
	constructor(m) {
		super(m);

		this.player = null;
	}

	init() {
		this.videoId = this.getData('video-id');
	}

	stop() {
		this.player.stopVideo();
	}

	play() {
		this.player.playVideo();
	}
}

export default YouTube;
