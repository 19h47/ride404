<?php
/**
 * Single Product title
 *
 * @package Rider404
 */

use Timber\{ Timber, Post };

$context = Timber::context();

$context['post'] = new Post();

Timber::render( 'woocommerce/single-product/title.html.twig', $context );
