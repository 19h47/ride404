<?php
/**
 * Template Name: About Page
 *
 * @package WordPress
 * @subpackage Rider404
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

use Timber\{ Timber };

$filenames = array( 'pages/about-page.html.twig' );

$data         = Timber::context();
$data['post'] = Timber::get_post();

Timber::render( $filenames, $data );
