<?php
/**
 * Rider404 functions and definitions
 *
 * @link https://ride404.com/
 * @since 0.0.0
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 * @package WordPress
 * @subpackage Rider404
 */

// Autoloader.
require_once get_template_directory() . '/vendor/autoload.php';

Rider404\Init::run_services();
