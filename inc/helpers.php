<?php // phpcs:ignore
/**
 * Groove Box Karaoke helpers function
 *
 * @package Rider404
 */

/**
 * Get theme manifest
 *
 * @return bool|array
 */
function get_theme_manifest() {
	$file = get_template_directory() . '/dist/manifest.json';

	return json_decode( file_get_contents( $file ), true ); // phpcs:ignore
}


/**
 * Retrieve the classes for the html element as an array.
 *
 * @param  string|array $class One or more classes to add to the class list.
 * @return array Array of classes.
 * @access public
 */
function get_html_class( $class = '' ) : array {
	$classes = array();
	if ( ! empty( $class ) ) {
		if ( ! is_array( $class ) ) {
			$class = preg_split( '#\s+#', $class );
		}
		$classes = array_merge( $classes, $class );
	} else {
		// Ensure that we always coerce class to being an array.
		$class = array();
	}
	$classes = array_map( 'esc_attr', $classes );
	/**
	 * Filter the list of CSS html classes for the current post or page.
	 *
	 * @param array  $classes An array of html classes.
	 * @param string $class   A comma-separated list of additional classes added to the html.
	 */
	$classes = apply_filters( 'html_class', $classes, $class );

	return array_unique( $classes );
}


/**
 * Display the classes for the html element.
 *
 * @param string|array $class One or more classes to add to the class list.
 * @return string
 */
function html_class( $class = '' ) : string {
	// Separates classes with a single space, collates classes for html element.
	return 'class="' . join( ' ', get_html_class( $class ) ) . '"';
}


/**
 * List webfonts used by the theme.
 *
 * @since  1.0.0
 * @return array
 * @access public
 */
function get_webfonts() : array {
	return array(
		'poppins' => 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
	);
}


/**
 * Retrieve the version number of the theme.
 *
 * @since  1.0.0
 * @return string The version number of the theme.
 */
function get_theme_version() : string {
	return wp_get_theme()->Version;
}


/**
 * Retrieve the name of the theme.
 *
 * @since  1.0.0
 * @return string The name of the theme.
 */
function get_theme_name() : string {
	return wp_get_theme()->Name;
}


/**
 * Retrieve the text domain.
 *
 * @since  1.0.0
 * @return string The text domain.
 */
function get_theme_text_domain() : string {
	return wp_get_theme()->get( 'TextDomain' );
}


/**
 * Set product global
 *
 * @param mixed $post Post.
 * @see https://timber.github.io/docs/guides/woocommerce/#tease-product
 * 
 * @return void
 */
function set_product_global( $post ) {
	global $product;

	if ( is_woocommerce() ) {
		$product = wc_get_product( $post->ID );
	}
}
