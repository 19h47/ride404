<?php
/**
 * Form shipping
 *
 * @package Rider404
 * @global WC_Checkout $checkout
 */

use Timber\{ Timber };

$context = array();

$context['checkout'] = $checkout;
$context['cart']     = WC()->cart;

$context['ship_to_destination']   = get_option( 'woocommerce_ship_to_destination' );
$context['enable_order_comments'] = get_option( 'woocommerce_enable_order_comments', 'yes' );

$context['ship_to_billing_address_only'] = wc_ship_to_billing_address_only();

Timber::render( 'woocommerce/checkout/form-shipping.html.twig', $context );
