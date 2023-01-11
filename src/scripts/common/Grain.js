import { gsap } from 'gsap';

/**
 *
 *
 * @see https://codepen.io/renarsvilnis/pen/YWKRvE
 */
class Grain {
	constructor(el) {
		/**
		 * Options
		 * Increase the pattern size if visible pattern
		 */
		this.patternSize = 150;
		this.patternScaleX = 1;
		this.patternScaleY = 1;
		this.patternRefreshInterval = 3; // 8
		this.patternAlpha = 30; // int between 0 and 255,

		/**
		 * Create canvas
		 */
		this.canvas = el;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.scale(this.patternScaleX, this.patternScaleY);

		/**
		 * Create a canvas that will be used to generate grain and used as a
		 * pattern on the main canvas.
		 */
		this.patternCanvas = document.createElement('canvas');
		this.patternCanvas.width = this.patternSize;
		this.patternCanvas.height = this.patternSize;
		this.patternCtx = this.patternCanvas.getContext('2d');
		this.patternData = this.patternCtx.createImageData(this.patternSize, this.patternSize);
		this.patternPixelDataLength = this.patternSize * this.patternSize * 4; // rgba = 4

		/**
		 * Prebind prototype function, so later its easier to user
		 */
		this.resize = this.resize.bind(this);
		this.loop = this.loop.bind(this);

		this.frame = 0;

		window.addEventListener('resize', this.resize);
		this.resize();

		gsap.ticker.add(this.loop);
	}

	resize() {
		this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
		this.canvas.height = this.canvas.clientHeight * devicePixelRatio;
	}

	update() {
		const { patternPixelDataLength, patternData, patternAlpha, patternCtx } = this;

		// put a random shade of gray into every pixel of the pattern
		for (let i = 0; i < patternPixelDataLength; i += 4) {
			// const value = (Math.random() * 255) | 0;
			const value = Math.random() * 255;

			patternData.data[i] = value;
			patternData.data[i + 1] = value;
			patternData.data[i + 2] = value;
			patternData.data[i + 3] = patternAlpha;
		}

		patternCtx.putImageData(patternData, 0, 0);
	}

	draw() {
		const {
			ctx,
			patternCanvas,
			canvas: { width, height },
		} = this;

		// clear canvas
		ctx.clearRect(0, 0, width, height);

		// fill the canvas using the pattern
		ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
		ctx.fillRect(0, 0, width, height);
	}

	loop() {
		// only update grain every n frames
		this.frame += 1;
		const shouldDraw = 0 === this.frame % this.patternRefreshInterval;

		if (shouldDraw) {
			this.update();
			this.draw();
		}
	}
}

export default Grain;
