=== CareerCVPro Post Importer ===
Contributors: careercvpro
Tags: content importer, AI, career articles, blog posts, rich text editor
Requires at least: 5.8
Tested up to: 6.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

AI-powered content importer with rich text editing, image embedding, and content transformation options for career advice articles.

== Description ==

CareerCVPro Post Importer is a powerful WordPress plugin designed to streamline the creation and management of career advice articles. It features:

**Content Processing Modes:**
* **Use As-Is** - Import content without AI modification
* **Humanize** - Make content sound naturally human-written
* **Rewrite** - Transform content into your own words
* **Expand** - Add more detail and depth to content
* **Summarize** - Condense content into key points

**Rich Text Editor:**
* Full formatting toolbar (bold, italic, underline, strikethrough)
* Headings and paragraph styles
* Font size controls
* Bullet and numbered lists
* Text alignment options
* Text and background color pickers
* Image insertion (upload, URL, or media library)
* Link insertion
* HTML view toggle
* Fullscreen editing mode

**Image Handling:**
* Insert images anywhere in content
* Upload directly or use existing media
* Set alt text, alignment, and width
* Featured image support

**SEO & Organization:**
* Category organization (CV Guides, Interview Guides, Job Search Guides, Workplace Guides)
* SEO title and meta description with character counters
* Tags support
* Featured article option

**Supabase Integration:**
* Sync articles to Supabase for Next.js frontend display
* Automatic sync on publish
* Bulk sync from manage page
* Real-time sync status

== Installation ==

1. Upload the `careercvpro-post-importer` folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Go to Post Importer > Settings to configure:
   - Gemini API key (for AI processing)
   - Supabase URL and key (for frontend sync)
4. Create your first article via Post Importer > Import Article

== Configuration ==

**Gemini AI Setup:**
1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Enter the key in Post Importer > Settings
3. Select your preferred Gemini model

**Supabase Setup:**
1. Create a `career_articles` table in your Supabase project (SQL provided in Manage Articles page)
2. Get your Supabase URL and service_role key from project settings
3. Enter credentials in Post Importer > Settings

== Frequently Asked Questions ==

= What AI models are supported? =
The plugin supports Google Gemini models including gemini-2.0-flash-lite, gemini-2.0-flash, gemini-1.5-pro, and gemini-1.5-flash.

= Can I use this without AI processing? =
Yes! You can skip AI processing and use the rich text editor to manually create and format your content.

= How does Supabase sync work? =
Articles are synced via Supabase REST API. The plugin creates/updates records in the `career_articles` table.

== Changelog ==

= 1.0.0 =
* Initial release
* AI content processing with multiple modes
* Rich text editor with full formatting
* Image embedding support
* Supabase integration for frontend sync
* Article management interface

== Upgrade Notice ==

= 1.0.0 =
Initial release of CareerCVPro Post Importer.
