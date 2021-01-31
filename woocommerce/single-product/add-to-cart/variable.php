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
 *
 * @package WordPress
 * @subpackage Rider404
 *
 * @version 3.5.5
 */

global $product;

use TImber\{ Timber };

$filename        = 'woocommerce/single-product/add-to-cart/variable.html.twig';
$variations_json = wp_json_encode( $available_variations );

$data                         = Timber::context();
$data['variations_attr']      = wc_esc_json( $variations_json );
$data['product']              = $product;
$data['attributes']           = $attributes;
$data['available_variations'] = $available_variations;
$data['form_action']          = apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() );

Timber::render( $filename, $data );
