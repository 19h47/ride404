<?php
/**
 * Show messages
 *
 * @package Rider404
 */

use Timber\{ Timber };

$contect = Timber::context();

$context['notices'] = $notices;

Timber::render( 'woocommerce/notices/notice.html.twig', $context );
