"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Building2,
  ArrowLeft,
  Clock,
  DollarSign,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  Share2,
  Bookmark,
  AlertCircle,
} from "lucide-react";
import { dummyJobs, Job } from "@/components/jobs/JobListingComponents";
import { JobAlertSignup } from "@/components/jobs/JobAlertSignup";

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

interface JobDetailPageClientProps {
  jobId: string;
}

const whatsappNumber = "27749201395";

export default function JobDetailPageClient({
  jobId,
}: JobDetailPageClientProps) {
  // Find the job
  const job = useMemo(() => {
    return dummyJobs.find((j) => j.id === jobId);
  }, [jobId]);

  // Related jobs (same category or province)
  const relatedJobs = useMemo(() => {
    if (!job) return [];
    return dummyJobs
      .filter(
        (j) =>
          j.id !== jobId &&
          (j.category === job.category || j.province === job.province)
      )
      .slice(0, 3);
  }, [job, jobId]);

  const daysAgo = job
    ? Math.floor(
        (Date.now() - new Date(job.postedDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  // Job not found
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-brand-navy mb-4">
              Job Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              This job listing may have been removed or is no longer available.
            </p>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Browse All Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${job.title} position at ${job.company} (Job ID: ${job.id}). Can you help me apply?`
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-teal mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.featured && (
              <span className="bg-brand-gold/10 text-brand-gold text-sm font-semibold px-3 py-1 rounded-full">
                Featured
              </span>
            )}
            {job.urgent && (
              <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                Urgent Hiring
              </span>
            )}
            <span className="bg-brand-teal/10 text-brand-teal text-sm font-medium px-3 py-1 rounded-full">
              {job.type}
            </span>
            <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">
              {job.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">
            {job.title}
          </h1>

          <div className="flex items-center gap-2 text-xl text-gray-600 mb-4">
            <Building2 className="h-5 w-5" />
            <span>{job.company}</span>
          </div>

          <div className="flex flex-wrap gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{job.location}</span>
            </div>
            {job.salary && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span>{job.salary}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>
                Posted{" "}
                {daysAgo === 0
                  ? "today"
                  : daysAgo === 1
                  ? "yesterday"
                  : `${daysAgo} days ago`}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-brand-navy mb-4">
                Job Description
              </h2>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-brand-navy mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-teal flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* How to Apply */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-xl p-6 text-white"
            >
              <h2 className="text-xl font-bold mb-4">How to Apply</h2>
              <p className="text-gray-300 mb-6">
                Ready to apply for this position? Contact us via WhatsApp and
                we'll help you submit your application. Make sure you have your
                CV ready!
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  Apply via WhatsApp
                </a>
                <Link
                  href="/cv-services"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-colors border border-white/20"
                >
                  Need a CV? Get one for R80
                </Link>
              </div>
            </motion.div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <h2 className="text-xl font-bold text-brand-navy mb-4">
                  Similar Jobs
                </h2>
                <div className="space-y-4">
                  {relatedJobs.map((relJob) => (
                    <Link
                      key={relJob.id}
                      href={`/jobs/${relJob.id}`}
                      className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-brand-teal transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-brand-navy mb-1">
                            {relJob.title}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {relJob.company}
                          </p>
                        </div>
                        <span className="text-sm text-gray-400">
                          {relJob.location}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-brand-navy mb-4">
                Interested in this job?
              </h3>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors mb-3"
              >
                <MessageSquare className="h-5 w-5" />
                Apply Now
              </a>

              <div className="flex gap-2">
                <button className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm transition-colors">
                  <Bookmark className="h-4 w-4" />
                  Save
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm transition-colors">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>

              <hr className="my-4" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Job Type</span>
                  <span className="font-medium text-brand-navy">
                    {job.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-brand-navy">
                    {job.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Province</span>
                  <span className="font-medium text-brand-navy">
                    {job.province}
                  </span>
                </div>
                {job.salary && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Salary</span>
                    <span className="font-medium text-brand-navy">
                      {job.salary}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Job Alerts */}
            <JobAlertSignup
              defaultProvince={job.province.toLowerCase().replace(/\s+/g, "-")}
              defaultCategory={job.category.toLowerCase().replace(/\s+/g, "-")}
            />

            {/* CV Services */}
            <div className="bg-gradient-to-br from-brand-teal to-brand-teal-dark rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Don't Have a CV Yet?</h3>
              <p className="text-teal-100 text-sm mb-4">
                Get a professional, ATS-optimized CV that helps you stand out to
                employers.
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
    </div>
  );
}
