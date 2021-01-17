<?php
/**
 * Shipping Methods
 *
 * @param array $package
 * @param array $available_methods
 * @param boolean $show_package_details
 * @param boolean $show_shipping_calculator
 * @param string $package_details
 * @param string $package_name
 * @param integer $index
 * @param string $chosen_method
 * @param string $formatted_destination
 * @param boolean $has_calculated_shipping
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 3.6.0
 */

use Timber\{ Timber };

$filename = 'woocommerce/cart/cart-shipping.html.twig';

$data                             = array();
$data['package_name']             = $package_name;
$data['available_methods']        = $available_methods;
$data['index']                    = $index;
$data['chosen_method']            = $chosen_method;
$data['formatted_destination']    = isset( $formatted_destination ) ? $formatted_destination : WC()->countries->get_formatted_address( $package['destination'], ', ' );
$data['has_calculated_shipping']  = ! empty( $has_calculated_shipping );
$data['show_package_details']     = $show_package_details;
$data['package_details']          = $package_details;
$data['show_shipping_calculator'] = ! empty( $show_shipping_calculator );
$data['calculator_text']          = '';
$data['enable_shipping_calc']     = get_option( 'woocommerce_enable_shipping_calc' );

Timber::render( $filename, $data );
