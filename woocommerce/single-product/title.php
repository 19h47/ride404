<?php
/**
 * Title
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$filename = 'woocommerce/single-product/title.html.twig';

$data         = array();
$data['post'] = Timber::get_post();

Timber::render( $filename, $data );
