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
 * @package Rider404
 */

use Timber\{ Timber };

$context = Timber::get_context();

$context['package_name']             = $package_name;
$context['available_methods']        = $available_methods;
$context['index']                    = $index;
$context['chosen_method']            = $chosen_method;
$context['formatted_destination']    = isset( $formatted_destination ) ? $formatted_destination : WC()->countries->get_formatted_address( $package['destination'], ', ' );
$context['has_calculated_shipping']  = ! empty( $has_calculated_shipping );
$context['show_package_details']     = $show_package_details;
$context['package_details']          = $package_details;
$context['show_shipping_calculator'] = ! empty( $show_shipping_calculator );

$context['calculator_text']      = '';
$context['enable_shipping_calc'] = get_option( 'woocommerce_enable_shipping_calc' );


Timber::render( 'woocommerce/cart/cart-shipping.html.twig', $context );
