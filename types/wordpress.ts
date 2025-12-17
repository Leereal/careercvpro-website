// WordPress GraphQL Types
// Matches the WordPress schema from WORDPRESS-HEADLESS-SETUP.md

// ============================================
// Base GraphQL Types
// ============================================

export interface WPPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface WPNode {
  id: string;
  databaseId: number;
}

// ============================================
// Location Taxonomy (Provinces & Cities)
// ============================================

export interface WPLocationNode {
  name: string;
  slug: string;
  count: number | null;
  parent: {
    node: {
      name: string;
      slug: string;
    } | null;
  } | null;
  children?: {
    nodes: WPLocationNode[];
  };
}

export interface WPLocationsConnection {
  nodes: WPLocationNode[];
}

// ============================================
// Job Category Taxonomy
// ============================================

export interface WPJobCategoryNode {
  name: string;
  slug: string;
  count: number | null;
}

export interface WPJobCategoriesConnection {
  nodes: WPJobCategoryNode[];
}

// ============================================
// Job Type Taxonomy
// ============================================

export interface WPJobTypeNode {
  name: string;
  slug: string;
}

export interface WPJobTypesConnection {
  nodes: WPJobTypeNode[];
}

// ============================================
// ACF Job Details
// ============================================

export interface WPJobDetails {
  companyName: string | null;
  location: string | null;
  salaryRange: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  applicationDeadline: string | null;
  externalApplyUrl: string | null;
  whatsappNumber: string | null;
  isFeatured: boolean | null;
  isUrgent: boolean | null;
  requirements: string | null; // Text Area field, not repeater
}

// ============================================
// Featured Image
// ============================================

export interface WPFeaturedImage {
  node: {
    sourceUrl: string;
    altText: string | null;
    mediaDetails: {
      width: number;
      height: number;
    } | null;
  } | null;
}

// ============================================
// Job Post Type
// ============================================

export interface WPJob extends WPNode {
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  date: string;
  modified: string;
  featuredImage: WPFeaturedImage | null;
  jobDetails: WPJobDetails | null;
  locations: WPLocationsConnection;
  jobCategories: WPJobCategoriesConnection;
  jobTypes: WPJobTypesConnection;
}

export interface WPJobsConnection {
  nodes: WPJob[];
  pageInfo: WPPageInfo;
}

// ============================================
// Query Response Types
// ============================================

export interface GetJobsResponse {
  jobs: WPJobsConnection;
}

export interface GetJobResponse {
  job: WPJob | null;
}

export interface GetLocationsResponse {
  locations: WPLocationsConnection;
}

export interface GetJobCategoriesResponse {
  jobCategories: WPJobCategoriesConnection;
}

// ============================================
// Transformed Types (for frontend use)
// ============================================

export interface Job {
  id: string;
  databaseId?: number;
  title: string;
  slug?: string;
  company: string;
  location: string;
  province: string;
  provinceSlug?: string;
  city?: string | null;
  citySlug?: string | null;
  type: string;
  category: string;
  categorySlug?: string;
  salary?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  postedDate: string;
  description: string;
  descriptionHtml?: string; // Raw HTML content from WordPress
  excerpt?: string;
  requirements: string[];
  featured?: boolean;
  urgent?: boolean;
  applyUrl?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  deadline?: string | null;
  featuredImage?: {
    url: string;
    alt: string | null;
    width?: number;
    height?: number;
  } | null;
}

export interface Province {
  name: string;
  slug: string;
  count: number;
  cities: City[];
}

export interface City {
  name: string;
  slug: string;
  count: number;
  provinceSlug: string;
}

export interface JobCategory {
  name: string;
  slug: string;
  count: number;
}

// ============================================
// Filter & Query Types
// ============================================

export interface JobFilters {
  province?: string;
  city?: string;
  category?: string;
  type?: string;
  search?: string;
  featured?: boolean;
}

export interface PaginationParams {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}
