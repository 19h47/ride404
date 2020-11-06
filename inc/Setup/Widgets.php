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
		$uniqid = uniqid();

		$before_title  = '<div class="row"><div class="col-10 offset-1 col-sm-5 col-md-3 offset-sm-6">';
		$before_title .= '<h2 class="margin-0"><div id="split-text-' . $uniqid . '" ';
		$before_title .= 'class="Split-text page-block" data-scroll ';
		$before_title .= 'data-scroll-call="split-text-' . $uniqid . '" data-node-type="SplitTextBlock">';

		register_sidebar(
			array(
				'name'          => __( 'Front Page Sidebar', 'rider404' ),
				'id'            => 'front-page-sidebar',
				'before_widget' => '',
				'after_widget'  => '',
				'before_title'  => $before_title,
				'after_title'   => '</div></h2></div></div>',
			)
		);
	}
}
