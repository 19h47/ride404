import { AbstractBlock } from 'starting-blocks';
import RadioGroup from '@19h47/radiogroup';
import $ from 'jquery'; // eslint-disable-line

/**
 *
 * @constructor
 * @param {object} container
 */
export default class ProductVariationsBlock extends AbstractBlock {
	constructor(container) {
		// console.info('ProductVariationsBlock.constructor');

		super(container, 'ProductVariationsBlock');
	}

	init() {
		super.init();

		this.radiogroup = null;
		this.$radiogroup = this.rootElement.querySelector('[role="radiogroup"');
		this.selects = [...document.querySelectorAll('.variations select')];
		this.$select = this.rootElement.querySelector('select');

		this.initPlugins();
	}

	initEvents() {
		super.initEvents();

		this.radiogroup.radios.forEach(radio => {
			radio.on('Radio.activate', ({ value }) => {
				this.selects.forEach($select => {
					[...$select.options].forEach(option => {
						if (value === option.value) {
							$($select).val(value).trigger('change');
						}
					});
				});
			});
		});

		[...this.$select.options].forEach(({ selected, value }) => {
			this.radiogroup.radios.forEach(radio => {
				if (radio.$input.value === value && selected) {
					this.radiogroup.deactivateAll();
					radio.activate();
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

	initPlugins() {
		this.radiogroup = new RadioGroup(this.$radiogroup);

		this.radiogroup.init();
	}
}