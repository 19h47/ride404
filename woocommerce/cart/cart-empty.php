<?php
/**
 * Empty cart page
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 3.5.0
 */

use Timber\{ Timber };

$filename = 'woocommerce/cart/cart-empty.html.twig';

$data = array();

Timber::render( $filename, $data );
