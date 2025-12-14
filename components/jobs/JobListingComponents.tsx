"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  Search,
  Filter,
  ChevronDown,
  Calendar,
  DollarSign,
  Users,
  ArrowRight,
  X,
} from "lucide-react";
import type { Job } from "@/types/wordpress";

// Re-export Job type for backward compatibility
export type { Job };

interface JobCardProps {
  job: Job;
}

interface JobFiltersProps {
  provinces: string[];
  categories: string[];
  selectedProvince: string;
  selectedCategory: string;
  selectedType: string;
  searchQuery: string;
  onProvinceChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
  totalJobs: number;
  filteredCount: number;
}

// Job Card Component
export function JobCard({ job }: JobCardProps) {
  const daysAgo = Math.floor(
    (Date.now() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl border ${
        job.featured
          ? "border-brand-gold ring-1 ring-brand-gold/20"
          : "border-gray-200"
      } p-6 hover:shadow-lg transition-all group`}
    >
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {job.featured && (
          <span className="bg-brand-gold/10 text-brand-gold text-xs font-semibold px-2 py-1 rounded-full">
            Featured
          </span>
        )}
        {job.urgent && (
          <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
            Urgent
          </span>
        )}
        <span className="bg-brand-teal/10 text-brand-teal text-xs font-medium px-2 py-1 rounded-full">
          {job.type}
        </span>
      </div>

      {/* Title & Company */}
      <Link href={`/jobs/${job.slug || job.id}`}>
        <h3 className="text-lg font-semibold text-brand-navy group-hover:text-brand-teal transition-colors mb-1">
          {job.title}
        </h3>
      </Link>
      <div className="flex items-center gap-2 text-gray-600 mb-3">
        <Building2 className="h-4 w-4" />
        <span>{job.company}</span>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        {job.salary && (
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>{job.salary}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>
            {daysAgo === 0
              ? "Today"
              : daysAgo === 1
              ? "Yesterday"
              : `${daysAgo} days ago`}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
        {job.description}
      </p>

      {/* Action */}
      <Link
        href={`/jobs/${job.slug || job.id}`}
        className="inline-flex items-center gap-1 text-brand-teal font-medium text-sm hover:underline"
      >
        View Details
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}

// Job Filters Component
export function JobFilters({
  provinces,
  categories,
  selectedProvince,
  selectedCategory,
  selectedType,
  searchQuery,
  onProvinceChange,
  onCategoryChange,
  onTypeChange,
  onSearchChange,
  onClearFilters,
  totalJobs,
  filteredCount,
}: JobFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasActiveFilters =
    selectedProvince !== "all" ||
    selectedCategory !== "all" ||
    selectedType !== "all" ||
    searchQuery;

  const jobTypes = [
    "All Types",
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Internship",
    "Learnership",
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs by title, company, or keywords..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
        />
      </div>

      {/* Filter Toggle for Mobile */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg mb-4"
      >
        <span className="flex items-center gap-2 text-gray-600">
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="bg-brand-teal text-white text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Filter Dropdowns */}
      <div className={`${isExpanded ? "block" : "hidden"} md:block`}>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Province</label>
            <select
              value={selectedProvince}
              onChange={(e) => onProvinceChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal appearance-none cursor-pointer bg-white"
            >
              <option value="all">All Provinces</option>
              {provinces.map((p) => (
                <option key={p} value={p.toLowerCase().replace(/\s+/g, "-")}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal appearance-none cursor-pointer bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c.toLowerCase().replace(/\s+/g, "-")}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Job Type</label>
            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal appearance-none cursor-pointer bg-white"
            >
              {jobTypes.map((t) => (
                <option key={t} value={t === "All Types" ? "all" : t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="w-full px-4 py-2 text-gray-600 hover:text-brand-teal border border-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Showing{" "}
          <span className="font-semibold text-brand-navy">{filteredCount}</span>{" "}
          of <span className="font-semibold text-brand-navy">{totalJobs}</span>{" "}
          jobs
        </span>
        {hasActiveFilters && (
          <span className="text-brand-teal">Filters applied</span>
        )}
      </div>
    </div>
  );
}

// Province Card Component
interface ProvinceCardProps {
  name: string;
  slug: string;
  jobCount: number;
  cities: string[];
}

export function ProvinceCard({
  name,
  slug,
  jobCount,
  cities,
}: ProvinceCardProps) {
  return (
    <Link href={`/jobs/${slug}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-brand-teal transition-all cursor-pointer group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
            <MapPin className="h-5 w-5 text-brand-teal" />
          </div>
          <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">
            {jobCount} jobs
          </span>
        </div>
        <h3 className="text-lg font-semibold text-brand-navy mb-2 group-hover:text-brand-teal transition-colors">
          {name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-1">
          {cities.slice(0, 3).join(", ")}
          {cities.length > 3 && ` +${cities.length - 3} more`}
        </p>
      </motion.div>
    </Link>
  );
}

// Category Card Component
interface CategoryCardProps {
  name: string;
  slug: string;
  icon: React.ReactNode;
  jobCount: number;
}

export function CategoryCard({
  name,
  slug,
  icon,
  jobCount,
}: CategoryCardProps) {
  return (
    <Link href={`/jobs/category/${slug}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-brand-teal transition-all cursor-pointer group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
            {icon}
          </div>
          <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">
            {jobCount} jobs
          </span>
        </div>
        <h3 className="text-lg font-semibold text-brand-navy group-hover:text-brand-teal transition-colors">
          {name}
        </h3>
      </motion.div>
    </Link>
  );
}
