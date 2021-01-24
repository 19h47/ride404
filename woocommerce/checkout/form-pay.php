<?php
/**
 * Pay for order form
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 3.4.0
 */

use Timber\{ Timber };

$filename = 'woocommerce/checkout/form-pay.html.twig';

$data                       = array();
$data['order']              = $order;
$data['nonce_field_pay']    = wp_nonce_field( 'woocommerce-pay', 'woocommerce-pay-nonce', true, false );
$data['available_gateways'] = $available_gateways;
$data['order_button_text']  = $order_button_text;

Timber::render( $filename, $data );
