<?php
/**
 * Simple product add to cart
 *
 * @package WordPress
 * @subpackage Rider404
 */

global $product;

use TImber\{ Timber };

$context = Timber::context();

$context['form_action'] = apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() );

$context['product'] = $product;

$context['stock_html']     = wc_get_stock_html( $product );
$context['quantity_input'] = woocommerce_quantity_input(
	array(
		'min_value'   => apply_filters( 'woocommerce_quantity_input_min', $product->get_min_purchase_quantity(), $product ),
		'max_value'   => apply_filters( 'woocommerce_quantity_input_max', $product->get_max_purchase_quantity(), $product ),
		'input_value' => isset( $_POST['quantity'] ) ? wc_stock_amount( wp_unslash( $_POST['quantity'] ) ) : $product->get_min_purchase_quantity(),
	),
	$product,
	false
);

Timber::render( 'woocommerce/single-product/add-to-cart/simple.html.twig', $context );
