import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProvincePageClient from "./ProvincePageClient";
import JobDetailPageClient from "./JobDetailPageClient";

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

// Check if slug is a province
function isProvince(slug: string): boolean {
  return slug in provinceData;
}

// Generate static params for provinces
export async function generateStaticParams() {
  return Object.keys(provinceData).map((slug) => ({
    slug,
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

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

  // Job detail metadata (placeholder - would fetch from API)
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

  // If it's a province, show province page
  if (isProvince(slug)) {
    const data = provinceData[slug];
    return (
      <ProvincePageClient
        province={slug}
        provinceName={data.name}
        capital={data.capital}
        description={data.description}
        cities={data.cities}
      />
    );
  }

  // Otherwise, show job detail page
  return <JobDetailPageClient jobId={slug} />;
}
