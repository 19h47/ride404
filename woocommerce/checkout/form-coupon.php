<?php
/**
 * Form coupon
 *
 * @package WordPress
 * @subpackage Rider404
 * @version 3.4.4
 */

use Timber\{ Timber };

$context                    = array();
$context['coupons_enabled'] = wc_coupons_enabled();

Timber::render( 'woocommerce/checkout/form-coupon.html.twig', $context );
