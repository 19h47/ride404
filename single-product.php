<?php
/**
 * Single: Product
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$filename = 'pages/single-product.html.twig';

$data                  = Timber::context();
$data['post']          = Timber::get_post();
$data['product_class'] = wc_get_product_class( '', $product );

Timber::render( $filename, $data );
