import { AbstractBlock } from 'starting-blocks';
import RadioGroup from '@19h47/radiogroup';
import $ from 'jquery'; // eslint-disable-line

import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class ProductVariationsBlock extends AbstractBlock {
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
							Scroll.update();
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

	initPlugins() {
		this.radiogroup = new RadioGroup(this.$radiogroup);

		this.radiogroup.init();
	}
}
