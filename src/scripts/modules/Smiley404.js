/* global CABLES, rider404 */
import { module as M } from 'modujs';

const showError = (errId, errMsg) => {
	console.log(`An error occured: ${errId}, ${errMsg}`);
};

const patchInitialized = () => {
	// You can now access the patch object (CABLES.patch), register variable watchers and so on
};

/**
 *
 * @constructor
 * @param {object} container
 */
class Smiley404 extends M {
	init() {
		super.init();

		CABLES.patch = new window.CABLES.Patch({
			patch: CABLES.exportedPatch,
			prefixAssetPath: `${rider404.template_directory_uri}/dist/`,
			// patchFile: `${rider404.template_directory_uri}/dist/smiley.json`,
			glCanvasId: this.$('canvas')[0].id,
			glCanvasResizeToWindow: false,
			silent: true,
			onError: showError,
			onPatchLoaded: patchInitialized,
			onFinishedLoading: () => {
				this.call('update', false, 'Scroll', 'main');
			},
			canvas: { alpha: true, premultipliedAlpha: true },
		});
	}
}

export default Smiley404;
