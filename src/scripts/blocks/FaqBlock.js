import { AbstractBlock } from 'starting-blocks';
import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class FaqBlock extends AbstractBlock {
	constructor(container) {
		// console.info('FaqBlock.constructor');

		super(container, 'FaqBlock');
	}

	init() {
		super.init();

		this.answers = [...this.rootElement.querySelectorAll('.js-answer')];

		this.answers.forEach($answer => {
			$answer.addEventListener('click', event => {
				const target = document.querySelector(event.target.hash);

				Scroll.scrollTo(target);
			});
		});
	}

	initEvents() {
		super.initEvents();

		Scroll.on('call', (value, way, obj) => {
			if ('answer' === value && 'enter' === way) {
				const hash = `#${obj.el.id}`;
				const $parent = this.rootElement.querySelector(`a[href="${hash}"]`).parentElement;

				this.answers.forEach(answer => answer.parentElement.classList.remove('is-active'));
				$parent.classList.add('is-active');
			}
		});
	}
}
