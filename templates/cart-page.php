<?php
/**
 * Template Name: Cart page
 *
 * @package WordPress
 * @subpackage Rider404
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

use Timber\{ Timber };

$filenames = array( 'pages/cart-page.html.twig' );

$data                  = Timber::context();
$data['scroll_smooth'] = 'false';

Timber::render( $filenames, $data );
