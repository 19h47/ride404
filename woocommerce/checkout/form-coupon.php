<?php
/**
 * Form coupon
 *
 * @package Rider404
 */

use Timber\{ Timber };

$context = Timber::get_context();

$context['coupons_enabled'] = wc_coupons_enabled();

Timber::render( 'woocommerce/checkout/form-coupon.html.twig', $context );
