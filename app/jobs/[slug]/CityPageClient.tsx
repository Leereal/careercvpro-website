"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Building2,
  ArrowLeft,
  Search,
  Briefcase,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Job } from "@/types/wordpress";
import { JobCard } from "@/components/jobs/JobListingComponents";
import { JobAlertSignup } from "@/components/jobs/JobAlertSignup";

interface FAQItem {
  question: string;
  answer: string;
}

interface CityPageClientProps {
  city: string;
  cityName: string;
  province: string;
  provinceSlug: string;
  description: string;
  initialJobs: Job[];
  introContent?: string;
  faqs?: FAQItem[];
}

function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-brand-navy mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-100 last:border-0 pb-3 last:pb-0"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex items-start justify-between w-full text-left gap-4"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-brand-teal flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-gray-600 text-sm leading-relaxed"
              >
                {faq.answer}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CityPageClient({
  city,
  cityName,
  province,
  provinceSlug,
  description,
  initialJobs,
  introContent,
  faqs,
}: CityPageClientProps) {
  // Group jobs by category for quick links
  const jobsByCategory = initialJobs.reduce((acc, job) => {
    const cat = job.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(job);
    return acc;
  }, {} as Record<string, Job[]>);

  const topCategories = Object.entries(jobsByCategory)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-brand-teal">
              Home
            </Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-brand-teal">
              Jobs
            </Link>
            <span>/</span>
            <Link
              href={`/jobs/${provinceSlug}`}
              className="hover:text-brand-teal"
            >
              {province}
            </Link>
            <span>/</span>
            <span className="text-brand-navy font-medium">{cityName}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-light text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link
            href={`/jobs/${provinceSlug}`}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {province} jobs
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-8 w-8 text-brand-teal" />
              <span className="bg-brand-teal/20 text-brand-teal px-3 py-1 rounded-full text-sm font-medium">
                {initialJobs.length} {initialJobs.length === 1 ? "Job" : "Jobs"}{" "}
                Available
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Jobs in {cityName}
            </h1>

            <p className="text-lg text-gray-300 max-w-3xl mb-6">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <MapPin className="h-4 w-4" />
                <span>
                  {cityName}, {province}
                </span>
              </div>
              {topCategories.length > 0 && (
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Briefcase className="h-4 w-4" />
                  <span>Top: {topCategories[0][0]}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Content Section (SEO) */}
      {introContent && (
        <section className="bg-white border-b border-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <p className="text-gray-700 leading-relaxed">{introContent}</p>
            </div>
          </div>
        </section>
      )}

      {/* Quick Category Links */}
      {topCategories.length > 0 && (
        <section className="bg-gray-100 border-b border-gray-200 py-6">
          <div className="container mx-auto px-4">
            <h2 className="text-sm font-semibold text-gray-600 mb-3">
              Popular job categories in {cityName}:
            </h2>
            <div className="flex flex-wrap gap-2">
              {topCategories.map(([category, jobs]) => (
                <Link
                  key={category}
                  href={`/jobs/${category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}-jobs-in-${city}`}
                  className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:border-brand-teal hover:text-brand-teal transition-colors"
                >
                  {category} ({jobs.length})
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-2">
            {initialJobs.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-brand-navy mb-4">
                  Latest Jobs in {cityName}
                </h2>
                {initialJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-brand-navy mb-2">
                  No Jobs in {cityName} Right Now
                </h3>
                <p className="text-gray-600 mb-6">
                  We don't have any positions in {cityName} at the moment. But
                  new jobs are added daily!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href={`/jobs/${provinceSlug}`}
                    className="inline-flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    View {province} Jobs
                  </Link>
                  <Link
                    href="/jobs"
                    className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Browse All Jobs
                  </Link>
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {faqs && faqs.length > 0 && (
              <div className="mt-8">
                <FAQSection faqs={faqs} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Job Alert */}
            <JobAlertSignup defaultProvince={provinceSlug} />

            {/* Related Locations */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-brand-teal" />
                Other Locations
              </h3>
              <div className="space-y-2">
                <Link
                  href={`/jobs/${provinceSlug}`}
                  className="block text-gray-600 hover:text-brand-teal transition-colors"
                >
                  All jobs in {province}
                </Link>
                <Link
                  href="/jobs/johannesburg"
                  className="block text-gray-600 hover:text-brand-teal transition-colors"
                >
                  Jobs in Johannesburg
                </Link>
                <Link
                  href="/jobs/cape-town"
                  className="block text-gray-600 hover:text-brand-teal transition-colors"
                >
                  Jobs in Cape Town
                </Link>
                <Link
                  href="/jobs/durban"
                  className="block text-gray-600 hover:text-brand-teal transition-colors"
                >
                  Jobs in Durban
                </Link>
                <Link
                  href="/jobs"
                  className="block text-brand-teal font-medium hover:text-brand-teal-dark transition-colors"
                >
                  View all locations →
                </Link>
              </div>
            </div>

            {/* CV Services */}
            <div className="bg-gradient-to-br from-brand-teal to-brand-teal-dark rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">
                Land Your Dream Job in {cityName}
              </h3>
              <p className="text-teal-100 text-sm mb-4">
                Get a professional CV tailored for {cityName}'s job market.
                Stand out to local employers!
              </p>
              <Link
                href="/cv-services"
                className="inline-flex items-center gap-2 bg-white text-brand-teal px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
              >
                Get CV - R80
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD for City Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Jobs in ${cityName} | CareerCVPro`,
            description: description,
            url: `https://www.careercvpro.co.za/jobs/${city}`,
            breadcrumb: {
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
                  name: province,
                  item: `https://www.careercvpro.co.za/jobs/${provinceSlug}`,
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: cityName,
                  item: `https://www.careercvpro.co.za/jobs/${city}`,
                },
              ],
            },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: initialJobs.length,
              itemListElement: initialJobs.slice(0, 10).map((job, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "JobPosting",
                  title: job.title,
                  datePosted: job.postedDate,
                  hiringOrganization: {
                    "@type": "Organization",
                    name: job.company,
                  },
                  jobLocation: {
                    "@type": "Place",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: cityName,
                      addressRegion: province,
                      addressCountry: "ZA",
                    },
                  },
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}
