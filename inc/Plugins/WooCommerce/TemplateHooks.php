<?php // phpcs:ignore
/**
 * WooCommerce Template Hooks
 *
 * @package WordPress
 * @subpackage Rider404/Plugins/WooCommerce
 */

namespace Rider404\Plugins\WooCommerce;

use Timber\{ Timber };
use DOMDocument;

/**
 * Template hooks
 *
 * Add your hooks to customize WooCommerce here.
 *
 * @see plugins/woocommerce/includes/wc-template-hooks.php for a list of available actions.
 */
class TemplateHooks {

	/**
	 * Runs initialization tasks.
	 *
	 * Everything here is hooked to `after_setup_theme`, because child theme functionality runs
	 * before parent theme functionality. By hooking it, we make sure it runs after all hooks in
	 * the parent theme were registered.
	 *
	 * @return void
	 */
	public function run() {
		add_action( 'after_setup_theme', array( $this, 'add_action' ) );
		add_action( 'after_setup_theme', array( $this, 'remove_action' ) );
	}


	/**
	 * Add action
	 *
	 * @return void
	 */
	public function add_action() : void {
		add_filter( 'woocommerce_gateway_icon', array( $this, 'paypal_icon' ), 10, 2 );
		add_filter( 'woocommerce_gateway_icon', array( $this, 'stripe_icon' ), 10, 2 );

		// Single variation.
		add_action( 'woocommerce_single_variation', 'woocommerce_single_variation_add_to_cart_button', 10 );
		add_action( 'woocommerce_single_variation', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'variation' ), 20 );

		// Before shop loop item.
		add_action( 'woocommerce_before_shop_loop_item', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'loop_product_link_start' ), 10 );

		// Before shop loop item title.
		add_action( 'woocommerce_before_shop_loop_item_title', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'loop_product_thumbnail' ), 15 );
		add_action( 'woocommerce_before_shop_loop_item_title', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'featured' ), 15 );

		add_action( 'woocommerce_single_product_image', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'featured' ), 15 );

		// Shop loop item title.
		add_action( 'woocommerce_shop_loop_item_title', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'loop_product_title' ), 10 );

		// After shop loop item title.
		add_action( 'woocommerce_after_shop_loop_item_title', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'loop_price' ), 10 );

		// Before single product.
		add_action( 'woocommerce_before_single_product', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'single_quick_add_to_cart' ), 30 );

		// Single product hero.
		add_action( 'rider404_single_product_hero', 'woocommerce_template_single_title', 10 );

		// Single quick variation.
		add_action( 'rider404_single_quick_variation', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'single_variation' ), 10 );
		add_action( 'rider404_single_quick_variation', 'woocommerce_single_variation_add_to_cart_button', 20 );

		// Quick variable add to cart.
		add_action( 'rider404_quick_variable_add_to_cart', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'quick_variable_add_to_cart' ), 10 );

		add_action( 'woocommerce_checkout_terms_and_conditions', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'checkout_privacy_policy_text' ), 20 );

		add_filter( 'woocommerce_form_field_args', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'form_field_args' ), 10, 3 );

		// Cart is empty.
		add_action( 'woocommerce_cart_is_empty', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'empty_cart_message' ), 10 );
		add_action( 'woocommerce_cart_is_empty', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'output_all_notices' ), 5 );

		add_action( 'woocommerce_shortcode_before_product_cat_loop', array( 'Rider404\Plugins\WooCommerce\TemplateFunctions', 'output_all_notices' ), 10 );
	}


	/**
	 * Remove action
	 *
	 * @return void
	 */
	public function remove_action() : void {
		// Before main content.
		remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20 );

		// Single product summary.
		remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
		remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
		remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );

		// Single variation.
		remove_action( 'woocommerce_single_variation', 'woocommerce_single_variation', 10 );
		remove_action( 'woocommerce_single_variation', 'woocommerce_single_variation_add_to_cart_button', 20 );

		// Before single product summary.
		remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );

		// Shop loop item title.
		remove_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title', 10 );

		// After single product summary.
		remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
		remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15 );
		remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );

		// Before shop loop.
		remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
		remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );

		// Before shop loop item.
		remove_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 10 );

		// After shop loop item.
		remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );

		// Before shop loop item title.
		remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10 );

		// After shop loop item title.
		remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );

		// Checkout terms and conditions.
		remove_action( 'woocommerce_checkout_terms_and_conditions', 'wc_checkout_privacy_policy_text', 20 );

		// Cart is empty.
		remove_action( 'woocommerce_cart_is_empty', 'wc_empty_cart_message', 10 );
		remove_action( 'woocommerce_cart_is_empty', 'woocommerce_output_all_notices', 5 );

		remove_action( 'woocommerce_shortcode_before_product_cat_loop', 'woocommerce_output_all_notices', 10 );
	}


	/**
	 * PayPal icon
	 *
	 * @param string $icon Icon HTML.
	 * @param string $id ID.
	 *
	 * @see https://github.com/woocommerce/woocommerce/blob/master/includes/gateways/paypal/class-wc-gateway-paypal.php#L164
	 * @return string $icon
	 */
	public function paypal_icon( string $icon, string $id ) : string {
		if ( 'paypal' !== $id ) {
			return $icon;
		}

		$dom = new DOMDocument();
		$dom->loadHTML( $icon );

		foreach ( $dom->getElementsByTagName( 'img' ) as $img ) {
			$img->setAttribute( 'src', trailingslashit( get_template_directory_uri() ) . get_theme_manifest()['img/svg/paypal.svg'] );
		}

		return $dom->saveHTML();
	}


	/**
	 * Stripe icon
	 *
	 * @param string $icon Icon HTML.
	 * @param string $id ID.
	 *
	 * @see https://github.com/woocommerce/woocommerce/blob/master/includes/abstracts/abstract-wc-payment-gateway.php#L322
	 * @return string $icon
	 */
	public function stripe_icon( string $icon, string $id ) : string {
		if ( 'stripe' !== $id ) {
			return $icon;
		}

		$icon = '<img alt="Stripe" src="' . trailingslashit( get_template_directory_uri() ) . get_theme_manifest()['img/svg/stripe.svg'] . '" />' . $icon;

		return $icon;
	}
}
