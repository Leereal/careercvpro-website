"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Building2,
  ArrowLeft,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { JobCard, JobFilters } from "@/components/jobs/JobListingComponents";
import { JobAlertSignup } from "@/components/jobs/JobAlertSignup";
import type { Job } from "@/types/wordpress";

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

interface ProvincePageClientProps {
  province: string;
  provinceName: string;
  capital: string;
  description: string;
  cities: string[];
  initialJobs?: Job[];
}

const categories = [
  "Security",
  "Retail",
  "Call Centre",
  "Admin",
  "Driving",
  "Healthcare",
  "IT",
  "Finance",
  "Construction",
  "Government",
  "Hospitality",
];

// Static province data for the sidebar
const provinceList = [
  { slug: "gauteng", name: "Gauteng" },
  { slug: "western-cape", name: "Western Cape" },
  { slug: "kwazulu-natal", name: "KwaZulu-Natal" },
  { slug: "eastern-cape", name: "Eastern Cape" },
  { slug: "limpopo", name: "Limpopo" },
  { slug: "mpumalanga", name: "Mpumalanga" },
  { slug: "north-west", name: "North West" },
  { slug: "free-state", name: "Free State" },
  { slug: "northern-cape", name: "Northern Cape" },
];

// Popular category combos for internal linking (pSEO)
const categoryComboLinks = [
  { slug: "security", name: "Security Jobs" },
  { slug: "retail", name: "Retail Jobs" },
  { slug: "call-centre", name: "Call Centre Jobs" },
  { slug: "admin", name: "Admin Jobs" },
  { slug: "it", name: "IT Jobs" },
  { slug: "driving", name: "Driver Jobs" },
  { slug: "government", name: "Government Jobs" },
  { slug: "healthcare", name: "Healthcare Jobs" },
];

export default function ProvincePageClient({
  province,
  provinceName,
  capital,
  description,
  cities,
  initialJobs = [],
}: ProvincePageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Use jobs passed from server
  const provinceJobs = initialJobs;

  // Apply additional filters
  const filteredJobs = useMemo(() => {
    return provinceJobs.filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        job.categorySlug === selectedCategory ||
        job.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory;

      const matchesType = selectedType === "all" || job.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [provinceJobs, searchQuery, selectedCategory, selectedType]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedType("all");
  };

  // Other provinces for sidebar
  const otherProvinces = provinceList.filter((p) => p.slug !== province);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-teal/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Link */}
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all jobs
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-flex items-center gap-2 bg-brand-teal/20 text-brand-teal px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="h-4 w-4" />
                {provinceName} Province
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Jobs in <span className="text-brand-teal">{provinceName}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-6 max-w-2xl"
            >
              {description}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-6 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-brand-gold" />
                <span>Capital: {capital}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-brand-teal" />
                <span>{provinceJobs.length} Jobs Available</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-brand-gold" />
                <span>Updated Daily</span>
              </div>
            </motion.div>

            {/* Cities */}
            <motion.div variants={fadeInUp} className="mt-6">
              <p className="text-gray-400 text-sm mb-2">Major cities:</p>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <span
                    key={city}
                    className="bg-white/10 text-gray-300 text-sm px-3 py-1 rounded-full"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <JobFilters
              provinces={[provinceName]}
              categories={categories}
              selectedProvince={province}
              selectedCategory={selectedCategory}
              selectedType={selectedType}
              searchQuery={searchQuery}
              onProvinceChange={() => {}}
              onCategoryChange={setSelectedCategory}
              onTypeChange={setSelectedType}
              onSearchChange={setSearchQuery}
              onClearFilters={clearFilters}
              totalJobs={provinceJobs.length}
              filteredCount={filteredJobs.length}
            />

            {/* Jobs List */}
            <div>
              <h2 className="text-xl font-bold text-brand-navy mb-4">
                {filteredJobs.length > 0
                  ? `${filteredJobs.length} Jobs in ${provinceName}`
                  : "No jobs found"}
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
                    No jobs found in {provinceName}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery || selectedCategory !== "all"
                      ? "Try adjusting your filters"
                      : "New jobs are added daily. Subscribe to job alerts!"}
                  </p>
                  {(searchQuery || selectedCategory !== "all") && (
                    <button
                      onClick={clearFilters}
                      className="text-brand-teal font-medium hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* No Results - Show other provinces */}
            {provinceJobs.length === 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-brand-navy mb-4">
                  Browse jobs in other provinces
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {otherProvinces.slice(0, 4).map((p) => (
                    <Link
                      key={p.slug}
                      href={`/jobs/${p.slug}`}
                      className="bg-white p-4 rounded-xl border border-gray-200 hover:border-brand-teal transition-colors flex items-center gap-3"
                    >
                      <MapPin className="h-5 w-5 text-brand-teal" />
                      <span className="font-medium text-brand-navy">
                        {p.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Job Alerts */}
            <JobAlertSignup defaultProvince={province} />

            {/* Popular Job Categories in this Province (Internal Linking) */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-brand-teal" />
                Popular in {provinceName}
              </h3>
              <div className="space-y-2">
                {categoryComboLinks.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/jobs/${cat.slug}-jobs-in-${province}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-gray-700 group-hover:text-brand-teal transition-colors">
                      {cat.name} in {provinceName}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-brand-teal transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Other Provinces */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-teal" />
                Other Provinces
              </h3>
              <div className="space-y-2">
                {otherProvinces.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/jobs/${p.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-gray-700 group-hover:text-brand-teal transition-colors">
                      {p.name}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-brand-teal transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CV Services Promo */}
            <div className="bg-gradient-to-br from-brand-teal to-brand-teal-dark rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">
                Applying for Jobs in {provinceName}?
              </h3>
              <p className="text-teal-100 text-sm mb-4">
                Stand out with a professional, ATS-optimized CV tailored for
                {provinceName === "Gauteng"
                  ? " Johannesburg's competitive job market."
                  : provinceName === "Western Cape"
                  ? " Cape Town's dynamic industries."
                  : ` ${provinceName}'s growing economy.`}
              </p>
              <Link
                href="/cv-services"
                className="inline-flex items-center gap-2 bg-white text-brand-teal px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
              >
                Get Professional CV - R80
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Job Alert Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brand-navy mb-4">
              Get {provinceName} Job Alerts
            </h2>
            <p className="text-gray-600 mb-6">
              Be the first to know when new jobs are posted in {provinceName}.
              Subscribe to our free job alerts.
            </p>
            <JobAlertSignup variant="inline" defaultProvince={province} />
          </div>
        </div>
      </section>
    </div>
  );
}
