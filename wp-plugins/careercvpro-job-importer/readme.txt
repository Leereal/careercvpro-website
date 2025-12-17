=== CareerCVPro Job Importer ===
Contributors: careercvpro
Tags: jobs, importer, ai, gemini, recruitment
Requires at least: 5.0
Tested up to: 6.4
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

AI-powered job importer using Google Gemini to extract and auto-populate job fields from pasted text or images.

== Description ==

CareerCVPro Job Importer uses Google's Gemini AI to automatically extract job posting information from text or images and populate your WordPress job listings.

**Features:**

* **AI-Powered Extraction**: Paste job posting text or upload an image, and the AI will automatically extract all relevant details
* **Smart Field Detection**: Automatically identifies job title, company, location, salary, requirements, and more
* **Image Support**: Upload screenshots or images of job postings for AI extraction
* **Review & Edit**: Review extracted data before creating the job post
* **ACF Integration**: Works with Advanced Custom Fields for job metadata
* **Taxonomy Support**: Automatically assigns provinces, job categories, and job types

**Supported Fields:**

* Job Title
* Company Name
* Location & Province
* Salary Range
* Application Email
* Contact Phone
* Company Website
* External Apply URL
* Application Deadline
* Job Type (Full-time, Part-time, Contract, etc.)
* Job Categories
* Full Description
* Short Excerpt

== Installation ==

1. Upload the `careercvpro-job-importer` folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Go to **Job Importer > Settings** and enter your Google Gemini API key
4. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

== Usage ==

1. Navigate to **Job Importer** in your WordPress admin menu
2. Paste job posting text in the text area, OR upload an image of the job posting
3. Click **Extract with AI**
4. Review the extracted data and make any corrections
5. Click **Create Job** to publish the job listing

== Frequently Asked Questions ==

= Where do I get a Gemini API key? =

Visit [Google AI Studio](https://makersuite.google.com/app/apikey) to create a free API key.

= What image formats are supported? =

The plugin supports JPG, PNG, GIF, and WebP image formats.

= Does this work with custom post types? =

Yes, the plugin is designed to work with a `job` custom post type and can be customized for other post types.

== Screenshots ==

1. Main importer interface with text input
2. Image upload functionality
3. Review and edit extracted data
4. Success screen after job creation

== Changelog ==

= 1.0.0 =
* Initial release
* AI-powered text extraction using Gemini
* Image upload and extraction support
* ACF field integration
* Taxonomy support for provinces, categories, and job types

== Upgrade Notice ==

= 1.0.0 =
Initial release of CareerCVPro Job Importer.
