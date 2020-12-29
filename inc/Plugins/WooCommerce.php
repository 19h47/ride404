<?php // phpcs:ignore
/**
 * WooCommerce
 *
 * @link https://rider404.com/
 * @since 0.0.0
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @package WordPress
 * @subpackage Rider404/Plugins
 */

namespace Rider404\Plugins;

use Timber\{ Timber };

/**
 * WooCommerce
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
class WooCommerce {
	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() {
		add_action( 'wp', array( $this, 'enqueue_styles' ) );

		add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'add_to_cart_fragments' ), 10, 1 );
		add_filter( 'woocommerce_before_widget_product_list', array( $this, 'before_widget_product_list' ) );
	}


	/**
	 * Enqueue styles
	 *
	 * @return void
	 */
	public function enqueue_styles() : void {
		if ( is_product() || is_shop() || is_product_category() ) {
			add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );
		}
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
	 * Before widget product list
	 *
	 * @return string
	 */
	public function before_widget_product_list() {
		return '<ul class="Product-list-widget product_list_widget js-items">';
	}
}
