import {
  WPJob,
  WPJobsConnection,
  WPLocationsConnection,
  WPJobCategoriesConnection,
  WPLocationNode,
  GetJobsResponse,
  GetJobResponse,
  GetLocationsResponse,
  GetJobCategoriesResponse,
  Job,
  Province,
  City,
  JobCategory,
  JobFilters,
  PaginationParams,
} from "@/types/wordpress";

// ============================================
// Configuration
// ============================================

const WORDPRESS_GRAPHQL_URL =
  process.env.WORDPRESS_GRAPHQL_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL ||
  "https://wordpress.careercvpro.tredique.com/graphql";

// ============================================
// GraphQL Client
// ============================================

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options: {
    revalidate?: number | false;
    tags?: string[];
    noCache?: boolean;
  } = {}
): Promise<T> {
  const { revalidate = 0, tags, noCache = false } = options; // Default to no cache (fresh data)

  try {
    const fetchOptions: RequestInit & {
      next?: { revalidate?: number | false; tags?: string[] };
    } = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    };

    // Use no-store cache for immediate freshness, or ISR with revalidation
    if (noCache) {
      fetchOptions.cache = "no-store";
    } else if (revalidate !== undefined || tags) {
      fetchOptions.next = {};
      if (revalidate !== undefined) fetchOptions.next.revalidate = revalidate;
      if (tags) fetchOptions.next.tags = tags;
    }

    const response = await fetch(WORDPRESS_GRAPHQL_URL, fetchOptions);

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
  } catch (error) {
    console.error("WordPress GraphQL fetch error:", error);
    throw error;
  }
}

// ============================================
// GraphQL Queries
// ============================================

// Note: These queries assume WPGraphQL plugin with ACF to GraphQL support
// The exact field names depend on your WordPress configuration
// If queries fail, data falls back to dummy jobs

const GET_ALL_JOBS = `
  query GetAllJobs($first: Int = 100, $after: String) {
    jobs(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        title
        slug
        content
        excerpt
        date
        modified
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        jobDetails {
          companyName
          location
          salaryRange
          salaryMin
          salaryMax
          applicationDeadline
          externalApplyUrl
          whatsappNumber
          isFeatured
          isUrgent
          requirements
        }
        provinces {
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
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

const GET_JOBS_BY_FILTERS = GET_ALL_JOBS; // Use same query, filter client-side

const GET_JOBS_BY_LOCATION = GET_ALL_JOBS; // Use same query, filter client-side

const GET_JOBS_BY_CATEGORY = GET_ALL_JOBS; // Use same query, filter client-side

const GET_JOB_BY_SLUG = `
  query GetJob($slug: ID!) {
    job(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      content
      excerpt
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      jobDetails {
        companyName
        location
        salaryRange
        salaryMin
        salaryMax
        applicationDeadline
        externalApplyUrl
        whatsappNumber
        isFeatured
        isUrgent
        requirements
      }
      provinces {
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
`;

const GET_LOCATIONS = `
  query GetLocations {
    jobCategories(first: 100) {
      nodes {
        name
        slug
        count
      }
    }
  }
`;

const GET_JOB_CATEGORIES = `
  query GetJobCategories {
    jobCategories(first: 100) {
      nodes {
        name
        slug
        count
      }
    }
  }
`;

const GET_ALL_JOB_SLUGS = `
  query GetAllJobSlugs($first: Int = 1000) {
    jobs(first: $first) {
      nodes {
        slug
        modified
      }
    }
  }
`;

// ============================================
// Data Transformers
// ============================================

function transformWPJobToJob(wpJob: WPJob): Job {
  // Extract province and city from provinces taxonomy
  let province = "South Africa";
  let provinceSlug = "south-africa";
  let city: string | null = null;
  let citySlug: string | null = null;

  // Get provinces from the taxonomy (primary source)
  const provinceNodes =
    (
      wpJob as WPJob & {
        provinces?: {
          nodes: Array<{
            name: string;
            slug: string;
            parent?: { node: { name: string; slug: string } | null } | null;
          }>;
        };
      }
    ).provinces?.nodes || [];

  for (const loc of provinceNodes) {
    if (loc.parent?.node) {
      // This is a city (has parent province)
      city = loc.name;
      citySlug = loc.slug;
      province = loc.parent.node.name;
      provinceSlug = loc.parent.node.slug;
    } else {
      // This is a province (no parent)
      province = loc.name;
      provinceSlug = loc.slug;
    }
  }

  // Fallback: Try to get location from ACF field if no taxonomy data
  if (province === "South Africa") {
    const acfLocation = wpJob.jobDetails?.location;
    if (acfLocation) {
      // Parse location string like "Sandton, Johannesburg, Gauteng"
      const parts = acfLocation.split(",").map((p) => p.trim());
      if (parts.length >= 2) {
        city = parts[0];
        citySlug = parts[0].toLowerCase().replace(/\s+/g, "-");
        province = parts[parts.length - 1];
        provinceSlug = province.toLowerCase().replace(/\s+/g, "-");
      } else {
        province = parts[0];
        provinceSlug = parts[0].toLowerCase().replace(/\s+/g, "-");
      }
    }
  }

  // Extract category
  const categoryNode = wpJob.jobCategories?.nodes?.[0];
  const category = categoryNode?.name || "General";
  const categorySlug = categoryNode?.slug || "general";

  // Extract job type - handle multiple types
  const typeNodes = wpJob.jobTypes?.nodes || [];
  const type = typeNodes.map((t) => t.name).join(", ") || "Full-time";

  // Extract requirements - handle both array and string formats
  let requirements: string[] = [];
  const reqData = wpJob.jobDetails?.requirements as unknown;
  if (Array.isArray(reqData)) {
    requirements = reqData
      .map((r: { requirement: string } | string) =>
        typeof r === "string" ? r : r.requirement
      )
      .filter(Boolean);
  } else if (typeof reqData === "string" && reqData) {
    requirements = reqData
      .split("\n")
      .map((r: string) => r.trim())
      .filter(Boolean);
  }

  // Clean HTML from content/excerpt
  const cleanHtml = (html: string | null): string => {
    if (!html) return "";
    return html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  // Build location string - prefer taxonomy data, fallback to ACF field
  const locationStr = city
    ? `${city}, ${province}`
    : province !== "South Africa"
    ? province
    : wpJob.jobDetails?.location || province;

  return {
    id: wpJob.id,
    databaseId: wpJob.databaseId,
    title: wpJob.title,
    slug: wpJob.slug,
    company: wpJob.jobDetails?.companyName || "Company",
    location: locationStr,
    province,
    provinceSlug,
    city,
    citySlug,
    type,
    category,
    categorySlug,
    salary: wpJob.jobDetails?.salaryRange || null,
    salaryMin: wpJob.jobDetails?.salaryMin || null,
    salaryMax: wpJob.jobDetails?.salaryMax || null,
    postedDate: wpJob.date,
    description: cleanHtml(wpJob.content),
    descriptionHtml: wpJob.content || "", // Preserve raw HTML for styled rendering
    excerpt:
      cleanHtml(wpJob.excerpt) ||
      cleanHtml(wpJob.content)?.slice(0, 200) + "...",
    requirements,
    featured: wpJob.jobDetails?.isFeatured || false,
    urgent: wpJob.jobDetails?.isUrgent || false,
    applyUrl: wpJob.jobDetails?.externalApplyUrl || null,
    whatsapp: wpJob.jobDetails?.whatsappNumber || null,
    email: null, // No email field in ACF
    deadline: wpJob.jobDetails?.applicationDeadline || null,
    featuredImage: wpJob.featuredImage?.node
      ? {
          url: wpJob.featuredImage.node.sourceUrl,
          alt: wpJob.featuredImage.node.altText || wpJob.title,
          width: wpJob.featuredImage.node.mediaDetails?.width,
          height: wpJob.featuredImage.node.mediaDetails?.height,
        }
      : null,
  };
}

function transformWPLocationsToProvinces(
  wpLocations: WPLocationNode[]
): Province[] {
  return wpLocations.map((loc) => ({
    name: loc.name,
    slug: loc.slug,
    count: loc.count || 0,
    cities:
      loc.children?.nodes.map((child) => ({
        name: child.name,
        slug: child.slug,
        count: child.count || 0,
        provinceSlug: loc.slug,
      })) || [],
  }));
}

function transformWPCategoriesToJobCategories(
  wpCategories: WPJobCategoriesConnection
): JobCategory[] {
  return wpCategories.nodes.map((cat) => ({
    name: cat.name,
    slug: cat.slug,
    count: cat.count || 0,
  }));
}

// ============================================
// Public API Functions
// ============================================

/**
 * Fetch all jobs from WordPress
 * Uses no-cache to always get fresh job listings
 */
export async function getAllJobs(
  pagination?: PaginationParams
): Promise<{ jobs: Job[]; hasMore: boolean; endCursor: string | null }> {
  const data = await fetchGraphQL<GetJobsResponse>(
    GET_ALL_JOBS,
    {
      first: pagination?.first || 100,
      after: pagination?.after || null,
    },
    { noCache: true, tags: ["jobs"] }
  );

  return {
    jobs: data.jobs.nodes.map(transformWPJobToJob),
    hasMore: data.jobs.pageInfo.hasNextPage,
    endCursor: data.jobs.pageInfo.endCursor,
  };
}

/**
 * Fetch jobs by location (province or city)
 * Falls back to client-side filtering
 */
export async function getJobsByLocation(
  locationSlug: string,
  first: number = 100
): Promise<Job[]> {
  const { jobs } = await getAllJobs({ first });

  // Client-side filter by province or city slug
  return jobs.filter(
    (job) =>
      job.provinceSlug === locationSlug ||
      job.citySlug === locationSlug ||
      job.province.toLowerCase().replace(/\s+/g, "-") === locationSlug ||
      (job.city && job.city.toLowerCase().replace(/\s+/g, "-") === locationSlug)
  );
}

/**
 * Fetch jobs by category
 * Falls back to client-side filtering
 */
export async function getJobsByCategory(
  categorySlug: string,
  first: number = 100
): Promise<Job[]> {
  const { jobs } = await getAllJobs({ first });

  // Client-side filter by category slug
  return jobs.filter(
    (job) =>
      job.categorySlug === categorySlug ||
      job.category.toLowerCase().replace(/\s+/g, "-") === categorySlug
  );
}

/**
 * Fetch jobs by location AND category (for pSEO pages)
 * Uses client-side filtering
 */
export async function getJobsByLocationAndCategory(
  locationSlug: string,
  categorySlug: string,
  first: number = 100
): Promise<Job[]> {
  const { jobs } = await getAllJobs({ first });

  // Client-side filter by both location and category
  return jobs.filter((job) => {
    const matchesLocation =
      job.provinceSlug === locationSlug ||
      job.citySlug === locationSlug ||
      job.province.toLowerCase().replace(/\s+/g, "-") === locationSlug ||
      (job.city &&
        job.city.toLowerCase().replace(/\s+/g, "-") === locationSlug);

    const matchesCategory =
      job.categorySlug === categorySlug ||
      job.category.toLowerCase().replace(/\s+/g, "-") === categorySlug;

    return matchesLocation && matchesCategory;
  });
}

/**
 * Fetch a single job by slug
 * Uses no-cache to always get fresh job data
 */
export async function getJobBySlug(slug: string): Promise<Job | null> {
  const data = await fetchGraphQL<GetJobResponse>(
    GET_JOB_BY_SLUG,
    { slug },
    { noCache: true, tags: ["jobs", `job-${slug}`] }
  );

  if (!data.job) return null;
  return transformWPJobToJob(data.job);
}

/**
 * Fetch all provinces with their cities
 * Returns static fallback data if WordPress query fails
 */
export async function getProvinces(): Promise<Province[]> {
  try {
    // Since GET_LOCATIONS may not work if locations taxonomy doesn't exist,
    // we'll derive provinces from actual jobs
    const { jobs } = await getAllJobs({ first: 100 });

    const provinceMap = new Map<
      string,
      { name: string; slug: string; count: number }
    >();

    for (const job of jobs) {
      if (job.provinceSlug && job.province) {
        const existing = provinceMap.get(job.provinceSlug);
        if (existing) {
          existing.count++;
        } else {
          provinceMap.set(job.provinceSlug, {
            name: job.province,
            slug: job.provinceSlug,
            count: 1,
          });
        }
      }
    }

    if (provinceMap.size > 0) {
      return Array.from(provinceMap.values()).map((p) => ({
        ...p,
        cities: [],
      }));
    }
  } catch {
    // Fall through to static data
  }

  // Return static SA provinces as fallback
  return [
    { name: "Gauteng", slug: "gauteng", count: 0, cities: [] },
    { name: "Western Cape", slug: "western-cape", count: 0, cities: [] },
    { name: "KwaZulu-Natal", slug: "kwazulu-natal", count: 0, cities: [] },
    { name: "Eastern Cape", slug: "eastern-cape", count: 0, cities: [] },
    { name: "Limpopo", slug: "limpopo", count: 0, cities: [] },
    { name: "Mpumalanga", slug: "mpumalanga", count: 0, cities: [] },
    { name: "North West", slug: "north-west", count: 0, cities: [] },
    { name: "Free State", slug: "free-state", count: 0, cities: [] },
    { name: "Northern Cape", slug: "northern-cape", count: 0, cities: [] },
  ];
}

/**
 * Fetch all job categories
 * Returns categories derived from actual jobs if WordPress query fails
 */
export async function getJobCategories(): Promise<JobCategory[]> {
  try {
    const data = await fetchGraphQL<GetJobCategoriesResponse>(
      GET_JOB_CATEGORIES,
      {},
      { revalidate: 300, tags: ["categories"] }
    );

    if (data.jobCategories?.nodes?.length > 0) {
      return transformWPCategoriesToJobCategories(data.jobCategories);
    }
  } catch {
    // Fall through to derive from jobs
  }

  // Derive categories from actual jobs
  try {
    const { jobs } = await getAllJobs({ first: 100 });

    const categoryMap = new Map<
      string,
      { name: string; slug: string; count: number }
    >();

    for (const job of jobs) {
      const slug =
        job.categorySlug || job.category.toLowerCase().replace(/\s+/g, "-");
      const existing = categoryMap.get(slug);
      if (existing) {
        existing.count++;
      } else {
        categoryMap.set(slug, {
          name: job.category,
          slug,
          count: 1,
        });
      }
    }

    if (categoryMap.size > 0) {
      return Array.from(categoryMap.values());
    }
  } catch {
    // Fall through to static data
  }

  // Return static categories as fallback
  return [
    { name: "Security", slug: "security", count: 0 },
    { name: "Retail", slug: "retail", count: 0 },
    { name: "Call Centre", slug: "call-centre", count: 0 },
    { name: "Admin", slug: "admin", count: 0 },
    { name: "Driving", slug: "driving", count: 0 },
    { name: "Healthcare", slug: "healthcare", count: 0 },
    { name: "IT", slug: "it", count: 0 },
    { name: "Finance", slug: "finance", count: 0 },
    { name: "Construction", slug: "construction", count: 0 },
    { name: "Government", slug: "government", count: 0 },
    { name: "Hospitality", slug: "hospitality", count: 0 },
  ];
}

/**
 * Fetch all job slugs (for generateStaticParams)
 */
export async function getAllJobSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<{ jobs: { nodes: { slug: string }[] } }>(
    GET_ALL_JOB_SLUGS,
    { first: 1000 },
    { revalidate: 300, tags: ["jobs"] }
  );

  return data.jobs.nodes.map((job) => job.slug);
}

/**
 * Search jobs by keyword
 * Uses client-side filtering for reliability
 */
export async function searchJobs(
  keyword: string,
  first: number = 50
): Promise<Job[]> {
  // Use client-side search for reliability
  const { jobs } = await getAllJobs({ first: 100 });

  const searchLower = keyword.toLowerCase();
  return jobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.category.toLowerCase().includes(searchLower)
    )
    .slice(0, first);
}

/**
 * Get featured jobs
 */
export async function getFeaturedJobs(first: number = 10): Promise<Job[]> {
  // Note: This requires ACF to expose isFeatured in where clause
  // For now, fetch all and filter client-side
  const { jobs } = await getAllJobs({ first: 100 });
  return jobs.filter((job) => job.featured).slice(0, first);
}

/**
 * Get urgent jobs
 */
export async function getUrgentJobs(first: number = 10): Promise<Job[]> {
  const { jobs } = await getAllJobs({ first: 100 });
  return jobs.filter((job) => job.urgent).slice(0, first);
}

/**
 * Get jobs count by province
 */
export async function getJobCountByProvince(): Promise<Record<string, number>> {
  const provinces = await getProvinces();
  const counts: Record<string, number> = {};

  for (const province of provinces) {
    counts[province.slug] = province.count;
  }

  return counts;
}

/**
 * Get jobs count by category
 */
export async function getJobCountByCategory(): Promise<Record<string, number>> {
  const categories = await getJobCategories();
  const counts: Record<string, number> = {};

  for (const category of categories) {
    counts[category.slug] = category.count;
  }

  return counts;
}

// ============================================
// Utility Exports
// ============================================

export { WORDPRESS_GRAPHQL_URL };
