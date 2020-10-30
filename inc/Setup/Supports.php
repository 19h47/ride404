<?php // phpcs:ignore
/**
 * Supports
 *
 * @package Rider404
 */

namespace Rider404\Setup;

/**
 * Supports
 */
class Supports {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() : void {
		add_action( 'after_setup_theme', array( $this, 'add_theme_supports' ) );
		add_action( 'after_setup_theme', array( $this, 'add_post_type_supports' ) );
	}


	/**
	 * Add theme supports
	 *
	 * @return void
	 */
	public function add_theme_supports() : void {
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @see https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		add_theme_support( 'woocommerce' );
	}


	/**
	 * Add post type supports
	 *
	 * @return void
	 */
	public function add_post_type_supports() {
		add_post_type_support( 'page', 'excerpt' );
	}
}
