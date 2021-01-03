<?php
/**
 * Archive: product
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };
use Rider404\Core\{ Transients };

$filename = 'pages/archive-product.html.twig';

$data                        = Timber::context();
$data['products']            = Timber::get_posts();
$data['product_loop']        = woocommerce_product_loop();
$data['product_cats']        = Transients::product_cats();
$data['product_cat_current'] = false;
$data['count_products']      = wp_count_posts( 'product' )->publish;

if ( is_product_category() ) {
	$data['product_cat_current'] = Timber::get_term( get_queried_object()->term_id, 'product_cat' );
}

Timber::render( $filename, $data );
