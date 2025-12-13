"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCheck,
  ChevronDown,
  Download,
  Eye,
  Star,
  CheckCircle,
  Target,
  Sparkles,
  Shield,
  Clock,
  MessageSquare,
  ArrowRight,
  Lightbulb,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Monitor,
  Building2,
  Stethoscope,
  Calculator,
  Users,
  Hammer,
  X,
  ZoomIn,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

interface CVTemplate {
  id: string;
  name: string;
  image: string;
  style: "modern" | "classic" | "creative" | "professional";
  description: string;
  bestFor: string[];
  features: string[];
  atsScore: string;
  color: string;
}

const cvTemplates: CVTemplate[] = [
  {
    id: "modern-sidebar",
    name: "Modern Sidebar",
    image: "/img1.png",
    style: "modern",
    description:
      "A sleek two-column design with a dark green sidebar for contact details and skills. Clean typography with professional hierarchy.",
    bestFor: [
      "IT & Tech Professionals",
      "Marketing Specialists",
      "Project Managers",
      "Consultants",
    ],
    features: [
      "Two-column layout for maximum content",
      "Visual skills section",
      "Initials avatar placeholder",
      "Clear section headers",
      "Professional color scheme",
    ],
    atsScore: "85%",
    color: "bg-emerald-600",
  },
  {
    id: "classic-professional",
    name: "Classic Professional",
    image: "/img2.png",
    style: "classic",
    description:
      "Traditional single-column layout that's clean, readable, and highly ATS-friendly. Perfect for corporate environments.",
    bestFor: [
      "Finance & Accounting",
      "Legal Professionals",
      "Government Jobs",
      "Senior Executives",
    ],
    features: [
      "Single-column ATS-optimized format",
      "Clear section dividers",
      "Technology tags under each role",
      "LinkedIn & GitHub integration",
      "Multiple work experiences layout",
    ],
    atsScore: "98%",
    color: "bg-amber-500",
  },
  {
    id: "creative-photo",
    name: "Creative with Photo",
    image: "/img3.png",
    style: "creative",
    description:
      "Eye-catching design with a circular photo placeholder and modern color accents. Great for creative industries.",
    bestFor: [
      "Designers & Creatives",
      "Sales Representatives",
      "Customer-Facing Roles",
      "Hospitality Industry",
    ],
    features: [
      "Professional photo section",
      "Language proficiency display",
      "Skills with visual indicators",
      "Modern green accent color",
      "Balanced two-column design",
    ],
    atsScore: "75%",
    color: "bg-emerald-600",
  },
  {
    id: "modern-compact",
    name: "Modern Compact",
    image: "/img4.png",
    style: "professional",
    description:
      "Space-efficient design with skill tags and a professional header. Ideal for experienced professionals with extensive history.",
    bestFor: [
      "Experienced Professionals",
      "Career Changers",
      "Technical Roles",
      "Anyone with 5+ Years Experience",
    ],
    features: [
      "Compact skill tags/badges",
      "Small photo option",
      "Social media icons",
      "Detailed work history format",
      "Clean horizontal dividers",
    ],
    atsScore: "90%",
    color: "bg-teal-600",
  },
];

const industryGuides = [
  {
    icon: Monitor,
    industry: "IT & Technology",
    tips: [
      "List programming languages and frameworks prominently",
      "Include GitHub/portfolio links",
      "Mention specific projects and their impact",
      "Use technical keywords from job descriptions",
    ],
  },
  {
    icon: Calculator,
    industry: "Finance & Accounting",
    tips: [
      "Highlight professional certifications (CA, CIMA, etc.)",
      "Include software proficiency (Sage, SAP, Pastel)",
      "Quantify achievements with Rand values",
      "Mention compliance and regulatory knowledge",
    ],
  },
  {
    icon: Stethoscope,
    industry: "Healthcare",
    tips: [
      "Display SANC registration number prominently",
      "List all certifications (BLS, ACLS, etc.)",
      "Include department experience and patient load",
      "Highlight specializations and training",
    ],
  },
  {
    icon: Building2,
    industry: "Administration",
    tips: [
      "Showcase Microsoft Office proficiency",
      "Highlight organizational and multitasking abilities",
      "Include document processing metrics",
      "Mention diary management experience",
    ],
  },
  {
    icon: Users,
    industry: "Sales & Retail",
    tips: [
      "Lead with sales targets and achievements",
      "Include customer satisfaction scores",
      "Highlight product knowledge areas",
      "Mention team leadership experience",
    ],
  },
  {
    icon: Hammer,
    industry: "Construction & Trades",
    tips: [
      "Include trade certificate numbers",
      "List safety certifications and OHSA knowledge",
      "Mention equipment and machinery expertise",
      "Highlight major project completions",
    ],
  },
];

const cvWritingTips = [
  {
    title: "Use Action Verbs",
    description:
      "Start bullet points with powerful verbs: Developed, Implemented, Managed, Achieved, Increased, Streamlined",
  },
  {
    title: "Quantify Achievements",
    description:
      "Use numbers: 'Increased sales by 35%' is stronger than 'Improved sales significantly'",
  },
  {
    title: "Tailor Each Application",
    description:
      "Customize your CV for each job by including keywords from the job description",
  },
  {
    title: "Keep it Concise",
    description:
      "2 pages maximum for experienced professionals, 1 page for graduates",
  },
  {
    title: "ATS-Friendly Format",
    description:
      "Use standard section headers, avoid tables/graphics, stick to common fonts",
  },
  {
    title: "Proofread Thoroughly",
    description:
      "Spelling mistakes are the #1 reason CVs get rejected—review multiple times",
  },
];

const whatsappNumber = "27749201395";
const whatsappMessage = encodeURIComponent(
  "Hi! I'd like to get a professional CV written. Can you help me?"
);

export default function CVSamplesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate | null>(
    null
  );
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy py-20 overflow-hidden">
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
                <FileCheck className="h-4 w-4" />
                CV Samples & Examples
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Professional CV Templates{" "}
              <span className="text-brand-teal">for South Africa</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Choose from our collection of ATS-optimized CV templates. View
              samples, get industry-specific tips, and create a CV that gets you
              interviews.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-brand-gold" />
                <span>4 Professional Designs</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-brand-teal" />
                <span>ATS-Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-gold" />
                <span>Industry-Specific Tips</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CV Templates Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                CV Template Gallery
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Click on any template to view details and see which industries
                it works best for
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cvTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  variants={fadeInUp}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  {/* Template Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <Image
                      src={template.image}
                      alt={`${template.name} CV Template`}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <button
                          onClick={() => setSelectedTemplate(template)}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-brand-navy px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                    {/* ATS Score Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`${template.color} text-white text-xs font-bold px-2 py-1 rounded-full`}
                      >
                        ATS {template.atsScore}
                      </span>
                    </div>
                    {/* Style Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur text-brand-navy text-xs font-medium px-2 py-1 rounded-full capitalize">
                        {template.style}
                      </span>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-brand-navy text-lg mb-1">
                      {template.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {template.description}
                    </p>
                    <button
                      onClick={() => setSelectedTemplate(template)}
                      className="mt-3 text-brand-teal text-sm font-medium hover:underline inline-flex items-center gap-1"
                    >
                      View details
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Template Detail Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-brand-navy">
                  {selectedTemplate.name}
                </h3>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    <Image
                      src={selectedTemplate.image}
                      alt={selectedTemplate.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`${selectedTemplate.color} text-white text-sm font-bold px-3 py-1 rounded-full`}
                        >
                          ATS Score: {selectedTemplate.atsScore}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full capitalize">
                          {selectedTemplate.style}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {selectedTemplate.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-brand-navy mb-3">
                        Best For:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplate.bestFor.map((item, i) => (
                          <span
                            key={i}
                            className="bg-brand-teal/10 text-brand-teal text-sm px-3 py-1 rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-brand-navy mb-3">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {selectedTemplate.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-600"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-4">
                        Want this template customized for your career? Our
                        experts will create a professional CV using this style.
                      </p>
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                          `Hi! I'd like my CV created using the "${selectedTemplate.name}" template style. Can you help?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                      >
                        <MessageSquare className="h-5 w-5" />
                        Get This Template - R80
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Industry-Specific Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Industry-Specific CV Tips
              </h2>
              <p className="text-gray-600 text-lg">
                What to include in your CV based on your industry
              </p>
            </motion.div>

            <div className="space-y-4">
              {industryGuides.map((guide) => (
                <motion.div
                  key={guide.industry}
                  variants={fadeInUp}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedIndustry(
                        expandedIndustry === guide.industry
                          ? null
                          : guide.industry
                      )
                    }
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center">
                        <guide.icon className="h-5 w-5 text-brand-teal" />
                      </div>
                      <span className="font-semibold text-brand-navy">
                        {guide.industry}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                        expandedIndustry === guide.industry ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedIndustry === guide.industry && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 border-t border-gray-100">
                          <ul className="pt-4 space-y-3">
                            {guide.tips.map((tip, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-gray-600"
                              >
                                <CheckCircle className="h-5 w-5 text-brand-teal flex-shrink-0 mt-0.5" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CV Writing Tips */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                CV Writing Best Practices
              </h2>
              <p className="text-gray-600 text-lg">
                Essential tips for creating a winning CV in South Africa
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cvWritingTips.map((tip, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="w-8 h-8 bg-brand-gold/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-brand-gold font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-brand-navy mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ATS Explanation Section */}
      <section className="py-16 bg-brand-navy">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What is ATS & Why Does It Matter?
              </h2>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Applicant Tracking Systems (ATS)
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Over 90% of large South African companies use ATS software
                    to screen CVs before a human ever sees them. These systems
                    scan for keywords, formatting, and structure.
                  </p>
                  <p className="text-gray-300">
                    If your CV isn't ATS-friendly, it may be rejected
                    automatically—even if you're perfectly qualified for the
                    job.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    How to Beat ATS
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Use standard section headers (Work Experience, Education, Skills)",
                      "Include keywords from the job description",
                      "Avoid tables, graphics, and unusual fonts",
                      "Use a clean, single-column format when possible",
                      "Save as PDF or .docx as specified",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <CheckCircle className="h-5 w-5 text-brand-teal flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-teal to-brand-teal-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Need a Professional CV?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-teal-100 mb-8"
            >
              Let our experts create a customized, ATS-optimized CV using one of
              these templates. Just R80, delivered same-day.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-teal hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              >
                <MessageSquare className="h-5 w-5" />
                Get Professional CV - R80
              </a>
              <Link
                href="/cv-services/cv-writing"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Learn More
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-teal-100 text-sm mt-6"
            >
              WhatsApp:{" "}
              <a href="tel:+27749201395" className="underline">
                074 920 1395
              </a>{" "}
              /{" "}
              <a href="tel:+27844613158" className="underline">
                084 461 3158
              </a>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brand-navy mb-8">
              Related Resources
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/free-resources/cover-letter-samples"
                className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                Cover Letter Samples
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/free-resources/interview-questions"
                className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                Interview Questions
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/free-resources/career-checklists"
                className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                Career Checklists
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/career-tips/cv-guides"
                className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                CV Writing Guides
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
