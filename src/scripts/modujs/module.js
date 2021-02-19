export default class Module {
	constructor(options) {
		this.mAttr = `data-${options.dataName}`;
		this.mCaptureEvents = ['mouseenter', 'mouseleave'];
		this.el = options.el;
	}

	mInit(modules) {
		this.modules = modules;
		this.mCheckEventTarget = this.mCheckEventTarget.bind(this);

		if (this.events) {
			Object.keys(this.events).forEach(event => this.mAddEvent(event));
		}
	}

	mUpdate(modules) {
		this.modules = modules;
	}

	mDestroy() {
		if (this.events) {
			Object.keys(this.events).forEach(event => this.mRemoveEvent(event));
		}
	}

	mAddEvent(event) {
		const capture = this.mCaptureEvents.includes(event);

		this.el.addEventListener(event, this.mCheckEventTarget, capture);
	}

	mRemoveEvent(event) {
		const capture = this.mCaptureEvents.includes(event);

		this.el.removeEventListener(event, this.mCheckEventTarget, capture);
	}

	mCheckEventTarget(e) {
		const event = this.events[e.type];

		if ('string' === typeof event) {
			this[event](e);
		} else {
			const data = `[${this.mAttr}]`;
			let { target } = e;

			if (this.mCaptureEvents.includes(e.type)) {
				if (target.matches(data)) {
					this.mCallEventMethod(e, event, target);
				}
			} else {
				while (target && target !== document) {
					if (target.matches(data)) {
						if ('undefined' !== this.mCallEventMethod(e, event, target)) {
							break;
						}
					}
					target = target.parentNode;
				}
			}
		}
	}

	mCallEventMethod(e, event, target) {
		const name = target.getAttribute(this.mAttr);

		if (event.hasOwnProperty(name)) { // eslint-disable-line no-prototype-builtins
			const method = event[name];

			if (!e.hasOwnProperty('currentTarget')) { // eslint-disable-line no-prototype-builtins
				Object.defineProperty(e, 'currentTarget', { value: target });
			}
			if (!e.hasOwnProperty('curTarget')) { // eslint-disable-line no-prototype-builtins
				Object.defineProperty(e, 'curTarget', { value: target }); // For IE 11
			}

			this[method](e);
		}
	}

	$(query, context) {
		const classIndex = query.indexOf('.');
		const idIndex = query.indexOf('#');
		const attrIndex = query.indexOf('[');
		const indexes = [classIndex, idIndex, attrIndex].filter(index => -1 !== index);

		let index = false;
		let name = query;
		let more = '';
		let parent = this.el;

		if (indexes.length) {
			index = Math.min(...indexes);
			name = query.slice(0, index);
			more = query.slice(index);
		}

		if ('object' === typeof context) {
			parent = context;
		}

		return parent.querySelectorAll(`[${this.mAttr}=${name}]${more}`);
	}

	parent(query, context) { // eslint-disable-line consistent-return
		const data = `[${this.mAttr}=${query}]`;
		let parent = context.parentNode;

		while (parent && parent !== document) {
			if (parent.matches(data)) {
				return parent;
			}

			parent = parent.parentNode;
		}
	}

	getData(name, context) {
		const target = context || this.el;
		return target.getAttribute(`${this.mAttr}-${name}`);
	}

	setData(name, value, context) {
		const target = context || this.el;
		return target.setAttribute(`${this.mAttr}-${name}`, value);
	}

	call(func, args, mod, id) {
		if (args && !mod) {
			mod = args; // eslint-disable-line no-param-reassign
			args = false; // eslint-disable-line no-param-reassign
		}

		if (this.modules[mod]) {
			if (id) {
				if (this.modules[mod][id]) {
					this.modules[mod][id][func](args);
				}
			} else {
				// eslint-disable-next-line no-shadow
				Object.keys(this.modules[mod]).forEach(id => {
					this.modules[mod][id][func](args);
				});
			}
		}
	}

	on(e, mod, func, id) {
		if (this.modules[mod]) {
			if (id) {
				this.modules[mod][id].el.addEventListener(e, o => func(o));
			} else {
				Object.keys(this.modules[mod]).forEach(i => {
					this.modules[mod][i].el.addEventListener(e, o => func(o));
				});
			}
		}
	}

	// eslint-disable-next-line class-methods-use-this
	init() {
	}

	// eslint-disable-next-line class-methods-use-this
	destroy() {
	}
}
