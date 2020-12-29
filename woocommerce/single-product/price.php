<?php
/**
 * Price
 *
 * @package Rider404
 */

use Timber\{ Timber };

global $product;

$context            = array();
$context['product'] = $product;

Timber::render( 'woocommerce/single-product/price.html.twig', $context );
