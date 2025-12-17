<?php
/**
 * Plugin Name: CareerCVPro Job Importer
 * Plugin URI: https://careercvpro.co.za
 * Description: AI-powered job importer using Google Gemini to extract and auto-populate job fields from pasted text or images.
 * Version: 1.0.0
 * Author: CareerCVPro
 * Author URI: https://careercvpro.co.za
 * License: GPL v2 or later
 * Text Domain: careercvpro-job-importer
 */

if (!defined('ABSPATH')) {
    exit;
}

define('CCVP_JOB_IMPORTER_VERSION', '1.0.0');
define('CCVP_JOB_IMPORTER_PATH', plugin_dir_path(__FILE__));
define('CCVP_JOB_IMPORTER_URL', plugin_dir_url(__FILE__));

class CareerCVPro_Job_Importer {
    
    private static $instance = null;
    private $gemini_api_key;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        $this->gemini_api_key = get_option('ccvp_gemini_api_key', '');
        
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
        add_action('wp_ajax_ccvp_extract_job_data', [$this, 'ajax_extract_job_data']);
        add_action('wp_ajax_ccvp_create_job', [$this, 'ajax_create_job']);
        add_action('admin_init', [$this, 'register_settings']);
    }
    
    public function register_settings() {
        register_setting('ccvp_job_importer_settings', 'ccvp_gemini_api_key');
        register_setting('ccvp_job_importer_settings', 'ccvp_gemini_model');
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'Job Importer',
            'Job Importer',
            'edit_posts',
            'ccvp-job-importer',
            [$this, 'render_importer_page'],
            'dashicons-download',
            26
        );
        
        add_submenu_page(
            'ccvp-job-importer',
            'Import Job',
            'Import Job',
            'edit_posts',
            'ccvp-job-importer',
            [$this, 'render_importer_page']
        );
        
        add_submenu_page(
            'ccvp-job-importer',
            'Settings',
            'Settings',
            'manage_options',
            'ccvp-job-importer-settings',
            [$this, 'render_settings_page']
        );
    }
    
    public function enqueue_admin_scripts($hook) {
        if (strpos($hook, 'ccvp-job-importer') === false) {
            return;
        }
        
        wp_enqueue_style(
            'ccvp-job-importer-css',
            CCVP_JOB_IMPORTER_URL . 'assets/css/admin.css',
            [],
            CCVP_JOB_IMPORTER_VERSION
        );
        
        wp_enqueue_script(
            'ccvp-job-importer-js',
            CCVP_JOB_IMPORTER_URL . 'assets/js/admin.js',
            ['jquery'],
            CCVP_JOB_IMPORTER_VERSION,
            true
        );
        
        wp_localize_script('ccvp-job-importer-js', 'ccvpJobImporter', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('ccvp_job_importer_nonce'),
            'provinces' => $this->get_taxonomy_terms('province'),
            'jobCategories' => $this->get_taxonomy_terms('job_category'),
            'jobTypes' => $this->get_taxonomy_terms('job_type'),
        ]);
    }
    
    private function get_taxonomy_terms($taxonomy) {
        $terms = get_terms([
            'taxonomy' => $taxonomy,
            'hide_empty' => false,
        ]);
        
        if (is_wp_error($terms)) {
            return [];
        }
        
        return array_map(function($term) {
            return [
                'id' => $term->term_id,
                'name' => $term->name,
                'slug' => $term->slug,
            ];
        }, $terms);
    }
    
    public function render_settings_page() {
        if (isset($_POST['ccvp_gemini_api_key']) && check_admin_referer('ccvp_settings_nonce')) {
            update_option('ccvp_gemini_api_key', sanitize_text_field($_POST['ccvp_gemini_api_key']));
            update_option('ccvp_gemini_model', sanitize_text_field($_POST['ccvp_gemini_model']));
            echo '<div class="notice notice-success"><p>Settings saved successfully!</p></div>';
        }
        
        $api_key = get_option('ccvp_gemini_api_key', '');
        $model = get_option('ccvp_gemini_model', 'gemini-2.0-flash-lite');
        ?>
        <div class="wrap">
            <h1>Job Importer Settings</h1>
            <form method="post" action="">
                <?php wp_nonce_field('ccvp_settings_nonce'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="ccvp_gemini_api_key">Gemini API Key</label>
                        </th>
                        <td>
                            <input type="password" 
                                   id="ccvp_gemini_api_key" 
                                   name="ccvp_gemini_api_key" 
                                   value="<?php echo esc_attr($api_key); ?>" 
                                   class="regular-text" />
                            <p class="description">
                                Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank">Google AI Studio</a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="ccvp_gemini_model">Gemini Model</label>
                        </th>
                        <td>
                            <select id="ccvp_gemini_model" name="ccvp_gemini_model" class="regular-text">
                                <option value="gemini-2.0-flash-lite" <?php selected($model, 'gemini-2.0-flash-lite'); ?>>Gemini 2.0 Flash Lite (Recommended)</option>
                                <option value="gemini-2.0-flash" <?php selected($model, 'gemini-2.0-flash'); ?>>Gemini 2.0 Flash</option>
                                <option value="gemini-1.5-flash" <?php selected($model, 'gemini-1.5-flash'); ?>>Gemini 1.5 Flash</option>
                                <option value="gemini-1.5-pro" <?php selected($model, 'gemini-1.5-pro'); ?>>Gemini 1.5 Pro</option>
                                <option value="gemini-pro" <?php selected($model, 'gemini-pro'); ?>>Gemini Pro (Legacy)</option>
                            </select>
                            <p class="description">
                                Select the Gemini model to use for extraction. Flash Lite is faster and more cost-effective.
                            </p>
                        </td>
                    </tr>
                </table>
                <?php submit_button('Save Settings'); ?>
            </form>
        </div>
        <?php
    }
    
    public function render_importer_page() {
        $api_key = get_option('ccvp_gemini_api_key', '');
        
        if (empty($api_key)) {
            echo '<div class="wrap">';
            echo '<h1>Job Importer</h1>';
            echo '<div class="notice notice-error"><p>Please configure your Gemini API key in <a href="' . admin_url('admin.php?page=ccvp-job-importer-settings') . '">Settings</a> first.</p></div>';
            echo '</div>';
            return;
        }
        
        include CCVP_JOB_IMPORTER_PATH . 'templates/importer-page.php';
    }
    
    public function ajax_extract_job_data() {
        check_ajax_referer('ccvp_job_importer_nonce', 'nonce');
        
        if (!current_user_can('edit_posts')) {
            wp_send_json_error(['message' => 'Permission denied']);
        }
        
        $raw_text = isset($_POST['raw_text']) ? sanitize_textarea_field($_POST['raw_text']) : '';
        $image_data = isset($_POST['image_data']) ? $_POST['image_data'] : '';
        
        if (empty($raw_text) && empty($image_data)) {
            wp_send_json_error(['message' => 'Please provide job text or image']);
        }
        
        $api_key = get_option('ccvp_gemini_api_key', '');
        
        if (empty($api_key)) {
            wp_send_json_error(['message' => 'Gemini API key not configured']);
        }
        
        $result = $this->extract_with_gemini($raw_text, $image_data, $api_key);
        
        if (is_wp_error($result)) {
            wp_send_json_error(['message' => $result->get_error_message()]);
        }
        
        wp_send_json_success($result);
    }
    
    private function extract_with_gemini($text, $image_data, $api_key) {
        $prompt = $this->build_extraction_prompt();
        
        $parts = [];
        $parts[] = ['text' => $prompt];
        
        if (!empty($image_data)) {
            // Handle base64 image
            $image_parts = explode(',', $image_data);
            $mime_match = [];
            preg_match('/data:([^;]+);/', $image_data, $mime_match);
            $mime_type = isset($mime_match[1]) ? $mime_match[1] : 'image/jpeg';
            
            $parts[] = [
                'inline_data' => [
                    'mime_type' => $mime_type,
                    'data' => end($image_parts)
                ]
            ];
        }
        
        if (!empty($text)) {
            $parts[] = ['text' => "Job posting content:\n\n" . $text];
        }
        
        $model = get_option('ccvp_gemini_model', 'gemini-2.0-flash-lite');
        $url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$api_key}";
        
        $body = [
            'contents' => [
                ['parts' => $parts]
            ],
            'generationConfig' => [
                'temperature' => 0.1,
                'topP' => 0.8,
                'topK' => 40,
                'maxOutputTokens' => 2048,
            ]
        ];
        
        $response = wp_remote_post($url, [
            'headers' => ['Content-Type' => 'application/json'],
            'body' => json_encode($body),
            'timeout' => 60,
        ]);
        
        if (is_wp_error($response)) {
            return $response;
        }
        
        $response_code = wp_remote_retrieve_response_code($response);
        $response_body = wp_remote_retrieve_body($response);
        
        if ($response_code !== 200) {
            $error_data = json_decode($response_body, true);
            $error_message = isset($error_data['error']['message']) ? $error_data['error']['message'] : 'API request failed';
            return new WP_Error('api_error', $error_message);
        }
        
        $data = json_decode($response_body, true);
        
        if (!isset($data['candidates'][0]['content']['parts'][0]['text'])) {
            return new WP_Error('parse_error', 'Failed to parse Gemini response');
        }
        
        $json_text = $data['candidates'][0]['content']['parts'][0]['text'];
        
        // Extract JSON from markdown code blocks if present
        if (preg_match('/```(?:json)?\s*([\s\S]*?)```/', $json_text, $matches)) {
            $json_text = trim($matches[1]);
        }
        
        $job_data = json_decode($json_text, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            return new WP_Error('json_error', 'Failed to parse job data: ' . json_last_error_msg());
        }
        
        return $job_data;
    }
    
    private function build_extraction_prompt() {
        return <<<PROMPT
You are a job data extraction assistant. Extract job posting information and return it as a valid JSON object.

Extract the following fields:
- title: Job title/position name
- company_name: Company/employer name
- company_logo_url: URL to company logo image (if visible in the posting)
- location: City, area, or region
- province: South African province (Gauteng, Western Cape, KwaZulu-Natal, Eastern Cape, Free State, Limpopo, Mpumalanga, North West, Northern Cape)
- salary_range: Salary information (use "Market Related" if not specified)
- application_deadline: Date in YYYY-MM-DD format (use 30 days from now if not specified)
- application_email: Email to send applications
- external_apply_url: External URL to apply (if different from email)
- company_website: Company website URL
- contact_phone: Contact phone number
- job_type: Type of employment (Full-time, Part-time, Contract, Temporary, Internship, Freelance)
- job_categories: Array of relevant categories (e.g., ["Healthcare", "Nursing"], ["IT", "Software Development"], ["Sales", "Retail"])
- description: Full job description in HTML format with proper headings and lists
- excerpt: Short summary (1-2 sentences)
- is_featured: true/false (default false)
- is_urgent: true/false (default false)

Return ONLY a valid JSON object with these fields. Do not include any explanation or markdown formatting.

Example output:
{
  "title": "Software Developer",
  "company_name": "Tech Corp",
  "company_logo_url": "https://example.com/logo.png",
  "location": "Sandton",
  "province": "Gauteng",
  "salary_range": "R30,000 - R45,000 per month",
  "application_deadline": "2025-01-15",
  "application_email": "jobs@techcorp.co.za",
  "external_apply_url": "",
  "company_website": "https://techcorp.co.za",
  "contact_phone": "011 123 4567",
  "job_type": "Full-time",
  "job_categories": ["IT", "Software Development"],
  "description": "<h2>About the Role</h2><p>We are looking for...</p>",
  "excerpt": "Tech Corp is hiring a Software Developer in Sandton.",
  "is_featured": false,
  "is_urgent": false
}

PROMPT;
    }
    
    public function ajax_create_job() {
        check_ajax_referer('ccvp_job_importer_nonce', 'nonce');
        
        if (!current_user_can('edit_posts')) {
            wp_send_json_error(['message' => 'Permission denied']);
        }
        
        $job_data = isset($_POST['job_data']) ? $_POST['job_data'] : [];
        
        if (empty($job_data['title'])) {
            wp_send_json_error(['message' => 'Job title is required']);
        }
        
        // Create the job post
        $post_data = [
            'post_title' => sanitize_text_field($job_data['title']),
            'post_content' => wp_kses_post($job_data['description'] ?? ''),
            'post_excerpt' => sanitize_text_field($job_data['excerpt'] ?? ''),
            'post_status' => 'publish',
            'post_type' => 'job',
        ];
        
        $post_id = wp_insert_post($post_data);
        
        if (is_wp_error($post_id)) {
            wp_send_json_error(['message' => $post_id->get_error_message()]);
        }
        
        // Set taxonomies
        if (!empty($job_data['province'])) {
            wp_set_object_terms($post_id, sanitize_text_field($job_data['province']), 'province');
        }
        
        if (!empty($job_data['job_categories']) && is_array($job_data['job_categories'])) {
            $categories = array_map('sanitize_text_field', $job_data['job_categories']);
            wp_set_object_terms($post_id, $categories, 'job_category');
        }
        
        if (!empty($job_data['job_type'])) {
            wp_set_object_terms($post_id, sanitize_text_field($job_data['job_type']), 'job_type');
        }
        
        // Set ACF custom fields
        $acf_fields = [
            'company_name' => $job_data['company_name'] ?? '',
            'location' => $job_data['location'] ?? '',
            'salary_range' => $job_data['salary_range'] ?? 'Market Related',
            'application_deadline' => $job_data['application_deadline'] ?? '',
            'application_email' => $job_data['application_email'] ?? '',
            'external_apply_url' => $job_data['external_apply_url'] ?? '',
            'company_website' => $job_data['company_website'] ?? '',
            'contact_phone' => $job_data['contact_phone'] ?? '',
            'is_featured' => !empty($job_data['is_featured']) ? 1 : 0,
            'is_urgent' => !empty($job_data['is_urgent']) ? 1 : 0,
        ];
        
        foreach ($acf_fields as $key => $value) {
            update_post_meta($post_id, $key, sanitize_text_field($value));
        }
        
        // Handle featured image
        $featured_image_id = null;
        
        // If image was uploaded during extraction, use it
        if (!empty($job_data['featured_image_id'])) {
            $featured_image_id = intval($job_data['featured_image_id']);
        }
        // If URL provided, try to sideload it
        elseif (!empty($job_data['company_logo_url'])) {
            $featured_image_id = $this->sideload_image($job_data['company_logo_url'], $post_id);
        }
        // If base64 image data provided (from extraction)
        elseif (!empty($job_data['featured_image_data'])) {
            $featured_image_id = $this->upload_base64_image($job_data['featured_image_data'], $post_id, $job_data['title']);
        }
        
        if ($featured_image_id && !is_wp_error($featured_image_id)) {
            set_post_thumbnail($post_id, $featured_image_id);
        }
        
        wp_send_json_success([
            'message' => 'Job created successfully!',
            'post_id' => $post_id,
            'edit_url' => get_edit_post_link($post_id, 'raw'),
            'view_url' => get_permalink($post_id),
        ]);
    }
    
    /**
     * Sideload image from URL and attach to post
     */
    private function sideload_image($url, $post_id) {
        if (empty($url)) {
            return false;
        }
        
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        
        // Download the image
        $tmp = download_url($url);
        
        if (is_wp_error($tmp)) {
            return $tmp;
        }
        
        // Get file info
        $file_array = [
            'name' => basename(parse_url($url, PHP_URL_PATH)),
            'tmp_name' => $tmp,
        ];
        
        // If no extension, add .jpg
        if (!preg_match('/\.(jpg|jpeg|png|gif|webp)$/i', $file_array['name'])) {
            $file_array['name'] .= '.jpg';
        }
        
        // Sideload the image
        $id = media_handle_sideload($file_array, $post_id);
        
        // Clean up temp file
        if (file_exists($tmp)) {
            @unlink($tmp);
        }
        
        return $id;
    }
    
    /**
     * Upload base64 image data and attach to post
     */
    private function upload_base64_image($base64_data, $post_id, $title = 'job-image') {
        if (empty($base64_data)) {
            return false;
        }
        
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        
        // Extract mime type and data
        $matches = [];
        if (!preg_match('/^data:image\/(\w+);base64,(.+)$/', $base64_data, $matches)) {
            return false;
        }
        
        $extension = $matches[1];
        $data = base64_decode($matches[2]);
        
        if ($data === false) {
            return false;
        }
        
        // Create filename
        $filename = sanitize_title($title) . '-' . time() . '.' . $extension;
        
        // Upload to WordPress
        $upload = wp_upload_bits($filename, null, $data);
        
        if (!empty($upload['error'])) {
            return new WP_Error('upload_error', $upload['error']);
        }
        
        // Create attachment
        $attachment = [
            'post_mime_type' => 'image/' . $extension,
            'post_title' => sanitize_text_field($title),
            'post_content' => '',
            'post_status' => 'inherit',
        ];
        
        $attach_id = wp_insert_attachment($attachment, $upload['file'], $post_id);
        
        if (is_wp_error($attach_id)) {
            return $attach_id;
        }
        
        // Generate attachment metadata
        $attach_data = wp_generate_attachment_metadata($attach_id, $upload['file']);
        wp_update_attachment_metadata($attach_id, $attach_data);
        
        return $attach_id;
    }
}

// Initialize the plugin
add_action('plugins_loaded', function() {
    CareerCVPro_Job_Importer::get_instance();
});

// Activation hook
register_activation_hook(__FILE__, function() {
    // Create necessary database tables or options if needed
    add_option('ccvp_gemini_api_key', '');
});

// Deactivation hook
register_deactivation_hook(__FILE__, function() {
    // Cleanup if needed
});
