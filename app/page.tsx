"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  FileText,
  Sparkles,
  MapPin,
  Search,
  Clock,
  Building2,
  Shield,
  CheckCircle2,
  Download,
  BookOpen,
  MessageCircle,
  Users,
  Target,
  ChevronRight,
  FileCheck,
  PenTool,
  Zap,
  TrendingUp,
  Award,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// Dummy data for jobs (will be replaced with WordPress data)
const latestJobs = [
  {
    id: 1,
    title: "Security Officers",
    company: "Fidelity Services Group",
    location: "Gauteng",
    type: "Full-time",
    posted: "2 hours ago",
    salary: "R8,000 - R12,000",
    urgent: true,
  },
  {
    id: 2,
    title: "Call Centre Agents",
    company: "Merchants SA",
    location: "Western Cape",
    type: "Full-time",
    posted: "5 hours ago",
    salary: "R7,500 - R10,000",
    urgent: false,
  },
  {
    id: 3,
    title: "Administrative Assistants",
    company: "Government Department",
    location: "KwaZulu-Natal",
    type: "Contract",
    posted: "1 day ago",
    salary: "R9,000 - R14,000",
    urgent: true,
  },
  {
    id: 4,
    title: "Retail Assistants",
    company: "Shoprite Group",
    location: "Eastern Cape",
    type: "Part-time",
    posted: "1 day ago",
    salary: "R4,500 - R6,500",
    urgent: false,
  },
  {
    id: 5,
    title: "General Workers",
    company: "Mining Corporation",
    location: "Limpopo",
    type: "Full-time",
    posted: "2 days ago",
    salary: "R5,000 - R8,000",
    urgent: false,
  },
  {
    id: 6,
    title: "Cashiers",
    company: "Pick n Pay",
    location: "Mpumalanga",
    type: "Full-time",
    posted: "3 days ago",
    salary: "R5,500 - R7,000",
    urgent: false,
  },
];

// Dummy career tips (will be replaced with WordPress data)
const careerTips = [
  {
    id: 1,
    title: "How to Write a CV in South Africa",
    excerpt:
      "Learn the essential elements of a South African CV that gets you noticed by employers and passes ATS systems.",
    category: "CV Guides",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Common CV Mistakes That Cost You Interviews",
    excerpt:
      "Avoid these frequent errors that cause employers to reject CVs before even reading them properly.",
    category: "CV Guides",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "How to Apply for Jobs With No Experience",
    excerpt:
      "Practical strategies for Matric holders and graduates to land their first job in South Africa.",
    category: "Job Search",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Interview Preparation Tips for Entry-Level Roles",
    excerpt:
      "What to expect and how to prepare for your first professional interview in the South African job market.",
    category: "Interviews",
    readTime: "7 min read",
  },
];

// Provinces for job search
const provinces = [
  "All Provinces",
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Free State",
  "Northern Cape",
];

// Job categories
const jobCategories = [
  "All Categories",
  "Entry-Level",
  "No Experience Required",
  "Learnerships",
  "Internships",
  "Government Jobs",
  "Security",
  "Retail",
  "Call Centre",
  "Administration",
];

// Platform features
const platformFeatures = [
  {
    icon: Briefcase,
    title: "Free Job Listings",
    description:
      "Access thousands of job opportunities across South Africa at no cost",
  },
  {
    icon: MapPin,
    title: "Jobs by Province",
    description:
      "Find opportunities organised by location for easier searching",
  },
  {
    icon: FileCheck,
    title: "Clear Application Guidance",
    description: "Every job includes step-by-step application instructions",
  },
  {
    icon: BookOpen,
    title: "Career Tips & Guides",
    description: "Practical advice written specifically for SA job seekers",
  },
  {
    icon: PenTool,
    title: "Optional CV Support",
    description: "Professional CV services when you need expert help",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description: "Quick assistance and answers to your career questions",
  },
];

// Free resources
const freeResources = [
  {
    icon: FileText,
    title: "CV Samples",
    description: "Professional CV templates for different industries",
    count: "15+ Templates",
  },
  {
    icon: FileCheck,
    title: "Cover Letter Examples",
    description: "Compelling cover letters that get responses",
    count: "10+ Examples",
  },
  {
    icon: MessageCircle,
    title: "Interview Q&A",
    description: "Common questions with winning answers",
    count: "50+ Questions",
  },
  {
    icon: CheckCircle2,
    title: "Job Search Checklists",
    description: "Stay organised throughout your job hunt",
    count: "5 Checklists",
  },
];

// Stats
const stats = [
  { value: "10,000+", label: "Active Jobs", icon: Briefcase },
  { value: "9", label: "Provinces Covered", icon: MapPin },
  { value: "5,000+", label: "CVs Improved", icon: FileText },
  { value: "50+", label: "Career Guides", icon: BookOpen },
];

// Transparency points
const transparencyPoints = [
  "We do not charge for job applications",
  "Employers recruit independently",
  "Job listings are shared for informational purposes",
  "No employment guarantees are made",
];

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-brand-navy via-[#1a3a5c] to-brand-teal-dark overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-brand-teal/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-white"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6 border border-white/20"
              >
                <Sparkles className="h-4 w-4 text-brand-gold" />
                <span>South Africa&apos;s Trusted Career Platform</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                Find Jobs in South Africa &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-400">
                  Build a Stronger Career
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
              >
                Access the latest job opportunities across South Africa,
                practical career guidance, and CV support designed for real job
                seekers like you.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/jobs"
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-white font-semibold rounded-full hover:bg-brand-teal-dark transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-teal/30"
                >
                  <Briefcase className="h-5 w-5" />
                  Browse Jobs
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/cv-services/cv-revamp"
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-navy font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                >
                  <FileText className="h-5 w-5" />
                  Fix My CV
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap items-center gap-6 mt-10 pt-10 border-t border-white/10"
              >
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Shield className="h-5 w-5 text-brand-gold" />
                  <span>100% Free Job Listings</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-brand-gold" />
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Users className="h-5 w-5 text-brand-gold" />
                  <span>10,000+ Job Seekers Helped</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Job Search Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <Search className="h-5 w-5 text-brand-gold" />
                  Quick Job Search
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Province
                    </label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-teal">
                      {provinces.map((province) => (
                        <option
                          key={province}
                          value={province}
                          className="text-gray-900"
                        >
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Job Category
                    </label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-teal">
                      {jobCategories.map((category) => (
                        <option
                          key={category}
                          value={category}
                          className="text-gray-900"
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-gold text-brand-navy font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 mt-2">
                    <Search className="h-5 w-5" />
                    Search Jobs
                  </button>
                </div>

                <p className="text-gray-400 text-sm text-center mt-4">
                  Helping South Africans find relevant opportunities faster
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background relative -mt-1">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="relative group"
              >
                <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl hover:border-brand-teal/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-teal/10 rounded-xl mb-4 group-hover:bg-brand-teal/20 transition-colors">
                    <stat.icon className="h-6 w-6 text-brand-teal" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-brand-teal mb-1">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile Job Search Section */}
      <section className="py-12 bg-muted lg:hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-card border rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-brand-teal" />
              Search Jobs
            </h3>
            <div className="space-y-3">
              <select className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal">
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              <select className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal">
                {jobCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-teal text-white font-semibold rounded-xl hover:bg-brand-teal-dark transition-colors">
                <Search className="h-5 w-5" />
                Search Jobs
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-teal/10 rounded-full text-sm text-brand-teal font-medium mb-4"
            >
              <Zap className="h-4 w-4" />
              Updated Daily
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Latest Jobs in South Africa
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Stay updated with recently posted job opportunities from different
              industries and provinces across South Africa.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {latestJobs.map((job) => (
              <motion.div
                key={job.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  href={`/jobs/${job.id}`}
                  className="block bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-brand-teal/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-brand-teal" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-brand-teal transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    {job.urgent && (
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-brand-teal font-medium">
                      <TrendingUp className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {job.posted}
                    </span>
                    <span className="text-sm text-brand-teal font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Job
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-teal text-white font-semibold rounded-full hover:bg-brand-teal-dark transition-all duration-300 hover:scale-105"
            >
              View All Job Listings
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Use This Platform */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 rounded-full text-sm text-brand-gold font-medium mb-4"
            >
              <Target className="h-4 w-4" />
              Why Choose Us
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Built for South African Job Seekers
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              This platform focuses on clarity, honesty, and practical support.
              We aim to inform, guide, and support — not to make false promises.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {platformFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-brand-teal/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-teal group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-7 w-7 text-brand-teal group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CV Support Section */}
      <section className="py-20 bg-gradient-to-br from-brand-navy to-brand-teal-dark text-white relative overflow-hidden">
        {/* Background Elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-6"
              >
                <Sparkles className="h-4 w-4 text-brand-gold" />
                Professional CV Services
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Struggling to Get Interview Calls?
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-300 mb-6"
              >
                A well-structured CV can significantly improve your chances of
                landing interviews.
              </motion.p>

              <motion.p variants={fadeInUp} className="text-gray-400 mb-8">
                We offer CV review and writing services tailored to South
                African employers, helping you present your skills clearly and
                professionally. Our experts understand what local recruiters are
                looking for.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link
                  href="/cv-services/cv-revamp"
                  className="flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-navy font-semibold rounded-full hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="h-5 w-5" />
                  Improve My CV
                </Link>
                <Link
                  href="/cv-services"
                  className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  View All Services
                </Link>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-sm text-gray-400 mt-6 flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                CV services are optional and designed to support your job
                search.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center mb-4">
                      <FileCheck className="h-6 w-6 text-brand-gold" />
                    </div>
                    <h4 className="font-semibold mb-2">CV Revamp</h4>
                    <p className="text-sm text-gray-400">
                      Transform your existing CV into a professional document
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-brand-gold" />
                    </div>
                    <h4 className="font-semibold mb-2">Expert Writers</h4>
                    <p className="text-sm text-gray-400">
                      Professional CV writers with SA market experience
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center mb-4">
                      <PenTool className="h-6 w-6 text-brand-gold" />
                    </div>
                    <h4 className="font-semibold mb-2">CV Writing</h4>
                    <p className="text-sm text-gray-400">
                      Brand new CV created from scratch
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6 text-brand-gold" />
                    </div>
                    <h4 className="font-semibold mb-2">Fast Delivery</h4>
                    <p className="text-sm text-gray-400">
                      Get your improved CV within 48 hours
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Career Tips Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-teal/10 rounded-full text-sm text-brand-teal font-medium mb-4"
            >
              <BookOpen className="h-4 w-4" />
              Career Guides
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Career Advice That Actually Helps
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Learn how to improve your job search with practical,
              easy-to-understand guides written for South African job seekers.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {careerTips.map((tip) => (
              <motion.div
                key={tip.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  href={`/career-tips/${tip.id}`}
                  className="block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-teal/50 transition-all duration-300"
                >
                  <div className="h-40 bg-gradient-to-br from-brand-teal/20 to-brand-navy/20 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-brand-teal/30" />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-3 py-1 bg-brand-teal/10 text-brand-teal text-xs font-medium rounded-full mb-3">
                      {tip.category}
                    </span>
                    <h3 className="font-semibold mb-2 group-hover:text-brand-teal transition-colors line-clamp-2">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {tip.excerpt}
                    </p>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {tip.readTime}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/career-tips"
              className="inline-flex items-center gap-2 px-8 py-4 bg-card border border-border text-foreground font-semibold rounded-full hover:bg-accent hover:border-brand-teal transition-all duration-300"
            >
              Read All Career Guides
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Free Resources Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-sm text-green-600 dark:text-green-400 font-medium mb-4"
            >
              <Download className="h-4 w-4" />
              100% Free
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Free Job Seeker Resources
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Download helpful tools and examples designed for South African job
              applications. No registration required.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {freeResources.map((resource) => (
              <motion.div
                key={resource.title}
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-brand-teal/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-brand-teal to-brand-teal-dark rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <resource.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {resource.description}
                </p>
                <span className="inline-flex items-center gap-1 text-brand-teal font-medium text-sm">
                  <Download className="h-4 w-4" />
                  {resource.count}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/free-resources"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-teal text-white font-semibold rounded-full hover:bg-brand-teal-dark transition-all duration-300 hover:scale-105"
            >
              Access Free Resources
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy/10 dark:bg-white/10 rounded-full text-sm text-brand-navy dark:text-white font-medium mb-4">
                <Shield className="h-4 w-4" />
                Our Promise
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Transparency Matters
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our goal is to provide reliable information and practical
                support to job seekers across South Africa.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-brand-navy to-brand-teal-dark rounded-3xl p-8 md:p-12 text-white"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {transparencyPoints.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-gold/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-brand-gold" />
                    </div>
                    <p className="text-lg">{point}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-gray-300 mb-6">
                  Have questions? We&apos;re here to help.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-navy font-semibold rounded-full hover:bg-gray-100 transition-all"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Contact Us
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20"
                  >
                    <Users className="h-5 w-5" />
                    About Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Job Search?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of South Africans who are finding jobs and building
              stronger careers with CareerCVPro.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-white font-semibold rounded-full hover:bg-brand-teal-dark transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-teal/30"
              >
                <Briefcase className="h-5 w-5" />
                Browse Jobs Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/cv-services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card border border-border text-foreground font-semibold rounded-full hover:bg-accent transition-all duration-300"
              >
                <Sparkles className="h-5 w-5" />
                Get CV Help
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
