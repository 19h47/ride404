<?php
/**
 * Checkout terms and conditions area.
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber, Helper };

$context = array();

$context['wc_terms_and_conditions_checkbox_enabled'] = wc_terms_and_conditions_checkbox_enabled();

Timber::render( 'woocommerce/checkout/terms.html.twig', $context );
