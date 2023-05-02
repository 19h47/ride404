<?php
/**
 * Single: Product
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 1.6.4
 */

use Timber\{ Timber };

$filename = 'pages/single-product.html.twig';

$data                  = Timber::context();
$data['product_class'] = wc_get_product_class( '', $product );

Timber::render( $filename, $data );
