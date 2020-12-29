<?php
/**
 * Product quantity inputs
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$context = Timber::context();

$context['max_value'] = $max_value;
$context['min_value'] = $min_value;

/* translators: %s: Quantity. */
$context['label'] = ! empty( $args['product_name'] ) ? sprintf( esc_html__( '%s quantity', 'woocommerce' ), wp_strip_all_tags( $args['product_name'] ) ) : esc_html__( 'Quantity', 'woocommerce' );

$context['input_id']    = $input_id;
$context['input_name']  = $input_name;
$context['input_value'] = $input_value;
$context['classes']     = (array) $classes;
$context['step']        = $step;
$context['placeholder'] = $placeholder;
$context['inputmode']   = $inputmode;


Timber::render( 'woocommerce/globals/quantity-input.html.twig', $context );
