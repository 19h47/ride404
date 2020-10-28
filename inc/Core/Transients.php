<?php // phpcs:ignore
/**
 * Class Transients
 *
 * @package Rider404
 * @subpackage Rider404/Core
 */

namespace Rider404\Core;

use Timber\{ Timber };

/**
 * Transients class
 */
class Transients {

	/**
	 * Posts
	 *
	 * @return array $transient
	 */
	public static function posts() : array {
		$transient = get_transient( 'rider404_posts' );

		if ( $transient ) {
			return $transient;
		}

		$posts = Timber::get_posts(
			array(
				'post_type'           => 'post',
				'posts_per_page'      => -1,
				'no_found_rows'       => true,
				'post__not_in'        => get_option( 'sticky_posts' ),
				'ignore_sticky_posts' => 1,
			),
		);

		set_transient( 'rider404_posts', $posts );

		return $posts;
	}
}
