<div class="wrap ccvp-job-importer">
    <h1>
        <span class="dashicons dashicons-download"></span>
        AI Job Importer
    </h1>
    
    <div class="ccvp-importer-container">
        <!-- Input Section -->
        <div class="ccvp-input-section">
            <div class="ccvp-card">
                <h2>Paste Job Information</h2>
                <p class="description">Paste the job posting text or upload an image. Our AI will automatically extract all the details.</p>
                
                <div class="ccvp-input-tabs">
                    <button type="button" class="ccvp-tab-btn active" data-tab="text">
                        <span class="dashicons dashicons-text"></span> Text
                    </button>
                    <button type="button" class="ccvp-tab-btn" data-tab="image">
                        <span class="dashicons dashicons-format-image"></span> Image
                    </button>
                </div>
                
                <div class="ccvp-tab-content active" id="tab-text">
                    <textarea id="ccvp-raw-text" rows="12" placeholder="Paste job posting text here...

Example:
Green Pasture Homes is hiring!

Position: Sales Agent
Location: Gauteng
Email: jobs@company.co.za
Phone: 012 345 6789

Requirements:
- Matric certificate
- Valid driver's license
- 2+ years experience

Closing date: 31 December 2025"></textarea>
                </div>
                
                <div class="ccvp-tab-content" id="tab-image">
                    <div class="ccvp-image-upload" id="ccvp-image-dropzone">
                        <input type="file" id="ccvp-image-input" accept="image/*" style="display: none;">
                        <div class="ccvp-dropzone-content">
                            <span class="dashicons dashicons-upload"></span>
                            <p>Drag & drop an image here or <a href="#" id="ccvp-browse-link">browse</a></p>
                            <p class="description">Supports JPG, PNG, GIF, WebP</p>
                        </div>
                        <div class="ccvp-image-preview" style="display: none;">
                            <img id="ccvp-preview-img" src="" alt="Preview">
                            <button type="button" class="ccvp-remove-image" title="Remove image">
                                <span class="dashicons dashicons-no-alt"></span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <button type="button" id="ccvp-extract-btn" class="button button-primary button-hero">
                    <span class="dashicons dashicons-superhero"></span>
                    Extract with AI
                </button>
                
                <div id="ccvp-loading" class="ccvp-loading" style="display: none;">
                    <span class="spinner is-active"></span>
                    <p>AI is analyzing the job posting...</p>
                </div>
            </div>
        </div>
        
        <!-- Preview/Edit Section -->
        <div class="ccvp-preview-section" style="display: none;">
            <div class="ccvp-card">
                <h2>
                    <span class="dashicons dashicons-edit"></span>
                    Review & Edit
                </h2>
                <p class="description">Review the extracted data and make any corrections before creating the job.</p>
                
                <form id="ccvp-job-form">
                    <div class="ccvp-form-grid">
                        <!-- Basic Info -->
                        <div class="ccvp-form-section">
                            <h3>Basic Information</h3>
                            
                            <div class="ccvp-form-row">
                                <label for="job-title">Job Title <span class="required">*</span></label>
                                <input type="text" id="job-title" name="title" required>
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="job-company">Company Name</label>
                                <input type="text" id="job-company" name="company_name">
                            </div>
                            
                            <div class="ccvp-form-row ccvp-form-row-2col">
                                <div>
                                    <label for="job-location">Location</label>
                                    <input type="text" id="job-location" name="location">
                                </div>
                                <div>
                                    <label for="job-province">Province</label>
                                    <select id="job-province" name="province">
                                        <option value="">Select Province</option>
                                        <option value="Gauteng">Gauteng</option>
                                        <option value="Western Cape">Western Cape</option>
                                        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                                        <option value="Eastern Cape">Eastern Cape</option>
                                        <option value="Free State">Free State</option>
                                        <option value="Limpopo">Limpopo</option>
                                        <option value="Mpumalanga">Mpumalanga</option>
                                        <option value="North West">North West</option>
                                        <option value="Northern Cape">Northern Cape</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="job-salary">Salary Range</label>
                                <input type="text" id="job-salary" name="salary_range" placeholder="e.g., R15,000 - R25,000 per month">
                            </div>
                        </div>
                        
                        <!-- Contact Info -->
                        <div class="ccvp-form-section">
                            <h3>Contact & Application</h3>
                            
                            <div class="ccvp-form-row">
                                <label for="job-email">Application Email</label>
                                <input type="email" id="job-email" name="application_email">
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="job-phone">Contact Phone</label>
                                <input type="text" id="job-phone" name="contact_phone">
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="job-website">Company Website</label>
                                <input type="url" id="job-website" name="company_website" placeholder="https://">
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="job-apply-url">External Apply URL</label>
                                <input type="url" id="job-apply-url" name="external_apply_url" placeholder="https://">
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="job-deadline">Application Deadline</label>
                                <input type="date" id="job-deadline" name="application_deadline">
                            </div>
                        </div>
                        
                        <!-- Categories -->
                        <div class="ccvp-form-section">
                            <h3>Categories & Type</h3>
                            
                            <div class="ccvp-form-row">
                                <label for="job-type">Job Type</label>
                                <select id="job-type" name="job_type">
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Temporary">Temporary</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Freelance">Freelance</option>
                                </select>
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="job-categories">Job Categories</label>
                                <input type="text" id="job-categories" name="job_categories" placeholder="e.g., Sales, Real Estate">
                                <p class="description">Comma-separated list of categories</p>
                            </div>
                            
                            <div class="ccvp-form-row ccvp-form-row-checkboxes">
                                <label>
                                    <input type="checkbox" id="job-featured" name="is_featured">
                                    Featured Job
                                </label>
                                <label>
                                    <input type="checkbox" id="job-urgent" name="is_urgent">
                                    Urgent Hiring
                                </label>
                            </div>
                        </div>
                        
                        <!-- Featured Image -->
                        <div class="ccvp-form-section">
                            <h3>Featured Image / Company Logo</h3>
                            
                            <div class="ccvp-form-row">
                                <label for="job-logo-url">Image URL</label>
                                <input type="url" id="job-logo-url" name="company_logo_url" placeholder="https://example.com/logo.png">
                                <p class="description">URL to company logo or job image</p>
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label>Or Upload Image</label>
                                <div class="ccvp-featured-image-upload" id="ccvp-featured-image-dropzone">
                                    <input type="file" id="ccvp-featured-image-input" accept="image/*" style="display: none;">
                                    <input type="hidden" id="job-featured-image-data" name="featured_image_data">
                                    <div class="ccvp-dropzone-content ccvp-featured-dropzone-content">
                                        <span class="dashicons dashicons-format-image"></span>
                                        <p><a href="#" id="ccvp-featured-browse-link">Upload image</a> or drag & drop</p>
                                    </div>
                                    <div class="ccvp-featured-image-preview" style="display: none;">
                                        <img id="ccvp-featured-preview-img" src="" alt="Preview">
                                        <button type="button" class="ccvp-remove-featured-image" title="Remove image">
                                            <span class="dashicons dashicons-no-alt"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Description -->
                        <div class="ccvp-form-section ccvp-form-section-full">
                            <h3>Job Description</h3>
                            
                            <div class="ccvp-form-row">
                                <label for="job-excerpt">Short Excerpt</label>
                                <textarea id="job-excerpt" name="excerpt" rows="2"></textarea>
                            </div>
                            
                            <div class="ccvp-form-row">
                                <label for="job-description">Full Description</label>
                                <textarea id="job-description" name="description" rows="10"></textarea>
                                <p class="description">HTML formatting is supported</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ccvp-form-actions">
                        <button type="button" id="ccvp-back-btn" class="button button-secondary">
                            <span class="dashicons dashicons-arrow-left-alt"></span>
                            Back to Input
                        </button>
                        <button type="submit" id="ccvp-create-btn" class="button button-primary button-hero">
                            <span class="dashicons dashicons-plus-alt"></span>
                            Create Job
                        </button>
                    </div>
                </form>
                
                <div id="ccvp-creating" class="ccvp-loading" style="display: none;">
                    <span class="spinner is-active"></span>
                    <p>Creating job post...</p>
                </div>
            </div>
        </div>
        
        <!-- Success Section -->
        <div class="ccvp-success-section" style="display: none;">
            <div class="ccvp-card ccvp-success-card">
                <span class="dashicons dashicons-yes-alt"></span>
                <h2>Job Created Successfully!</h2>
                <p id="ccvp-success-message"></p>
                <div class="ccvp-success-actions">
                    <a href="#" id="ccvp-view-job" class="button button-secondary" target="_blank">
                        <span class="dashicons dashicons-external"></span>
                        View Job
                    </a>
                    <a href="#" id="ccvp-edit-job" class="button button-secondary" target="_blank">
                        <span class="dashicons dashicons-edit"></span>
                        Edit Job
                    </a>
                    <button type="button" id="ccvp-add-another" class="button button-primary">
                        <span class="dashicons dashicons-plus"></span>
                        Add Another Job
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
