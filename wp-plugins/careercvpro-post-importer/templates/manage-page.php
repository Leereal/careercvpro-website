<div class="wrap ccvp-post-importer">
    <h1>
        <span class="dashicons dashicons-list-view"></span>
        Manage Career Articles
    </h1>
    
    <div class="ccvp-manage-header">
        <div class="ccvp-filters">
            <select id="ccvp-filter-category">
                <option value="">All Categories</option>
                <option value="cv-guides">CV Guides</option>
                <option value="interview-guides">Interview Guides</option>
                <option value="job-search-guides">Job Search Guides</option>
                <option value="workplace-guides">Workplace Guides</option>
            </select>
            
            <select id="ccvp-filter-status">
                <option value="">All Status</option>
                <option value="publish">Published</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
            </select>
            
            <input type="search" id="ccvp-search-articles" placeholder="Search articles...">
            
            <button type="button" id="ccvp-search-btn" class="button">
                <span class="dashicons dashicons-search"></span>
                Search
            </button>
        </div>
        
        <div class="ccvp-actions">
            <a href="<?php echo admin_url('admin.php?page=ccvp-post-importer'); ?>" class="button button-primary">
                <span class="dashicons dashicons-plus-alt"></span>
                New Article
            </a>
        </div>
    </div>
    
    <div class="ccvp-card">
        <table class="wp-list-table widefat fixed striped" id="ccvp-articles-table">
            <thead>
                <tr>
                    <th class="column-image">Image</th>
                    <th class="column-title">Title</th>
                    <th class="column-category">Category</th>
                    <th class="column-status">Status</th>
                    <th class="column-actions">Actions</th>
                </tr>
            </thead>
            <tbody id="ccvp-articles-body">
                <tr class="ccvp-loading-row">
                    <td colspan="5">
                        <span class="spinner is-active"></span>
                        Loading articles...
                    </td>
                </tr>
            </tbody>
        </table>
        
        <div class="ccvp-pagination" id="ccvp-pagination"></div>
    </div>
    
    <div class="ccvp-graphql-info ccvp-card" style="margin-top: 20px;">
        <h3>
            <span class="dashicons dashicons-info"></span>
            WPGraphQL Integration
        </h3>
        <p>Articles are exposed via WPGraphQL for your Next.js frontend (careercvpro.co.za).</p>
        <p>Query articles using the GraphQL endpoint at: <code><?php echo home_url('/graphql'); ?></code></p>
        
        <details>
            <summary><strong>Example GraphQL Query</strong></summary>
            <pre><code>query GetCareerArticles {
  posts(
    first: 20
    where: {
      taxQuery: {
        taxArray: [{
          taxonomy: CAREERCATEGORY
          field: SLUG
          terms: "cv-guides"
        }]
      }
      orderby: { field: DATE, order: DESC }
    }
  ) {
    nodes {
      id
      title
      slug
      content
      excerpt
      date
      readTime
      isFeaturedArticle
      seoTitle
      seoDescription
      articleTags
      featuredImage {
        node {
          sourceUrl(size: LARGE)
        }
      }
      careerCategories {
        nodes {
          slug
          name
        }
      }
    }
  }
}</code></pre>
        </details>
    </div>
</div>
