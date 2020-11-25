/* global YT */
import { AbstractBlock } from 'starting-blocks';

// import Scroll from 'common/Scroll';

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
export default class ModalBlock extends AbstractBlock {
	constructor(container) {
		super(container, 'ModalBlock');

		this.tag = null;
		this.player = null;
	}

	init() {
		super.init();

		this.videoId = this.rootElement.getAttribute('data-video-id');
		this.control = this.rootElement.getAttribute('data-video-control');

		createTag();
	}

	initEvents() {
		super.initEvents();

		window.onYouTubeIframeAPIReady = () => {
			this.player = new YT.Player(this.rootElement.querySelector('.js-player'), {
				height: '360',
				width: '640',
				videoId: this.videoId,
			});
		};

		this.rootElement.addEventListener('click', ({ target }) => {
			if (target.matches('.js-button')) {
				this.rootElement.classList.remove('is-active');
				this.player.stopVideo();
				document.dispatchEvent(new Event('Modal.close'));
			}
		});

		document.addEventListener('Video.open', ({ detail }) => {
			if (this.control === detail.id) {
				this.rootElement.classList.add('is-active');
				this.player.playVideo();
				document.dispatchEvent(new Event('Modal.open'));
			}
		});
	}
}
