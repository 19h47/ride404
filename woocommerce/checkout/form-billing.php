<?php
/**
 * Checkout billing information form
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$context = array();

$context['checkout'] = $checkout;
$context['cart']     = WC()->cart;

$context['ship_to_billing_address_only'] = (bool) wc_ship_to_billing_address_only();

Timber::render( 'woocommerce/checkout/form-billing.html.twig', $context );
