<?php
/**
 * Single: Post
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 1.6.4
 */

use Timber\{ Timber };

$filename = 'pages/single-post.html.twig';

$data                  = Timber::context();
$data['post']          = Timber::get_post();

Timber::render( $filename, $data );
