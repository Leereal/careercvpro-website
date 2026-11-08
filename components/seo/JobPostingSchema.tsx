import type { Job } from "@/types/wordpress";

interface JobPostingSchemaProps {
  job: Job;
}

// Most jobs have no closing date in WordPress. Treat those as closed this many
// days after posting, so old listings drop out of Google for Jobs instead of
// staying live for ever.
const DEFAULT_LISTING_DAYS = 60;

function getValidThrough(job: Job): string | undefined {
  if (job.deadline) return job.deadline;
  const closes = new Date(job.postedDate);
  if (Number.isNaN(closes.getTime())) return undefined;
  closes.setUTCDate(closes.getUTCDate() + DEFAULT_LISTING_DAYS);
  return closes.toISOString();
}

export function JobPostingSchema({ job }: JobPostingSchemaProps) {
  // Build salary object if salary data exists
  const baseSalary =
    job.salaryMin || job.salaryMax
      ? {
          "@type": "MonetaryAmount",
          currency: "ZAR",
          value: {
            "@type": "QuantitativeValue",
            ...(job.salaryMin && job.salaryMax
              ? {
                  minValue: job.salaryMin,
                  maxValue: job.salaryMax,
                  unitText: "MONTH",
                }
              : job.salaryMin
              ? { value: job.salaryMin, unitText: "MONTH" }
              : { value: job.salaryMax, unitText: "MONTH" }),
          },
        }
      : undefined;

  // Map job type to schema.org employment type
  const employmentTypeMap: Record<string, string> = {
    "full-time": "FULL_TIME",
    "part-time": "PART_TIME",
    contract: "CONTRACTOR",
    temporary: "TEMPORARY",
    internship: "INTERN",
    remote: "FULL_TIME", // Remote is a location type, not employment type
  };

  const employmentTypes = job.type.split(",").map((t) => {
    const normalized = t.trim().toLowerCase();
    return employmentTypeMap[normalized] || "FULL_TIME";
  });

  const validThrough = getValidThrough(job);

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.descriptionHtml || job.description,
    identifier: {
      "@type": "PropertyValue",
      name: "CareerCVPro",
      value: job.id,
    },
    datePosted: job.postedDate,
    ...(validThrough && { validThrough }),
    employmentType:
      employmentTypes.length === 1 ? employmentTypes[0] : employmentTypes,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: job.applyUrl || undefined,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city || job.province,
        addressRegion: job.province,
        addressCountry: "ZA",
      },
    },
    ...(baseSalary && { baseSalary }),
    // directApply means the whole application happens on this site. Jobs with
    // an applyUrl send people to the employer's site, so it must be false.
    ...(job.applyUrl && { directApply: false }),
    applicantLocationRequirements: {
      "@type": "Country",
      name: "South Africa",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb schema for job pages
export function JobBreadcrumbSchema({ job }: JobPostingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.careercvpro.co.za",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Jobs",
        item: "https://www.careercvpro.co.za/jobs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Jobs in ${job.province}`,
        item: `https://www.careercvpro.co.za/jobs/${job.provinceSlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: job.title,
        item: `https://www.careercvpro.co.za/jobs/${job.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
