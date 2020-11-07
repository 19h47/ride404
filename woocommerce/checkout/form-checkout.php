<?php
/**
 * Form checkout
 *
 * @package Rider404
 */

use Timber\{ Timber };

$context = Timber::context();

$context['checkout'] = (object) $checkout;

Timber::render( 'woocommerce/checkout/form-checkout.html.twig', $context );
