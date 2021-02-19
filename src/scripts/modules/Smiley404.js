/* global CABLES, rider404 */
import { module } from 'scripts/modujs';

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
class Smiley404 extends module {
	init() {
		super.init();

		// this.$background = this.rootElement.querySelector('.js-background');
		document.addEventListener('CABLES.jsLoaded', () => {
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
		});
	}

	initEvents() {
		super.initEvents();


		// Scroll.on('scroll', ({ scroll: { y }, limit }) => {
		// 	gsap.to(this.$background, { duration: 0.1, x: (y * getViewportSize().width) / limit });
		// });
	}
}

export default Smiley404
