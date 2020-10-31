<?php
/**
 * Template Name: Cart page
 *
 * @package Rider404
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

use Timber\{ Timber, Post };

$context = Timber::context();

$context['post']      = new Post();

$templates = array( 'pages/cart-page.html.twig' );

Timber::render( $templates, $context );
