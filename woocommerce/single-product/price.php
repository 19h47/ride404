<?php
/**
 * Single Product Price
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WordPress
 * @subpackage Rider404
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

use Timber\{ Timber };

global $product;

$filename = 'woocommerce/single-product/price.html.twig';

$data            = array();
$data['product'] = $product;

Timber::render( 'woocommerce/single-product/price.html.twig', $data );
