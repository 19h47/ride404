<?php // phpcs:ignore
/**
 * WooCommerce
 *
 * @package Rider404
 * @subpackage Rider404/Plugins/WooCommerce
 */

namespace Rider404\Plugins;

use Timber\{ Timber };

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
		add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );
		add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'add_to_cart_fragments' ), 10, 1 );

		// Before main content.
		remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20 );

		// Single product summary.
		remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
		remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );

		// Single variation.
		remove_action( 'woocommerce_single_variation', 'woocommerce_single_variation', 10 );
		remove_action( 'woocommerce_single_variation', 'woocommerce_single_variation_add_to_cart_button', 20 );

		add_action( 'woocommerce_single_variation', 'woocommerce_single_variation_add_to_cart_button', 10 );
		add_action( 'woocommerce_single_variation', array( $this, 'single_variation' ), 20 );

		// Before single product summary.
		remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );
	}


	/**
	 * Add to cart fragments
	 *
	 * @param array $fragments Array of fragments.
	 *
	 * @return array $fragments
	 */
	public function add_to_cart_fragments( array $fragments ) : array {
		$fragments['span.js-cart-contents-count'] = Timber::compile(
			'partials/cart-contents-count.html.twig',
			array(
				'count' => WC()->cart->get_cart_contents_count(),
			),
		);

		return $fragments;
	}

	/**
	 * Output placeholders for the single variation
	 * 
	 * @return string
	 */
	public function single_variation() : string {
		return Timber::render( 'partials/variation.html.twig' );
	}
}

