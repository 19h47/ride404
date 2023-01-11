<?php // phpcs:ignore
/**
 * WP Image Editor
 *
 * @package WordPress
 * @subpackage Rider404
 */

namespace Rider404;

/**
 * WP Image editor
 */
class WPImageEditor {

	/**
	 * Run default hooks and actions for WordPress
	 *
	 * @return void
	 */
	public function run() : void {
		add_filter( 'wp_editor_set_quality', array( $this, 'quality' ), 10, 2 );
	}

	/**
	 * Quality
	 *
	 * @param int    $quality   Quality level between 1 (low) and 100 (high).
	 * @param string $mime_type Image mime type.
	 *
	 * @see https://developer.wordpress.org/reference/hooks/wp_editor_set_quality/
	 *
	 * @return int
	 */
	public function quality( int $quality, string $mime_type ) : int {
		return 100;
	}
}
