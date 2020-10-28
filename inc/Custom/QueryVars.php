<?php // phpcs:ignore
/**
 * Query vars
 *
 * @package Rider404
 */

namespace Rider404\Custom;

/**
 * QueryVars
 */
class QueryVars {

	/**
	 * Run default hooks and actions for WordPress
	 *
	 * @return void
	 */
	public function run() : void {
		add_filter( 'query_vars', array( $this, 'add' ), 10, 1 );
	}


	/**
	 * Add
	 *
	 * @param array $public_query_vars The array of allowed query variable names.
	 * @return array
	 */
	public function add( $public_query_vars ) : array {
		return $public_query_vars;
	}
}
