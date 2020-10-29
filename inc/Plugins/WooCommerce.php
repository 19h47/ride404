<?php // phpcs:ignore
/**
 * WooCommerce
 *
 * @package Rider404
 * @subpackage Rider404/Plugins/WooCommerce
 */

namespace Rider404\Plugins;

/**
 * WordPress
 */
class WooCommerce {
	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() {
		add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'add_to_cart_fragments' ), 10, 1 );
	}


	/**
	 * Add to cart fragments
	 *
	 * @param array $fragments Array of fragments.
	 *
	 * @return array $fragments
	 */
	public function add_to_cart_fragments( array $fragments ) : array {
		$fragments['span.js-cart-contents-count'] = '<span class="js-cart-contents-count">(' . WC()->cart->get_cart_contents_count() . ')</span>';

		return $fragments;
	}
}

