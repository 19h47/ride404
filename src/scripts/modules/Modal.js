/* global YT */
import { module as M } from '@19h47/modular';

const url = 'https://www.youtube.com/iframe_api';

const createTag = () => {
	const tag = document.createElement('script');
	const $script = document.getElementsByTagName('script')[0];

	tag.src = url;

	return $script.parentNode.insertBefore(tag, $script);
};

/**
 * ModalBlock
 *
 * @constructor
 * @param {object} container
 */
class Modal extends M {
	constructor(m) {
		super(m);

		this.tag = null;
		this.player = null;

		this.events = {
			click: {
				button: 'close',
			},
		};
	}

	init() {
		this.videoId = this.el.getAttribute('data-video-id');
		this.control = this.el.getAttribute('data-video-control');

		createTag();
		this.initEvents();
	}

	initEvents() {
		window.onYouTubeIframeAPIReady = () => {
			this.player = new YT.Player(this.$('player')[0], {
				height: '360',
				width: '640',
				videoId: this.videoId,
			});
		};

		document.addEventListener('Video.open', ({ detail }) => {
			if (this.control === detail.id) {
				this.open();
			}
		});
	}

	close() {
		this.el.classList.remove('is-active');
		this.player.stopVideo();

		this.call('start', false, 'Scroll', 'main');

		document.dispatchEvent(new Event('Modal.close'));
	}

	open() {
		this.el.classList.add('is-active');
		this.player.playVideo();

		this.call('stop', false, 'Scroll', 'main');

		document.dispatchEvent(new Event('Modal.open'));
	}
}

export default Modal;
