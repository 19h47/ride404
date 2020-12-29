<?php
/**
 * Front page
 *
 * @link https://rider404.com/
 * @since 0.0.0
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };
use Rider404\Core\{ Transients };

$context = Timber::context();

$context['post']     = Timber::get_post();
$context['partners'] = Transients::partners();
$context['sidebar']  = Timber::get_widgets( 'front-page-sidebar' );

$templates = array( 'pages/front-page.html.twig' );

Timber::render( $templates, $context );
