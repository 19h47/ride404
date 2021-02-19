const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index += 1) {
		await callback(array[index], index, array); // eslint-disable-line no-await-in-loop
	}
}

export default class Main {
	constructor() {
		this.app = null;
		this.modules = {};
		this.currentModules = {};
		this.activeModules = {};
		this.newModules = {};
		this.moduleId = 0;
	}

	async init(app, scope) {
		const container = scope || document;
		const elements = container.querySelectorAll('*');

		if (app && !this.app) {
			this.app = app;
		}

		this.activeModules.app = { app: this.app };

		await asyncForEach(elements, async el => {
			await asyncForEach(Array.from(el.attributes), async i => {
				if (i.name.startsWith('data-module')) {
					let moduleExists = false;
					const dataName = i.name.split('-').splice(2);
					const moduleName = this.toUpper(this.toCamel(dataName));

					// if (this.modules[moduleName]) {
					// 	moduleExists = true;
					// } else if (this.modules[this.toUpper(moduleName)]) {
					// 	moduleName = this.toUpper(moduleName);
					// 	moduleExists = true;
					// }

					await import(`../modules/${moduleName}`/* webpackChunkName: "module-", webpackPrefetch: true */).then(module => {
						this.modules[moduleName] = module.default;
						moduleExists = true;
					});

					if (moduleExists) {
						const options = {
							el,
							name: moduleName,
							dataName: dataName.join('-'),
						};

						const module = new this.modules[moduleName](options);
						let id = i.value;

						if (!id) {
							this.moduleId += 1;
							id = `m${this.moduleId}`;
							el.setAttribute(i.name, id);
						}

						this.addActiveModule(moduleName, id, module);

						const moduleId = `${moduleName} - ${id}`;

						if (scope) {
							this.newModules[moduleId] = module;
							// this.addActiveModule(moduleName, moduleId, module);
						} else {
							this.currentModules[moduleId] = module;
							// this.initModule(module);
						}
					}
				}
			});
		});

		Object.entries(this.currentModules).forEach(([id, module]) => {
			if (scope) {
				const split = id.split('-');
				const moduleName = split.shift();
				const moduleId = split.pop();
				this.addActiveModule(moduleName, moduleId, module);
			} else {
				this.initModule(module);
			}
		});
	}

	initModule(module) {
		module.mInit(this.activeModules);
		module.init();
	}

	addActiveModule(name, id, module) {
		if (this.activeModules[name]) {
			Object.assign(this.activeModules[name], { [id]: module });
		} else {
			this.activeModules[name] = { [id]: module };
		}
	}

	update(scope) {
		this.init(this.app, scope);

		Object.entries(this.currentModules).forEach(([id, module]) => { // eslint-disable-line no-unused-vars
			module.mUpdate(this.activeModules);
		});

		Object.entries(this.newModules).forEach(([id, module]) => { // eslint-disable-line no-unused-vars
			this.initModule(module);
		});

		Object.assign(this.currentModules, this.newModules);
	}

	destroy(scope) {
		if (scope) {
			this.destroyScope(scope);
		} else {
			this.destroyModules();
		}
	}

	destroyScope(scope) {
		const elements = scope.querySelectorAll('*');

		elements.forEach(el => {
			Array.from(el.attributes).forEach(i => {
				if (i.name.startsWith('data-module')) {
					const id = i.value;
					const dataName = i.name.split('-').splice(2);
					let moduleName = `${this.toCamel(dataName)} - ${id}`;
					let moduleExists = false;

					if (this.currentModules[moduleName]) {
						moduleExists = true;
					} else if (this.currentModules[this.toUpper(moduleName)]) {
						moduleName = this.toUpper(moduleName);
						moduleExists = true;
					}

					if (moduleExists) {
						this.destroyModule(this.currentModules[moduleName]);

						delete this.currentModules[moduleName];
					}
				}
			});
		});

		this.activeModules = {};
		this.newModules = {};
	}

	destroyModules() {
		Object.entries(this.currentModules).forEach(([id, module]) => { // eslint-disable-line no-unused-vars
			this.destroyModule(module);
		});

		this.currentModules = [];
	}

	destroyModule(module) { // eslint-disable-line class-methods-use-this
		module.mDestroy();
		module.destroy();
	}

	toCamel(arr) {
		return arr.reduce((a, b) => a + this.toUpper(b));
	}

	toUpper(str) {// eslint-disable-line class-methods-use-this
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}

export { default as module } from './module';
