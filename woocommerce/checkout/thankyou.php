<?php
/**
 * Thankyou page
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 3.7.0
 */

use Timber\{ Timber };

$filename = 'woocommerce/checkout/thankyou.html.twig';

$data          = Timber::context();
$data['order'] = $order;

Timber::render( $filename, $data );
