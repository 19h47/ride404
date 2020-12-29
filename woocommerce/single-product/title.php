<?php
/**
 * Single Product title
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$context         = array();
$context['post'] = Timber::get_post();

Timber::render( 'woocommerce/single-product/title.html.twig', $context );
