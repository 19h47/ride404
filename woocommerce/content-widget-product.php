<?php
/**
 * The template for displaying product widget entries.
 *
 * @package Rider404
 */

global $product;

if ( ! is_a( $product, 'WC_Product' ) ) {
	return;
}

$context = Timber::context();

$context['product']       = $product;
$context['template_args'] = $args;
$context['show_rating']   = $args['show_rating'];

Timber::render( 'woocommerce/content-widget-product.html.twig', $context );
