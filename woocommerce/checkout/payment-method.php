<?php
/**
 * Output a single payment method
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 3.5.0
 */

use Timber\{ Timber };

$context            = array();
$context['gateway'] = $gateway;

Timber::render( 'woocommerce/checkout/payment-method.html.twig', $context );
