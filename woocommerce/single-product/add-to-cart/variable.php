<?php
/**
 * Variable product add to cart
 *
 * @param $available_variations
 * @param $attributes
 * @param $selected_attributes
 *
 * @see https://github.com/woocommerce/woocommerce/blob/master/includes/wc-template-functions.php#L1655
 * @see https://github.com/woocommerce/woocommerce/blob/master/templates/single-product/add-to-cart/variable.php
 * @package Rider404/Templates
 */

global $product;

use TImber\{ Timber };

$context = Timber::context();

$variations_json            = wp_json_encode( $available_variations );
$context['variations_attr'] = wc_esc_json( $variations_json );

$context['product']              = $product;
$context['attributes']           = $attributes;
$context['available_variations'] = $available_variations;
$context['form_action']          = apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() );

Timber::render( 'woocommerce/single-product/add-to-cart/variable.html.twig', $context );
