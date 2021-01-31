<?php
/**
 * The template for displaying product widget entries.
 *
 * @package WordPress
 * @subpackage Rider404
 *
 * @version 3.5.5
 */

use Timber\{ Timber };

global $product;

if ( ! is_a( $product, 'WC_Product' ) ) {
	return;
}

$context = array();

$context['product']       = $product;
$context['template_args'] = $args;
$context['show_rating']   = $args['show_rating'];

Timber::render( 'woocommerce/content-widget-product.html.twig', $context );
