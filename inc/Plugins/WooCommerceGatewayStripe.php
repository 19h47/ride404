<?php // phpcs:ignore
/**
 * WooCommerce Gateway Stripe
 *
 * @link https://ride404.com/
 * @since 0.0.0
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @package WordPress
 * @subpackage Rider404/Plugins
 */

namespace Rider404\Plugins;

/**
 * WooCommerce Gateway Stripe
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
class WooCommerceGatewayStripe {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() {
		add_filter( 'wc_stripe_payment_icons', array( $this, 'payment_icons' ), 10, 1 );
	}


	/**
	 * Payment icons
	 *
	 * @param array $icons Icons
	 *
	 * @return array $icons
	 */
	public function payment_icons( array $icons ) : array {

		$icons['visa']       = '<img alt="Visa" src="' . trailingslashit( get_template_directory_uri() ) . get_theme_manifest()['img/svg/visa.svg'] . '" />';
		$icons['mastercard'] = '<img alt="Mastercard" src="' . trailingslashit( get_template_directory_uri() ) . get_theme_manifest()['img/svg/mastercard.svg'] . '" />';
		$icons['amex']       = '<img alt="American Express" src="' . trailingslashit( get_template_directory_uri() ) . get_theme_manifest()['img/svg/amex.svg'] . '" />';

		return $icons;
	}
}
