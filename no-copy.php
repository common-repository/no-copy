<?php
/*
Plugin Name: No Copy
Plugin URI: http://mohanjith.com/wordpress/no-copy.html
Description: No Copy plugin prevents users from using their context menu (right click) on your blog
Author: S H Mohanjith
Version: 1.1.4
Author URI: http://mohanjith.com/
License: GPL
*/

class no_copy_plugin {
	public $current_version = '1.1.4';
	
	public function __construct() {
		add_action('init', array(&$this, 'init'));
		add_action('wp_head', array(&$this, 'wp_head'), 1);
	}

	public function init() {
		wp_register_script('nocopy_js', plugins_url('no-copy/no-copy.js'), array('jquery'), $this->current_version, true);
	}
	
	public function wp_head() {
		global $current_user;
		
		if ($current_user->wp_capabilities['administrator'] != 1) {
			wp_enqueue_script('nocopy_js');
		}
	}
}

// If we're not running in PHP 4, initialize
if (strpos(phpversion(), '4') !== 0) {
	$no_copy &= new no_copy_plugin();
}
