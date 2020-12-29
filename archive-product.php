<?php
/**
 * Archive: product
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };
use Rider404\Core\{ Transients };

$context = Timber::context();

$context['products'] = Timber::get_posts();

$context['product_loop'] = woocommerce_product_loop();
$context['product_cats'] = Transients::product_cats();

$context['product_cat_current'] = false;
$context['count_products']      = wp_count_posts( 'product' )->publish;

if ( is_product_category() ) {
	$context['product_cat_current'] = Timber::get_term( get_queried_object()->term_id, 'product_cat' );
}

Timber::render( 'pages/archive-product.html.twig', $context );
