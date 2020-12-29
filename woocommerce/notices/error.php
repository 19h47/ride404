<?php
/**
 * Show error messages
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$contect            = array();
$context['notices'] = $notices;

Timber::render( 'woocommerce/notices/error.html.twig', $context );
