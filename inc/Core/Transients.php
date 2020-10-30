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
	 * @return array $posts
	 */
	public static function posts() : array {
		$transient = get_transient( 'rider404_posts' );

		if ( $transient ) {
			return $transient;
		}

		$posts = Timber::get_posts(
			array(
				'post_type'      => 'post',
				'posts_per_page' => -1,
				'no_found_rows'  => true,
			),
		);

		set_transient( 'rider404_posts', $posts );

		return $posts;
	}


	/**
	 * Products
	 *
	 * @return array $products
	 */
	public static function products() : array {
		$transient = get_transient( 'rider404_products' );

		if ( $transient ) {
			return $transient;
		}

		$products = Timber::get_posts(
			array(
				'post_type'      => 'product',
				'posts_per_page' => -1,
				'no_found_rows'  => true,
			)
		);

		set_transient( 'rider404_products', $products );

		return $products;
	}
}
