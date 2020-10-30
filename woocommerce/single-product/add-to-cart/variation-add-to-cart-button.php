<?php
/**
 * Single variation cart button
 *
 * @package UNNI/Templates
 * @version 3.4.0
 */

global $product;

use TImber\{ Timber };

$context = Timber::get_context();

$context['quantity_input'] = woocommerce_quantity_input(
    array(
        'min_value'   => apply_filters( 'woocommerce_quantity_input_min', $product->get_min_purchase_quantity(), $product ),
		'max_value'   => apply_filters( 'woocommerce_quantity_input_max', $product->get_max_purchase_quantity(), $product ),
		'input_value' => isset( $_POST['quantity'] ) ? wc_stock_amount( wp_unslash( $_POST['quantity'] ) ) : $product->get_min_purchase_quantity(),
	),
	$product,
	false, 
);

$context['product'] = $product;

Timber::render( 'woocommerce/single-product/add-to-cart/variation-add-to-cart-button.html.twig', $context );