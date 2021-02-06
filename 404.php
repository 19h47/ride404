<?php
/**
 * 404
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$filenames = array( 'pages/404.html.twig' );

$data                  = Timber::context();
$data['scroll_smooth'] = 'false';

Timber::render( $filenames, $data );
