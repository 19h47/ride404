/**
 * @file    common/Guid.js
 * @type    class
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class Guid {
	constructor() {
		this.$cont = null;
		this.class = 'd-none';

		document.body.appendChild(Guid.render(20));
	}

	init() {
		// if (this.$cont === null || this.$cont === undefined) {
		// 	return false;
		// }
		return this.initEvents();
	}

	initEvents() {
		// show/hide guides with CMD+;
		document.addEventListener('keydown', e => {
			this.$cont = document.querySelector('.js-guid');
			if ((e.metaKey || e.ctrlKey) && 186 === e.keyCode) {
				this.toggle();
			}
		});
	}

	toggle() {
		// console.info('Guid.toggle');

		if (this.$cont.classList.contains(this.class)) {
			return this.hide();
		}
		return this.show();
	}

	hide() {
		document.body.style.setProperty('position', 'relative');
		return this.$cont.classList.remove(this.class);
	}

	show() {
		document.body.style.removeProperty('position');
		return this.$cont.classList.add(this.class);
	}

	static render(columns) {
		const div = document.createElement('div');
		const column = index => `
			<div class="col-1 text-center h-full">
				<div class="Guid__column text-center">${index}</div>
			</div>
		`;
		let inner = '';

		div.className = 'Guid js-guid d-none';

		for (let i = 1; i <= columns; i += 1) {
			inner += column(i);
		}
		div.innerHTML = `<div class="h-full"><div class="row h-full">${inner}</div></div>`;
		return div;
	}
}
