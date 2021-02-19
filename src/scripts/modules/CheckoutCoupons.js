import { module } from 'scripts/modujs';
import $ from 'jquery';

import { elements } from 'scripts/config';

/**
 *
 * @constructor
 * @param {object} container
 */
class CheckoutCoupons extends module {
	constructor(m) {
		super(m);

		this.handleClick = this.handleClick.bind(this);
	}

	init() {
		this.$checkoutCoupon = $('.checkout_coupon', this.el);

		this.initEvents();
	}

	initEvents() {
		this.el.addEventListener('click', this.handleClick, false);

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
		this.call('update', false, 'Scroll', 'main');
		this.$checkoutCoupon.find(':input:eq(0)').trigger('focus');
	}
}

export default CheckoutCoupons;
