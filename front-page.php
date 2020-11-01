<?php
/**
 * Front page
 *
 * @package Rider404
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @link https://codex.wordpress.org/Template_Hierarchy
 * @since 0.0.0
 * @version 0.0.0
 */

use Timber\{ Timber, Post };
use Rider404\Core\{ Transients };

$context = Timber::context();

$context['post']      = new Post();
$context['partners']  = Transients::partners();
$context['namespace'] = 'front-page';

$templates = array( 'pages/front-page.html.twig' );

Timber::render( $templates, $context );
