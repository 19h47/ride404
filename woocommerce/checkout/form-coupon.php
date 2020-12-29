<?php
/**
 * Form coupon
 *
 * @package WordPress
 * @subpackage Rider404
 */

use Timber\{ Timber };

$context                    = array();
$context['coupons_enabled'] = wc_coupons_enabled();

Timber::render( 'woocommerce/checkout/form-coupon.html.twig', $context );
