<?php
/**
 * Pay for order form
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$context          = array();
$context['order'] = $order;

$context['nonce_field_pay']    = wp_nonce_field( 'woocommerce-pay', 'woocommerce-pay-nonce', true, false );
$context['available_gateways'] = $available_gateways;
$context['order_button_text']  = $order_button_text;

Timber::render( 'woocommerce/checkout/form-pay.html.twig', $context );
