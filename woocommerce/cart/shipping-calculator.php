<?php
/**
 * Shipping Calculator
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$context = array();

$context['countries'] = WC()->countries;
$context['customer']  = WC()->customer;

$context['button_text'] = $button_text;

$context['nonce_field'] = wp_nonce_field( 'woocommerce-shipping-calculator', 'woocommerce-shipping-calculator-nonce', true, false );

Timber::render( 'woocommerce/cart/shipping-calculator.html.twig', $context );
