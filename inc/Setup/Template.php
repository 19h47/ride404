<?php // phpcs:ignore
/**
 * Template
 *
 * @package Rider404
 */

namespace Rider404\Setup;

use WP_Post;

/**
 * Template
 *
 * @since 1.0.0
 * @see https://github.com/WordPress/WordPress/blob/master/wp-admin/includes/template.php
 */
class Template {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() : void {
		add_filter( 'display_post_states', array( $this, 'display_post_states' ), 10, 2 );
	}

	/**
	 * Display post states
	 *
	 * Filter an array of post states from a post.
	 *
	 * @param string[] $post_states An array of post display states.
	 * @param WP_Post  $post        The current post object.
	 *
	 * @since 1.0.0
	 * @see https://github.com/WordPress/WordPress/blob/master/wp-admin/includes/template.php#L2233
	 * @return array $states
	 */
	public function display_post_states( array $post_states, WP_Post $post ) : array {
		return $post_states;
	}
}
