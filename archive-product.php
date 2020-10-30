<?php
/**
 * Archive: product
 *
 * @package Rider404
 */

global $product;

use Timber\{ Timber };
use Rider404\Core\{ Transients };

$context = Timber::get_context();

$context['products'] = Transients::products();

$context['product_loop'] = woocommerce_product_loop();

if ( is_product_category() ) {
	$context['post'] = Timber::get_term( get_queried_object()->term_id, 'product_cat' );
}

Timber::render( 'pages/archive-product.html.twig', $context );
