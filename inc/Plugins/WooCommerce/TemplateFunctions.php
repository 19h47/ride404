<?php // phpcs:ignore
/**
 * Template functions
 *
 * @link https://rider404.com/
 * @since 0.0.0
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @package WordPress
 * @subpackage Rider404/Plugins/WooCommerce
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
	public static function variation() {
		return Timber::render( 'partials/variation.html.twig' );
	}


	/**
	 * Insert the opening anchor tag for products in the loop.
	 *
	 * @access static
	 * @return string
	 */
	public static function loop_product_link_open() {
		global $product;

		return Timber::render( 'woocommerce/loop/loop-product-link-open.html.twig', array( 'link' => $product->get_permalink() ) );
	}



	/**
	 * Loop product thumbnail
	 *
	 * @access static
	 * @return string
	 */
	public static function loop_product_thumbnail() {
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
	public static function loop_featured() {
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
	public static function loop_product_title() {
		global $product;

		return Timber::render( 'woocommerce/loop/loop-product-title.html.twig', array( 'title' => $product->get_title() ) );
	}


	/**
	 * Get the product price for the loop.
	 *
	 * @access static
	 * @return string
	 */
	public static function loop_price() {
		global $product;

		return Timber::render(
			'woocommerce/loop/price.html.twig',
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
	public static function single_variation() {
		return Timber::render( 'woocommerce/single-product/add-to-cart/single-variation.html.twig' );
	}


	/**
	 * Variable quick add to cart
	 *
	 * @access static
	 * @return string
	 */
	public static function quick_variable_add_to_cart() {
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


	/**
	 * Checkout privacy policy text
	 *
	 * @access static
	 * @return string
	 */
	public static function checkout_privacy_policy_text() {
		return Timber::render( 'partials/privacy-policy-text.html.twig' );
	}


	/**
	 * Form fields args
	 *
	 * @param array  $args Arguments.
	 * @param string $key key.
	 * @param string $value (default: null).
	 *
	 * @access static
	 * @return array $args
	 */
	public static function form_field_args( array $args, string $key, $value ) : array {
		switch ( $args['type'] ) {
			case 'textarea':
				$args['input_class'][] = 'Textarea';
				break;
			case 'text':
			case 'password':
			case 'datetime':
			case 'datetime-local':
			case 'date':
			case 'month':
			case 'time':
			case 'week':
			case 'number':
			case 'email':
			case 'url':
			case 'tel':
				$args['input_class'][] = 'Input';
				break;
		}

		$args['class'][] = 'Form-row';

		return $args;
	}


	/**
	 * Show notice if cart is empty.
	 *
	 * @return string
	 * @access static
	 */
	public static function empty_cart_message() {
		return Timber::render( 'partials/empty-cart-message.html.twig' );
	}
}
