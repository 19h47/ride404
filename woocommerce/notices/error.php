<?php
/**
 * Show error messages
 *
 * @package Rider404
 */

use Timber\{ Timber };

$contect = Timber::context();

$context['notices'] = $notices;

Timber::render( 'woocommerce/notices/error.html.twig', $context );
