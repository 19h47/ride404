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
		add_action( 'wp', array( $this, 'enqueue_styles' ) );
		add_action( 'after_setup_theme', array( $this, 'hooks' ) );

		add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'add_to_cart_fragments' ), 10, 1 );
		add_filter( 'woocommerce_before_widget_product_list', array( $this, 'before_widget_product_list' ) );
	}


	/**
	 * Customize WooCommerce.
	 *
	 * Add your hooks to customize WooCommerce here.
	 *
	 * Everything here is hooked to `after_setup_theme`, because child theme functionality runs
	 * before parent theme functionality. By hooking it, we make sure it runs after all hooks in
	 * the parent theme were registered.
	 *
	 * @see plugins/woocommerce/includes/wc-template-hooks.php for a list of available actions.
	 */
	public function hooks() : void {
		// Before main content.
		remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20 );

		// Single product summary.
		remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
		remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
		remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );

		// Single variation.
		remove_action( 'woocommerce_single_variation', 'woocommerce_single_variation', 10 );
		remove_action( 'woocommerce_single_variation', 'woocommerce_single_variation_add_to_cart_button', 20 );

		add_action( 'woocommerce_single_variation', 'woocommerce_single_variation_add_to_cart_button', 10 );
		add_action( 'woocommerce_single_variation', array( $this, 'single_variation' ), 20 );

		// Before single product summary.
		remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );

		// Shop loop item title.
		remove_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title', 10 );
		add_action( 'woocommerce_shop_loop_item_title', array( $this, 'template_loop_product_title' ), 10 );

		// After single product summary.
		remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
		remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15 );
		remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );

		// Before shop loop.
		remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
		remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );

		// Before shop loop item.
		remove_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 10 );
		add_action( 'woocommerce_before_shop_loop_item', array( $this, 'template_loop_product_link_open' ), 10 );

		// After shop loop item.
		remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );

		// Before shop loop item title.
		remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10 );
		add_action( 'woocommerce_before_shop_loop_item_title', array( $this, 'template_loop_product_thumbnail' ), 15 );
		add_action( 'woocommerce_before_shop_loop_item_title', array( $this, 'template_loop_featured' ), 15 );

		// After shop loop item title.
		remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );
		add_action( 'woocommerce_after_shop_loop_item_title', array( $this, 'template_loop_price' ), 10 );
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
	 * Output placeholders for the single variation
	 *
	 * @return string
	 */
	public function single_variation() : string {
		return Timber::render( 'partials/variation.html.twig' );
	}


	/**
	 * Show the product title in the product loop.
	 *
	 * @return string
	 */
	public function template_loop_product_title() : string {
		global $product;

		return Timber::render( 'woocommerce/loop/loop-product-title.html.twig', array( 'title' => $product->get_title() ) );
	}

	/**
	 * Insert the opening anchor tag for products in the loop.
	 *
	 * @return string
	 */
	public function template_loop_product_link_open() : string {
		global $product;

		return Timber::render( 'woocommerce/loop/loop-product-link-open.html.twig', array( 'link' => $product->get_permalink() ) );
	}


	/**
	 * Get the product price for the loop.
	 *
	 * @return string
	 */
	public function template_loop_price() : string {
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
	 * Loop product thumbnail
	 *
	 * @return string
	 */
	public function template_loop_product_thumbnail() : string {
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
	 * @return string
	 */
	public function template_loop_featured() : string {
		global $product;

		return Timber::render(
			'woocommerce/loop/loop-featured.html.twig',
			array(
				'product' => $product,
			)
		);
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

