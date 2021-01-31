<?php
/**
 * Product quantity inputs
 *
 * @package WordPress
 * @subpackage Rider404
 *
 * @version 4.0.0
 */

use Timber\{ Timber };

$filename = 'woocommerce/globals/quantity-input.html.twig';

/* translators: %s: Quantity. */
$data['label']       = ! empty( $args['product_name'] ) ? sprintf( esc_html__( '%s quantity', 'rider404' ), wp_strip_all_tags( $args['product_name'] ) ) : esc_html__( 'Quantity', 'rider404' );
$data                = Timber::context();
$data['max_value']   = $max_value;
$data['min_value']   = $min_value;
$data['input_id']    = $input_id;
$data['input_name']  = $input_name;
$data['input_value'] = $input_value;
$data['classes']     = (array) $classes;
$data['step']        = $step;
$data['placeholder'] = $placeholder;
$data['inputmode']   = $inputmode;


Timber::render( $filename, $data );
