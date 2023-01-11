<?php
/**
 * Shipping Calculator
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 7.0.1
 */

use Timber\{ Timber };

$filename = 'woocommerce/cart/shipping-calculator.html.twig';

$data                = array();
$data['countries']   = WC()->countries;
$data['customer']    = WC()->customer;
$data['button_text'] = $button_text;
$data['nonce_field'] = wp_nonce_field( 'woocommerce-shipping-calculator', 'woocommerce-shipping-calculator-nonce', true, false );

Timber::render( $filename, $data );
