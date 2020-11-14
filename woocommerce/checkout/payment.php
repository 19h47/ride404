<?php
/**
 * Checkout Payment Section
 *
 * @package Rider404
 * @version 3.5.3
 */

use Timber\{ Timber };

$context = Timber::get_context();

$context['cart']     = WC()->cart;
$context['customer'] = WC()->customer;

// @see https://github.com/woocommerce/woocommerce/blob/master/includes/wc-template-functions.php#L2240
$context['checkout']           = (object) $checkout;
$context['available_gateways'] = (array) $available_gateways;
$context['order_button_text']  = (string) $order_button_text;

$context['nonce_field'] = wp_nonce_field( 'woocommerce-process_checkout', 'woocommerce-process-checkout-nonce' );

Timber::render( 'woocommerce/checkout/payment.html.twig', $context );
