<?php
/**
 * Show messages
 *
 * @package WordPress
 * @subpackage Rider404
 *
 * @version 3.9.0
 */

use Timber\{ Timber };

$filename = 'woocommerce/notices/notice.html.twig';

$data            = array();
$data['notices'] = $notices;

Timber::render( $filename, $data );
