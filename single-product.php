<?php
/**
 * Single: product
 *
 * @package WordPress
 * @subpackage Rider404
 */

global $product;

use Timber\{ Timber };

$context = Timber::context();

$context['post'] = Timber::get_post();

$context['product_class'] = wc_get_product_class( '', $product );

// Restore the context and loop back to the main query loop 🤔.
wp_reset_postdata();

Timber::render( 'pages/single-product.html.twig', $context );
