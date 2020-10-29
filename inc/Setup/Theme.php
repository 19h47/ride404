<?php // phpcs:ignore
/**
 * Bootstraps WordPress theme related functions, most importantly enqueuing javascript and styles.
 *
 * @package Rider404
 * @subpackage Rider404/Setup/Theme
 */

namespace Rider404\Setup;

use Rider404\Core\{ Transients };
use Timber\{ Timber, Menu };
use Twig\{ TwigFunction };

$timber = new Timber();

Timber::$dirname = array( 'views', 'templates', 'dist' );

/**
 * Theme
 */
class Theme {

	/**
	 * Constructor
	 *
	 * @return void
	 */
	public function run() : void {
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_filter( 'timber_context', array( $this, 'add_socials_to_context' ) );
		add_filter( 'timber_context', array( $this, 'add_to_theme' ) );
		add_filter( 'timber_context', array( $this, 'add_menus_to_context' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
	}


	/**
	 * Add to Twig
	 *
	 * @param object $twig Twig environment.
	 * @return object $twig
	 * @access public
	 */
	public function add_to_twig( object $twig ) : object {
		$twig->addFunction(
			new TwigFunction(
				'html_class',
				function ( $args = '' ) {
					return html_class( $args );
				}
			)
		);

		$twig->addFunction(
			new TwigFunction(
				'body_class',
				function ( $args = '' ) {
					return body_class( $args );
				}
			)
		);

		$twig->addFunction(
			new TwigFunction(
				'set_product_global',
				function( $post ) {
					return set_product_global( $post );
				}
			)
		);

		if ( function_exists( 'pll_the_languages' ) ) {
			$twig->addFunction(
				new TwigFunction(
					'pll_the_languages',
					function() {
						return pll_the_languages( array( 'raw' => 1 ) );
					}
				)
			);
		}

		if ( function_exists( 'pll__' ) ) {
			$twig->addFunction(
				new TwigFunction(
					'pll__',
					function ( string $string ) : string {
						return pll__( $string );
					}
				)
			);
		}

		if ( function_exists( 'sanitize_title' ) ) {
			$twig->addFunction(
				new TwigFunction(
					'sanitize_title',
					function ( string $title, string $fallback_title = '', string $context = 'save' ) : string {
						return sanitize_title( $title, $fallback_title, $context );
					}
				)
			);
		}

		if ( function_exists( 'get_extended' ) ) {
			$twig->addFunction(
				new TwigFunction(
					'get_extended',
					function( $content ) {
						return get_extended( $content );
					}
				)
			);
		}

		if ( function_exists( 'wp_get_document_title' ) ) {
			$twig->addFunction(
				new TwigFunction(
					'wp_get_document_title',
					function() {
						return wp_get_document_title();
					}
				)
			);
		}

		return $twig;
	}


	/**
	 * Add manifest to context
	 *
	 * @param array $context Timber context.
	 */
	public function add_to_theme( array $context ) : array {
		$context['theme']->manifest = get_theme_manifest();

		return $context;
	}


	/**
	 * Add socials to context
	 *
	 * @param array $context Timber context.
	 * @return array
	 */
	public function add_socials_to_context( array $context ) : array {
		// Share and Socials links.
		$socials = array(
			array(
				'title' => 'Twitter',
				'slug'  => 'twitter',
				'name'  => __( 'Share on Twitter', 'rider404' ),
				'link'  => 'https://twitter.com/intent/tweet?url=',
				'url'   => get_option( 'twitter' ),
			),
			array(
				'title' => 'Facebook',
				'slug'  => 'facebook',
				'name'  => __( 'Share on Facebook', 'rider404' ),
				'link'  => 'https://www.facebook.com/sharer.php?u=',
				'url'   => get_option( 'facebook' ),
			),
			array(
				'title' => 'YouTube',
				'slug'  => 'youtube',
				'url'   => get_option( 'youtube' ),
			),
			array(
				'title' => 'Instagram',
				'slug'  => 'instagram',
				'url'   => get_option( 'instagram' ),
			),
			array(
				'title' => 'LinkedIn',
				'slug'  => 'linkedin',
				'name'  => __( 'Share on LinkedIn', 'rider404' ),
				'link'  => 'https://www.linkedin.com/sharing/share-offsite/?url=',
				'url'   => get_option( 'linkedin' ),
			),
		);

		foreach ( $socials as $social ) {
			if ( ! empty( $social['url'] ) ) {
				$context['socials'][ $social['slug'] ] = $social;
			}
			$context['shares'][ $social['slug'] ] = $social;
		}

		return $context;
	}


	/**
	 * Add menus to context
	 *
	 * @param array $context Timber context.
	 * @return array
	 * @since  1.0.0
	 */
	public function add_menus_to_context( array $context ) : array {
		$menus = get_registered_nav_menus();

		foreach ( $menus as $menu => $value ) {
			$context['nav_menus'][ $menu ] = new Menu( $menu );
		}

		return $context;
	}


	/**
	 * Add to context
	 *
	 * @param array $context Timber context.
	 *
	 * @return array
	 * @since  1.0.0
	 */
	public function add_to_context( array $context ) : array {
		$context['phone_number']   = get_option( 'phone_number' );
		$context['address']        = get_option( 'address' );
		$context['business_hours'] = get_option( 'business_hours' );
		$context['public_email']   = get_option( 'public_email' );

		$context['cart'] = WC()->cart;

		return $context;
	}
}
