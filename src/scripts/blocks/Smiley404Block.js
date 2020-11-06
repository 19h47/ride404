/* global CABLES, rider404 */
import { AbstractBlock } from 'starting-blocks';
// import { gsap } from 'gsap';

import Scroll from 'common/Scroll';
// import getViewportSize from 'utils/getViewportSize';

const showError = (errId, errMsg) => {
	console.log(`An error occured: ${errId}, ${errMsg}`);
};

const patchInitialized = () => {
	// You can now access the patch object (CABLES.patch), register variable watchers and so on
};

const patchFinishedLoading = () => {
	Scroll.update();
};

/**
 *
 * @constructor
 * @param {object} container
 */
export default class Smiley404Block extends AbstractBlock {
	constructor(container) {
		// console.info('Smiley404Block.constructor');

		super(container, 'Smiley404Block');
	}

	init() {
		super.init();

		// this.$background = this.rootElement.querySelector('.js-background');
	}

	initEvents() {
		super.initEvents();

		document.addEventListener('CABLES.jsLoaded', () => {
			CABLES.patch = new window.CABLES.Patch({
				patch: CABLES.exportedPatch,
				prefixAssetPath: `${rider404.template_directory_uri}/dist/`,
				// patchFile: `${rider404.template_directory_uri}/dist/smiley.json`,
				glCanvasId: `${this.rootElement.id}-canvas`,
				glCanvasResizeToWindow: false,
				silent: true,
				onError: showError,
				onPatchLoaded: patchInitialized,
				onFinishedLoading: patchFinishedLoading,
				canvas: { alpha: true, premultipliedAlpha: true },
			});
		});

		// Scroll.on('scroll', ({ scroll: { y }, limit }) => {
		// 	gsap.to(this.$background, { duration: 0.1, x: (y * getViewportSize().width) / limit });
		// });
	}
}
