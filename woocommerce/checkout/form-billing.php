<?php
/**
 * Checkout billing information form
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 3.6.0
 */

use Timber\{ Timber };

$filename = 'woocommerce/checkout/form-billing.html.twig';

$data                                 = array();
$data['checkout']                     = $checkout;
$data['cart']                         = WC()->cart;
$data['ship_to_billing_address_only'] = (bool) wc_ship_to_billing_address_only();

Timber::render( $filename, $data );
