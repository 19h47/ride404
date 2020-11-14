<?php
/**
 * Output a single payment method
 *
 * @package Rider404
 */

use Timber\{ Timber };

$context = Timber::context();

$context['gateway'] = $gateway;

Timber::render( 'woocommerce/checkout/payment-method.html.twig', $context );
