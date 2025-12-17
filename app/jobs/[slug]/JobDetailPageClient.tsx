"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
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
  ExternalLink,
  Calendar,
} from "lucide-react";
import type { Job } from "@/types/wordpress";
import { JobAlertSignup } from "@/components/jobs/JobAlertSignup";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface JobDetailPageClientProps {
  job: Job | null;
  relatedJobs?: Job[];
}

const whatsappNumber = "27749201395";

export default function JobDetailPageClient({
  job,
  relatedJobs = [],
}: JobDetailPageClientProps) {
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

  // Use job's WhatsApp number if available, otherwise fall back to default
  const jobWhatsappNumber = job.whatsapp || whatsappNumber;

  // Different WhatsApp messages based on whether there's an external apply URL
  const whatsappMessageWithUrl = encodeURIComponent(
    `Hi! I'm applying for the ${job.title} position at ${job.company}. I'd like help with my CV to make it stand out for this role. Can you assist?`
  );
  const whatsappMessageNoUrl = encodeURIComponent(
    `Hi! I'm interested in the ${job.title} position at ${job.company}. Can you help me with the application process?`
  );

  // Format deadline if available
  const formatDeadline = (deadline: string | null | undefined) => {
    if (!deadline) return null;
    try {
      const date = new Date(deadline);
      return date.toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return deadline;
    }
  };
  const formattedDeadline = formatDeadline(job.deadline);

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

          <div className="flex gap-6">
            {/* Featured Image / Company Logo */}
            {job.featuredImage?.url && (
              <div className="flex-shrink-0 hidden sm:block">
                <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  <Image
                    src={job.featuredImage.url}
                    alt={job.featuredImage.alt || job.company}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 96px, 128px"
                    priority
                  />
                </div>
              </div>
            )}

            <div className="flex-1">
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
                {formattedDeadline && (
                  <div className="flex items-center gap-2 text-red-500">
                    <Calendar className="h-5 w-5" />
                    <span>Closes: {formattedDeadline}</span>
                  </div>
                )}
              </div>
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
              {job.descriptionHtml ? (
                <div
                  className="prose prose-gray max-w-none
                    prose-headings:text-brand-navy prose-headings:font-semibold
                    prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3
                    prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2
                    prose-h4:text-base prose-h4:mt-4 prose-h4:mb-2
                    prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:my-3 prose-ul:list-disc prose-ul:pl-5
                    prose-ol:my-3 prose-ol:list-decimal prose-ol:pl-5
                    prose-li:text-gray-600 prose-li:mb-1.5
                    prose-strong:text-brand-navy prose-strong:font-semibold
                    prose-a:text-brand-teal prose-a:hover:underline"
                  dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {job.description}
                </p>
              )}
            </motion.div>

            {/* Requirements - only show if we have them and no HTML description */}
            {job.requirements.length > 0 && !job.descriptionHtml && (
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
            )}

            {/* How to Apply */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-xl p-6 text-white"
            >
              <h2 className="text-xl font-bold mb-4">How to Apply</h2>
              {job.applyUrl ? (
                <>
                  <p className="text-gray-300 mb-6">
                    Click the button below to apply directly on the employer's
                    website. Need a standout CV for this role? We can help you
                    revamp it!
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Apply on Company Website
                    </a>
                    <a
                      href={`https://wa.me/${jobWhatsappNumber}?text=${whatsappMessageWithUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      <MessageSquare className="h-5 w-5" />
                      Get CV Help via WhatsApp
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-300 mb-6">
                    Contact us via WhatsApp and we'll help you with the
                    application process. Make sure you have your CV ready!
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={`https://wa.me/${jobWhatsappNumber}?text=${whatsappMessageNoUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      <MessageSquare className="h-5 w-5" />
                      Get Application Info via WhatsApp
                    </a>
                    <Link
                      href="/cv-services"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-colors border border-white/20"
                    >
                      Need a CV? Get one for R80
                    </Link>
                  </div>
                </>
              )}
              {formattedDeadline && (
                <p className="mt-4 text-yellow-300 text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Application deadline: {formattedDeadline}
                </p>
              )}
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
                      href={`/jobs/${relJob.slug || relJob.id}`}
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

              {job.applyUrl ? (
                <>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors mb-3"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Apply Now
                  </a>
                  <a
                    href={`https://wa.me/${jobWhatsappNumber}?text=${whatsappMessageWithUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium text-sm transition-colors mb-3"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Need CV Help? WhatsApp Us
                  </a>
                </>
              ) : (
                <a
                  href={`https://wa.me/${jobWhatsappNumber}?text=${whatsappMessageNoUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors mb-3"
                >
                  <MessageSquare className="h-5 w-5" />
                  Get Application Info
                </a>
              )}

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
                {formattedDeadline && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Deadline</span>
                    <span className="font-medium text-red-500">
                      {formattedDeadline}
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
