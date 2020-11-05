<?php // phpcs:ignore
/**
 * Widgets
 *
 * @package Widgets
 * @subpackage Widgets/Setup/Theme
 */

namespace Rider404\Setup;

/**
 * Widgets
 */
class Widgets {
	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() : void {
		add_action( 'widgets_init', array( $this, 'register_sidebars' ) );
	}


	/**
	 * Register sidebars
	 *
	 * @return void
	 */
	public function register_sidebars() {
		register_sidebar(
			array(
				'name'          => __( 'Front Page Sidebar', 'rider404' ),
				'id'            => 'front-page-sidebar',
				'before_widget' => '',
				'after_widget'  => '',
				// 'before_title'  => '<h3 class="widget-title">',
				// 'after_title'   => '</h3>',
			)
		);
	}
}
