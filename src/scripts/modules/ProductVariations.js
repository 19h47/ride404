import { module as M } from 'modujs';
import RadioGroup from '@19h47/radiogroup';
import $ from 'jquery'; // eslint-disable-line

/**
 *
 * @constructor
 * @param {object} container
 */
class ProductVariations extends M {
	init() {
		super.init();

		this.radiogroup = null;
		this.selects = [...document.querySelectorAll('.variations select')];
		this.$select = this.el.querySelector('select');

		this.initPlugins();
		this.initEvents();
	}

	initPlugins() {
		this.radiogroup = new RadioGroup(this.$('radiogroup')[0]);

		this.radiogroup.init();
	}

	initEvents() {
		this.radiogroup.radios.forEach(radio => {
			radio.on('Radio.activate', ({ value }) => {
				this.selects.forEach($select => {
					[...$select.options].forEach(option => {
						if (value === option.value) {
							$($select).val(value).trigger('change');
							this.call('update', false, 'Scroll', 'main');
						}
					});
				});
			});
		});

		[...this.$select.options].forEach(({ selected, value }) => {
			this.radiogroup.radios.forEach(radio => {
				if (radio.$input.value === value && selected) {
					this.radiogroup.deactivateAll();
					radio.activate(false);
				}
			});
		});

		$(this.$select).on('change', ({ target: { value } }) => {
			this.radiogroup.radios.forEach(radio => {
				if (radio.$input.value === value) {
					this.radiogroup.deactivateAll();
					radio.activate();
				}
			});
		});

		$(this.radiogroup.radios[0].$input.form).trigger('check_variations');
	}
}

export default ProductVariations;
