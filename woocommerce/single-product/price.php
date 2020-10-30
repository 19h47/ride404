<?php
/**
 * Price
 *
 * @package Rider404
 */

use Timber\{ Timber };

global $product;

$context = Timber::get_context();

$context['product'] = $product;

Timber::render( 'woocommerce/single-product/price.html.twig', $context );
