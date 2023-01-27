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

use Timber\{ Timber, Helper };

$filename = 'pages/front-page.html.twig';

$data             = Timber::context();
$data['partners'] = Helper::transient(
	'rider404_partners',
	function() {
		$query = Timber::get_posts(
			array(
				'post_type'      => 'partner',
				'posts_per_page' => -1,
				'no_found_rows'  => true,
			)
		);

		return $query->realize();
	}
);
$data['sidebar']  = Timber::get_widgets( 'front-page-sidebar' );

Timber::render( $filename, $data );
