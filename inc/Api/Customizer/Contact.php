<?php // phpcs:ignore
/**
 * Contact
 *
 * @category Customizer
 * @package  Rider404
 * @author   Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @license  http://opensource.org/licenses/gpl-license.php GNU Public License
 */

namespace Rider404\Api\Customizer;

use WP_Customize_Manager;

/**
 * Contact
 */
class Contact {


	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run() {
		add_action( 'customize_register', array( $this, 'register' ), 10, 1 );
	}


	/**
	 * Register
	 *
	 * @param WP_Customize_Manager $wp_customize Customizer object.
	 */
	public function register( WP_Customize_Manager $wp_customize ) {
		// Add contact section.
		$wp_customize->add_section(
			'contact',
			array(
				'title'       => __( 'Contact', 'rider404' ),
				'description' => __( 'Contact Settings', 'rider404' ),
			)
		);

		// Facebook.
		$wp_customize->add_setting(
			'facebook',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'facebook',
			array(
				'label'       => __( 'Facebook', 'rider404' ),
				'description' => __( 'Facebook URL', 'rider404' ),
				'section'     => 'contact',
				'settings'    => 'facebook',
			)
		);

		// Instagram.
		$wp_customize->add_setting(
			'instagram',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'instagram',
			array(
				'label'       => __( 'Instagram', 'rider404' ),
				'description' => __( 'Instagram URL', 'rider404' ),
				'section'     => 'contact',
				'settings'    => 'instagram',
			)
		);

		// YouTube.
		$wp_customize->add_setting(
			'youtube',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'youtube',
			array(
				'label'       => __( 'YouTube', 'rider404' ),
				'description' => __( 'YouTube URL', 'rider404' ),
				'section'     => 'contact',
				'settings'    => 'youtube',
			)
		);

		// TikTok.
		$wp_customize->add_setting(
			'tiktok',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'tiktok',
			array(
				'label'       => __( 'TikTok', 'rider404' ),
				'description' => __( 'TikTok URL', 'rider404' ),
				'section'     => 'contact',
				'settings'    => 'tiktok',
			)
		);

		// Strava.
		$wp_customize->add_setting(
			'strava',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'strava',
			array(
				'label'       => __( 'Strava', 'rider404' ),
				'description' => __( 'Strava URL', 'rider404' ),
				'section'     => 'contact',
				'settings'    => 'strava',
			)
		);

		// Phone number.
		$wp_customize->add_setting(
			'phone_number',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'phone_number',
			array(
				'label'    => __( 'Phone number', 'rider404' ),
				'section'  => 'contact',
				'settings' => 'phone_number',
			)
		);

		// Public email.
		$wp_customize->add_setting(
			'public_email',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'public_email',
			array(
				'label'    => __( 'Public email address', 'rider404' ),
				'section'  => 'contact',
				'settings' => 'public_email',
			)
		);

		// Address.
		$wp_customize->add_setting(
			'address',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'address',
			array(
				'label'    => __( 'Address', 'rider404' ),
				'type'     => 'textarea',
				'section'  => 'contact',
				'settings' => 'address',
			)
		);

		// Business hours.
		$wp_customize->add_setting(
			'business_hours',
			array(
				'type'      => 'option',
				'transport' => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'business_hours',
			array(
				'label'    => __( 'Business hours', 'rider404' ),
				'type'     => 'textarea',
				'section'  => 'contact',
				'settings' => 'business_hours',
			)
		);
	}
}
