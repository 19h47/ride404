<?php // phpcs:ignore
/**
 * Class Post
 *
 * @package WordPress
 * @subpackage Rider404
 */

namespace Rider404\Post;

use Timber\{ Timber };

/**
 * Post class
 */
class Post {

	/**
	 * Runs initialization tasks.
	 *
	 * @access public
	 */
	public function run() {
		add_action( 'wp_ajax_nopriv_load_more_posts', array( $this, 'load_more_posts' ) );
		add_action( 'wp_ajax_load_more_posts', array( $this, 'load_more_posts' ) );
	}


	/**
	 * Load posts with AJAX request.
	 */
	public function load_more_posts() {
		if ( ! isset( $_GET['nonce'] ) && ! wp_verify_nonce( sanitize_key( $_GET['nonce'] ), 'security' ) ) {
			return false;
		}

		$post_type      = sanitize_text_field( wp_unslash( $_GET['postType'] ) ) ?? 'post'; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotValidated, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$offset         = sanitize_text_field( wp_unslash( $_GET['offset'] ) ) ?? 0; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotValidated, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$posts_per_page = sanitize_text_field( wp_unslash( $_GET['postsPerPage'] ) ) ?? 3; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotValidated, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$taxonmy        = json_decode( wp_unslash( $_GET['taxonomy'] ) ) ?? array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotValidated, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$filters        = json_decode( wp_unslash( $_GET['filters'] ) ) ?? array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotValidated, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$s              = sanitize_text_field( wp_unslash( $_GET['s'] ) ) ?? false; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotValidated, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$view           = sanitize_text_field( wp_unslash( $_GET['view'] ) ) ?? false; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotValidated, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized

		$args = array(
			'post_type'      => $post_type,
			'posts_per_page' => $posts_per_page,
			'offset'         => $offset,
			'post_status'    => 'publish',
		);

		if ( $taxonmy ) {
			$args['tax_query'][] = array(
				'taxonomy' => $taxonmy->taxonomy,
				'field'    => 'term_id',
				'terms'    => $taxonmy->term_id,
			);

			$args['tax_query']['relation'] = 'AND';
		}

		if ( is_array( $filters ) ) {
			$filters_query = array( 'relation' => 'OR' );

			foreach ( $filters as $filter ) {
				$filters_query[] = array(
					'taxonomy' => $filter->taxonomy,
					'field'    => 'term_id',
					'terms'    => $filter->term_id,
				);
			}

			$args['tax_query'][] = $filters_query;
		}

		if ( $s ) {
			$args['s'] = $s;
		}

		// Timber.
		$context = Timber::get_context();

		$context['posts']       = Timber::get_posts( $args );
		$context['found_posts'] = $context['posts']->found_posts;
		$html                   = wp_json_encode( Timber::compile( 'components/collection-post.html.twig', $context ) );

		// if ( $context['posts']->found_posts > 0 ) {
		// 	$html = wp_json_encode( Timber::compile( 'components/collection-' . str_replace( '_', '-', $post_type ) . ( $view ? "-$view" : '' ) . '.html.twig', $context ) );
		// }

		wp_send_json(
			array(
				'html'       => $html,
				'foundPosts' => $context['posts']->found_posts,
			)
		);

		wp_die();
	}
}

