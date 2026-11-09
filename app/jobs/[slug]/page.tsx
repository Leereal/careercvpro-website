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

// Each page is built the first time someone visits it, then served from cache
// and rebuilt in the background at most every 5 minutes (JOBS_REVALIDATE_SECONDS
// in lib/wordpress.ts). Before this, every visit waited on WordPress, about 9 s
// per job page. If a rebuild fails, Next keeps serving the last good copy.
export const revalidate = 300;

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

// Build no pages at deploy time; each one is built on its first visit and then
// cached (see `revalidate` above). Building all ~800 job, city and category
// pages at once would send thousands of requests to WordPress in a few
// minutes, which is enough to take it down.
export async function generateStaticParams() {
  return [];
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

    // Fetch jobs matching both category and location. A WordPress error is
    // left to throw (here and below) so it isn't cached as an empty page or a
    // 404: Next keeps serving the last good copy instead.
    const jobs = await getJobsByLocationAndCategory(location, category, 100);

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
    const jobs = await getJobsByLocation(slug, 100);

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
    const jobs = await getJobsByLocation(slug, 100);

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

  // Otherwise it should be a job. 404 only when WordPress says the job doesn't
  // exist; a WordPress error throws instead.
  const job = await getJobBySlug(slug);
  if (!job) {
    notFound();
  }

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
