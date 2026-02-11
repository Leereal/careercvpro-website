<?php
/**
 * Plugin Name: CareerCVPro Post Importer
 * Plugin URI: https://careercvpro.co.za
 * Description: AI-powered content importer with rich text editing, image embedding, and content transformation options (humanize, rewrite, expand, summarize). Integrates with WPGraphQL for headless access.
 * Version: 1.1.0
 * Author: CareerCVPro
 * Author URI: https://careercvpro.co.za
 * License: GPL v2 or later
 * Text Domain: careercvpro-post-importer
 */

if (!defined('ABSPATH')) {
    exit;
}

define('CCVP_POST_IMPORTER_VERSION', '1.1.0');
define('CCVP_POST_IMPORTER_PATH', plugin_dir_path(__FILE__));
define('CCVP_POST_IMPORTER_URL', plugin_dir_url(__FILE__));

class CareerCVPro_Post_Importer {
    
    private static $instance = null;
    private $gemini_api_key;
    
    // Content processing modes
    const MODE_AS_IS = 'as_is';
    const MODE_HUMANIZE = 'humanize';
    const MODE_REWRITE = 'rewrite';
    const MODE_EXPAND = 'expand';
    const MODE_SUMMARIZE = 'summarize';
    
    // Article categories (taxonomy terms)
    const CATEGORIES = [
        'cv-guides' => 'CV Guides',
        'interview-guides' => 'Interview Guides',
        'job-search-guides' => 'Job Search Guides',
        'workplace-guides' => 'Workplace Guides',
    ];
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        $this->gemini_api_key = get_option('ccvp_gemini_api_key', '');
        
        // Register custom taxonomy for article categories
        add_action('init', [$this, 'register_article_category_taxonomy']);
        
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
        add_action('admin_init', [$this, 'register_settings']);
        
        // AJAX handlers
        add_action('wp_ajax_ccvp_process_content', [$this, 'ajax_process_content']);
        add_action('wp_ajax_ccvp_upload_inline_image', [$this, 'ajax_upload_inline_image']);
        add_action('wp_ajax_ccvp_create_article', [$this, 'ajax_create_article']);
        add_action('wp_ajax_ccvp_get_articles', [$this, 'ajax_get_articles']);
        add_action('wp_ajax_ccvp_delete_article', [$this, 'ajax_delete_article']);
        
        // Register custom fields for WPGraphQL
        add_action('graphql_register_types', [$this, 'register_graphql_fields']);
    }
    
    /**
     * Register custom taxonomy for article categories
     */
    public function register_article_category_taxonomy() {
        $labels = [
            'name'              => 'Career Article Categories',
            'singular_name'     => 'Career Article Category',
            'search_items'      => 'Search Categories',
            'all_items'         => 'All Categories',
            'parent_item'       => 'Parent Category',
            'parent_item_colon' => 'Parent Category:',
            'edit_item'         => 'Edit Category',
            'update_item'       => 'Update Category',
            'add_new_item'      => 'Add New Category',
            'new_item_name'     => 'New Category Name',
            'menu_name'         => 'Career Categories',
        ];

        $args = [
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => ['slug' => 'career-category'],
            'show_in_rest'      => true,
            'show_in_graphql'   => true,
            'graphql_single_name' => 'careerCategory',
            'graphql_plural_name' => 'careerCategories',
        ];

        register_taxonomy('career_category', ['post'], $args);
        
        // Create default terms if they don't exist
        foreach (self::CATEGORIES as $slug => $name) {
            if (!term_exists($slug, 'career_category')) {
                wp_insert_term($name, 'career_category', ['slug' => $slug]);
            }
        }
    }
    
    /**
     * Register custom fields for WPGraphQL
     * Only runs if WPGraphQL plugin is active
     */
    public function register_graphql_fields() {
        // Check if WPGraphQL functions exist
        if (!function_exists('register_graphql_field')) {
            return;
        }
        
        $plugin = $this; // Capture $this for closures
        
        // Register post meta fields for GraphQL
        register_graphql_field('Post', 'readTime', [
            'type' => 'String',
            'description' => 'Estimated reading time',
            'resolve' => function($post) use ($plugin) {
                $read_time = get_post_meta($post->ID, 'ccvp_read_time', true);
                if ($read_time) {
                    return $read_time;
                }
                // Calculate read time
                $word_count = str_word_count(strip_tags($post->post_content));
                $minutes = max(1, ceil($word_count / 200));
                return $minutes . ' min read';
            }
        ]);
        
        register_graphql_field('Post', 'isFeaturedArticle', [
            'type' => 'Boolean',
            'description' => 'Whether this is a featured article',
            'resolve' => function($post) {
                return get_post_meta($post->ID, 'ccvp_featured', true) === '1';
            }
        ]);
        
        register_graphql_field('Post', 'seoTitle', [
            'type' => 'String',
            'description' => 'SEO title',
            'resolve' => function($post) {
                return get_post_meta($post->ID, 'ccvp_seo_title', true) ?: $post->post_title;
            }
        ]);
        
        register_graphql_field('Post', 'seoDescription', [
            'type' => 'String',
            'description' => 'SEO description',
            'resolve' => function($post) {
                return get_post_meta($post->ID, 'ccvp_seo_description', true) ?: $post->post_excerpt;
            }
        ]);
        
        register_graphql_field('Post', 'articleTags', [
            'type' => ['list_of' => 'String'],
            'description' => 'Article tags',
            'resolve' => function($post) {
                $tags = get_post_meta($post->ID, 'ccvp_tags', true);
                return $tags ? array_map('trim', explode(',', $tags)) : [];
            }
        ]);
    }
    
    public function register_settings() {
        register_setting('ccvp_post_importer_settings', 'ccvp_gemini_api_key');
        register_setting('ccvp_post_importer_settings', 'ccvp_gemini_model');
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'Post Importer',
            'Post Importer',
            'edit_posts',
            'ccvp-post-importer',
            [$this, 'render_importer_page'],
            'dashicons-media-document',
            27
        );
        
        add_submenu_page(
            'ccvp-post-importer',
            'Import Article',
            'Import Article',
            'edit_posts',
            'ccvp-post-importer',
            [$this, 'render_importer_page']
        );
        
        add_submenu_page(
            'ccvp-post-importer',
            'Manage Articles',
            'Manage Articles',
            'edit_posts',
            'ccvp-post-importer-manage',
            [$this, 'render_manage_page']
        );
        
        add_submenu_page(
            'ccvp-post-importer',
            'Settings',
            'Settings',
            'manage_options',
            'ccvp-post-importer-settings',
            [$this, 'render_settings_page']
        );
    }
    
    public function enqueue_admin_scripts($hook) {
        if (strpos($hook, 'ccvp-post-importer') === false) {
            return;
        }
        
        // Enqueue WordPress media library
        wp_enqueue_media();
        
        // Enqueue WordPress editor
        wp_enqueue_editor();
        
        // Enqueue our styles
        wp_enqueue_style(
            'ccvp-post-importer-css',
            CCVP_POST_IMPORTER_URL . 'assets/css/admin.css',
            [],
            CCVP_POST_IMPORTER_VERSION
        );
        
        // Enqueue our scripts
        wp_enqueue_script(
            'ccvp-post-importer-js',
            CCVP_POST_IMPORTER_URL . 'assets/js/admin.js',
            ['jquery', 'wp-editor', 'quicktags'],
            CCVP_POST_IMPORTER_VERSION,
            true
        );
        
        wp_localize_script('ccvp-post-importer-js', 'ccvpPostImporter', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('ccvp_post_importer_nonce'),
            'categories' => self::CATEGORIES,
            'processingModes' => [
                self::MODE_AS_IS => 'Use As-Is',
                self::MODE_HUMANIZE => 'Humanize (Make Human-Written)',
                self::MODE_REWRITE => 'Rewrite (In My Own Words)',
                self::MODE_EXPAND => 'Expand (Add More Detail)',
                self::MODE_SUMMARIZE => 'Summarize (Condense)',
            ],
            'wordCountOptions' => [
                300 => 'Short (~300 words)',
                500 => 'Brief (~500 words)',
                800 => 'Medium (~800 words)',
                1200 => 'Long (~1200 words)',
                1800 => 'Very Long (~1800 words)',
                2500 => 'Comprehensive (~2500 words)',
            ],
        ]);
    }
    
    public function render_settings_page() {
        if (isset($_POST['ccvp_submit_settings']) && check_admin_referer('ccvp_post_settings_nonce')) {
            update_option('ccvp_gemini_api_key', sanitize_text_field($_POST['ccvp_gemini_api_key'] ?? ''));
            update_option('ccvp_gemini_model', sanitize_text_field($_POST['ccvp_gemini_model'] ?? 'gemini-2.0-flash-lite'));
            echo '<div class="notice notice-success"><p>Settings saved successfully!</p></div>';
        }
        
        $api_key = get_option('ccvp_gemini_api_key', '');
        $model = get_option('ccvp_gemini_model', 'gemini-2.0-flash-lite');
        ?>
        <div class="wrap ccvp-post-importer">
            <h1>
                <span class="dashicons dashicons-admin-settings"></span>
                Post Importer Settings
            </h1>
            
            <form method="post" action="">
                <?php wp_nonce_field('ccvp_post_settings_nonce'); ?>
                
                <div class="ccvp-settings-grid">
                    <div class="ccvp-card">
                        <h2>Google Gemini AI</h2>
                        <p class="description">Configure AI settings for content processing.</p>
                        
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
                                        <option value="gemini-2.0-flash-lite" <?php selected($model, 'gemini-2.0-flash-lite'); ?>>Gemini 2.0 Flash Lite (Fast)</option>
                                        <option value="gemini-2.0-flash" <?php selected($model, 'gemini-2.0-flash'); ?>>Gemini 2.0 Flash</option>
                                        <option value="gemini-1.5-pro" <?php selected($model, 'gemini-1.5-pro'); ?>>Gemini 1.5 Pro (Best Quality)</option>
                                        <option value="gemini-1.5-flash" <?php selected($model, 'gemini-1.5-flash'); ?>>Gemini 1.5 Flash</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="ccvp-card">
                        <h2>WPGraphQL Integration</h2>
                        <p class="description">Articles are exposed via WPGraphQL for your Next.js frontend.</p>
                        
                        <table class="form-table">
                            <tr>
                                <th scope="row">Status</th>
                                <td>
                                    <?php if (class_exists('WPGraphQL')): ?>
                                        <span style="color: green;">✓ WPGraphQL is active</span>
                                        <p class="description">
                                            Articles are accessible at: <code><?php echo home_url('/graphql'); ?></code>
                                        </p>
                                    <?php else: ?>
                                        <span style="color: orange;">⚠ WPGraphQL not installed</span>
                                        <p class="description">
                                            Install <a href="https://wordpress.org/plugins/wp-graphql/" target="_blank">WPGraphQL</a> to enable headless access to articles.
                                        </p>
                                    <?php endif; ?>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Taxonomy</th>
                                <td>
                                    <code>career_category</code> - Custom taxonomy for article categories
                                    <p class="description">
                                        Categories: cv-guides, interview-guides, job-search-guides, workplace-guides
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <p class="submit">
                    <input type="submit" name="ccvp_submit_settings" class="button button-primary" value="Save Settings" />
                </p>
            </form>
        </div>
        <?php
    }
    
    public function render_importer_page() {
        $api_key = get_option('ccvp_gemini_api_key', '');
        
        if (empty($api_key)) {
            echo '<div class="wrap">';
            echo '<h1>Post Importer</h1>';
            echo '<div class="notice notice-error"><p>Please configure your Gemini API key in <a href="' . admin_url('admin.php?page=ccvp-post-importer-settings') . '">Settings</a> first.</p></div>';
            echo '</div>';
            return;
        }
        
        include CCVP_POST_IMPORTER_PATH . 'templates/importer-page.php';
    }
    
    public function render_manage_page() {
        include CCVP_POST_IMPORTER_PATH . 'templates/manage-page.php';
    }
    
    /**
     * AJAX: Process content with AI
     */
    public function ajax_process_content() {
        check_ajax_referer('ccvp_post_importer_nonce', 'nonce');
        
        if (!current_user_can('edit_posts')) {
            wp_send_json_error(['message' => 'Permission denied']);
        }
        
        $content = isset($_POST['content']) ? wp_kses_post($_POST['content']) : '';
        $mode = isset($_POST['mode']) ? sanitize_text_field($_POST['mode']) : self::MODE_AS_IS;
        $word_count = isset($_POST['word_count']) ? intval($_POST['word_count']) : 800;
        $tone = isset($_POST['tone']) ? sanitize_text_field($_POST['tone']) : 'professional';
        $audience = isset($_POST['audience']) ? sanitize_text_field($_POST['audience']) : 'South African job seekers';
        
        if (empty($content)) {
            wp_send_json_error(['message' => 'Please provide content to process']);
        }
        
        // If mode is as-is, just return the content
        if ($mode === self::MODE_AS_IS) {
            wp_send_json_success(['content' => $content]);
        }
        
        $api_key = get_option('ccvp_gemini_api_key', '');
        
        if (empty($api_key)) {
            wp_send_json_error(['message' => 'Gemini API key not configured']);
        }
        
        $result = $this->process_with_gemini($content, $mode, $word_count, $tone, $audience, $api_key);
        
        if (is_wp_error($result)) {
            wp_send_json_error(['message' => $result->get_error_message()]);
        }
        
        wp_send_json_success(['content' => $result]);
    }
    
    /**
     * Process content with Gemini AI
     */
    private function process_with_gemini($content, $mode, $word_count, $tone, $audience, $api_key) {
        $prompt = $this->build_processing_prompt($mode, $word_count, $tone, $audience);
        
        $parts = [];
        $parts[] = ['text' => $prompt];
        $parts[] = ['text' => "Content to process:\n\n" . strip_tags($content)];
        
        $model = get_option('ccvp_gemini_model', 'gemini-2.0-flash-lite');
        $url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$api_key}";
        
        $body = [
            'contents' => [
                ['parts' => $parts]
            ],
            'generationConfig' => [
                'temperature' => $this->get_temperature_for_mode($mode),
                'topP' => 0.9,
                'topK' => 40,
                'maxOutputTokens' => 8192,
            ]
        ];
        
        $response = wp_remote_post($url, [
            'headers' => ['Content-Type' => 'application/json'],
            'body' => json_encode($body),
            'timeout' => 120,
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
        
        $processed_content = $data['candidates'][0]['content']['parts'][0]['text'];
        
        // Clean up any markdown code blocks
        $processed_content = preg_replace('/```(?:html)?\s*([\s\S]*?)```/', '$1', $processed_content);
        
        return trim($processed_content);
    }
    
    /**
     * Build AI processing prompt based on mode
     */
    private function build_processing_prompt($mode, $word_count, $tone, $audience) {
        $base_instructions = "You are an expert content writer specializing in career advice for {$audience}. ";
        $base_instructions .= "Write in a {$tone} tone. Target approximately {$word_count} words. ";
        $base_instructions .= "Output properly formatted HTML with appropriate tags (<h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, etc.). ";
        $base_instructions .= "Do NOT include <html>, <head>, or <body> tags. Only output the article content. ";
        
        switch ($mode) {
            case self::MODE_HUMANIZE:
                return $base_instructions . <<<PROMPT

Your task is to HUMANIZE this content. Make it sound like it was written by a friendly, experienced career coach who genuinely wants to help.

Guidelines:
- Add personal touches and relatable examples
- Use conversational language without being unprofessional
- Include rhetorical questions to engage readers
- Add transitions that flow naturally
- Use contractions where appropriate (you'll, it's, don't)
- Include South African context and references where relevant
- Break up long paragraphs for readability
- Add helpful tips or insights from experience
- Make it feel warm and encouraging

PROMPT;
            
            case self::MODE_REWRITE:
                return $base_instructions . <<<PROMPT

Your task is to REWRITE this content in fresh, original words while keeping the core information.

Guidelines:
- Express the same ideas using completely different phrasing
- Restructure sentences and paragraphs
- Use synonyms and alternative expressions
- Maintain all factual information
- Add relevant South African context
- Improve clarity where possible
- Keep the same general structure but vary sentence patterns
- Make it unique while preserving accuracy

PROMPT;
            
            case self::MODE_EXPAND:
                return $base_instructions . <<<PROMPT

Your task is to EXPAND this content with more detail, examples, and valuable information.

Guidelines:
- Add detailed explanations for key concepts
- Include practical examples and scenarios
- Add actionable tips and step-by-step guidance
- Include relevant statistics or facts (South African where possible)
- Add FAQ-style sections if appropriate
- Include pro tips and expert insights
- Add subsections to break up long content
- Include real-world applications
- Make it comprehensive and thorough

PROMPT;
            
            case self::MODE_SUMMARIZE:
                return $base_instructions . <<<PROMPT

Your task is to SUMMARIZE this content into a concise, actionable piece.

Guidelines:
- Extract the most important points
- Create bullet point lists for key takeaways
- Remove redundant information
- Keep essential facts and advice
- Make every word count
- Prioritize actionable information
- Include a quick summary at the end
- Focus on what readers need to know most

PROMPT;
            
            default:
                return $base_instructions . "Clean up and format this content as proper HTML.";
        }
    }
    
    /**
     * Get temperature setting based on processing mode
     */
    private function get_temperature_for_mode($mode) {
        switch ($mode) {
            case self::MODE_HUMANIZE:
                return 0.8; // More creative
            case self::MODE_EXPAND:
                return 0.7;
            case self::MODE_REWRITE:
                return 0.6;
            case self::MODE_SUMMARIZE:
                return 0.3; // More focused
            default:
                return 0.5;
        }
    }
    
    /**
     * AJAX: Upload inline image
     */
    public function ajax_upload_inline_image() {
        check_ajax_referer('ccvp_post_importer_nonce', 'nonce');
        
        if (!current_user_can('upload_files')) {
            wp_send_json_error(['message' => 'Permission denied']);
        }
        
        if (empty($_FILES['image'])) {
            wp_send_json_error(['message' => 'No image provided']);
        }
        
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        
        $attachment_id = media_handle_upload('image', 0);
        
        if (is_wp_error($attachment_id)) {
            wp_send_json_error(['message' => $attachment_id->get_error_message()]);
        }
        
        $url = wp_get_attachment_url($attachment_id);
        $alt = isset($_POST['alt']) ? sanitize_text_field($_POST['alt']) : '';
        
        wp_send_json_success([
            'id' => $attachment_id,
            'url' => $url,
            'alt' => $alt,
        ]);
    }
    
    /**
     * AJAX: Create article
     */
    public function ajax_create_article() {
        check_ajax_referer('ccvp_post_importer_nonce', 'nonce');
        
        if (!current_user_can('edit_posts')) {
            wp_send_json_error(['message' => 'Permission denied']);
        }
        
        $article_data = isset($_POST['article_data']) ? $_POST['article_data'] : [];
        
        if (empty($article_data['title'])) {
            wp_send_json_error(['message' => 'Article title is required']);
        }
        
        // Create the WordPress post
        $post_data = [
            'post_title' => sanitize_text_field($article_data['title']),
            'post_content' => wp_kses_post($article_data['content'] ?? ''),
            'post_excerpt' => sanitize_textarea_field($article_data['excerpt'] ?? ''),
            'post_status' => sanitize_text_field($article_data['status'] ?? 'draft'),
            'post_type' => 'post',
        ];
        
        $post_id = wp_insert_post($post_data);
        
        if (is_wp_error($post_id)) {
            wp_send_json_error(['message' => $post_id->get_error_message()]);
        }
        
        // Set the career category taxonomy term
        $category = sanitize_text_field($article_data['category'] ?? 'cv-guides');
        wp_set_object_terms($post_id, $category, 'career_category');
        
        // Set post meta
        $meta_fields = [
            'ccvp_read_time' => $article_data['read_time'] ?? '',
            'ccvp_featured' => !empty($article_data['is_featured']) ? '1' : '0',
            'ccvp_seo_title' => $article_data['seo_title'] ?? '',
            'ccvp_seo_description' => $article_data['seo_description'] ?? '',
            'ccvp_tags' => $article_data['tags'] ?? '',
        ];
        
        foreach ($meta_fields as $key => $value) {
            update_post_meta($post_id, $key, sanitize_text_field($value));
        }
        
        // Handle featured image
        if (!empty($article_data['featured_image_id'])) {
            set_post_thumbnail($post_id, intval($article_data['featured_image_id']));
        } elseif (!empty($article_data['featured_image_url'])) {
            $featured_image_id = $this->sideload_image($article_data['featured_image_url'], $post_id);
            if ($featured_image_id && !is_wp_error($featured_image_id)) {
                set_post_thumbnail($post_id, $featured_image_id);
            }
        }
        
        wp_send_json_success([
            'message' => 'Article created successfully!',
            'post_id' => $post_id,
            'edit_url' => get_edit_post_link($post_id, 'raw'),
            'view_url' => get_permalink($post_id),
        ]);
    }
    
    /**
     * Calculate read time from content
     */
    private function calculate_read_time($content) {
        $word_count = str_word_count(strip_tags($content));
        $minutes = ceil($word_count / 200); // Average reading speed
        return $minutes . ' min read';
    }
    
    /**
     * AJAX: Get articles
     */
    public function ajax_get_articles() {
        check_ajax_referer('ccvp_post_importer_nonce', 'nonce');
        
        if (!current_user_can('edit_posts')) {
            wp_send_json_error(['message' => 'Permission denied']);
        }
        
        $category = isset($_POST['category']) ? sanitize_text_field($_POST['category']) : '';
        $search = isset($_POST['search']) ? sanitize_text_field($_POST['search']) : '';
        $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
        $per_page = 20;
        
        $args = [
            'post_type' => 'post',
            'posts_per_page' => $per_page,
            'paged' => $page,
            'post_status' => ['publish', 'draft', 'pending'],
            'tax_query' => [
                [
                    'taxonomy' => 'career_category',
                    'operator' => 'EXISTS',
                ],
            ],
        ];
        
        if (!empty($category)) {
            $args['tax_query'][] = [
                'taxonomy' => 'career_category',
                'field' => 'slug',
                'terms' => $category,
            ];
        }
        
        if (!empty($search)) {
            $args['s'] = $search;
        }
        
        $query = new WP_Query($args);
        
        $articles = [];
        foreach ($query->posts as $post) {
            $terms = wp_get_object_terms($post->ID, 'career_category', ['fields' => 'slugs']);
            $category = !empty($terms) ? $terms[0] : '';
            
            $articles[] = [
                'id' => $post->ID,
                'title' => $post->post_title,
                'slug' => $post->post_name,
                'excerpt' => $post->post_excerpt,
                'category' => $category,
                'read_time' => get_post_meta($post->ID, 'ccvp_read_time', true),
                'is_featured' => get_post_meta($post->ID, 'ccvp_featured', true) === '1',
                'status' => $post->post_status,
                'featured_image' => get_the_post_thumbnail_url($post->ID, 'thumbnail'),
                'edit_url' => get_edit_post_link($post->ID, 'raw'),
                'view_url' => get_permalink($post->ID),
            ];
        }
        
        wp_send_json_success([
            'articles' => $articles,
            'total' => $query->found_posts,
            'pages' => $query->max_num_pages,
            'page' => $page,
        ]);
    }
    
    /**
     * AJAX: Delete article
     */
    public function ajax_delete_article() {
        check_ajax_referer('ccvp_post_importer_nonce', 'nonce');
        
        if (!current_user_can('delete_posts')) {
            wp_send_json_error(['message' => 'Permission denied']);
        }
        
        $post_id = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;
        
        if (!$post_id) {
            wp_send_json_error(['message' => 'Invalid post ID']);
        }
        
        $result = wp_delete_post($post_id, true);
        
        if (!$result) {
            wp_send_json_error(['message' => 'Failed to delete article']);
        }
        
        wp_send_json_success(['message' => 'Article deleted successfully']);
    }
    
    /**
     * Sideload image from URL
     */
    private function sideload_image($url, $post_id) {
        if (empty($url)) {
            return false;
        }
        
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        
        $tmp = download_url($url);
        
        if (is_wp_error($tmp)) {
            return $tmp;
        }
        
        $file_array = [
            'name' => basename(parse_url($url, PHP_URL_PATH)),
            'tmp_name' => $tmp,
        ];
        
        if (!preg_match('/\.(jpg|jpeg|png|gif|webp)$/i', $file_array['name'])) {
            $file_array['name'] .= '.jpg';
        }
        
        $id = media_handle_sideload($file_array, $post_id);
        
        if (file_exists($tmp)) {
            @unlink($tmp);
        }
        
        return $id;
    }
}

// Initialize the plugin
add_action('plugins_loaded', function() {
    CareerCVPro_Post_Importer::get_instance();
});

// Activation hook
register_activation_hook(__FILE__, function() {
    add_option('ccvp_gemini_api_key', '');
    add_option('ccvp_gemini_model', 'gemini-2.0-flash-lite');
    
    // Flush rewrite rules after activation (taxonomy will be registered on init)
    flush_rewrite_rules();
});

// Deactivation hook
register_deactivation_hook(__FILE__, function() {
    flush_rewrite_rules();
});
