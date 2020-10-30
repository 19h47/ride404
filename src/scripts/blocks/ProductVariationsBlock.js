import { AbstractBlock } from 'starting-blocks';
import RadioGroup from '@19h47/radiogroup';
import $ from 'jquery';

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
		this.$select = this.rootElement.querySelector('select');

		console.log(this.$select.options);

		this.initPlugins();
	}

	initEvents() {
		super.initEvents();

		this.radiogroup.radios.forEach(radio => {
			radio.on('Radio.activate', ({ value }) => {
				[...this.$select.options].forEach(option => {
					if (value === option.value) {
						option.selected = true;

						$(radio.$input.form).trigger('woocommerce_variation_select_change');
						$(radio.$input.form).trigger('check_variations');
					} else {
						option.selected = false;
					}
				});
			});
		});

		if (1 < this.$select.length && this.$select.selectedIndex) {
			[...this.$select.options].forEach(({ selected, value }) => {
				this.radiogroup.radios.forEach(radio => {
					if (radio.$input.value === value && selected) {
						this.radiogroup.deactivateAll();
						radio.activate();
					}
				});
			});
		}

		$(this.radiogroup.radios[0].$input.form).trigger('woocommerce_variation_select_change');
		$(this.radiogroup.radios[0].$input.form).trigger('check_variations');
	}

	initPlugins() {
		this.radiogroup = new RadioGroup(this.$radiogroup);

		this.radiogroup.init();
	}
}
