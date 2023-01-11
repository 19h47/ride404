<?php
/**
 * Empty cart page
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 7.0.1
 */

use Timber\{ Timber };

$filename = 'woocommerce/cart/cart-empty.html.twig';

$data = array();

Timber::render( $filename, $data );
