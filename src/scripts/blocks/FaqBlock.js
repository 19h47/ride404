import { AbstractBlock } from 'starting-blocks';

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

		this.questions = [...this.rootElement.querySelectorAll('.js-question')];
		this.answers = [...this.rootElement.querySelectorAll('.js-answer')];
		console.log(this.answers);

		this.intersectionObserver = new IntersectionObserver(entries => this.callback(entries), {
			threshold: 0.45,
		});

		this.questions.forEach($item => this.intersectionObserver.observe($item));
	}

	// initEvents() {
	// 	this.answers.forEach($answer => {
	// 		$answer.addEventListener('click', () => {
	// 			this.deactiveAnswers();
	// 			$answer.parentElement.classList.add('is-active');
	// 		});
	// 	});
	// }

	callback(entries) {
		entries.forEach(entry => {
			const hash = `#${entry.target.id}`;
			const $parent = this.rootElement.querySelector(`a[href="${hash}"]`).parentElement;

			if (entry.isIntersecting && 0.45 <= entry.intersectionRatio) {
				this.deactiveAnswers();
				$parent.classList.add('is-active');
			}

			// if (window.location.hash !== hash) {
			// 	history.pushState({}, window.title, hash);
			// }
		});
	}

	deactiveAnswers() {
		return this.answers.forEach(answer => answer.parentElement.classList.remove('is-active'));
	}
}
