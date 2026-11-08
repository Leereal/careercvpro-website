import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProvincePageClient from "./ProvincePageClient";
import JobDetailPageClient from "./JobDetailPageClient";
import CategoryLocationPageClient from "./CategoryLocationPageClient";
import CityPageClient from "./CityPageClient";
import {
  getJobsByLocation,
  getJobBySlug,
  getAllJobs,
  getJobsByLocationAndCategory,
} from "@/lib/wordpress";
import {
  JobPostingSchema,
  JobBreadcrumbSchema,
} from "@/components/seo/JobPostingSchema";
import type { Job } from "@/types/wordpress";
import {
  pSEOContent,
  getCategoryLocationContent,
  getCityContent,
} from "@/lib/pseo-content";
import { provinceData, cityData } from "@/lib/job-locations";

// Force dynamic rendering - always fetch fresh job data
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Category names for display
const categoryNames: Record<string, string> = {
  security: "Security",
  retail: "Retail",
  "call-centre": "Call Centre",
  admin: "Admin",
  driving: "Driving",
  driver: "Driver",
  healthcare: "Healthcare",
  it: "IT",
  finance: "Finance",
  construction: "Construction",
  government: "Government",
  hospitality: "Hospitality",
  marketing: "Marketing",
  sales: "Sales",
  engineering: "Engineering",
  education: "Education",
  legal: "Legal",
  hr: "Human Resources",
  logistics: "Logistics",
  manufacturing: "Manufacturing",
  mining: "Mining",
  agriculture: "Agriculture",
  internship: "Internship",
  learnership: "Learnership",
  graduate: "Graduate",
  "entry-level": "Entry Level",
  remote: "Remote",
};

// Check if slug is a province
function isProvince(slug: string): boolean {
  return slug in provinceData;
}

// Check if slug is a city
function isCity(slug: string): boolean {
  return slug in cityData;
}

// Parse category-location slug like "security-jobs-in-gauteng"
function parseCategoryLocationSlug(slug: string): {
  category: string;
  categoryName: string;
  location: string;
  locationName: string;
} | null {
  const match = slug.match(/^(.+)-jobs-in-(.+)$/);
  if (!match) return null;

  const [, category, location] = match;

  // Validate location exists (province or city)
  const isValidLocation = isProvince(location) || isCity(location);
  if (!isValidLocation) return null;

  const categoryName =
    categoryNames[category] ||
    category
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  const locationName =
    provinceData[location]?.name ||
    cityData[location]?.name ||
    location
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  return { category, categoryName, location, locationName };
}

// Generate static params for provinces, cities, and category+location combos
export async function generateStaticParams() {
  // Province pages
  const provinceParams = Object.keys(provinceData).map((slug) => ({ slug }));

  // City pages (Phase 2)
  const cityParams = Object.keys(cityData).map((slug) => ({ slug }));

  // Category + Location combo pages (Phase 1 - Section 9)
  // Start with top categories and all provinces/major cities
  const topCategories = [
    "security",
    "retail",
    "call-centre",
    "admin",
    "it",
    "driving",
    "government",
    "internship",
    "learnership",
  ];
  const topLocations = [
    ...Object.keys(provinceData),
    "johannesburg",
    "pretoria",
    "cape-town",
    "durban",
    "port-elizabeth",
    "bloemfontein",
  ];

  const categoryLocationParams: { slug: string }[] = [];
  for (const category of topCategories) {
    for (const location of topLocations) {
      categoryLocationParams.push({ slug: `${category}-jobs-in-${location}` });
    }
  }

  // Also try to fetch job slugs from WordPress for static generation
  try {
    const { getAllJobSlugs } = await import("@/lib/wordpress");
    const jobSlugs = await getAllJobSlugs();
    const jobParams = jobSlugs.map((slug) => ({ slug }));
    return [
      ...provinceParams,
      ...cityParams,
      ...categoryLocationParams,
      ...jobParams,
    ];
  } catch {
    // If WordPress is unavailable, return static params
    return [...provinceParams, ...cityParams, ...categoryLocationParams];
  }
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Category + Location combo metadata (e.g., security-jobs-in-gauteng)
  const categoryLocation = parseCategoryLocationSlug(slug);
  if (categoryLocation) {
    const { categoryName, locationName, category, location } = categoryLocation;
    const content = getCategoryLocationContent(category, location);

    return {
      title: `${categoryName} Jobs in ${locationName} | ${
        content?.jobCount || ""
      } Vacancies | CareerCVPro`,
      description:
        content?.metaDescription ||
        `Find ${categoryName.toLowerCase()} jobs in ${locationName}, South Africa. Browse the latest ${categoryName.toLowerCase()} vacancies and employment opportunities. Apply today!`,
      keywords: [
        `${categoryName.toLowerCase()} jobs in ${locationName}`,
        `${categoryName.toLowerCase()} vacancies ${locationName}`,
        `${locationName} ${categoryName.toLowerCase()} jobs`,
        `${categoryName.toLowerCase()} employment ${locationName}`,
        "South Africa jobs",
        `jobs in ${locationName}`,
      ],
      openGraph: {
        title: `${categoryName} Jobs in ${locationName} | Employment Opportunities`,
        description: `Browse ${categoryName.toLowerCase()} job opportunities in ${locationName}. Find your next career move.`,
        type: "website",
        locale: "en_ZA",
        url: `https://www.careercvpro.co.za/jobs/${slug}`,
      },
      twitter: {
        card: "summary",
        title: `${categoryName} Jobs in ${locationName}`,
        description: `Find ${categoryName.toLowerCase()} jobs in ${locationName}, South Africa.`,
      },
      alternates: {
        canonical: `https://www.careercvpro.co.za/jobs/${slug}`,
      },
    };
  }

  // City metadata (e.g., johannesburg, cape-town)
  if (isCity(slug)) {
    const city = cityData[slug];
    const content = getCityContent(slug);

    return {
      title: `Jobs in ${city.name} | ${city.province} Employment | CareerCVPro`,
      description:
        content?.metaDescription ||
        `Find jobs in ${city.name}, ${city.province}. ${city.description} Browse employment opportunities and apply today!`,
      keywords: [
        `jobs in ${city.name}`,
        `${city.name} jobs`,
        `${city.name} vacancies`,
        `employment ${city.name}`,
        `${city.province} jobs`,
        "South Africa jobs",
      ],
      openGraph: {
        title: `Jobs in ${city.name} | Employment Opportunities`,
        description: city.description,
        type: "website",
        locale: "en_ZA",
        url: `https://www.careercvpro.co.za/jobs/${slug}`,
      },
      alternates: {
        canonical: `https://www.careercvpro.co.za/jobs/${slug}`,
      },
    };
  }

  // Province metadata
  if (isProvince(slug)) {
    const data = provinceData[slug];
    return {
      title: `Jobs in ${data.name} | ${data.capital} Employment | CareerCVPro`,
      description: `Find jobs in ${
        data.name
      }, South Africa. Browse employment opportunities in ${data.cities
        .slice(0, 4)
        .join(", ")} and more. ${data.description}`,
      keywords: [
        `jobs in ${data.name}`,
        `${data.name} jobs`,
        `${data.capital} jobs`,
        `employment ${data.name}`,
        ...data.cities.map((city) => `${city} jobs`),
        "South Africa jobs",
      ],
      openGraph: {
        title: `Jobs in ${data.name} | Employment Opportunities`,
        description: `Browse job opportunities in ${data.name}. ${data.description}`,
        type: "website",
        locale: "en_ZA",
      },
      alternates: {
        canonical: `https://www.careercvpro.co.za/jobs/${slug}`,
      },
    };
  }

  // Job detail metadata - fetch from WordPress
  try {
    const job = await getJobBySlug(slug);
    if (job) {
      const title = `${job.title} at ${job.company} | ${job.location}`;
      const description = job.excerpt || job.description.slice(0, 155) + "...";

      // Build OpenGraph images array if featured image exists
      const ogImages = job.featuredImage?.url
        ? [
            {
              url: job.featuredImage.url,
              width: job.featuredImage.width || 1200,
              height: job.featuredImage.height || 630,
              alt: job.featuredImage.alt || `${job.title} at ${job.company}`,
            },
          ]
        : undefined;

      return {
        title,
        description,
        keywords: [
          job.title,
          job.company,
          `${job.category} jobs`,
          `jobs in ${job.location}`,
          `${job.province} jobs`,
          job.type,
        ],
        openGraph: {
          title,
          description,
          type: "website",
          locale: "en_ZA",
          url: `https://www.careercvpro.co.za/jobs/${slug}`,
          ...(ogImages && { images: ogImages }),
        },
        twitter: {
          card: job.featuredImage?.url ? "summary_large_image" : "summary",
          title,
          description,
          ...(job.featuredImage?.url && { images: [job.featuredImage.url] }),
        },
        alternates: {
          canonical: `https://www.careercvpro.co.za/jobs/${slug}`,
        },
      };
    }
  } catch {
    // Fall through to default
  }

  return {
    title: "Job Details | CareerCVPro",
    description: "View job details and apply for this position.",
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check for category+location combo first (e.g., security-jobs-in-gauteng)
  const categoryLocation = parseCategoryLocationSlug(slug);
  if (categoryLocation) {
    const { category, categoryName, location, locationName } = categoryLocation;
    const content = getCategoryLocationContent(category, location);

    // Fetch jobs matching both category and location
    let jobs: Job[] = [];
    try {
      jobs = await getJobsByLocationAndCategory(location, category, 100);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }

    // Hide empty pages - return 404 if no jobs found
    if (jobs.length === 0) {
      notFound();
    }

    return (
      <CategoryLocationPageClient
        jobs={jobs}
        category={category}
        categoryName={categoryName}
        location={location}
        locationName={locationName}
        slug={slug}
        introContent={content?.introContent}
        faqs={content?.faqs}
      />
    );
  }

  // Check if it's a city page (e.g., johannesburg, cape-town)
  if (isCity(slug)) {
    const city = cityData[slug];
    const content = getCityContent(slug);

    // Fetch jobs from WordPress for this city
    let jobs: Job[] = [];
    try {
      jobs = await getJobsByLocation(slug, 100);
    } catch (error) {
      console.error("Failed to fetch jobs from WordPress:", error);
    }

    // Hide empty city pages - return 404 if no jobs found
    if (jobs.length === 0) {
      notFound();
    }

    return (
      <CityPageClient
        city={slug}
        cityName={city.name}
        province={city.province}
        provinceSlug={city.provinceSlug}
        description={city.description}
        initialJobs={jobs}
        introContent={content?.introContent}
        faqs={content?.faqs}
      />
    );
  }

  // If it's a province, show province page with WordPress data
  if (isProvince(slug)) {
    const data = provinceData[slug];

    // Fetch jobs from WordPress
    let jobs: Job[] = [];
    try {
      jobs = await getJobsByLocation(slug, 100);
    } catch (error) {
      console.error("Failed to fetch jobs from WordPress:", error);
      // Jobs will be empty, client can show "no jobs" state
    }

    return (
      <ProvincePageClient
        province={slug}
        provinceName={data.name}
        capital={data.capital}
        description={data.description}
        cities={data.cities}
        initialJobs={jobs}
      />
    );
  }

  // Otherwise, try to fetch job detail from WordPress
  try {
    const job = await getJobBySlug(slug);
    if (job) {
      // Fetch related jobs (same category or province)
      let relatedJobs: Job[] = [];
      try {
        const { jobs: allJobs } = await getAllJobs({ first: 20 });
        relatedJobs = allJobs
          .filter(
            (j) =>
              j.id !== job.id &&
              (j.category === job.category || j.province === job.province)
          )
          .slice(0, 3);
      } catch {
        // Related jobs are optional
      }

      return (
        <>
          <JobPostingSchema job={job} />
          <JobBreadcrumbSchema job={job} />
          <JobDetailPageClient job={job} relatedJobs={relatedJobs} />
        </>
      );
    }
  } catch (error) {
    console.error("Failed to fetch job from WordPress:", error);
  }

  // If neither province nor valid job, show 404
  notFound();
}
