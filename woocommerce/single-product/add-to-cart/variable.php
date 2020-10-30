<?php
/**
 * Variable product add to cart
 *
 * @package Rider404/Templates
 */

global $product;

use TImber\{ Timber };

$context = Timber::get_context();

$variations_json            = wp_json_encode( $available_variations );
$context['variations_attr'] = wc_esc_json( $variations_json );

$context['product']     = $product;
$context['attributes']  = $attributes;
$context['form_action'] = apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() );


Timber::render( 'woocommerce/single-product/add-to-cart/variable.html.twig', $context );

