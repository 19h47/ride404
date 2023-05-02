<?php // phpcs:ignore
/**
 * Partner
 *
 * PHP version 7.4.1
 *
 * @link https://ride404.com/
 * @since 0.0.0
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @package WordPress
 * @subpackage Rider404/Core
 */

namespace Rider404\Core;

use WP_Post;

/**
 * Partner class
 *
 * @file   inc/Core/Partner.php
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
class Partner {

	/**
	 * Runs initialization tasks.
	 *
	 * @access public
	 */
	public function run() {
		add_action( 'init', array( $this, 'register' ), 10, 0 );
		add_action( 'admin_head', array( $this, 'css' ) );
		add_action( 'save_post_partner', array( $this, 'save' ), 10, 3 );
		add_action( 'manage_partner_posts_custom_column', array( $this, 'render_custom_columns' ), 10, 2 );

		add_filter( 'post_updated_messages', array( $this, 'updated_messages' ), 10, 1 );
		add_filter( 'bulk_post_updated_messages', array( $this, 'bulk_updated_messages' ), 10, 2 );
		add_filter( 'manage_partner_posts_columns', array( $this, 'add_custom_columns' ) );
	}


	/**
	 * Save
	 *
	 * @param  int     $post_id The post id.
	 * @param  WP_Post $post    The post object.
	 * @param  bool    $update  Is update or not.
	 * @return void
	 */
	public function save( int $post_id, WP_Post $post, bool $update ) : void {}


	/**
	 * CSS
	 *
	 * @return bool
	 */
	public function css() : bool {
		global $typenow;

		if ( 'partner' !== $typenow ) {
			return false;
		}

		?>
		<style>
			.fixed .column-thumbnail {
				vertical-align: top;
				width: 80px;
			}

			.column-thumbnail a {
				display: block;
			}
			.column-thumbnail a img {
				display: inline-block;
				vertical-align: middle;
				width: 80px;
				height: 80px;
				object-fit: contain;
				object-position: center;
				filter : invert(1);

			}
		</style>
		<?php

		return true;
	}


	/**
	 * Add custom columns
	 *
	 * @param array $columns Array of columns.
	 * @return array $new_columns
	 * @link https://developer.wordpress.org/reference/hooks/manage_post_type_posts_columns/
	 */
	public function add_custom_columns( array $columns ) : array {
		$new_columns = array();

		unset( $columns['date'] );

		foreach ( $columns as $key => $value ) {
			if ( 'title' === $key ) {
				$new_columns['thumbnail'] = __( 'Thumbnail', 'rider404' );
			}

			$new_columns[ $key ] = $value;
		}
		return $new_columns;
	}


	/**
	 * Render custom columns
	 *
	 * @param string $column_name The column name.
	 * @param int    $post_id The ID of the post.
	 * @link https://developer.wordpress.org/reference/hooks/manage_post-post_type_posts_custom_column/
	 *
	 * @return void
	 */
	public function render_custom_columns( string $column_name, int $post_id ) : void {
		switch ( $column_name ) {
			case 'thumbnail':
				$thumbnail = get_the_post_thumbnail( $post_id, 'medium' );
				$html      = '—';

				if ( $thumbnail ) {
					$html  = '<a href="' . esc_attr( get_edit_post_link( $post_id ) ) . '">';
					$html .= $thumbnail;
					$html .= '</a>';

					echo wp_kses_post( $html );
				} else {
					echo wp_kses_post( $html );
				}

				break;
		}
	}


	/**
	 * Updated messages
	 *
	 * @param array $messages Post updated messages. For defaults see $messages declarations above.
	 * @return array $message
	 * @link https://developer.wordpress.org/reference/hooks/post_updated_messages/
	 * @access public
	 */
	public function updated_messages( array $messages ) : array {
		global $post;

		$post_ID     = isset( $post_ID ) ? (int) $post_ID : 0;
		$preview_url = get_preview_post_link( $post );

		/* translators: Publish box date format, see https://secure.php.net/date */
		$scheduled_date = date_i18n( __( 'M j, Y @ H:i' ), strtotime( $post->post_date ) );

		$view_link_html = sprintf(
			' <a href="%1$s">%2$s</a>',
			esc_url( get_permalink( $post_ID ) ),
			__( 'View Partner', 'rider404' )
		);

		$scheduled_link_html = sprintf(
			' <a target="_blank" href="%1$s">%2$s</a>',
			esc_url( get_permalink( $post_ID ) ),
			__( 'Preview Partner', 'rider404' )
		);

		$preview_link_html = sprintf(
			' <a target="_blank" href="%1$s">%2$s</a>',
			esc_url( $preview_url ),
			__( 'Preview Partner', 'rider404' )
		);

		$messages['partner'] = array(
			0  => '', // Unused. Messages start at index 1.
			1  => __( 'Partner updated.', 'rider404' ) . $view_link_html,
			2  => __( 'Custom field updated.', 'rider404' ),
			3  => __( 'Custom field deleted.', 'rider404' ),
			4  => __( 'Partner updated.', 'rider404' ),
			/* translators: %s: date and time of the revision */
			5  => isset( $_GET['revision'] ) ? sprintf( __( 'Partner restored to revision from %s.', 'rider404' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false, // phpcs:ignore
			6  => __( 'Partner published.', 'rider404' ) . $view_link_html,
			7  => __( 'Partner saved.', 'rider404' ),
			8  => __( 'Partner submitted.', 'rider404' ) . $preview_link_html,
			9  => sprintf( __( 'Partner scheduled for: %s.', 'rider404' ), '<strong>' . $scheduled_date . '</strong>' ) . $scheduled_link_html, // phpcs:ignore
			10 => __( 'Partner draft updated.', 'rider404' ) . $preview_link_html,
		);

		return $messages;
	}


	/**
	 * Bulk updated messages
	 *
	 * @param array $bulk_messages Arrays of messages, each keyed by the corresponding post type. Messages are keyed with 'updated', 'locked', 'deleted', 'trashed', and 'untrashed'.
	 * @param array $bulk_counts Array of item counts for each message, used to build internationalized strings.
	 *
	 * @see https://developer.wordpress.org/reference/hooks/bulk_post_updated_messages/
	 *
	 * @return array $bulk_counts
	 */
	public function bulk_updated_messages( array $bulk_messages, array $bulk_counts ) : array {
		$bulk_messages['partner'] = array(
			/* translators: %s: Number of partners. */
			'updated'   => _n( '%s partner updated.', '%s partners updated.', $bulk_counts['updated'], 'rider404' ),
			'locked'    => ( 1 === $bulk_counts['locked'] ) ? __( '1 partner not updated, somebody is editing it.', 'rider404' ) :
				/* translators: %s: Number of partners. */
				_n( '%s partner not updated, somebody is editing it.', '%s partners not updated, somebody is editing them.', $bulk_counts['locked'], 'rider404' ),
			/* translators: %s: Number of partners. */
			'deleted'   => _n( '%s partner permanently deleted.', '%s partner permanently deleted.', $bulk_counts['deleted'], 'rider404' ),
			/* translators: %s: Number of partners. */
			'trashed'   => _n( '%s partner moved to the Trash.', '%s partner moved to the Trash.', $bulk_counts['trashed'], 'rider404' ),
			/* translators: %s: Number of partners. */
			'untrashed' => _n( '%s partner restored from the Trash.', '%s partner restored from the Trash.', $bulk_counts['untrashed'], 'rider404' ),
		);

		return $bulk_messages;
	}


	/**
	 * Register Custom Post Type
	 *
	 * @return void
	 * @access public
	 */
	public function register() : void {
		$labels = array(
			'name'                     => _x( 'Partners', 'partner type generale name', 'rider404' ),
			'singular_name'            => _x( 'Partner', 'partner type singular name', 'rider404' ),
			'add_new'                  => _x( 'Add New', 'partner type', 'rider404' ),
			'add_new_item'             => __( 'Add New Partner', 'rider404' ),
			'edit_item'                => __( 'Edit Partner', 'rider404' ),
			'new_item'                 => __( 'New Partner', 'rider404' ),
			'view_items'               => __( 'View Partners', 'rider404' ),
			'view_item'                => __( 'View Partner', 'rider404' ),
			'search_items'             => __( 'Search Partners', 'rider404' ),
			'not_found'                => __( 'No Partners found.', 'rider404' ),
			'not_found_in_trash'       => __( 'No Partners found in Trash.', 'rider404' ),
			'parent_item_colon'        => __( 'Parent Partner:', 'rider404' ),
			'all_items'                => __( 'All Partners', 'rider404' ),
			'archives'                 => __( 'Partner Archives', 'rider404' ),
			'attributes'               => __( 'Partner Attributes', 'rider404' ),
			'insert_into_item'         => __( 'Insert into partner', 'rider404' ),
			'uploaded_to_this_item'    => __( 'Uploaded to this partner', 'rider404' ),
			'featured_image'           => _x( 'Featured Image', 'partner', 'rider404' ),
			'set_featured_image'       => _x( 'Set featured image', 'partner', 'rider404' ),
			'remove_featured_image'    => _x( 'Remove featured image', 'partner', 'rider404' ),
			'use_featured_image'       => _x( 'Use as featured image', 'partner', 'rider404' ),
			'items_list_navigation'    => __( 'Partners list navigation', 'rider404' ),
			'items_list'               => __( 'Partners list', 'rider404' ),
			'item_published'           => __( 'Partner published.', 'rider404' ),
			'item_published_privately' => __( 'Partner published privately.', 'rider404' ),
			'item_reverted_to_draft'   => __( 'Partner reverted to draft.', 'rider404' ),
			'item_scheduled'           => __( 'Partner scheduled.', 'rider404' ),
			'item_updated'             => __( 'Partner updated.', 'rider404' ),
		);

		$args = array(
			'label'               => __( 'Partner', 'rider404' ),
			'description'         => __( 'Partner Description', 'rider404' ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'thumbnail' ),
			'public'              => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'menu_icon'           => 'dashicons-groups',
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => false,
			'exclude_from_search' => true,
			'publicly_queryable'  => false,
			'show_in_rest'        => true,
		);

		register_post_type( 'partner', $args );
	}
}
