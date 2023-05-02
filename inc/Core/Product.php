<?php // phpcs:ignore
/**
 * Product
 *
 * @link https://ride404.com/
 * @since 0.0.0
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @package WordPress
 * @subpackage Rider404/Core
 */

namespace Rider404\Core;

use WP_Post;

/**
 * Product
 */
class Product {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() {
		add_action( 'save_post_product', array( $this, 'save' ), 10, 3 );
	}


	/**
	 * Save
	 *
	 * @param int     $post_ID Post ID.
	 * @param WP_Post $post Post object.
	 * @param bool    $update Whether this is an existing post being updated or not.
	 *
	 * @return void
	 */
	public function save( int $post_ID, WP_Post $post, bool $update ) : void {
		delete_transient( 'rider404_products' );
		delete_transient( 'rider404_product_cats' );
	}
}
