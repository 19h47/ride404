<?php
/**
 * Show messages
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$contect            = array();
$context['notices'] = $notices;

Timber::render( 'woocommerce/notices/success.html.twig', $context );
