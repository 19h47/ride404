<?php // phpcs:ignore
/**
 * Post States
 *
 * @package Rider404
 */

namespace Rider404\Setup;

use WP_Post;

/**
 * Supports
 */
class PostStates {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() : void {
		add_filter( 'display_post_states', array( $this, 'filter_display_post_states' ), 10, 2 );
	}

	/**
	 * Post states
	 *
	 * @param array   $states current states.
	 * @param WP_Post $post current post object.
	 *
	 * @return array $states
	 */
	public function filter_display_post_states( array $states, WP_Post $post ) {
		return $states;
	}
}
