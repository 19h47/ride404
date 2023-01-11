<?php // phpcs:ignore
/**
 * Media
 *
 * @package WordPress
 * @subpackage Rider404
 */

namespace Rider404;

/**
 * Media
 */
class Media {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() : void {
		add_image_size( 'size-3', 720 );
		add_image_size( 'size-4', 960 );
		add_image_size( 'size-5', 1200 );
		add_image_size( 'size-8', 1920 );
		add_image_size( 'size-full', 2880 );
	}
}
