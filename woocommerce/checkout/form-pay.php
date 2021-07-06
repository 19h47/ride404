<?php
/**
 * Pay for order form
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 5.2.0
 */

use Timber\{ Timber };

$filename = 'woocommerce/checkout/form-pay.html.twig';

$data                       = array();
$data['order']              = $order;
$data['available_gateways'] = $available_gateways;
$data['order_button_text']  = $order_button_text;

Timber::render( $filename, $data );
