<?php
/**
 * Single Product Thumbnails
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 *
 * @package WordPress
 * @subpackage Rider404
 *
 * @version 3.5.1
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $product;

use Timber\{ Timber };

$filename = 'woocommerce/single-product/product-thumbnails.html.twig';

$data                      = array();
$data['gallery_image_ids'] = $product->get_gallery_image_ids();

Timber::render( $filename, $data );
