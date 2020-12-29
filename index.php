<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$context = Timber::context();

$context['post'] = Timber::get_post();

$templates = array( 'index.html.twig' );

Timber::render( $templates, $context );
