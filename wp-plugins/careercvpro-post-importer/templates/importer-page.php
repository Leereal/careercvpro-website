<div class="wrap ccvp-post-importer">
    <h1>
        <span class="dashicons dashicons-media-document"></span>
        AI Post Importer
    </h1>
    
    <div class="ccvp-importer-layout">
        <!-- Step 1: Input Content -->
        <div class="ccvp-step ccvp-step-input" id="step-input">
            <div class="ccvp-card">
                <div class="ccvp-card-header">
                    <span class="ccvp-step-number">1</span>
                    <div>
                        <h2>Paste Your Content</h2>
                        <p class="description">Paste or type the content you want to import. You can include images later.</p>
                    </div>
                </div>
                
                <div class="ccvp-content-input-wrapper">
                    <textarea id="ccvp-raw-content" rows="15" placeholder="Paste your article content here...

You can paste:
• Plain text content
• HTML formatted content  
• Content copied from any website

The AI will help you transform and format it perfectly."></textarea>
                </div>
                
                <div class="ccvp-processing-options">
                    <h3>
                        <span class="dashicons dashicons-superhero"></span>
                        AI Processing Options
                    </h3>
                    
                    <div class="ccvp-options-grid">
                        <div class="ccvp-option-group">
                            <label for="ccvp-processing-mode">Processing Mode</label>
                            <select id="ccvp-processing-mode">
                                <option value="as_is">Use As-Is (No AI Processing)</option>
                                <option value="humanize">Humanize (Make Human-Written)</option>
                                <option value="rewrite" selected>Rewrite (In My Own Words)</option>
                                <option value="expand">Expand (Add More Detail)</option>
                                <option value="summarize">Summarize (Condense)</option>
                            </select>
                            <p class="description">Choose how AI should transform your content</p>
                        </div>
                        
                        <div class="ccvp-option-group">
                            <label for="ccvp-word-count">Target Word Count</label>
                            <select id="ccvp-word-count">
                                <option value="300">Short (~300 words)</option>
                                <option value="500">Brief (~500 words)</option>
                                <option value="800" selected>Medium (~800 words)</option>
                                <option value="1200">Long (~1200 words)</option>
                                <option value="1800">Very Long (~1800 words)</option>
                                <option value="2500">Comprehensive (~2500 words)</option>
                            </select>
                            <p class="description">Approximate length of the final article</p>
                        </div>
                        
                        <div class="ccvp-option-group">
                            <label for="ccvp-tone">Writing Tone</label>
                            <select id="ccvp-tone">
                                <option value="professional" selected>Professional</option>
                                <option value="friendly">Friendly & Approachable</option>
                                <option value="authoritative">Authoritative & Expert</option>
                                <option value="conversational">Conversational</option>
                                <option value="encouraging">Encouraging & Supportive</option>
                            </select>
                        </div>
                        
                        <div class="ccvp-option-group">
                            <label for="ccvp-audience">Target Audience</label>
                            <select id="ccvp-audience">
                                <option value="South African job seekers" selected>SA Job Seekers (General)</option>
                                <option value="South African graduates and entry-level job seekers">Graduates & Entry-Level</option>
                                <option value="experienced South African professionals">Experienced Professionals</option>
                                <option value="South African career changers">Career Changers</option>
                                <option value="South African remote workers">Remote Workers</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="ccvp-action-buttons">
                    <button type="button" id="ccvp-process-btn" class="button button-primary button-hero">
                        <span class="dashicons dashicons-superhero"></span>
                        Process with AI
                    </button>
                    <button type="button" id="ccvp-skip-processing-btn" class="button button-secondary button-hero">
                        <span class="dashicons dashicons-arrow-right-alt"></span>
                        Skip to Editor
                    </button>
                </div>
                
                <div id="ccvp-processing-status" class="ccvp-processing-status" style="display: none;">
                    <span class="spinner is-active"></span>
                    <p>AI is processing your content... This may take up to 30 seconds.</p>
                    <div class="ccvp-progress-bar">
                        <div class="ccvp-progress-fill"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Step 2: Edit Content -->
        <div class="ccvp-step ccvp-step-edit" id="step-edit" style="display: none;">
            <div class="ccvp-card">
                <div class="ccvp-card-header">
                    <span class="ccvp-step-number">2</span>
                    <div>
                        <h2>Edit & Format Content</h2>
                        <p class="description">Fine-tune your content, add images, and apply formatting.</p>
                    </div>
                </div>
                
                <!-- Rich Text Editor Toolbar -->
                <div class="ccvp-editor-toolbar">
                    <div class="ccvp-toolbar-group">
                        <button type="button" class="ccvp-toolbar-btn" data-command="bold" title="Bold (Ctrl+B)">
                            <span class="dashicons dashicons-editor-bold"></span>
                        </button>
                        <button type="button" class="ccvp-toolbar-btn" data-command="italic" title="Italic (Ctrl+I)">
                            <span class="dashicons dashicons-editor-italic"></span>
                        </button>
                        <button type="button" class="ccvp-toolbar-btn" data-command="underline" title="Underline (Ctrl+U)">
                            <span class="dashicons dashicons-editor-underline"></span>
                        </button>
                        <button type="button" class="ccvp-toolbar-btn" data-command="strikeThrough" title="Strikethrough">
                            <span class="dashicons dashicons-editor-strikethrough"></span>
                        </button>
                    </div>
                    
                    <div class="ccvp-toolbar-divider"></div>
                    
                    <div class="ccvp-toolbar-group">
                        <select class="ccvp-toolbar-select" data-command="formatBlock" title="Paragraph Format">
                            <option value="p">Paragraph</option>
                            <option value="h2">Heading 2</option>
                            <option value="h3">Heading 3</option>
                            <option value="h4">Heading 4</option>
                            <option value="blockquote">Quote</option>
                            <option value="pre">Code</option>
                        </select>
                    </div>
                    
                    <div class="ccvp-toolbar-divider"></div>
                    
                    <div class="ccvp-toolbar-group">
                        <select class="ccvp-toolbar-select ccvp-font-size" data-command="fontSize" title="Font Size">
                            <option value="3">Normal</option>
                            <option value="1">Small</option>
                            <option value="2">Medium</option>
                            <option value="4">Large</option>
                            <option value="5">X-Large</option>
                            <option value="6">XX-Large</option>
                        </select>
                    </div>
                    
                    <div class="ccvp-toolbar-divider"></div>
                    
                    <div class="ccvp-toolbar-group">
                        <button type="button" class="ccvp-toolbar-btn" data-command="insertUnorderedList" title="Bullet List">
                            <span class="dashicons dashicons-editor-ul"></span>
                        </button>
                        <button type="button" class="ccvp-toolbar-btn" data-command="insertOrderedList" title="Numbered List">
                            <span class="dashicons dashicons-editor-ol"></span>
                        </button>
                        <button type="button" class="ccvp-toolbar-btn" data-command="outdent" title="Decrease Indent">
                            <span class="dashicons dashicons-editor-outdent"></span>
                        </button>
                        <button type="button" class="ccvp-toolbar-btn" data-command="indent" title="Increase Indent">
                            <span class="dashicons dashicons-editor-indent"></span>
                        </button>
                    </div>
                    
                    <div class="ccvp-toolbar-divider"></div>
                    
                    <div class="ccvp-toolbar-group">
                        <button type="button" class="ccvp-toolbar-btn" data-command="justifyLeft" title="Align Left">
                            <span class="dashicons dashicons-editor-alignleft"></span>
                        </button>
                        <button type="button" class="ccvp-toolbar-btn" data-command="justifyCenter" title="Align Center">
                            <span class="dashicons dashicons-editor-aligncenter"></span>
                        </button>
                        <button type="button" class="ccvp-toolbar-btn" data-command="justifyRight" title="Align Right">
                            <span class="dashicons dashicons-editor-alignright"></span>
                        </button>
                    </div>
                    
                    <div class="ccvp-toolbar-divider"></div>
                    
                    <div class="ccvp-toolbar-group">
                        <button type="button" class="ccvp-toolbar-btn ccvp-insert-image-btn" title="Insert Image">
                            <span class="dashicons dashicons-format-image"></span>
                        </button>
                        <button type="button" class="ccvp-toolbar-btn ccvp-insert-link-btn" title="Insert Link">
                            <span class="dashicons dashicons-admin-links"></span>
                        </button>
                        <button type="button" class="ccvp-toolbar-btn" data-command="removeFormat" title="Remove Formatting">
                            <span class="dashicons dashicons-editor-removeformatting"></span>
                        </button>
                    </div>
                    
                    <div class="ccvp-toolbar-divider"></div>
                    
                    <div class="ccvp-toolbar-group">
                        <input type="color" class="ccvp-color-picker" id="ccvp-text-color" title="Text Color" value="#000000">
                        <input type="color" class="ccvp-color-picker" id="ccvp-bg-color" title="Background Color" value="#ffffff">
                    </div>
                    
                    <div class="ccvp-toolbar-divider"></div>
                    
                    <div class="ccvp-toolbar-group">
                        <button type="button" class="ccvp-toolbar-btn" data-command="undo" title="Undo (Ctrl+Z)">
                            <span class="dashicons dashicons-undo"></span>
                        </button>
                        <button type="button" class="ccvp-toolbar-btn" data-command="redo" title="Redo (Ctrl+Y)">
                            <span class="dashicons dashicons-redo"></span>
                        </button>
                    </div>
                    
                    <div class="ccvp-toolbar-group ccvp-toolbar-right">
                        <button type="button" class="ccvp-toolbar-btn ccvp-toggle-html-btn" title="Toggle HTML View">
                            <span class="dashicons dashicons-editor-code"></span>
                        </button>
                        <button type="button" class="ccvp-toolbar-btn ccvp-fullscreen-btn" title="Fullscreen">
                            <span class="dashicons dashicons-fullscreen-alt"></span>
                        </button>
                    </div>
                </div>
                
                <!-- Rich Text Editor -->
                <div class="ccvp-editor-container">
                    <div id="ccvp-editor" class="ccvp-rich-editor" contenteditable="true"></div>
                    <textarea id="ccvp-editor-html" class="ccvp-html-editor" style="display: none;"></textarea>
                </div>
                
                <div class="ccvp-editor-stats">
                    <span id="ccvp-word-count-display">0 words</span>
                    <span id="ccvp-char-count-display">0 characters</span>
                    <span id="ccvp-read-time-display">~0 min read</span>
                </div>
                
                <div class="ccvp-edit-actions">
                    <button type="button" id="ccvp-back-to-input" class="button">
                        <span class="dashicons dashicons-arrow-left-alt"></span>
                        Back to Input
                    </button>
                    <button type="button" id="ccvp-continue-to-meta" class="button button-primary">
                        Continue to Details
                        <span class="dashicons dashicons-arrow-right-alt"></span>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Step 3: Article Metadata -->
        <div class="ccvp-step ccvp-step-meta" id="step-meta" style="display: none;">
            <div class="ccvp-card">
                <div class="ccvp-card-header">
                    <span class="ccvp-step-number">3</span>
                    <div>
                        <h2>Article Details</h2>
                        <p class="description">Add title, category, SEO info, and publish settings.</p>
                    </div>
                </div>
                
                <form id="ccvp-article-form">
                    <div class="ccvp-form-grid">
                        <!-- Basic Info -->
                        <div class="ccvp-form-section">
                            <h3>Basic Information</h3>
                            
                            <div class="ccvp-form-row">
                                <label for="article-title">Article Title <span class="required">*</span></label>
                                <input type="text" id="article-title" name="title" required placeholder="e.g., How to Write a CV in South Africa">
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="article-slug">URL Slug</label>
                                <input type="text" id="article-slug" name="slug" placeholder="how-to-write-cv-south-africa">
                                <p class="description">Leave blank to auto-generate from title</p>
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="article-excerpt">Excerpt / Summary</label>
                                <textarea id="article-excerpt" name="excerpt" rows="3" placeholder="A brief summary of the article for previews and search results..."></textarea>
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="article-category">Category <span class="required">*</span></label>
                                <select id="article-category" name="category" required>
                                    <option value="">Select Category</option>
                                    <option value="cv-guides">CV Guides</option>
                                    <option value="interview-guides">Interview Guides</option>
                                    <option value="job-search-guides">Job Search Guides</option>
                                    <option value="workplace-guides">Workplace Guides</option>
                                </select>
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="article-tags">Tags</label>
                                <input type="text" id="article-tags" name="tags" placeholder="cv writing, south africa, job search">
                                <p class="description">Comma-separated tags</p>
                            </div>
                        </div>
                        
                        <!-- Featured Image -->
                        <div class="ccvp-form-section">
                            <h3>Featured Image</h3>
                            
                            <div class="ccvp-featured-image-upload" id="ccvp-featured-image-zone">
                                <input type="file" id="ccvp-featured-image-input" accept="image/*" style="display: none;">
                                <input type="hidden" id="article-featured-image-id" name="featured_image_id" value="">
                                <input type="hidden" id="article-featured-image-url" name="featured_image_url" value="">
                                
                                <div class="ccvp-featured-dropzone-content">
                                    <span class="dashicons dashicons-format-image"></span>
                                    <p>Drag & drop or <a href="#" id="ccvp-browse-featured">browse</a></p>
                                    <p class="description">Recommended: 1200x630px</p>
                                </div>
                                <div class="ccvp-featured-image-preview" style="display: none;">
                                    <img id="ccvp-featured-preview" src="" alt="Preview">
                                    <button type="button" class="ccvp-remove-featured" title="Remove">
                                        <span class="dashicons dashicons-no-alt"></span>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="ccvp-form-row" style="margin-top: 15px;">
                                <label for="article-featured-url">Or enter image URL</label>
                                <input type="url" id="article-featured-url" placeholder="https://example.com/image.jpg">
                            </div>
                        </div>
                        
                        <!-- SEO Settings -->
                        <div class="ccvp-form-section">
                            <h3>SEO Settings</h3>
                            
                            <div class="ccvp-form-row">
                                <label for="article-seo-title">SEO Title</label>
                                <input type="text" id="article-seo-title" name="seo_title" placeholder="Custom title for search engines">
                                <p class="description">Leave blank to use article title. Max 60 chars recommended.</p>
                                <div class="ccvp-char-counter" id="seo-title-counter">0/60</div>
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="article-seo-description">Meta Description</label>
                                <textarea id="article-seo-description" name="seo_description" rows="3" placeholder="Description for search results..."></textarea>
                                <p class="description">Max 160 chars recommended.</p>
                                <div class="ccvp-char-counter" id="seo-desc-counter">0/160</div>
                            </div>
                        </div>
                        
                        <!-- Publish Settings -->
                        <div class="ccvp-form-section">
                            <h3>Publishing</h3>
                            
                            <div class="ccvp-form-row">
                                <label for="article-status">Status</label>
                                <select id="article-status" name="status">
                                    <option value="draft">Draft</option>
                                    <option value="publish">Published</option>
                                    <option value="pending">Pending Review</option>
                                </select>
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="article-read-time">Read Time</label>
                                <input type="text" id="article-read-time" name="read_time" placeholder="Auto-calculated">
                                <p class="description">Auto-calculated, but you can override</p>
                            </div>
                            
                            <div class="ccvp-form-row ccvp-form-checkboxes">
                                <label>
                                    <input type="checkbox" id="article-featured" name="is_featured">
                                    Featured Article
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ccvp-form-actions">
                        <button type="button" id="ccvp-back-to-edit" class="button">
                            <span class="dashicons dashicons-arrow-left-alt"></span>
                            Back to Editor
                        </button>
                        <div class="ccvp-form-actions-right">
                            <button type="button" id="ccvp-save-draft" class="button">
                                <span class="dashicons dashicons-archive"></span>
                                Save as Draft
                            </button>
                            <button type="submit" id="ccvp-publish-btn" class="button button-primary button-hero">
                                <span class="dashicons dashicons-upload"></span>
                                Create Article
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Success State -->
        <div class="ccvp-step ccvp-step-success" id="step-success" style="display: none;">
            <div class="ccvp-card ccvp-success-card">
                <span class="dashicons dashicons-yes-alt"></span>
                <h2>Article Created Successfully!</h2>
                <p>Your article has been saved and is ready.</p>
                
                <div id="ccvp-sync-status"></div>
                
                <div class="ccvp-success-actions">
                    <a href="#" id="ccvp-view-article" class="button button-primary" target="_blank">
                        <span class="dashicons dashicons-visibility"></span>
                        View Article
                    </a>
                    <a href="#" id="ccvp-edit-article" class="button" target="_blank">
                        <span class="dashicons dashicons-edit"></span>
                        Edit in WordPress
                    </a>
                    <button type="button" id="ccvp-create-another" class="button">
                        <span class="dashicons dashicons-plus-alt"></span>
                        Create Another
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Image Insert Modal -->
    <div id="ccvp-image-modal" class="ccvp-modal" style="display: none;">
        <div class="ccvp-modal-content">
            <div class="ccvp-modal-header">
                <h3>Insert Image</h3>
                <button type="button" class="ccvp-modal-close">&times;</button>
            </div>
            <div class="ccvp-modal-body">
                <div class="ccvp-image-tabs">
                    <button type="button" class="ccvp-image-tab active" data-tab="upload">Upload</button>
                    <button type="button" class="ccvp-image-tab" data-tab="url">URL</button>
                    <button type="button" class="ccvp-image-tab" data-tab="media">Media Library</button>
                </div>
                
                <div class="ccvp-image-tab-content active" id="image-tab-upload">
                    <div class="ccvp-image-dropzone" id="ccvp-inline-image-dropzone">
                        <input type="file" id="ccvp-inline-image-input" accept="image/*" style="display: none;">
                        <span class="dashicons dashicons-upload"></span>
                        <p>Drag & drop or <a href="#" id="ccvp-browse-inline">browse</a></p>
                    </div>
                </div>
                
                <div class="ccvp-image-tab-content" id="image-tab-url">
                    <div class="ccvp-form-row">
                        <label for="ccvp-image-url">Image URL</label>
                        <input type="url" id="ccvp-image-url" placeholder="https://example.com/image.jpg">
                    </div>
                </div>
                
                <div class="ccvp-image-tab-content" id="image-tab-media">
                    <button type="button" id="ccvp-open-media-library" class="button button-primary">
                        Open Media Library
                    </button>
                </div>
                
                <div class="ccvp-image-options">
                    <div class="ccvp-form-row">
                        <label for="ccvp-image-alt">Alt Text</label>
                        <input type="text" id="ccvp-image-alt" placeholder="Describe the image">
                    </div>
                    <div class="ccvp-form-row">
                        <label for="ccvp-image-align">Alignment</label>
                        <select id="ccvp-image-align">
                            <option value="none">None</option>
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                    <div class="ccvp-form-row">
                        <label for="ccvp-image-width">Width</label>
                        <input type="text" id="ccvp-image-width" placeholder="Auto or e.g., 600px, 100%">
                    </div>
                </div>
            </div>
            <div class="ccvp-modal-footer">
                <button type="button" class="button ccvp-modal-cancel">Cancel</button>
                <button type="button" class="button button-primary" id="ccvp-insert-image">Insert Image</button>
            </div>
        </div>
    </div>
    
    <!-- Link Insert Modal -->
    <div id="ccvp-link-modal" class="ccvp-modal" style="display: none;">
        <div class="ccvp-modal-content">
            <div class="ccvp-modal-header">
                <h3>Insert Link</h3>
                <button type="button" class="ccvp-modal-close">&times;</button>
            </div>
            <div class="ccvp-modal-body">
                <div class="ccvp-form-row">
                    <label for="ccvp-link-url">URL</label>
                    <input type="url" id="ccvp-link-url" placeholder="https://example.com">
                </div>
                <div class="ccvp-form-row">
                    <label for="ccvp-link-text">Link Text</label>
                    <input type="text" id="ccvp-link-text" placeholder="Click here">
                </div>
                <div class="ccvp-form-row ccvp-form-checkboxes">
                    <label>
                        <input type="checkbox" id="ccvp-link-new-tab" checked>
                        Open in new tab
                    </label>
                    <label>
                        <input type="checkbox" id="ccvp-link-nofollow">
                        Add nofollow
                    </label>
                </div>
            </div>
            <div class="ccvp-modal-footer">
                <button type="button" class="button ccvp-modal-cancel">Cancel</button>
                <button type="button" class="button button-primary" id="ccvp-insert-link">Insert Link</button>
            </div>
        </div>
    </div>
</div>
