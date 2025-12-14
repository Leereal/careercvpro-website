"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  ArrowLeft,
  Search,
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

interface CategoryLocationPageClientProps {
  jobs: Job[];
  category: string;
  categoryName: string;
  location: string;
  locationName: string;
  slug: string;
  introContent?: string;
  faqs?: FAQItem[];
}

function FAQSection({
  faqs,
  categoryName,
  locationName,
}: {
  faqs: FAQItem[];
  categoryName: string;
  locationName: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">
            FAQs: {categoryName} Jobs in {locationName}
          </h2>
          <div
            className="space-y-4"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex items-start justify-between w-full text-left p-4 bg-gray-50 hover:bg-gray-100 transition-colors gap-4"
                >
                  <span className="font-medium text-gray-900" itemProp="name">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-brand-teal flex-shrink-0 mt-0.5" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  )}
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 text-gray-600 leading-relaxed"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">{faq.answer}</div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CategoryLocationPageClient({
  jobs,
  category,
  categoryName,
  location,
  locationName,
  slug,
  introContent,
  faqs,
}: CategoryLocationPageClientProps) {
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
            <Link href={`/jobs/${location}`} className="hover:text-brand-teal">
              {locationName}
            </Link>
            <span>/</span>
            <span className="text-brand-navy font-medium">{categoryName}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-light text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all jobs
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-8 w-8 text-brand-teal" />
              <span className="bg-brand-teal/20 text-brand-teal px-3 py-1 rounded-full text-sm font-medium">
                {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"} Found
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {categoryName} Jobs in {locationName}
            </h1>

            <p className="text-lg text-gray-300 max-w-2xl mb-6">
              Browse {categoryName.toLowerCase()} job opportunities in{" "}
              {locationName}, South Africa. Find your next career move with
              CareerCVPro.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <MapPin className="h-4 w-4" />
                <span>{locationName}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Briefcase className="h-4 w-4" />
                <span>{categoryName}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Content Section (SEO unique content) */}
      {introContent && (
        <section className="bg-white border-b border-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <p className="text-gray-700 leading-relaxed">{introContent}</p>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-2">
            {jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-brand-navy mb-2">
                  No {categoryName} Jobs in {locationName} Right Now
                </h3>
                <p className="text-gray-600 mb-6">
                  We don't have any {categoryName.toLowerCase()} positions in{" "}
                  {locationName} at the moment. But new jobs are added daily!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href={`/jobs/${location}`}
                    className="inline-flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    All Jobs in {locationName}
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Job Alert */}
            <JobAlertSignup
              defaultProvince={location}
              defaultCategory={category}
            />

            {/* Related Searches */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-brand-teal" />
                Related Searches
              </h3>
              <div className="space-y-2">
                <Link
                  href={`/jobs/${location}`}
                  className="block text-gray-600 hover:text-brand-teal transition-colors"
                >
                  All jobs in {locationName}
                </Link>
                <Link
                  href="/jobs"
                  className="block text-gray-600 hover:text-brand-teal transition-colors"
                >
                  {categoryName} jobs nationwide
                </Link>
                <Link
                  href={`/jobs/${category}-jobs-in-gauteng`}
                  className="block text-gray-600 hover:text-brand-teal transition-colors"
                >
                  {categoryName} jobs in Gauteng
                </Link>
                <Link
                  href={`/jobs/${category}-jobs-in-cape-town`}
                  className="block text-gray-600 hover:text-brand-teal transition-colors"
                >
                  {categoryName} jobs in Cape Town
                </Link>
              </div>
            </div>

            {/* CV Services */}
            <div className="bg-gradient-to-br from-brand-teal to-brand-teal-dark rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">
                Stand Out to {categoryName} Employers
              </h3>
              <p className="text-teal-100 text-sm mb-4">
                Get a professional CV tailored for {categoryName.toLowerCase()}{" "}
                positions in {locationName}.
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

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <FAQSection
          faqs={faqs}
          categoryName={categoryName}
          locationName={locationName}
        />
      )}

      {/* SEO Content Section (fallback if no custom intro) */}
      {!introContent && (
        <section className="bg-white border-t border-gray-200 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">
                About {categoryName} Jobs in {locationName}
              </h2>
              <div className="prose prose-gray">
                <p>
                  Looking for {categoryName.toLowerCase()} employment
                  opportunities in {locationName}, South Africa? CareerCVPro
                  connects job seekers with top employers in the{" "}
                  {categoryName.toLowerCase()} sector across {locationName} and
                  surrounding areas.
                </p>
                <p>
                  Whether you're an experienced {categoryName.toLowerCase()}{" "}
                  professional or just starting your career, we have positions
                  ranging from entry-level to senior roles. Our job listings are
                  updated daily to bring you the latest opportunities.
                </p>
                <p>
                  <strong>Tips for {categoryName} job seekers:</strong>
                </p>
                <ul>
                  <li>
                    Keep your CV updated and tailored to{" "}
                    {categoryName.toLowerCase()} roles
                  </li>
                  <li>
                    Set up job alerts to be notified of new{" "}
                    {categoryName.toLowerCase()} vacancies
                  </li>
                  <li>Research companies hiring in {locationName}</li>
                  <li>
                    Prepare for common {categoryName.toLowerCase()} interview
                    questions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${categoryName} Jobs in ${locationName}`,
            description: `Find ${categoryName.toLowerCase()} job opportunities in ${locationName}, South Africa.`,
            url: `https://www.careercvpro.co.za/jobs/${slug}`,
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
                  name: locationName,
                  item: `https://www.careercvpro.co.za/jobs/${location}`,
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: `${categoryName} Jobs`,
                  item: `https://www.careercvpro.co.za/jobs/${slug}`,
                },
              ],
            },
          }),
        }}
      />
    </div>
  );
}
