<?php // phpcs:ignore
/**
 * Settings
 *
 * @package Rider404
 */

namespace Rider404\Setup;

/**
 * Supports
 */
class Settings {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() : void {
		add_action( 'admin_init', array( $this, 'register_settings' ) );
	}


	/**
	 * Register settings
	 *
	 * @return void
	 */
	public function register_settings() : void {
		add_settings_field(
			'error_404_video_url',
			_x( 'Error 404 video url', 'settings', 'rider404' ),
			array( $this, 'text_callback' ),
			'general',
			'default',
			array(
				'name'        => 'error_404_video_url',
				'placeholder' => _x( 'Video url', 'settings', 'rider404' ),
				'description' => _x( 'The video url', 'settings', 'rider404' ),
			)
		);

		register_setting( 'general', 'error_404_video_url' );
	}


	/**
	 * Text callback
	 *
	 * @param array $args Arguments.
	 * @return void
	 */
	public function text_callback( array $args ) : void {
		echo '<input name="' . esc_attr( $args['name'] ) . '" type="text" value="' . esc_attr( get_option( $args['name'] ) ) . '" class="regular-text code" placeholder="' . esc_attr( $args['placeholder'] ) . '" />';
		echo '<p class="description">' . esc_html( $args['description'] ) . '</p>';
	}
}
