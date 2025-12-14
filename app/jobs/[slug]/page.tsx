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

// Province data for static generation and metadata
const provinceData: Record<
  string,
  {
    name: string;
    capital: string;
    description: string;
    cities: string[];
  }
> = {
  gauteng: {
    name: "Gauteng",
    capital: "Johannesburg",
    description:
      "South Africa's economic hub with the highest concentration of jobs. Home to Johannesburg, Pretoria, and major business districts.",
    cities: [
      "Johannesburg",
      "Pretoria",
      "Sandton",
      "Midrand",
      "Centurion",
      "Soweto",
      "Randburg",
      "Roodepoort",
    ],
  },
  "western-cape": {
    name: "Western Cape",
    capital: "Cape Town",
    description:
      "A diverse economy with strong tourism, agriculture, and tech sectors. Cape Town is a major business and tourism destination.",
    cities: [
      "Cape Town",
      "Stellenbosch",
      "Paarl",
      "Somerset West",
      "Bellville",
      "Century City",
      "Tyger Valley",
    ],
  },
  "kwazulu-natal": {
    name: "KwaZulu-Natal",
    capital: "Durban",
    description:
      "Major port city and industrial hub. Strong manufacturing, tourism, and agricultural sectors along the coast.",
    cities: [
      "Durban",
      "Pietermaritzburg",
      "Richards Bay",
      "Newcastle",
      "Umhlanga",
      "Ballito",
      "Pinetown",
    ],
  },
  "eastern-cape": {
    name: "Eastern Cape",
    capital: "Bhisho",
    description:
      "Growing economy with automotive manufacturing in Port Elizabeth and East London. Government and education sectors.",
    cities: [
      "Port Elizabeth",
      "East London",
      "Mthatha",
      "Grahamstown",
      "Uitenhage",
      "King William's Town",
    ],
  },
  limpopo: {
    name: "Limpopo",
    capital: "Polokwane",
    description:
      "Rich in mining and agriculture. Growing tourism sector around Kruger National Park. Government services hub.",
    cities: [
      "Polokwane",
      "Tzaneen",
      "Thohoyandou",
      "Louis Trichardt",
      "Mokopane",
      "Musina",
    ],
  },
  mpumalanga: {
    name: "Mpumalanga",
    capital: "Mbombela (Nelspruit)",
    description:
      "Major mining province with coal and other minerals. Strong tourism around Kruger Park and Panorama Route.",
    cities: [
      "Nelspruit",
      "Witbank",
      "Middelburg",
      "Secunda",
      "Ermelo",
      "Standerton",
    ],
  },
  "north-west": {
    name: "North West",
    capital: "Mahikeng",
    description:
      "Platinum mining capital of the world. Sun City tourism. Agricultural and gaming industries.",
    cities: [
      "Rustenburg",
      "Potchefstroom",
      "Klerksdorp",
      "Mahikeng",
      "Brits",
      "Hartbeespoort",
    ],
  },
  "free-state": {
    name: "Free State",
    capital: "Bloemfontein",
    description:
      "Judicial capital of South Africa. Strong agricultural sector and gold mining. Education hub with multiple universities.",
    cities: [
      "Bloemfontein",
      "Welkom",
      "Bethlehem",
      "Kroonstad",
      "Sasolburg",
      "Parys",
    ],
  },
  "northern-cape": {
    name: "Northern Cape",
    capital: "Kimberley",
    description:
      "Diamond mining heritage in Kimberley. Solar energy boom. Agriculture along the Orange River.",
    cities: [
      "Kimberley",
      "Upington",
      "Springbok",
      "De Aar",
      "Kuruman",
      "Kathu",
    ],
  },
};

// City data for city-only pages (Phase 2)
const cityData: Record<
  string,
  {
    name: string;
    province: string;
    provinceSlug: string;
    description: string;
  }
> = {
  johannesburg: {
    name: "Johannesburg",
    province: "Gauteng",
    provinceSlug: "gauteng",
    description:
      "South Africa's largest city and economic hub. Home to major corporations, finance sector, and diverse employment opportunities.",
  },
  pretoria: {
    name: "Pretoria",
    province: "Gauteng",
    provinceSlug: "gauteng",
    description:
      "South Africa's administrative capital with government jobs, embassies, and universities. Strong public sector employment.",
  },
  "cape-town": {
    name: "Cape Town",
    province: "Western Cape",
    provinceSlug: "western-cape",
    description:
      "Legislative capital with booming tech, tourism, and creative industries. Major port city with diverse job market.",
  },
  durban: {
    name: "Durban",
    province: "KwaZulu-Natal",
    provinceSlug: "kwazulu-natal",
    description:
      "Africa's busiest port city. Strong manufacturing, logistics, tourism, and maritime employment opportunities.",
  },
  "port-elizabeth": {
    name: "Port Elizabeth",
    province: "Eastern Cape",
    provinceSlug: "eastern-cape",
    description:
      "Major automotive manufacturing hub. Also known as Gqeberha. Growing industrial and tourism sectors.",
  },
  bloemfontein: {
    name: "Bloemfontein",
    province: "Free State",
    provinceSlug: "free-state",
    description:
      "Judicial capital of South Africa. University town with legal, education, and healthcare jobs.",
  },
  sandton: {
    name: "Sandton",
    province: "Gauteng",
    provinceSlug: "gauteng",
    description:
      "Africa's richest square mile. Financial hub with corporate headquarters, banks, and professional services.",
  },
  midrand: {
    name: "Midrand",
    province: "Gauteng",
    provinceSlug: "gauteng",
    description:
      "Major business and industrial hub between Johannesburg and Pretoria. Gallagher Convention Centre area.",
  },
  centurion: {
    name: "Centurion",
    province: "Gauteng",
    provinceSlug: "gauteng",
    description:
      "Growing business district south of Pretoria. IT, retail, and corporate park opportunities.",
  },
  polokwane: {
    name: "Polokwane",
    province: "Limpopo",
    provinceSlug: "limpopo",
    description:
      "Limpopo's capital and commercial hub. Government, retail, and mining-related employment.",
  },
  nelspruit: {
    name: "Nelspruit",
    province: "Mpumalanga",
    provinceSlug: "mpumalanga",
    description:
      "Gateway to Kruger Park. Also known as Mbombela. Tourism, agriculture, and government jobs.",
  },
  rustenburg: {
    name: "Rustenburg",
    province: "North West",
    provinceSlug: "north-west",
    description:
      "Platinum capital of the world. Major mining operations and Sun City tourism nearby.",
  },
  kimberley: {
    name: "Kimberley",
    province: "Northern Cape",
    provinceSlug: "northern-cape",
    description:
      "Historic diamond mining city. Big Hole landmark. Government and mining sector employment.",
  },
  pietermaritzburg: {
    name: "Pietermaritzburg",
    province: "KwaZulu-Natal",
    provinceSlug: "kwazulu-natal",
    description:
      "KZN's capital city. Government services, education, and aluminium manufacturing.",
  },
  "east-london": {
    name: "East London",
    province: "Eastern Cape",
    provinceSlug: "eastern-cape",
    description:
      "Only river port in South Africa. Mercedes-Benz plant. Automotive and manufacturing jobs.",
  },
  stellenbosch: {
    name: "Stellenbosch",
    province: "Western Cape",
    provinceSlug: "western-cape",
    description:
      "University town in wine country. Tech startups, education, agriculture, and tourism.",
  },
  umhlanga: {
    name: "Umhlanga",
    province: "KwaZulu-Natal",
    provinceSlug: "kwazulu-natal",
    description:
      "Upmarket coastal suburb of Durban. Gateway Theatre of Shopping. Hospitality and corporate jobs.",
  },
  "richards-bay": {
    name: "Richards Bay",
    province: "KwaZulu-Natal",
    provinceSlug: "kwazulu-natal",
    description:
      "Major coal export terminal. Heavy industry, aluminium smelting, and port operations.",
  },
  witbank: {
    name: "Witbank",
    province: "Mpumalanga",
    provinceSlug: "mpumalanga",
    description:
      "Also known as eMalahleni. Coal mining capital with power generation and heavy industry.",
  },
  klerksdorp: {
    name: "Klerksdorp",
    province: "North West",
    provinceSlug: "north-west",
    description:
      "Gold mining heritage. Retail, agriculture, and education employment opportunities.",
  },
};

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
        },
        twitter: {
          card: "summary",
          title,
          description,
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
