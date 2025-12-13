import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs by Province | South Africa Employment | CareerCVPro",
  description:
    "Find jobs in all South African provinces - Gauteng, Western Cape, KwaZulu-Natal, Eastern Cape, Limpopo, Mpumalanga, North West, Free State, and Northern Cape.",
  keywords: [
    "jobs by province South Africa",
    "Gauteng jobs",
    "Western Cape jobs",
    "KwaZulu-Natal jobs",
    "Eastern Cape jobs",
    "Limpopo jobs",
    "provincial jobs",
  ],
};

const provinces = [
  {
    name: "Gauteng",
    slug: "gauteng",
    cities: ["Johannesburg", "Pretoria", "Sandton"],
    description: "Economic hub with most job opportunities",
  },
  {
    name: "Western Cape",
    slug: "western-cape",
    cities: ["Cape Town", "Stellenbosch", "Paarl"],
    description: "Tourism, tech, and agriculture sectors",
  },
  {
    name: "KwaZulu-Natal",
    slug: "kwazulu-natal",
    cities: ["Durban", "Pietermaritzburg", "Richards Bay"],
    description: "Port city and industrial hub",
  },
  {
    name: "Eastern Cape",
    slug: "eastern-cape",
    cities: ["Port Elizabeth", "East London", "Mthatha"],
    description: "Automotive and manufacturing",
  },
  {
    name: "Limpopo",
    slug: "limpopo",
    cities: ["Polokwane", "Tzaneen", "Thohoyandou"],
    description: "Mining and agriculture",
  },
  {
    name: "Mpumalanga",
    slug: "mpumalanga",
    cities: ["Nelspruit", "Witbank", "Middelburg"],
    description: "Mining and tourism",
  },
  {
    name: "North West",
    slug: "north-west",
    cities: ["Rustenburg", "Potchefstroom", "Klerksdorp"],
    description: "Platinum mining capital",
  },
  {
    name: "Free State",
    slug: "free-state",
    cities: ["Bloemfontein", "Welkom", "Bethlehem"],
    description: "Judicial capital and agriculture",
  },
  {
    name: "Northern Cape",
    slug: "northern-cape",
    cities: ["Kimberley", "Upington", "Springbok"],
    description: "Diamond mining and solar energy",
  },
];

export default function JobsByProvincePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-navy to-brand-navy-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/20 rounded-2xl mb-6">
              <MapPin className="h-8 w-8 text-brand-teal" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Jobs by Province
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find employment opportunities across all 9 South African
              provinces. Select your province to browse available jobs.
            </p>
          </div>
        </div>
      </section>

      {/* Provinces Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {provinces.map((province) => (
              <Link
                key={province.slug}
                href={`/jobs/${province.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-brand-teal transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                    <MapPin className="h-5 w-5 text-brand-teal" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-brand-teal transition-colors" />
                </div>
                <h2 className="text-xl font-semibold text-brand-navy mb-1 group-hover:text-brand-teal transition-colors">
                  {province.name}
                </h2>
                <p className="text-gray-500 text-sm mb-3">
                  {province.description}
                </p>
                <p className="text-gray-400 text-sm">
                  {province.cities.join(", ")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-brand-navy mb-4">
            Can't Find a Job in Your Province?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to job alerts and we'll notify you when new opportunities
            become available in your area.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Browse All Jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
