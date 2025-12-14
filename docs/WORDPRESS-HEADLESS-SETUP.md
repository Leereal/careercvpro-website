# WordPress Headless CMS Setup Guide for CareerCVPro Jobs

This guide covers setting up WordPress as a headless CMS to power the Next.js jobs website via GraphQL.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR SETUP                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    GraphQL API    ┌──────────────────────┐   │
│  │  WordPress   │ ─────────────────► │      Next.js         │   │
│  │  (Backend)   │                    │     (Frontend)       │   │
│  │              │                    │                      │   │
│  │ • Jobs CPT   │                    │ • /jobs              │   │
│  │ • Articles   │                    │ • /jobs/gauteng      │   │
│  │ • Taxonomies │                    │ • /jobs/security-    │   │
│  │ • ACF Fields │                    │   jobs-in-gauteng    │   │
│  │              │                    │ • /career-tips       │   │
│  └──────────────┘                    └──────────────────────┘   │
│         │                                      │                 │
│         │                                      │                 │
│         ▼                                      ▼                 │
│  jobs.careercvpro.co.za/wp          careercvpro.co.za           │
│  (or subdomain/separate)            (main site)                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 1: WordPress Installation & Plugins

### Step 1: Install WordPress

1. Set up WordPress on a subdomain or separate domain:

   - `cms.careercvpro.co.za` (recommended)
   - `jobs-admin.careercvpro.co.za`
   - Or any hosting (even different server)

2. Complete basic WordPress setup

### Step 2: Install Required Plugins

Install these plugins from WordPress admin → Plugins → Add New:

| Plugin                           | Purpose                 | Required |
| -------------------------------- | ----------------------- | -------- |
| **WPGraphQL**                    | Exposes GraphQL API     | ✅ Yes   |
| **Advanced Custom Fields (ACF)** | Custom fields for jobs  | ✅ Yes   |
| **WPGraphQL for ACF**            | Exposes ACF to GraphQL  | ✅ Yes   |
| **Custom Post Type UI**          | Create Jobs CPT easily  | ✅ Yes   |
| **Yoast SEO**                    | SEO metadata            | Optional |
| **WPGraphQL for Yoast SEO**      | Expose Yoast to GraphQL | Optional |

#### Plugin Download Links:

- WPGraphQL: https://wordpress.org/plugins/wpgraphql/
- ACF: https://wordpress.org/plugins/advanced-custom-fields/
- WPGraphQL for ACF: https://github.com/wp-graphql/wpgraphql-acf
- Custom Post Type UI: https://wordpress.org/plugins/custom-post-type-ui/

---

## Part 2: Create Custom Post Type - Jobs

### Using Custom Post Type UI Plugin

Go to: **CPT UI → Add/Edit Post Types**

#### Basic Settings:

```
Post Type Slug: job
Plural Label: Jobs
Singular Label: Job
```

#### Additional Labels:

```
Menu Name: Jobs
Add New: Add New Job
Add New Item: Add New Job
Edit Item: Edit Job
New Item: New Job
View Item: View Job
Search Items: Search Jobs
Not Found: No jobs found
```

#### Settings:

```
Public: True
Show in REST: True
Show in GraphQL: True ← IMPORTANT!
GraphQL Single Name: job
GraphQL Plural Name: jobs
Has Archive: True
Supports: Title, Editor, Thumbnail, Excerpt, Custom Fields
```

---

## Part 3: Create Taxonomies

### Taxonomy 1: Location (Provinces & Cities Combined)

> **Important:** WordPress taxonomies can only have parent-child relationships **within the same taxonomy**. To link cities to provinces, we use a single "Location" taxonomy where provinces are parents and cities are children.

Go to: **CPT UI → Add/Edit Taxonomies**

```
Taxonomy Slug: location
Plural Label: Locations
Singular Label: Location
Attach to Post Type: job
Show in GraphQL: True ← IMPORTANT!
GraphQL Single Name: location
GraphQL Plural Name: locations
Hierarchical: True ← REQUIRED for parent-child!
```

#### Add Location Terms (Provinces first, then Cities as children):

Go to: **Jobs → Locations → Add New**

**Step 1: Add all 9 Provinces first (no parent)**

| Name          | Slug          | Parent   |
| ------------- | ------------- | -------- |
| Gauteng       | gauteng       | — None — |
| Western Cape  | western-cape  | — None — |
| KwaZulu-Natal | kwazulu-natal | — None — |
| Eastern Cape  | eastern-cape  | — None — |
| Limpopo       | limpopo       | — None — |
| Mpumalanga    | mpumalanga    | — None — |
| North West    | north-west    | — None — |
| Free State    | free-state    | — None — |
| Northern Cape | northern-cape | — None — |

**Step 2: Add Cities as children of their Province**

When adding a city, select the province from the **Parent** dropdown:

| City Name                 | Slug             | Parent (select from dropdown) |
| ------------------------- | ---------------- | ----------------------------- |
| **Gauteng Cities:**       |                  |                               |
| Johannesburg              | johannesburg     | Gauteng                       |
| Pretoria                  | pretoria         | Gauteng                       |
| Sandton                   | sandton          | Gauteng                       |
| Midrand                   | midrand          | Gauteng                       |
| Centurion                 | centurion        | Gauteng                       |
| Soweto                    | soweto           | Gauteng                       |
| Benoni                    | benoni           | Gauteng                       |
| Boksburg                  | boksburg         | Gauteng                       |
| **Western Cape Cities:**  |                  |                               |
| Cape Town                 | cape-town        | Western Cape                  |
| Stellenbosch              | stellenbosch     | Western Cape                  |
| Paarl                     | paarl            | Western Cape                  |
| George                    | george           | Western Cape                  |
| Knysna                    | knysna           | Western Cape                  |
| **KwaZulu-Natal Cities:** |                  |                               |
| Durban                    | durban           | KwaZulu-Natal                 |
| Pietermaritzburg          | pietermaritzburg | KwaZulu-Natal                 |
| Richards Bay              | richards-bay     | KwaZulu-Natal                 |
| Newcastle                 | newcastle        | KwaZulu-Natal                 |
| Umhlanga                  | umhlanga         | KwaZulu-Natal                 |
| **Eastern Cape Cities:**  |                  |                               |
| Port Elizabeth            | port-elizabeth   | Eastern Cape                  |
| East London               | east-london      | Eastern Cape                  |
| Mthatha                   | mthatha          | Eastern Cape                  |
| Grahamstown               | grahamstown      | Eastern Cape                  |
| **Limpopo Cities:**       |                  |                               |
| Polokwane                 | polokwane        | Limpopo                       |
| Tzaneen                   | tzaneen          | Limpopo                       |
| Thohoyandou               | thohoyandou      | Limpopo                       |
| Mokopane                  | mokopane         | Limpopo                       |
| **Mpumalanga Cities:**    |                  |                               |
| Nelspruit                 | nelspruit        | Mpumalanga                    |
| Witbank                   | witbank          | Mpumalanga                    |
| Secunda                   | secunda          | Mpumalanga                    |
| Middelburg                | middelburg       | Mpumalanga                    |
| **North West Cities:**    |                  |                               |
| Rustenburg                | rustenburg       | North West                    |
| Potchefstroom             | potchefstroom    | North West                    |
| Klerksdorp                | klerksdorp       | North West                    |
| Mahikeng                  | mahikeng         | North West                    |
| **Free State Cities:**    |                  |                               |
| Bloemfontein              | bloemfontein     | Free State                    |
| Welkom                    | welkom           | Free State                    |
| Kroonstad                 | kroonstad        | Free State                    |
| Bethlehem                 | bethlehem        | Free State                    |
| **Northern Cape Cities:** |                  |                               |
| Kimberley                 | kimberley        | Northern Cape                 |
| Upington                  | upington         | Northern Cape                 |
| Springbok                 | springbok        | Northern Cape                 |
| De Aar                    | de-aar           | Northern Cape                 |

#### Visual Result in WordPress:

After adding all terms, your Locations taxonomy will show:

```
Gauteng
├── Johannesburg
├── Pretoria
├── Sandton
├── Midrand
├── Centurion
├── Soweto
├── Benoni
└── Boksburg
Western Cape
├── Cape Town
├── Stellenbosch
├── Paarl
├── George
└── Knysna
KwaZulu-Natal
├── Durban
├── Pietermaritzburg
├── Richards Bay
├── Newcastle
└── Umhlanga
...
```

---

### Taxonomy 2: Job Category

```
Taxonomy Slug: job_category
Plural Label: Job Categories
Singular Label: Job Category
Attach to Post Type: job
Show in GraphQL: True
GraphQL Single Name: jobCategory
GraphQL Plural Name: jobCategories
Hierarchical: True
```

#### Add Category Terms:

| Name         | Slug         |
| ------------ | ------------ |
| Security     | security     |
| Retail       | retail       |
| Admin        | admin        |
| Call Centre  | call-centre  |
| Government   | government   |
| Teaching     | teaching     |
| Driving      | driving      |
| Hospitality  | hospitality  |
| IT           | it           |
| Finance      | finance      |
| Healthcare   | healthcare   |
| Construction | construction |
| Mining       | mining       |
| Agriculture  | agriculture  |
| Marketing    | marketing    |

---

### Taxonomy 3: Job Type

```
Taxonomy Slug: job_type
Plural Label: Job Types
Singular Label: Job Type
Attach to Post Type: job
Show in GraphQL: True
GraphQL Single Name: jobType
GraphQL Plural Name: jobTypes
```

#### Add Job Type Terms:

| Name        | Slug        |
| ----------- | ----------- |
| Full-time   | full-time   |
| Part-time   | part-time   |
| Contract    | contract    |
| Temporary   | temporary   |
| Internship  | internship  |
| Learnership | learnership |

---

## Part 4: Create ACF Custom Fields

Go to: **ACF → Field Groups → Add New**

### Field Group: Job Details

**Title:** Job Details
**Location Rules:** Post Type is equal to Job

#### Fields to Create:

| Field Label          | Field Name   | Field Type  | Required |
| -------------------- | ------------ | ----------- | -------- |
| Company Name         | company_name | Text        | Yes      |
| Location             | location     | Text        | Yes      |
| Salary Range         | salary_range | Text        | No       |
| Salary Min           | salary_min   | Number      | No       |
| Salary Max           | salary_max   | Number      | No       |
| Application Deadline | deadline     | Date Picker | No       |
| External Apply URL   | apply_url    | URL         | No       |
| WhatsApp Number      | whatsapp     | Text        | No       |
| Email                | email        | Email       | No       |
| Is Featured          | is_featured  | True/False  | No       |
| Is Urgent            | is_urgent    | True/False  | No       |
| Requirements         | requirements | Repeater    | No       |

#### Requirements Repeater Sub-fields:

| Field Label | Field Name  | Field Type |
| ----------- | ----------- | ---------- |
| Requirement | requirement | Text       |

---

### ACF Settings for GraphQL

For EACH field, enable "Show in GraphQL":

1. Edit the field group
2. Click on each field
3. Scroll to bottom
4. Find "Show in GraphQL" → Set to Yes
5. Set "GraphQL Field Name" (e.g., `companyName`, `salaryRange`)

---

## Part 5: Configure WPGraphQL

### Verify GraphQL Endpoint

After installing WPGraphQL, your endpoint will be:

```
https://your-wordpress-site.com/graphql
```

### Test in GraphQL IDE

Go to: **GraphQL → GraphQL IDE** in WordPress admin

Test query:

```graphql
query TestJobs {
  jobs {
    nodes {
      id
      title
      slug
      content
      date
      jobDetails {
        companyName
        location
        salaryRange
        isFeatured
        isUrgent
      }
      locations {
        nodes {
          name
          slug
          parent {
            node {
              name
              slug
            }
          }
        }
      }
      jobCategories {
        nodes {
          name
          slug
        }
      }
      jobTypes {
        nodes {
          name
          slug
        }
      }
    }
  }
}
```

---

## Part 6: Create Sample Jobs

Go to: **Jobs → Add New**

### Sample Job 1:

```
Title: Security Officer - Sandton
Content: We are looking for reliable Security Officers to join our team in Sandton. PSIRA Grade C required. Shifts available 24/7.

Taxonomies:
- Location: Sandton (child of Gauteng)
- Job Category: Security
- Job Type: Full-time

ACF Fields:
- Company Name: Fidelity Services Group
- Location: Sandton, Johannesburg
- Salary Range: R8,000 - R12,000/month
- Is Featured: Yes
- Is Urgent: Yes
- Requirements:
  - PSIRA Grade C or higher
  - Clear criminal record
  - South African ID
  - Willing to work shifts
```

### Sample Job 2:

```
Title: Call Centre Agent - Cape Town
Content: Join our growing call centre team! No experience required - full training provided.

Taxonomies:
- Location: Cape Town (child of Western Cape)
- Job Category: Call Centre
- Job Type: Full-time

ACF Fields:
- Company Name: Teleperformance South Africa
- Location: Century City, Cape Town
- Salary Range: R7,500 - R10,000/month
- Is Featured: Yes
- Requirements:
  - Matric certificate
  - Good communication skills
  - Computer literate
```

---

## Part 7: CORS Configuration

Add to your WordPress theme's `functions.php` or use a plugin:

```php
// Allow CORS for GraphQL
add_action('graphql_response_headers_to_send', function($headers) {
    return array_merge($headers, [
        'Access-Control-Allow-Origin' => 'https://careercvpro.co.za', // Your Next.js domain
        'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials' => 'true',
    ]);
});

// For development, allow all origins (remove in production!)
add_action('init', function() {
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        exit(0);
    }
});
```

---

## Part 8: Useful GraphQL Queries

### Get All Jobs

```graphql
query GetAllJobs($first: Int = 100) {
  jobs(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
    nodes {
      id
      databaseId
      title
      slug
      excerpt
      date
      jobDetails {
        companyName
        location
        salaryRange
        isFeatured
        isUrgent
        requirements
      }
      locations {
        nodes {
          name
          slug
          parent {
            node {
              name
              slug
            }
          }
        }
      }
      jobCategories {
        nodes {
          name
          slug
        }
      }
      jobTypes {
        nodes {
          name
          slug
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Get Jobs by Province (Parent Location)

```graphql
query GetJobsByProvince($province: String!) {
  jobs(
    where: {
      taxQuery: {
        taxArray: [
          {
            taxonomy: LOCATION
            field: SLUG
            terms: [$province]
            includeChildren: true
          }
        ]
      }
    }
  ) {
    nodes {
      id
      title
      slug
      jobDetails {
        companyName
        location
        salaryRange
      }
      locations {
        nodes {
          name
          slug
          parent {
            node {
              name
              slug
            }
          }
        }
      }
      jobCategories {
        nodes {
          name
          slug
        }
      }
    }
  }
}
```

> **Note:** `includeChildren: true` ensures jobs tagged with cities under that province are also returned.

### Get Jobs by Province AND Category (pSEO pages)

```graphql
query GetJobsByProvinceAndCategory($province: String!, $category: String!) {
  jobs(
    where: {
      taxQuery: {
        relation: AND
        taxArray: [
          {
            taxonomy: LOCATION
            field: SLUG
            terms: [$province]
            includeChildren: true
          }
          { taxonomy: JOBCATEGORY, field: SLUG, terms: [$category] }
        ]
      }
    }
  ) {
    nodes {
      id
      title
      slug
      jobDetails {
        companyName
        location
        salaryRange
        isFeatured
        isUrgent
      }
      locations {
        nodes {
          name
          slug
          parent {
            node {
              name
              slug
            }
          }
        }
      }
    }
  }
}
```

### Get Jobs by City (Specific Location)

```graphql
query GetJobsByCity($city: String!) {
  jobs(
    where: {
      taxQuery: {
        taxArray: [{ taxonomy: LOCATION, field: SLUG, terms: [$city] }]
      }
    }
  ) {
    nodes {
      id
      title
      slug
      jobDetails {
        companyName
        location
        salaryRange
      }
      locations {
        nodes {
          name
          slug
          parent {
            node {
              name
              slug
            }
          }
        }
      }
    }
  }
}
```

### Get Single Job

```graphql
query GetJob($slug: ID!) {
  job(id: $slug, idType: SLUG) {
    id
    title
    content
    date
    jobDetails {
      companyName
      location
      salaryRange
      salaryMin
      salaryMax
      deadline
      applyUrl
      whatsapp
      email
      isFeatured
      isUrgent
      requirements
    }
    locations {
      nodes {
        name
        slug
        parent {
          node {
            name
            slug
          }
        }
      }
    }
    jobCategories {
      nodes {
        name
        slug
      }
    }
    jobTypes {
      nodes {
        name
        slug
      }
    }
  }
}
```

### Get All Provinces with Job Count

```graphql
query GetProvinces {
  locations(where: { parent: 0 }) {
    nodes {
      name
      slug
      count
      children {
        nodes {
          name
          slug
          count
        }
      }
    }
  }
}
```

> **Note:** `parent: 0` returns only top-level terms (provinces). Use `children` to get cities within each province.

### Get All Categories with Job Count

```graphql
query GetCategories {
  jobCategories {
    nodes {
      name
      slug
      count
    }
  }
}
```

---

## Part 9: Create Articles/Career Tips Post Type

For career guide articles (separate from jobs):

### Option A: Use Default Posts

- Simpler setup
- Use Categories for: CV Guides, Interview Tips, Job Search, etc.

### Option B: Custom Post Type (Recommended)

```
Post Type Slug: career_article
Plural Label: Career Articles
Singular Label: Career Article
Show in GraphQL: True
GraphQL Single Name: careerArticle
GraphQL Plural Name: careerArticles
```

Taxonomy for articles:

```
Taxonomy Slug: article_category
Terms: CV Guides, Interview Tips, Job Search, Workplace Success
```

---

## Part 10: Security Recommendations

### 1. Disable WordPress Frontend (Optional)

If using purely as headless CMS:

```php
// Redirect frontend to Next.js site
add_action('template_redirect', function() {
    if (!is_admin() && !wp_doing_ajax() && !defined('GRAPHQL_REQUEST')) {
        wp_redirect('https://careercvpro.co.za');
        exit;
    }
});
```

### 2. Limit GraphQL Introspection (Production)

```php
add_filter('graphql_request_results', function($response) {
    if (isset($response['data']['__schema'])) {
        // Block introspection in production
        return new WP_Error('introspection_disabled', 'Introspection is disabled');
    }
    return $response;
});
```

### 3. Rate Limiting

Consider using:

- Cloudflare (recommended)
- WP GraphQL Rate Limit plugin

---

## Part 11: Environment Variables for Next.js

After WordPress setup, add to your `.env.local`:

```env
# WordPress GraphQL
WORDPRESS_GRAPHQL_URL=https://cms.careercvpro.co.za/graphql
WORDPRESS_API_URL=https://cms.careercvpro.co.za

# Optional: If using authentication for drafts
WORDPRESS_AUTH_REFRESH_TOKEN=your-token-here
WORDPRESS_PREVIEW_SECRET=your-secret-here
```

---

## Checklist

### WordPress Setup:

- [ ] WordPress installed on subdomain/separate domain
- [ ] WPGraphQL plugin installed and activated
- [ ] ACF plugin installed and activated
- [ ] WPGraphQL for ACF installed and activated
- [ ] Custom Post Type UI installed and activated
- [ ] Jobs CPT created with GraphQL enabled
- [ ] Location taxonomy created (hierarchical: provinces → cities)
- [ ] Job Category taxonomy created with terms
- [ ] Job Type taxonomy created with terms
- [ ] ACF field group created for Job Details
- [ ] All ACF fields have "Show in GraphQL" enabled
- [ ] CORS configured for Next.js domain
- [ ] Test queries working in GraphQL IDE
- [ ] Sample jobs created for testing

### Ready for Next.js Integration:

- [ ] GraphQL endpoint URL noted
- [ ] Test queries working
- [ ] Environment variables ready

---

## Next Steps

After completing this WordPress setup:

1. **Test your GraphQL endpoint** in the WordPress GraphQL IDE
2. **Create 5-10 sample jobs** for testing
3. **Proceed to Next.js GraphQL integration** (Phase 2)

The Next.js integration will:

- Replace `dummyJobs` with WordPress data
- Connect pSEO pages to real WordPress content
- Enable real-time job updates without code changes

---

**Document Version:** 1.0
**Date:** December 14, 2025
**For:** CareerCVPro Jobs Website
