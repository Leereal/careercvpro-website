// ============================================
// Career Articles API - WordPress GraphQL
// ============================================

const WORDPRESS_GRAPHQL_URL =
  process.env.WORDPRESS_GRAPHQL_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL ||
  "https://wordpress.careercvpro.tredique.com/graphql";

// ============================================
// Types
// ============================================

export interface CareerArticle {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: ArticleCategory;
  read_time: string;
  is_featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[];
  featured_image_url: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type ArticleCategory =
  | "cv-guides"
  | "interview-guides"
  | "job-search-guides"
  | "workplace-guides";

export interface ArticleFilters {
  category?: ArticleCategory;
  is_featured?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface ArticleListResponse {
  articles: CareerArticle[];
  total: number;
  hasMore: boolean;
}

// ============================================
// Category Labels
// ============================================

export const categoryLabels: Record<ArticleCategory, string> = {
  "cv-guides": "CV Guides",
  "interview-guides": "Interview Guides",
  "job-search-guides": "Job Search Guides",
  "workplace-guides": "Workplace Guides",
};

export const categoryDescriptions: Record<ArticleCategory, string> = {
  "cv-guides":
    "Learn how to write a winning South African CV that gets you noticed by employers.",
  "interview-guides":
    "Expert tips and strategies to ace your next interview with confidence.",
  "job-search-guides":
    "Proven strategies to find and land your dream job in South Africa.",
  "workplace-guides":
    "Navigate your career and thrive in the workplace from day one.",
};

// ============================================
// GraphQL Helper
// ============================================

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const response = await fetch(WORDPRESS_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    throw new Error(json.errors[0]?.message || "GraphQL error");
  }

  if (!json.data) {
    throw new Error("No data returned from GraphQL");
  }

  return json.data;
}

// ============================================
// WordPress Post to CareerArticle Transformer
// ============================================

interface WPPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  status: string;
  readTime?: string;
  isFeaturedArticle?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  articleTags?: string[];
  featuredImage?: {
    node?: {
      sourceUrl: string;
    };
  };
  careerCategories?: {
    nodes: Array<{ slug: string; name: string }>;
  };
}

function transformWPPost(post: WPPost): CareerArticle {
  const categorySlug = post.careerCategories?.nodes?.[0]?.slug || "cv-guides";

  return {
    id: post.id,
    databaseId: post.databaseId,
    title: post.title,
    slug: post.slug,
    content: post.content || "",
    excerpt: post.excerpt?.replace(/<[^>]*>/g, "").trim() || null,
    category: categorySlug as ArticleCategory,
    read_time: post.readTime || "5 min read",
    is_featured: post.isFeaturedArticle || false,
    seo_title: post.seoTitle || null,
    seo_description: post.seoDescription || null,
    tags: post.articleTags || [],
    featured_image_url: post.featuredImage?.node?.sourceUrl || null,
    status: post.status === "publish" ? "published" : "draft",
    published_at: post.date,
    created_at: post.date,
    updated_at: post.modified,
  };
}

// ============================================
// GraphQL Fragments
// ============================================

const ARTICLE_FIELDS = `
  id
  databaseId
  title
  slug
  content
  excerpt
  date
  modified
  status
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
`;

// ============================================
// Article API Functions
// ============================================

/**
 * Get all articles with optional filters
 */
export async function getArticles(
  filters: ArticleFilters = {}
): Promise<ArticleListResponse> {
  try {
    const { category, search, limit = 20 } = filters;

    // Build where clause
    let whereClause = "";
    if (category) {
      whereClause = `, where: { taxQuery: { taxArray: [{ taxonomy: CAREERCATEGORY, field: SLUG, terms: "${category}" }] } }`;
    }

    const query = `
      query GetArticles($first: Int!, $search: String) {
        posts(
          first: $first
          ${whereClause}
          where: { search: $search, orderby: { field: DATE, order: DESC } }
        ) {
          nodes {
            ${ARTICLE_FIELDS}
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    // Note: Due to GraphQL query constraints, we'll build a simpler query
    const simpleQuery = category
      ? `
        query GetArticlesByCategory($first: Int!) {
          posts(
            first: $first
            where: { 
              taxQuery: { 
                taxArray: [{ taxonomy: CAREERCATEGORY, field: SLUG, terms: "${category}" }] 
              }
              orderby: { field: DATE, order: DESC }
            }
          ) {
            nodes {
              ${ARTICLE_FIELDS}
            }
          }
        }
      `
      : `
        query GetAllArticles($first: Int!) {
          posts(
            first: $first
            where: { 
              taxQuery: { 
                taxArray: [{ taxonomy: CAREERCATEGORY, operator: EXISTS }] 
              }
              orderby: { field: DATE, order: DESC }
            }
          ) {
            nodes {
              ${ARTICLE_FIELDS}
            }
          }
        }
      `;

    const data = await fetchGraphQL<{
      posts: { nodes: WPPost[]; pageInfo?: { hasNextPage: boolean } };
    }>(simpleQuery, { first: limit, search: search || null });

    const articles = data.posts.nodes.map(transformWPPost);

    // Filter by featured if needed
    const filteredArticles =
      filters.is_featured !== undefined
        ? articles.filter((a) => a.is_featured === filters.is_featured)
        : articles;

    // Filter by search on client if WP search didn't work
    const searchedArticles =
      search && !category
        ? filteredArticles.filter(
            (a) =>
              a.title.toLowerCase().includes(search.toLowerCase()) ||
              a.content.toLowerCase().includes(search.toLowerCase())
          )
        : filteredArticles;

    return {
      articles: searchedArticles,
      total: searchedArticles.length,
      hasMore: data.posts.pageInfo?.hasNextPage || false,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { articles: [], total: 0, hasMore: false };
  }
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(
  category: ArticleCategory,
  limit = 20
): Promise<CareerArticle[]> {
  const { articles } = await getArticles({ category, limit });
  return articles;
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles(
  category?: ArticleCategory,
  limit = 6
): Promise<CareerArticle[]> {
  const { articles } = await getArticles({ category, limit: 50 });
  return articles.filter((a) => a.is_featured).slice(0, limit);
}

/**
 * Get a single article by slug
 */
export async function getArticleBySlug(
  slug: string
): Promise<CareerArticle | null> {
  try {
    const query = `
      query GetArticleBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          ${ARTICLE_FIELDS}
        }
      }
    `;

    const data = await fetchGraphQL<{ post: WPPost | null }>(query, { slug });

    if (!data.post) {
      return null;
    }

    return transformWPPost(data.post);
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    return null;
  }
}

/**
 * Get a single article by ID
 */
export async function getArticleById(
  id: string
): Promise<CareerArticle | null> {
  try {
    const query = `
      query GetArticleById($id: ID!) {
        post(id: $id, idType: DATABASE_ID) {
          ${ARTICLE_FIELDS}
        }
      }
    `;

    const data = await fetchGraphQL<{ post: WPPost | null }>(query, { id });

    if (!data.post) {
      return null;
    }

    return transformWPPost(data.post);
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    return null;
  }
}

/**
 * Get related articles (same category, excluding current)
 */
export async function getRelatedArticles(
  article: CareerArticle,
  limit = 4
): Promise<CareerArticle[]> {
  try {
    const articles = await getArticlesByCategory(article.category, limit + 1);
    return articles.filter((a) => a.slug !== article.slug).slice(0, limit);
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }
}

/**
 * Get article count by category
 */
export async function getArticleCountByCategory(): Promise<
  Record<ArticleCategory, number>
> {
  try {
    const categories: ArticleCategory[] = [
      "cv-guides",
      "interview-guides",
      "job-search-guides",
      "workplace-guides",
    ];

    const counts: Record<ArticleCategory, number> = {
      "cv-guides": 0,
      "interview-guides": 0,
      "job-search-guides": 0,
      "workplace-guides": 0,
    };

    for (const category of categories) {
      const articles = await getArticlesByCategory(category, 100);
      counts[category] = articles.length;
    }

    return counts;
  } catch (error) {
    console.error("Error in getArticleCountByCategory:", error);
    return {
      "cv-guides": 0,
      "interview-guides": 0,
      "job-search-guides": 0,
      "workplace-guides": 0,
    };
  }
}

/**
 * Search articles
 */
export async function searchArticles(
  query: string,
  limit = 20
): Promise<CareerArticle[]> {
  const { articles } = await getArticles({ search: query, limit });
  return articles;
}

/**
 * Get all article slugs (for static generation)
 */
export async function getAllArticleSlugs(): Promise<string[]> {
  try {
    const query = `
      query GetAllArticleSlugs {
        posts(
          first: 100
          where: { 
            taxQuery: { 
              taxArray: [{ taxonomy: CAREERCATEGORY, operator: EXISTS }] 
            }
          }
        ) {
          nodes {
            slug
          }
        }
      }
    `;

    const data = await fetchGraphQL<{ posts: { nodes: { slug: string }[] } }>(
      query
    );

    return data.posts.nodes.map((node) => node.slug);
  } catch (error) {
    console.error("Error fetching article slugs:", error);
    return [];
  }
}

/**
 * Get recent articles across all categories
 */
export async function getRecentArticles(limit = 8): Promise<CareerArticle[]> {
  const { articles } = await getArticles({ limit });
  return articles;
}
