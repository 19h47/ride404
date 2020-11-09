<?php // phpcs:ignore
/**
 * Template functions
 *
 * @package Rider404
 * @subpackage Rider404/Plugins/WooCommerce/TemplateFunctions
 */

namespace Rider404\Plugins\WooCommerce;

use Timber\{ Timber };

/**
 * WordPress
 */
class TemplateFunctions {
	/**
	 * Output placeholders for the single variation
	 *
	 * @see https://github.com/woocommerce/woocommerce/blob/master/includes/wc-template-functions.php#L2963
	 * @access static
	 * @return string
	 */
	public static function variation() : string {
		return Timber::render( 'partials/variation.html.twig' );
	}


	/**
	 * Insert the opening anchor tag for products in the loop.
	 *
	 * @access static
	 * @return string
	 */
	public static function loop_product_link_open() : string {
		global $product;

		return Timber::render( 'woocommerce/loop/loop-product-link-open.html.twig', array( 'link' => $product->get_permalink() ) );
	}



	/**
	 * Loop product thumbnail
	 *
	 * @access static
	 * @return string
	 */
	public static function loop_product_thumbnail() : string {
		global $product;

		return Timber::render(
			'woocommerce/loop/loop-product-thumbnail.html.twig',
			array(
				'product' => $product,
			)
		);
	}


	/**
	 * Loop featured
	 *
	 * @access static
	 * @return string
	 */
	public static function loop_featured() : string {
		global $product;

		return Timber::render(
			'woocommerce/loop/loop-featured.html.twig',
			array(
				'product' => $product,
			)
		);
	}


	/**
	 * Show the product title in the product loop.
	 *
	 * @access static
	 * @return string
	 */
	public static function loop_product_title() : string {
		global $product;

		return Timber::render( 'woocommerce/loop/loop-product-title.html.twig', array( 'title' => $product->get_title() ) );
	}


	/**
	 * Get the product price for the loop.
	 *
	 * @access static
	 * @return string
	 */
	public static function loop_price() : string {
		global $product;

		return Timber::render(
			'woocommerce/loop/loop-price.html.twig',
			array(
				'price_html' => $product->get_price_html(),
				'product'    => $product,
			)
		);
	}


	/**
	 * Single quick add to cart
	 *
	 * @access static
	 * @return void
	 */
	public static function single_quick_add_to_cart() : void {
		global $product;

		do_action( 'rider404_quick_' . $product->get_type() . '_add_to_cart' );
	}



	/**
	 * Template single variation
	 *
	 * @access static
	 * @return string
	 */
	public static function single_variation() : string {
		return Timber::render( 'woocommerce/single-product/add-to-cart/single-variation.html.twig' );
	}


	/**
	 * Variable quick add to cart
	 *
	 * @access static
	 * @return string
	 */
	public static function quick_variable_add_to_cart() : string {
		global $product;

		$context = Timber::context();

		$get_variations = count( $product->get_children() ) <= apply_filters( 'woocommerce_ajax_variation_threshold', 30, $product );

		$context['product'] = $product;

		$context['available_variations'] = $get_variations ? $product->get_available_variations() : false;
		$context['attributes']           = $product->get_variation_attributes();
		$context['selected_attributes']  = $product->get_default_attributes();

		$variations_json            = wp_json_encode( $context['available_variations'] );
		$context['variations_attr'] = wc_esc_json( $variations_json );

		$context['form_action'] = apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() );

		return Timber::render( 'woocommerce/single-product/add-to-cart/quick-variable.html.twig', $context );
	}
}
