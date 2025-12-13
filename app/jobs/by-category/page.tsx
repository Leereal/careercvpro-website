import {
  Grid3X3,
  Shield,
  ShoppingBag,
  FileText,
  Headphones,
  Building2,
  GraduationCap,
  Car,
  UtensilsCrossed,
  Monitor,
  Wallet,
  Heart,
  Wrench,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs by Category | Industry Employment | CareerCVPro",
  description:
    "Browse jobs by industry - Security, Retail, Admin, Call Centre, Government, Teaching, Driving, Hospitality, IT and more across South Africa.",
  keywords: [
    "jobs by category South Africa",
    "security jobs",
    "retail jobs",
    "admin jobs",
    "call centre jobs",
    "government jobs",
    "industry jobs",
  ],
};

const categories = [
  {
    name: "Security",
    slug: "security",
    icon: Shield,
    count: 24,
    description: "Guards, surveillance, and protection",
  },
  {
    name: "Retail",
    slug: "retail",
    icon: ShoppingBag,
    count: 31,
    description: "Sales, cashiers, and store management",
  },
  {
    name: "Administration",
    slug: "admin",
    icon: FileText,
    count: 18,
    description: "Office admin, reception, and clerks",
  },
  {
    name: "Call Centre",
    slug: "call-centre",
    icon: Headphones,
    count: 15,
    description: "Customer service and support",
  },
  {
    name: "Government",
    slug: "government",
    icon: Building2,
    count: 12,
    description: "Public sector and municipal jobs",
  },
  {
    name: "Teaching",
    slug: "teaching",
    icon: GraduationCap,
    count: 9,
    description: "Education and training positions",
  },
  {
    name: "Driving",
    slug: "driving",
    icon: Car,
    count: 21,
    description: "Delivery, transport, and logistics",
  },
  {
    name: "Hospitality",
    slug: "hospitality",
    icon: UtensilsCrossed,
    count: 14,
    description: "Hotels, restaurants, and tourism",
  },
  {
    name: "IT & Technology",
    slug: "it",
    icon: Monitor,
    count: 8,
    description: "Software, support, and tech roles",
  },
  {
    name: "Finance",
    slug: "finance",
    icon: Wallet,
    count: 11,
    description: "Accounting, banking, and insurance",
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    icon: Heart,
    count: 16,
    description: "Medical, nursing, and care work",
  },
  {
    name: "Construction",
    slug: "construction",
    icon: Wrench,
    count: 19,
    description: "Building, trades, and engineering",
  },
];

export default function JobsByCategoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-navy to-brand-navy-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/20 rounded-2xl mb-6">
              <Grid3X3 className="h-8 w-8 text-brand-teal" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Jobs by Category
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Browse employment opportunities across various industries. Find
              jobs that match your skills and experience.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  href={`/jobs?category=${category.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-brand-teal transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                      <Icon className="h-6 w-6 text-brand-teal" />
                    </div>
                    <span className="text-sm font-medium text-brand-teal bg-brand-teal/10 px-2 py-1 rounded-full">
                      {category.count} jobs
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-brand-navy mb-1 group-hover:text-brand-teal transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {category.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-teal mb-1">12</div>
              <div className="text-gray-600 text-sm">Industries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-teal mb-1">
                198+
              </div>
              <div className="text-gray-600 text-sm">Active Jobs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-teal mb-1">
                500+
              </div>
              <div className="text-gray-600 text-sm">Companies Hiring</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-teal mb-1">
                Daily
              </div>
              <div className="text-gray-600 text-sm">New Postings</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-brand-navy mb-4">
            Looking for Jobs in a Specific Location?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Browse jobs by province to find opportunities near you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Browse All Jobs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/jobs/by-province"
              className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navy-light text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Jobs by Province
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
