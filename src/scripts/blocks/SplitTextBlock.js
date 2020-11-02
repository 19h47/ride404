import { AbstractBlock } from 'starting-blocks';
import SplitText from 'vendors/SplitText';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class SplitTextBlock extends AbstractBlock {
	constructor(container) {
		// console.info('SplitTextBlock.constructor');

		super(container, 'SplitTextBlock');
	}

	init() {
		super.init();

		this.initPlugins();
	}

	initPlugins() {
		new SplitText(this.rootElement, { type: 'lines', linesClass: 'line' }); // eslint-disable-line no-new
		const splitText2 = new SplitText(this.rootElement, { type: 'lines' });

		splitText2.lines.forEach(($lines, i) =>
			$lines.children[0].style.setProperty('transition-delay', `${0.15 * (i + 1)}s`),
		);
	}
}
