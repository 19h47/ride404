<?php // phpcs:ignore
/**
 * Transients
 *
 * @link https://rider404.com/
 * @since 0.0.0
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @package WordPress
 * @subpackage Rider404/Core
 */

namespace Rider404\Core;

use Timber\{ Timber };

/**
 * Transients
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


	/**
	 * Product cats
	 *
	 * @see https://developer.wordpress.org/reference/functions/get_terms/
	 * @return array $product_cats
	 */
	public static function product_cats() : array {
		$transient = get_transient( 'rider404_product_cats' );

		if ( $transient ) {
			return $transient;
		}

		$product_cats = Timber::get_terms(
			array(
				'taxonomy'   => 'product_cat',
				'hide_empty' => true,
			)
		);

		set_transient( 'rider404_product_cats', $product_cats );

		return $product_cats;
	}
}
