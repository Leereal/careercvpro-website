"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  TrendingUp,
  Users,
  ArrowRight,
  Shield,
  ShoppingCart,
  Phone,
  Truck,
  GraduationCap,
  Building2,
} from "lucide-react";
import {
  JobCard,
  JobFilters,
  ProvinceCard,
} from "@/components/jobs/JobListingComponents";
import { JobAlertSignup } from "@/components/jobs/JobAlertSignup";
import type { Job, Province, JobCategory } from "@/types/wordpress";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  security: <Shield className="h-5 w-5 text-brand-teal" />,
  retail: <ShoppingCart className="h-5 w-5 text-brand-teal" />,
  "call-centre": <Phone className="h-5 w-5 text-brand-teal" />,
  driving: <Truck className="h-5 w-5 text-brand-teal" />,
  learnership: <GraduationCap className="h-5 w-5 text-brand-teal" />,
  learnerships: <GraduationCap className="h-5 w-5 text-brand-teal" />,
  government: <Building2 className="h-5 w-5 text-brand-teal" />,
};

interface JobsPageClientProps {
  initialJobs: Job[];
  provinces: Province[];
  categories: JobCategory[];
}

export default function JobsPageClient({
  initialJobs,
  provinces,
  categories,
}: JobsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProvince =
        selectedProvince === "all" ||
        job.provinceSlug === selectedProvince ||
        job.province.toLowerCase().replace(/\s+/g, "-") === selectedProvince;

      const matchesCategory =
        selectedCategory === "all" ||
        job.categorySlug === selectedCategory ||
        job.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory;

      const matchesType = selectedType === "all" || job.type === selectedType;

      return matchesSearch && matchesProvince && matchesCategory && matchesType;
    });
  }, [
    searchQuery,
    selectedProvince,
    selectedCategory,
    selectedType,
    initialJobs,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedProvince("all");
    setSelectedCategory("all");
    setSelectedType("all");
  };

  // Featured jobs
  const featuredJobs = initialJobs.filter((job) => job.featured).slice(0, 3);

  // Province names for filters
  const provinceNames = provinces.map((p) => p.name);

  // Category names for filters
  const categoryNames = categories.map((c) => c.name);

  // Get job count by province
  const getJobCountByProvince = (provinceSlug: string): number => {
    const province = provinces.find((p) => p.slug === provinceSlug);
    return province?.count || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-teal/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-brand-teal/20 text-brand-teal px-4 py-2 rounded-full text-sm font-medium">
                <Briefcase className="h-4 w-4" />
                {initialJobs.length}+ Jobs Available
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Find Your Next Job in{" "}
              <span className="text-brand-teal">South Africa</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Browse thousands of jobs across all 9 provinces. Entry-level to
              senior positions, learnerships, and government jobs.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-brand-gold" />
                <span>Updated Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-teal" />
                <span>All 9 Provinces</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-brand-gold" />
                <span>10,000+ Job Seekers</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Listings - Left Column */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <JobFilters
              provinces={provinceNames}
              categories={categoryNames}
              selectedProvince={selectedProvince}
              selectedCategory={selectedCategory}
              selectedType={selectedType}
              searchQuery={searchQuery}
              onProvinceChange={setSelectedProvince}
              onCategoryChange={setSelectedCategory}
              onTypeChange={setSelectedType}
              onSearchChange={setSearchQuery}
              onClearFilters={clearFilters}
              totalJobs={initialJobs.length}
              filteredCount={filteredJobs.length}
            />

            {/* Featured Jobs Section */}
            {selectedProvince === "all" &&
              selectedCategory === "all" &&
              selectedType === "all" &&
              !searchQuery &&
              featuredJobs.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
                    <span className="text-brand-gold">★</span> Featured Jobs
                  </h2>
                  <div className="grid gap-4">
                    {featuredJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </div>
              )}

            {/* All Jobs */}
            <div>
              <h2 className="text-xl font-bold text-brand-navy mb-4">
                {selectedProvince === "all" &&
                selectedCategory === "all" &&
                selectedType === "all" &&
                !searchQuery
                  ? "Latest Jobs"
                  : "Search Results"}
              </h2>
              {filteredJobs.length > 0 ? (
                <div className="grid gap-4">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-brand-teal font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Load More - Placeholder */}
            {filteredJobs.length > 0 && (
              <div className="mt-8 text-center">
                <button className="bg-brand-navy hover:bg-brand-navy-light text-white px-8 py-3 rounded-xl font-medium transition-colors">
                  Load More Jobs
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Job Alerts Signup */}
            <JobAlertSignup />

            {/* Browse by Province */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-teal" />
                Jobs by Province
              </h3>
              <div className="space-y-2">
                {provinces.map((province) => (
                  <Link
                    key={province.slug}
                    href={`/jobs/${province.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-gray-700 group-hover:text-brand-teal transition-colors">
                      {province.name}
                    </span>
                    <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {province.count} jobs
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/jobs/by-province"
                className="mt-4 inline-flex items-center gap-1 text-brand-teal font-medium text-sm hover:underline"
              >
                View all provinces
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Popular Categories */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-brand-teal" />
                Popular Categories
              </h3>
              <div className="space-y-2">
                {categories.slice(0, 6).map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                  >
                    {categoryIcons[cat.slug] || (
                      <Briefcase className="h-5 w-5 text-brand-teal" />
                    )}
                    <span className="text-gray-700 group-hover:text-brand-teal transition-colors flex-1">
                      {cat.name}
                    </span>
                    <span className="text-sm text-gray-400">{cat.count}</span>
                  </button>
                ))}
              </div>
              <Link
                href="/jobs/by-category"
                className="mt-4 inline-flex items-center gap-1 text-brand-teal font-medium text-sm hover:underline"
              >
                View all categories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* CV Services Promo */}
            <div className="bg-gradient-to-br from-brand-teal to-brand-teal-dark rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">
                Need a Professional CV?
              </h3>
              <p className="text-teal-100 text-sm mb-4">
                Increase your chances of getting hired with an ATS-optimized CV.
              </p>
              <Link
                href="/cv-services"
                className="inline-flex items-center gap-2 bg-white text-brand-teal px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
              >
                Get CV - R80
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Browse by Province Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">
              Browse Jobs by Province
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find opportunities near you. Select your province to see available
              jobs in your area.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {provinces.map((province) => (
              <ProvinceCard
                key={province.slug}
                name={province.name}
                slug={province.slug}
                jobCount={province.count}
                cities={province.cities.map((c) => c.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Job Alert Banner */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brand-navy mb-4">
              Don't Miss Out on New Opportunities
            </h2>
            <p className="text-gray-600 mb-6">
              Subscribe to job alerts and get notified when new jobs match your
              preferences.
            </p>
            <JobAlertSignup variant="inline" />
          </div>
        </div>
      </section>
    </div>
  );
}
