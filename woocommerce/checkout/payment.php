<?php
/**
 * Checkout payment section
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 7.0.1
 */

use Timber\{ Timber };

$data = Timber::context();

$data['cart']     = WC()->cart;
$data['customer'] = WC()->customer;

// @see https://github.com/woocommerce/woocommerce/blob/master/includes/wc-template-functions.php#L2240
$data['checkout']           = (object) $checkout;
$data['available_gateways'] = (array) $available_gateways;
$data['order_button_text']  = (string) $order_button_text;

Timber::render( 'woocommerce/checkout/payment.html.twig', $data );
