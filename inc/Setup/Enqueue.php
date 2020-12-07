<?php // phpcs:ignore
/**
 * Enqueue
 *
 * @package Rider404
 */

namespace Rider404\Setup;

use Rider404\Core\{ Transients };
use Timber\{ Timber };

/**
 * Enqueue
 */
class Enqueue {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() : void {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_style' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Enqueue scripts
	 *
	 * @access public
	 * @return void
	 * @since  1.0.0
	 */
	public function enqueue_scripts() : void {
		wp_deregister_script( 'wp-embed' );

		wp_register_script( // phpcs:ignore
			get_theme_text_domain() . '-main',
			get_template_directory_uri() . '/' . get_theme_manifest()['main.js'],
			array( 'jquery' ),
			null,
			true
		);

		if ( is_page_template( 'templates/about-page.php' ) ) {
			wp_register_script( // phpcs:ignore
				get_theme_text_domain() . '-patch',
				get_template_directory_uri() . '/' . get_theme_manifest()['static/patch.js'],
				array(),
				null,
				true
			);
		}

		$args = array(
			'template_directory_uri' => get_template_directory_uri(),
			'base_url'               => site_url(),
			'home_url'               => home_url( '/' ),
			'ajax_url'               => admin_url( 'admin-ajax.php' ),
			'api_url'                => home_url( 'wp-json' ),
			'current_url'            => get_permalink(),
			'nonce'                  => wp_create_nonce( 'security' ),
		);

		wp_localize_script(
			get_theme_text_domain() . '-main',
			'rider404',
			$args,
		);

		wp_enqueue_script( // phpcs:ignore
			'feature',
			'//cdnjs.cloudflare.com/ajax/libs/feature.js/1.1.0/feature.min.js',
			array(),
			null,
			false
		);

		wp_add_inline_script(
			'feature',
			'document.documentElement.className=document.documentElement.className.replace("no-js","js"),feature.touch&&!navigator.userAgent.match(/Trident\/(6|7)\./)&&(document.documentElement.className=document.documentElement.className.replace("no-touch","touch"));'
		);

		if ( is_page_template( 'templates/page-bookings.php' ) ) {
			wp_register_script( 'iframe', '', array(), null, false ); // phpcs:ignore
			wp_enqueue_script( 'iframe' );
			wp_add_inline_script(
				'iframe',
				'!function(e,t){var r=e.createElement(t),a=e.getElementsByTagName(t)[0],n=new Date,s=""+n.getFullYear()+("0"+(n.getMonth()+1)).slice(-2)+("0"+n.getDate()).slice(-2);r.defer=1,r.src="https://groove-box-karaoke.4escape.io/public/js/iframe.min.js?v="+s,a.parentNode.insertBefore(r,a)}(document,"script");'
			);
		}

		wp_enqueue_script( get_theme_text_domain() . '-main' );
		wp_enqueue_script( get_theme_text_domain() . '-patch' );
	}


	/**
	 * Enqueue styles.
	 *
	 * @access public
	 * @return void
	 * @since  1.0.0
	 */
	public function enqueue_style() : void {

		// Add custom fonts, used in the main stylesheet.
		$webfonts = array();
		foreach ( get_webfonts() as $name => $url ) {
			wp_register_style( 'font-' . $name, $url, array(), '1.0.0' );
			$webfonts[] = "font-$name";
		}

		// Theme stylesheet.
		wp_register_style( // phpcs:ignore
			get_theme_text_domain() . '-main',
			get_template_directory_uri() . '/' . get_theme_manifest()['main.css'],
			$webfonts,
			null
		);

		wp_enqueue_style( get_theme_text_domain() . '-main' );
	}
}
