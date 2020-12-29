<?php
/**
 * Form checkout
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$context             = array();
$context['checkout'] = (object) $checkout;

Timber::render( 'woocommerce/checkout/form-checkout.html.twig', $context );
