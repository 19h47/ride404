/* global CABLES, rider404 */
import { AbstractBlock } from 'starting-blocks';
import Scroll from 'common/Scroll';

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
	}

	initEvents() {
		super.initEvents();

		document.addEventListener('CABLES.jsLoaded', () => {
			CABLES.patch = new window.CABLES.Patch({
				patch: CABLES.exportedPatch,
				prefixAssetPath: `${rider404.template_directory_uri}/dist/`,
				// patchFile: `${rider404.template_directory_uri}/dist/smiley.json`,
				glCanvasId: this.rootElement.id,
				glCanvasResizeToWindow: false,
				silent: true,
				onError: showError,
				onPatchLoaded: patchInitialized,
				onFinishedLoading: patchFinishedLoading,
				canvas: { alpha: true, premultipliedAlpha: true },
			});
		});
	}
}
