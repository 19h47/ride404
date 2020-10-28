<?php // phpcs:ignore
/**
 * Textdomain
 *
 * @package Rider404
 */

namespace Rider404\Setup;

/**
 * Supports
 */
class Textdomain {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() : void {
		add_action( 'after_setup_theme', array( $this, 'add_theme_textdomain' ) );
	}


	/**
	 * Add theme textdomain
	 *
	 * @return void
	 */
	public function add_theme_textdomain() : void {
		load_theme_textdomain( 'rider404', get_template_directory() . '/languages' );
	}
}
