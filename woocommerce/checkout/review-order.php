<?php
/**
 * Review order table
 *
 * @param object $checkout Checkout.
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 3.8.0
 */

use Timber\{ Timber };

$context = Timber::context();

$context['checkout'] = $checkout;

$context['cart']      = WC()->cart;
$context['countries'] = WC()->countries;

$context['tax_enabled']       = wc_tax_enabled();
$context['tax_total_display'] = get_option( 'woocommerce_tax_total_display' );

Timber::render( 'woocommerce/checkout/review-order.html.twig', $context );
