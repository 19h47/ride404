<?php
/**
 * Cart Page
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 3.8.0
 */

use Timber\{ Timber };

$context = array();

$context['cart'] = WC()->cart;

$context['nonce_field']     = wp_nonce_field( 'woocommerce-cart', 'woocommerce-cart-nonce', true, false );
$context['coupons_enabled'] = wc_coupons_enabled();
$context['cart_url']        = wc_get_cart_url();

Timber::render( 'woocommerce/cart/cart.html.twig', $context );
