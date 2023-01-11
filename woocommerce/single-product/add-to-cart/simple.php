<?php
/**
 * Simple product add to cart
 *
 * @package WordPress
 * @subpackage Rider404
 *
 * @version 7.0.1
 */

global $product;

use TImber\{ Timber };

$filename = 'woocommerce/single-product/add-to-cart/simple.html.twig';

$data                   = Timber::context();
$data['form_action']    = apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() );
$data['product']        = $product;
$data['stock_html']     = wc_get_stock_html( $product );
$data['quantity_input'] = woocommerce_quantity_input(
	array(
		'min_value'   => apply_filters( 'woocommerce_quantity_input_min', $product->get_min_purchase_quantity(), $product ),
		'max_value'   => apply_filters( 'woocommerce_quantity_input_max', $product->get_max_purchase_quantity(), $product ),
		'input_value' => isset( $_POST['quantity'] ) ? wc_stock_amount( wp_unslash( $_POST['quantity'] ) ) : $product->get_min_purchase_quantity(),
	),
	$product,
	false
);

Timber::render( $filename, $data );
