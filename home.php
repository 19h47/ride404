<?php
/**
 * Home
 *
 * @link https://rider404.com/
 * @since 0.0.0
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$filename = 'pages/home.html.twig';

$data                = Timber::context();
$data['post']        = Timber::get_post();
$data['posts']       = Timber::get_posts();
$data['count_posts'] = wp_count_posts()->publish;

Timber::render( $filename, $data );
