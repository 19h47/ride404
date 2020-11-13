import { AbstractBlock } from 'starting-blocks';
import $ from 'jquery';

import { elements } from 'scripts/config';
import Scroll from 'common/Scroll';

/**
 *
 * @constructor
 * @param {object} container
 */
export default class CheckoutCouponsBlock extends AbstractBlock {
	constructor(container) {
		super(container, 'CheckoutCouponsBlock');

		this.handleClick = this.handleClick.bind(this);
	}

	init() {
		super.init();

		this.$checkoutCoupon = $('.checkout_coupon', this.rootElement);
	}

	initEvents() {
		super.initEvents();

		this.rootElement.addEventListener('click', this.handleClick, false);

		$(elements.body).on('applied_coupon', e => console.log(e));
		$(elements.body).on('removed_coupon', e => console.log(e));
	}

	handleClick({ target }) {
		if (target.matches('.showcoupon')) {
			this.$checkoutCoupon.slideToggle(400, () => this.showCouponForm());
			return false;
		}

		return true;
	}

	/**
	 * @see https://github.com/woocommerce/woocommerce/blob/master/assets/js/frontend/checkout.js#L584
	 */
	showCouponForm() {
		Scroll.update();
		this.$checkoutCoupon.find(':input:eq(0)').focus();
	}
}
