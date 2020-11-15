<?php // phpcs:ignore
/**
 * Bootstraps WordPress theme related functions, most importantly enqueuing javascript and styles.
 *
 * @package Rider404
 * @subpackage Rider404/Init
 */

namespace Rider404;

use Rider404\{ Core, Setup, Plugins, Custom, Api };

/**
 * Init
 */
class Init {

	/**
	 * Store all the classes inside an array
	 *
	 * @return array Full list of classes
	 */
	public static function get_services() : array {
		return array(
			Setup\Theme::class,
			Setup\Enqueue::class,
			Setup\WordPress::class,
			Setup\Menus::class,
			Setup\Supports::class,
			Setup\Textdomain::class,
			Setup\PostStates::class,
			Setup\Widgets::class,
			Plugins\WooCommerce::class,
			Plugins\WooCommerce\TemplateHooks::class,
			Plugins\WooCommerceGatewayStripe::class,
			Api\Customizer\Contact::class,
			Custom\Extras::class,
			Custom\QueryVars::class,
			Core\Product::class,
			Core\ProductCat::class,
			Core\Partner::class,
		);
	}


	/**
	 * Loop through the classes, initialize them, and call the run() method if it exists
	 *
	 * @return void
	 */
	public static function run_services() : void {
		foreach ( self::get_services() as $class ) {
			$service = self::instantiate( $class );
			if ( method_exists( $service, 'run' ) ) {
				$service->run();
			}
		}
	}


	/**
	 * Initialize the class
	 *
	 * @param  string $class class name from the services array.
	 * @return object
	 */
	private static function instantiate( string $class ) : object {
		return new $class();
	}
}
