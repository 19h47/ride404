<?php // phpcs:ignore
/**
 * Class ProductCat
 *
 * @link https://rider404.com/
 * @since 0.0.0
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @package WordPress
 * @subpackage Rider404/Core
 */

namespace Rider404\Core;

/**
 * ProductCat
 */
class ProductCat {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() {
		add_action( 'edit_product_cat', array( $this, 'edit' ), 10, 2 );
	}


	/**
	 * Edit
	 *
	 * @param int $term_id Term ID.
	 * @param int $tt_id Term taxonomy ID.
	 *
	 * @return void
	 */
	public function edit( int $term_id, int $tt_id ) : void {
		delete_transient( 'rider404_product_cats' );
		delete_transient( 'rider404_products' );
	}
}
