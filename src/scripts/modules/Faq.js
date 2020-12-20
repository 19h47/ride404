import { module } from 'modujs';

/**
 *
 * @constructor
 * @param {object} container
 */
class Faq extends module {
	init() {
		this.answers = [...this.el.querySelectorAll('.js-answer')];

		this.answers.forEach($answer => {
			$answer.addEventListener('click', event => {
				const target = this.el.querySelector(event.target.hash);

				this.modules.Scroll.main.scroll.scrollTo(target);
			});
		});

		this.initEvents();
	}

	initEvents() {
		this.modules.Scroll.main.scroll.on('call', (value, way, obj) => {
			if ('answer' === value && 'enter' === way) {
				console.log(obj.el.id)
				const hash = `#${obj.el.id}`;
				const $parent = this.el.querySelector(`a[href="${hash}"]`).parentElement;

				this.answers.forEach(answer => answer.parentElement.classList.remove('is-active'));
				$parent.classList.add('is-active');
			}
		});
	}
}

export default Faq;
