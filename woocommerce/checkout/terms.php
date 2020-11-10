<?php
/**
 * Checkout terms and conditions area.
 *
 * @package Rider404
 */

use Timber\{ Timber, Helper };

$context = Timber::get_context();

$context['wc_terms_and_conditions_checkbox_enabled'] = wc_terms_and_conditions_checkbox_enabled();

Timber::render( 'woocommerce/checkout/terms.html.twig', $context );
