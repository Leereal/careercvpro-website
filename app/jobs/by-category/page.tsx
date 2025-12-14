import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  Shield,
  ShoppingBag,
  Phone,
  FileText,
  Monitor,
  Truck,
  Building2,
  Heart,
  Factory,
  GraduationCap,
  Utensils,
  Wrench,
  Search,
  ArrowRight,
} from "lucide-react";
import { getAllJobs } from "@/lib/wordpress";

export const revalidate = 60; // Revalidate every 60 seconds

// Category metadata with icons and descriptions
const categoryMeta: Record<
  string,
  { icon: React.ElementType; description: string }
> = {
  security: {
    icon: Shield,
    description: "Guards, surveillance, and protection",
  },
  retail: {
    icon: ShoppingBag,
    description: "Sales, cashiers, and store management",
  },
  "call-centre": {
    icon: Phone,
    description: "Customer service and telemarketing",
  },
  admin: { icon: FileText, description: "Office support and administration" },
  it: { icon: Monitor, description: "Technology and software roles" },
  driving: { icon: Truck, description: "Delivery, logistics, and transport" },
  government: { icon: Building2, description: "Public sector opportunities" },
  healthcare: { icon: Heart, description: "Medical and care positions" },
  manufacturing: { icon: Factory, description: "Production and factory work" },
  education: {
    icon: GraduationCap,
    description: "Teaching and training roles",
  },
  hospitality: {
    icon: Utensils,
    description: "Hotels, restaurants, and events",
  },
  general: { icon: Briefcase, description: "Various entry-level positions" },
  engineering: { icon: Wrench, description: "Engineering and technical roles" },
};

export const metadata: Metadata = {
  title: "Browse Jobs by Category | Find Jobs in South Africa",
  description:
    "Explore job opportunities across different industries in South Africa. Find security, retail, IT, healthcare, and more job categories.",
  openGraph: {
    title: "Browse Jobs by Category | Find Jobs in South Africa",
    description:
      "Explore job opportunities across different industries in South Africa.",
    type: "website",
  },
};

async function getCategoriesWithCounts() {
  try {
    // Fetch all jobs to count by category
    const result = await getAllJobs({ first: 1000 });
    const jobs = result.jobs;

    // Count jobs per category
    const categoryCounts: Record<string, number> = {};

    jobs.forEach((job) => {
      if (job.category) {
        const slug = job.category.toLowerCase().replace(/\s+/g, "-");
        categoryCounts[slug] = (categoryCounts[slug] || 0) + 1;
      }
    });

    // Build categories array with counts
    const categories = Object.entries(categoryCounts)
      .map(([slug, count]) => {
        const meta = categoryMeta[slug] || {
          icon: Briefcase,
          description: "Job opportunities",
        };
        // Format name from slug
        const name = slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return {
          name,
          slug,
          icon: meta.icon,
          count,
          description: meta.description,
        };
      })
      .sort((a, b) => b.count - a.count); // Sort by count descending

    return { categories, totalJobs: jobs.length };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { categories: [], totalJobs: 0 };
  }
}

export default async function ByCategoryPage() {
  const { categories, totalJobs } = await getCategoriesWithCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-navy to-brand-navy-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/20 rounded-2xl mb-6">
              <Briefcase className="h-8 w-8 text-brand-teal" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Browse Jobs by Industry
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Find your perfect role in South Africa&apos;s top industries
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full">
                {totalJobs}+ Active Jobs
              </span>
              <span className="bg-white/20 text-white px-4 py-2 rounded-full">
                {categories.length} Categories
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {categories.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.slug}
                    href={`/jobs/${category.slug}`}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-brand-teal transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-brand-teal" />
                      </div>
                      <span className="text-sm font-medium text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full">
                        {category.count} {category.count === 1 ? "job" : "jobs"}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-brand-navy mb-1 group-hover:text-brand-teal transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-gray-500 text-sm mb-4">
                      {category.description}
                    </p>
                    <span className="text-sm text-brand-teal font-medium inline-flex items-center gap-1 group-hover:underline">
                      View all jobs
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No categories found
              </h2>
              <p className="text-gray-500 mb-6">
                Check back soon for new job listings
              </p>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Browse All Jobs
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Browse by Location CTA */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-brand-navy mb-4">
            Prefer to Search by Location?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Browse job opportunities in your preferred province or city across
            South Africa.
          </p>
          <Link
            href="/jobs/by-province"
            className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Browse Jobs by Province
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
