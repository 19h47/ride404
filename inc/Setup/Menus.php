<?php // phpcs:ignore
/**
 * Menus
 *
 * @package Rider404
 */

namespace Rider404\Setup;

use Timber\{ Menu };

/**
 * Menus
 */
class Menus {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() : void {
		add_action( 'after_setup_theme', array( $this, 'register_menus' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );

	}

	/**
	 * Register nav menus
	 *
	 * @return void
	 */
	public function register_menus() : void {
		register_nav_menus(
			array(
				'main' => __( 'Main', 'rider404' ),
			)
		);
	}


	/**
	 * Add menus to context
	 *
	 * @param array $context Timber context.
	 * @return array
	 * @since  1.0.0
	 */
	public function add_to_context( array $context ) : array {
		$menus = get_registered_nav_menus();

		foreach ( $menus as $menu => $value ) {
			$context['nav_menus'][ $menu ] = new Menu( $menu );
		}

		return $context;
	}
}
