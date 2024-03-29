<?php // phpcs:ignore
/**
 * Bootstraps WordPress theme related functions, most importantly enqueuing javascript and styles.
 *
 * @package Rider404
 * @subpackage Rider404/Setup/Theme
 */

namespace Rider404\Setup;

use Rider404\Core\{ Transients };
use Timber\{ Timber, Site };
use Twig\{ TwigFunction };

Timber::init();
Timber::$dirname = array( 'views', 'templates', 'dist' );

/**
 * Theme
 */
class Theme extends Site {

	/**
	 * Constructor
	 *
	 * @return void
	 */
	public function run() : void {
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_filter( 'timber/context', array( $this, 'add_socials_to_context' ) );
		add_filter( 'timber/context', array( $this, 'add_to_theme' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );

		add_filter( 'timber/twig/environment/options', array( $this, 'set_environment_options' ), 10, 1 );
	}


	/**
	 * Set options
	 *
	 * @param array $options Array of options.
	 *
	 * @return array $options
	 */
	public function set_environment_options( array $options ) : array {
		$options['cache']       = WP_DEBUG ? false : true;
		$options['auto_reload'] = WP_DEBUG;

		return $options;
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

		if ( function_exists( 'get_extended' ) ) {
			$twig->addFunction(
				new TwigFunction(
					'get_extended',
					function( $x ) {
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

		$twig->addFunction( new TwigFunction( 'uniqid', 'uniqid' ) );
		$twig->addFunction(
			new TwigFunction(
				'get_youtube_id_from_iframe',
				function( string $url ) : string {
					return get_youtube_id_from_iframe( $url );
				}
			)
		);

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
				'title' => 'Facebook',
				'slug'  => 'facebook',
				'name'  => __( 'Share on Facebook', 'grooveboxkaraoke' ),
				'link'  => 'https://www.facebook.com/sharer.php?u=',
				'url'   => get_option( 'facebook' ),
			),
			array(
				'title' => 'Instagram',
				'slug'  => 'instagram',
				'url'   => get_option( 'instagram' ),
			),
			array(
				'title' => 'YouTube',
				'slug'  => 'youtube',
				'url'   => get_option( 'youtube' ),
			),
			array(
				'title' => 'TikTok',
				'slug'  => 'tiktok',
				'url'   => get_option( 'tiktok' ),
			),
			array(
				'title' => 'Strava',
				'slug'  => 'strava',
				'url'   => get_option( 'strava' ),
			),
		);

		foreach ( $socials as $social ) {
			if ( ! empty( $social['url'] ) ) {
				$context['shares'][ $social['slug'] ] = $social;
			}
			$context['socials'][ $social['slug'] ] = $social;
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

		$context['cart_url']     = wc_get_cart_url();
		$context['checkout_url'] = wc_get_checkout_url();
		$context['shop_url']     = wc_get_page_permalink( 'shop' );
		$context['terms_url']    = get_permalink( wc_terms_and_conditions_page_id() );
		$context['privacy_url']  = get_permalink( wc_privacy_policy_page_id() );
		$context['posts_url']    = get_post_type_archive_link( 'post' );

		$context['is_front_page']       = is_front_page();
		$context['is_product']          = is_product();
		$context['is_shop']             = is_shop();
		$context['is_home']             = is_home();
		$context['is_front_page']       = is_front_page();
		$context['is_product_category'] = is_product_category();
		$context['is_cart']             = is_cart();
		$context['is_checkout']         = is_checkout();
		$context['is_ajax']             = is_ajax();
		$context['is_singular_post']    = is_singular( 'post' );

		$context['is_user_logged_in'] = is_user_logged_in();

		$context['error_404_video_url'] = get_option( 'error_404_video_url' );

		return $context;
	}
}
