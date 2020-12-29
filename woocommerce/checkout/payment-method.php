<?php
/**
 * Output a single payment method
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$context            = array();
$context['gateway'] = $gateway;

Timber::render( 'woocommerce/checkout/payment-method.html.twig', $context );
