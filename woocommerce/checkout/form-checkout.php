<?php
/**
 * Form checkout
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 3.5.0
 */

use Timber\{ Timber };

$filename = 'woocommerce/checkout/form-checkout.html.twig';

$data             = array();
$data['checkout'] = (object) $checkout;

Timber::render( $filename, $data );
