<?php
/**
 * Cart Page
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 3.8.0
 */

use Timber\{ Timber };

$filename = 'woocommerce/cart/cart.html.twig';

$data                    = array();
$data['cart']            = WC()->cart;
$data['nonce_field']     = wp_nonce_field( 'woocommerce-cart', 'woocommerce-cart-nonce', true, false );
$data['coupons_enabled'] = wc_coupons_enabled();
$data['cart_url']        = wc_get_cart_url();

Timber::render( $filename, $data );
