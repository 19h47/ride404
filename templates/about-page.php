<?php
/**
 * Template Name: About page
 *
 * @package Rider404
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

use Timber\{ Timber };

$context = Timber::context();

$context['post'] = Timber::get_post();

$templates = array( 'pages/about-page.html.twig' );

Timber::render( $templates, $context );
