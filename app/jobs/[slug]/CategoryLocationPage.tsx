import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getJobsByLocationAndCategory,
  getJobCategories,
  getProvinces,
} from "@/lib/wordpress";
import CategoryLocationPageClient from "./CategoryLocationPageClient";

// Parse slug like "security-jobs-in-johannesburg" or "it-jobs-in-gauteng"
function parseSlug(
  slug: string
): { category: string; location: string } | null {
  const match = slug.match(/^(.+)-jobs-in-(.+)$/);
  if (!match) return null;
  return {
    category: match[1],
    location: match[2],
  };
}

// Category display names
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

// Location display names (provinces and major cities)
const locationNames: Record<string, string> = {
  // Provinces
  gauteng: "Gauteng",
  "western-cape": "Western Cape",
  "kwazulu-natal": "KwaZulu-Natal",
  "eastern-cape": "Eastern Cape",
  limpopo: "Limpopo",
  mpumalanga: "Mpumalanga",
  "north-west": "North West",
  "free-state": "Free State",
  "northern-cape": "Northern Cape",
  // Major cities
  johannesburg: "Johannesburg",
  pretoria: "Pretoria",
  "cape-town": "Cape Town",
  durban: "Durban",
  "port-elizabeth": "Port Elizabeth",
  bloemfontein: "Bloemfontein",
  sandton: "Sandton",
  midrand: "Midrand",
  centurion: "Centurion",
  soweto: "Soweto",
  randburg: "Randburg",
  roodepoort: "Roodepoort",
  polokwane: "Polokwane",
  nelspruit: "Nelspruit",
  rustenburg: "Rustenburg",
  kimberley: "Kimberley",
  pietermaritzburg: "Pietermaritzburg",
  "east-london": "East London",
  stellenbosch: "Stellenbosch",
  umhlanga: "Umhlanga",
  ballito: "Ballito",
};

// Generate static params for common category+location combinations
export async function generateStaticParams() {
  const popularCategories = [
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

  const popularLocations = [
    "gauteng",
    "johannesburg",
    "pretoria",
    "cape-town",
    "durban",
    "western-cape",
    "kwazulu-natal",
  ];

  const params: { slug: string }[] = [];

  for (const category of popularCategories) {
    for (const location of popularLocations) {
      params.push({ slug: `${category}-jobs-in-${location}` });
    }
  }

  return params;
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    return {
      title: "Jobs | CareerCVPro",
      description: "Browse job opportunities across South Africa.",
    };
  }

  const categoryName =
    categoryNames[parsed.category] || parsed.category.replace(/-/g, " ");
  const locationName =
    locationNames[parsed.location] || parsed.location.replace(/-/g, " ");

  const title = `${categoryName} Jobs in ${locationName} | Employment Opportunities`;
  const description = `Find ${categoryName.toLowerCase()} jobs in ${locationName}, South Africa. Browse the latest ${categoryName.toLowerCase()} vacancies and employment opportunities. Apply today!`;

  return {
    title,
    description,
    keywords: [
      `${categoryName.toLowerCase()} jobs in ${locationName}`,
      `${categoryName.toLowerCase()} vacancies ${locationName}`,
      `${locationName} ${categoryName.toLowerCase()} jobs`,
      `${categoryName.toLowerCase()} employment ${locationName}`,
      "South Africa jobs",
      `jobs in ${locationName}`,
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

export default async function CategoryLocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    notFound();
  }

  const categoryName =
    categoryNames[parsed.category] || parsed.category.replace(/-/g, " ");
  const locationName =
    locationNames[parsed.location] || parsed.location.replace(/-/g, " ");

  // Fetch jobs matching both category and location
  let jobs: Awaited<ReturnType<typeof getJobsByLocationAndCategory>> = [];
  try {
    jobs = await getJobsByLocationAndCategory(
      parsed.location,
      parsed.category,
      100
    );
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
  }

  return (
    <CategoryLocationPageClient
      jobs={jobs}
      category={parsed.category}
      categoryName={categoryName}
      location={parsed.location}
      locationName={locationName}
      slug={slug}
    />
  );
}
