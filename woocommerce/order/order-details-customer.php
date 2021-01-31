<?php
/**
 * Order Customer Details
 *
 * @package WordPress
 * @subpackage Rider404
 *
 * @version 3.4.4
 */

defined( 'ABSPATH' ) || exit;

use TImber\{ Timber };

$filename = 'woocommerce/order/order-details-customer.html.twig';

$data                  = array();
$data['order']         = $order;
$data['show_shipping'] = ! wc_ship_to_billing_address_only() && $order->needs_shipping_address();

Timber::render( $filename, $data );
