"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  CheckCircle,
  XCircle,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Target,
  Layout,
  Type,
  Briefcase,
  GraduationCap,
  Award,
  User,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Download,
  Clock,
  Star,
  Zap,
  MessageCircle,
  FileCheck,
  Search,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cvSections = [
  {
    id: "personal-details",
    title: "Personal Details",
    icon: User,
    description: "What to include and what to leave out",
  },
  {
    id: "professional-summary",
    title: "Professional Summary",
    icon: Target,
    description: "How to write a compelling opening statement",
  },
  {
    id: "work-experience",
    title: "Work Experience",
    icon: Briefcase,
    description: "Showcasing your career history effectively",
  },
  {
    id: "education",
    title: "Education & Qualifications",
    icon: GraduationCap,
    description: "Presenting your academic background",
  },
  {
    id: "skills",
    title: "Skills Section",
    icon: Star,
    description: "Hard skills vs soft skills",
  },
  {
    id: "formatting",
    title: "Formatting & Layout",
    icon: Layout,
    description: "Making your CV visually appealing",
  },
];

const commonMistakes = [
  {
    mistake: "Including a photo on your CV",
    why: "In South Africa, photos can lead to unconscious bias. Most employers prefer CVs without photos unless specifically requested.",
    fix: "Remove your photo unless applying to modelling, acting, or front-of-house positions.",
  },
  {
    mistake: "Using an unprofessional email address",
    why: "Emails like 'coolboy2000@gmail.com' make you look unprofessional and immature.",
    fix: "Create a professional email using your name, e.g., 'john.smith@gmail.com'.",
  },
  {
    mistake: "Writing 'CV' or 'Curriculum Vitae' as the title",
    why: "Employers know it's a CV. This wastes valuable space at the top of your document.",
    fix: "Use your full name as the title/heading instead.",
  },
  {
    mistake: "Including your ID number or date of birth",
    why: "This information can lead to age discrimination. It's also a security risk.",
    fix: "Only include your ID number if the job advert specifically requests it.",
  },
  {
    mistake: "Listing duties instead of achievements",
    why: "Duties tell employers what you were supposed to do. Achievements show what you actually accomplished.",
    fix: "Use action verbs and quantify results: 'Increased sales by 25%' instead of 'Responsible for sales'.",
  },
  {
    mistake: "Making your CV too long",
    why: "Recruiters spend only 6-7 seconds scanning a CV initially. Long CVs often go unread.",
    fix: "Keep it to 2 pages maximum. Entry-level candidates should aim for 1 page.",
  },
  {
    mistake: "Using the same CV for every job",
    why: "Generic CVs don't highlight the specific skills each employer is looking for.",
    fix: "Tailor your CV for each application, matching keywords from the job description.",
  },
  {
    mistake: "Including references on the CV",
    why: "It wastes space and employers will ask for references later in the process.",
    fix: "Simply write 'References available upon request' or remove the section entirely.",
  },
];

const atsKeywords = [
  {
    category: "Administrative",
    keywords: [
      "Microsoft Office",
      "Data Entry",
      "Scheduling",
      "Filing",
      "Reception",
      "Customer Service",
      "Invoicing",
      "SAP",
    ],
  },
  {
    category: "Finance",
    keywords: [
      "Accounting",
      "Budgeting",
      "Financial Analysis",
      "Pastel",
      "QuickBooks",
      "Reconciliation",
      "Auditing",
      "GAAP",
    ],
  },
  {
    category: "IT",
    keywords: [
      "Python",
      "JavaScript",
      "SQL",
      "Cloud Computing",
      "Cybersecurity",
      "Agile",
      "DevOps",
      "API",
    ],
  },
  {
    category: "Sales & Marketing",
    keywords: [
      "Lead Generation",
      "CRM",
      "Digital Marketing",
      "SEO",
      "Social Media",
      "Sales Targets",
      "Client Relations",
      "B2B",
    ],
  },
  {
    category: "Healthcare",
    keywords: [
      "Patient Care",
      "HPCSA",
      "Medical Records",
      "Dispensary",
      "Nursing",
      "First Aid",
      "Clinical",
      "Pharmacy",
    ],
  },
  {
    category: "Retail",
    keywords: [
      "Point of Sale",
      "Stock Control",
      "Visual Merchandising",
      "Cash Handling",
      "Customer Experience",
      "Inventory",
      "Shrinkage",
    ],
  },
];

const faqs = [
  {
    question: "How long should my CV be in South Africa?",
    answer:
      "For most positions in South Africa, your CV should be 2 pages maximum. If you're a recent graduate or have less than 5 years of experience, aim for 1 page. Senior executives or academics may extend to 3 pages, but only if the content is highly relevant.",
  },
  {
    question: "Should I include a photo on my South African CV?",
    answer:
      "Generally, no. Including a photo can lead to unconscious bias and is not expected in South Africa. Exceptions include roles in modelling, acting, hospitality, or when specifically requested by the employer. Focus on your skills and experience instead.",
  },
  {
    question: "What is ATS and why does it matter?",
    answer:
      "ATS (Applicant Tracking System) is software used by companies to scan and filter CVs before a human sees them. In South Africa, most large employers use ATS. To pass, use standard headings, include relevant keywords from the job description, avoid tables/graphics, and save your CV as a Word document or simple PDF.",
  },
  {
    question: "Should I include my ID number on my CV?",
    answer:
      "Only include your South African ID number if the job advertisement specifically requests it. Otherwise, leave it out to protect yourself from identity theft and potential age discrimination. Employers will ask for it during the hiring process if needed.",
  },
  {
    question: "How far back should my work history go?",
    answer:
      "Generally, include the last 10-15 years of relevant work experience. For older positions, you can briefly list them without detailed descriptions. Focus more detail on recent and relevant roles. If you have gaps, be prepared to explain them in the interview.",
  },
  {
    question:
      "What's the difference between a CV and a resume in South Africa?",
    answer:
      "In South Africa, 'CV' and 'resume' are often used interchangeably. However, traditionally a CV is more comprehensive (2+ pages) while a resume is a brief 1-page summary. Most South African employers expect a 'CV' that's 1-2 pages long.",
  },
  {
    question: "Should I include my matric results?",
    answer:
      "If you're a recent school leaver or have limited higher education, include your matric results. Once you have a tertiary qualification or several years of work experience, you can simply state 'Matric Certificate' with the year and school name.",
  },
  {
    question: "How do I explain gaps in my employment?",
    answer:
      "Be honest but strategic. Brief gaps don't need explanation. For longer gaps, mention productive activities: studying, freelancing, volunteering, caring for family, or skill development. Address significant gaps in your cover letter rather than leaving employers guessing.",
  },
];

export default function CVGuidesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy to-brand-teal overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <BookOpen className="h-4 w-4 text-brand-gold" />
              <span className="text-white/90 text-sm font-medium">
                Complete CV Writing Guide for South Africa
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              How to Write a <span className="text-brand-gold">Winning CV</span>
              <br />
              for the SA Job Market
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Learn expert tips on crafting a professional CV that gets past ATS
              systems and lands you interviews. Updated for 2025/2026 South
              African job market.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#guide"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold hover:bg-yellow-500 text-brand-navy font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <FileText className="h-5 w-5" />
                Read the Guide
              </a>
              <Link
                href="/cv-services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300"
              >
                <Zap className="h-5 w-5" />
                Get Professional Help
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                6-7
              </p>
              <p className="text-sm text-muted-foreground">
                Seconds recruiters spend scanning a CV
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                75%
              </p>
              <p className="text-sm text-muted-foreground">
                CVs rejected by ATS systems
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                2
              </p>
              <p className="text-sm text-muted-foreground">
                Maximum pages for most CVs
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                40%
              </p>
              <p className="text-sm text-muted-foreground">
                More interviews with tailored CVs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              📑 What You&apos;ll Learn
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cvSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-start gap-3 p-4 bg-card rounded-xl border hover:border-brand-teal/50 hover:shadow-md transition-all"
                >
                  <div className="p-2 bg-brand-teal/10 rounded-lg text-brand-teal">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{section.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Guide Content */}
      <article id="guide" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.div
              className="prose prose-lg max-w-none mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                The Complete Guide to Writing a South African CV in 2025/2026
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Your CV (Curriculum Vitae) is your first impression on potential
                employers. In South Africa&apos;s competitive job market, with
                unemployment rates among the highest globally, having a
                professionally crafted CV isn&apos;t just helpful—it&apos;s
                essential. This comprehensive guide will walk you through
                everything you need to know about creating a CV that stands out,
                passes ATS (Applicant Tracking Systems), and gets you invited to
                interviews.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you&apos;re a recent matric leaver, a graduate entering
                the workforce, or an experienced professional looking for new
                opportunities, this guide covers the South African CV standards
                and expectations that employers are looking for.
              </p>
            </motion.div>

            {/* Section 1: Personal Details */}
            <motion.section
              id="personal-details"
              className="mb-16 scroll-mt-24"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-teal/10 rounded-xl">
                  <User className="h-6 w-6 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  1. Personal Details Section
                </h2>
              </div>

              <div className="bg-card rounded-2xl border p-6 md:p-8 mb-6">
                <h3 className="font-semibold text-lg mb-4 text-brand-teal">
                  ✅ What to Include:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Full Name</strong> - Use your legal name as it
                      appears on your ID
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Phone Number</strong> - Preferably a mobile number
                      you check regularly
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Professional Email</strong> -
                      firstname.lastname@gmail.com format is ideal
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Location</strong> - City/Town and Province (e.g.,
                      &quot;Sandton, Gauteng&quot;)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>LinkedIn Profile</strong> - If you have a
                      professional, updated profile
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 md:p-8">
                <h3 className="font-semibold text-lg mb-4 text-red-600">
                  ❌ What to Leave Out:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>ID Number</strong> - Only include if specifically
                      requested. Risk of identity theft.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Date of Birth/Age</strong> - Can lead to age
                      discrimination
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Photo</strong> - Not required in SA and can cause
                      bias
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Marital Status</strong> - Irrelevant to your job
                      performance
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Full Physical Address</strong> - City/Province is
                      sufficient
                    </div>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section 2: Professional Summary */}
            <motion.section
              id="professional-summary"
              className="mb-16 scroll-mt-24"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-teal/10 rounded-xl">
                  <Target className="h-6 w-6 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  2. Professional Summary / Personal Profile
                </h2>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your professional summary is a brief 3-4 sentence paragraph at
                the top of your CV that summarizes who you are professionally.
                This is your elevator pitch—make it count!
              </p>

              <div className="bg-card rounded-2xl border p-6 md:p-8 mb-6">
                <h3 className="font-semibold text-lg mb-4">
                  📝 Formula for a Great Summary:
                </h3>
                <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm mb-4">
                  [Job Title/Professional Identity] + [Years of Experience] +
                  [Key Skills/Expertise] + [Notable Achievement] + [Career Goal]
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 text-green-600">
                    ✅ Good Example:
                  </h4>
                  <blockquote className="border-l-4 border-brand-teal pl-4 italic text-muted-foreground">
                    &quot;Results-driven Administrative Professional with 5+
                    years of experience in office management and executive
                    support. Proficient in Microsoft Office Suite, SAP, and
                    customer relationship management. Successfully reduced
                    office expenses by 20% through implementing efficient filing
                    systems. Seeking to leverage organisational skills and
                    attention to detail in a challenging Office Manager
                    role.&quot;
                  </blockquote>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 text-red-600">
                    ❌ Poor Example:
                  </h4>
                  <blockquote className="border-l-4 border-red-500 pl-4 italic text-muted-foreground">
                    &quot;I am a hard worker looking for any job opportunity. I
                    am reliable and punctual. Please give me a chance to prove
                    myself.&quot;
                  </blockquote>
                  <p className="text-sm text-red-600 mt-2">
                    ⚠️ Too generic, no specific skills, sounds desperate
                  </p>
                </div>
              </div>

              <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-4">
                <p className="text-sm flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Pro Tip:</strong> Customise your summary for each
                    job application. Use keywords from the job description to
                    show you&apos;re a perfect match.
                  </span>
                </p>
              </div>
            </motion.section>

            {/* Section 3: Work Experience */}
            <motion.section
              id="work-experience"
              className="mb-16 scroll-mt-24"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-teal/10 rounded-xl">
                  <Briefcase className="h-6 w-6 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  3. Work Experience Section
                </h2>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                This is typically the most important section of your CV. List
                your work history in reverse chronological order (most recent
                first). Focus on achievements, not just duties.
              </p>

              <div className="bg-card rounded-2xl border p-6 md:p-8 mb-6">
                <h3 className="font-semibold text-lg mb-4">
                  📋 Format for Each Position:
                </h3>
                <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                  <p>
                    <strong>Job Title</strong>
                  </p>
                  <p>Company Name | Location</p>
                  <p className="text-muted-foreground">
                    Month Year – Month Year (or &quot;Present&quot;)
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>
                      Achievement/responsibility using action verb + result
                    </li>
                    <li>
                      Achievement/responsibility using action verb + result
                    </li>
                    <li>
                      Achievement/responsibility using action verb + result
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">
                  <h4 className="font-semibold mb-3 text-green-600">
                    ✅ Achievement-Based (Do This)
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      • Increased monthly sales by 35% through implementing new
                      customer follow-up system
                    </li>
                    <li>
                      • Reduced customer complaints by 50% by training team on
                      conflict resolution
                    </li>
                    <li>
                      • Managed portfolio of 150+ client accounts worth R2.5
                      million
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                  <h4 className="font-semibold mb-3 text-red-600">
                    ❌ Duty-Based (Avoid This)
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Responsible for sales</li>
                    <li>• Handled customer complaints</li>
                    <li>• Managed client accounts</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card rounded-2xl border p-6">
                <h3 className="font-semibold text-lg mb-4">
                  🎯 Power Action Verbs for Your CV:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Achieved",
                    "Implemented",
                    "Managed",
                    "Developed",
                    "Increased",
                    "Reduced",
                    "Streamlined",
                    "Coordinated",
                    "Negotiated",
                    "Trained",
                    "Launched",
                    "Generated",
                    "Resolved",
                    "Designed",
                    "Optimised",
                    "Supervised",
                    "Delivered",
                    "Exceeded",
                    "Established",
                    "Transformed",
                  ].map((verb) => (
                    <span
                      key={verb}
                      className="px-3 py-1 bg-brand-teal/10 text-brand-teal text-sm rounded-full"
                    >
                      {verb}
                    </span>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Section 4: Education */}
            <motion.section
              id="education"
              className="mb-16 scroll-mt-24"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-teal/10 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  4. Education & Qualifications
                </h2>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                List your education in reverse chronological order. Include
                formal qualifications, certifications, and relevant training
                courses.
              </p>

              <div className="bg-card rounded-2xl border p-6 md:p-8 mb-6">
                <h3 className="font-semibold text-lg mb-4">📋 Format:</h3>
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p>
                      <strong>Qualification Name</strong>
                    </p>
                    <p>Institution Name</p>
                    <p className="text-muted-foreground">
                      Year Completed (or Expected Completion Date)
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Relevant modules or achievements (optional)
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      <strong>Example:</strong>
                    </p>
                    <p className="mt-2">
                      <strong>Bachelor of Commerce (BCom) in Accounting</strong>
                    </p>
                    <p>University of Johannesburg</p>
                    <p>2022</p>
                    <p className="text-muted-foreground">
                      Graduated with Distinction, Dean&apos;s Merit List 2021
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-xl p-5">
                  <h4 className="font-semibold mb-3">For Recent Graduates:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Place Education section before Work Experience</li>
                    <li>• Include matric subjects and symbols if impressive</li>
                    <li>• List relevant coursework and projects</li>
                    <li>• Include academic achievements and awards</li>
                  </ul>
                </div>
                <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-xl p-5">
                  <h4 className="font-semibold mb-3">
                    For Experienced Professionals:
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Place Education after Work Experience</li>
                    <li>• Only list highest qualification</li>
                    <li>
                      • No need for matric details if you have tertiary
                      education
                    </li>
                    <li>• Focus on recent, relevant certifications</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 5: Skills */}
            <motion.section
              id="skills"
              className="mb-16 scroll-mt-24"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-teal/10 rounded-xl">
                  <Star className="h-6 w-6 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  5. Skills Section
                </h2>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your skills section should include a mix of hard skills
                (technical abilities) and soft skills (interpersonal abilities).
                Always prioritise skills mentioned in the job description.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-card rounded-2xl border p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    💻 Hard Skills (Technical)
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Microsoft Office Suite (Word, Excel, PowerPoint)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Accounting Software (Pastel, QuickBooks, SAP)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Programming Languages (Python, JavaScript, SQL)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Data Analysis (Excel, Power BI, Tableau)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Industry-specific certifications
                    </li>
                  </ul>
                </div>
                <div className="bg-card rounded-2xl border p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    🤝 Soft Skills (Interpersonal)
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Communication (Written & Verbal)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Problem-Solving & Critical Thinking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Leadership & Team Management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Time Management & Organisation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Adaptability & Flexibility
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-4">
                <p className="text-sm flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Important:</strong> Avoid rating your skills with
                    stars or percentages (e.g., &quot;Excel: ★★★★☆&quot;). This
                    is subjective and unprofessional. Instead, demonstrate
                    proficiency through achievements in your work experience.
                  </span>
                </p>
              </div>
            </motion.section>

            {/* Section 6: Formatting */}
            <motion.section
              id="formatting"
              className="mb-16 scroll-mt-24"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-teal/10 rounded-xl">
                  <Layout className="h-6 w-6 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  6. Formatting & Layout Guidelines
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-card rounded-2xl border p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    📐 Layout Best Practices
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>
                        Use clear section headings (bold, slightly larger font)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Maintain consistent spacing throughout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Use bullet points for easy scanning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Leave adequate white space (margins: 2-2.5cm)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>
                        Align text consistently (left-aligned is standard)
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-card rounded-2xl border p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    🔤 Font & Typography
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>
                        <strong>Font:</strong> Arial, Calibri, or Helvetica
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>
                        <strong>Size:</strong> 10-12pt for body, 14-16pt for
                        headings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>
                        <strong>Colour:</strong> Black text, minimal colour
                        accents
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>
                        <strong>File format:</strong> PDF or Word (.docx)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>
                        <strong>File name:</strong> FirstName_LastName_CV.pdf
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* ATS Section */}
            <motion.section
              className="mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-gold/10 rounded-xl">
                  <Search className="h-6 w-6 text-brand-gold" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Understanding ATS (Applicant Tracking Systems)
                </h2>
              </div>

              <div className="bg-gradient-to-r from-brand-navy/5 to-brand-teal/5 rounded-2xl border p-6 md:p-8 mb-6">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Most large South African companies (banks, retailers,
                  corporations) use ATS software to automatically screen CVs
                  before a human ever sees them.{" "}
                  <strong>Up to 75% of CVs are rejected by ATS systems</strong>{" "}
                  due to formatting issues or missing keywords.
                </p>

                <h3 className="font-semibold text-lg mb-4">
                  🤖 How to Beat the ATS:
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Use standard section headings (Work Experience,
                        Education, Skills)
                      </span>
                    </p>
                    <p className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Include keywords from the job description</span>
                    </p>
                    <p className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Avoid tables, text boxes, and graphics</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Use standard fonts (Arial, Calibri, Times New Roman)
                      </span>
                    </p>
                    <p className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Save as .docx or simple PDF (not scanned)</span>
                    </p>
                    <p className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Don&apos;t put important info in headers/footers
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl border p-6">
                <h3 className="font-semibold text-lg mb-4">
                  📊 Industry-Specific ATS Keywords:
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {atsKeywords.map((category) => (
                    <div
                      key={category.category}
                      className="bg-muted/50 rounded-xl p-4"
                    >
                      <h4 className="font-semibold text-sm text-brand-teal mb-2">
                        {category.category}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {category.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="text-xs bg-background px-2 py-1 rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Common Mistakes */}
            <motion.section
              className="mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-500/10 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  8 Common CV Mistakes South Africans Make
                </h2>
              </div>

              <div className="space-y-4">
                {commonMistakes.map((item, index) => (
                  <div key={index} className="bg-card rounded-xl border p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-red-600 mb-1">
                          {item.mistake}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Why it&apos;s bad:</strong> {item.why}
                        </p>
                        <p className="text-sm text-green-600">
                          <strong>Fix:</strong> {item.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </article>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="text-brand-teal">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Common questions about CV writing in South Africa
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto space-y-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-card rounded-xl border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2, ease: "easeInOut" },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="relative bg-gradient-to-r from-brand-navy to-brand-teal rounded-3xl p-8 lg:p-12 overflow-hidden"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need Help Writing Your CV?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Don&apos;t have time to write your own CV? Let our professional
                writers create a job-winning CV for you. Starting from just R80!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/cv-services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold hover:bg-yellow-500 text-brand-navy font-bold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Zap className="h-5 w-5" />
                  Get Professional CV - R80
                </Link>
                <Link
                  href="/free-resources/cv-samples"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300"
                >
                  <Download className="h-5 w-5" />
                  Free CV Templates
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Continue Your{" "}
              <span className="text-brand-teal">Career Journey</span>
            </h2>
            <p className="text-muted-foreground">
              More helpful resources to boost your job search
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link
              href="/career-tips/interview-guides"
              className="bg-card rounded-2xl border p-6 hover:shadow-lg hover:border-brand-teal/50 transition-all group"
            >
              <div className="p-3 bg-brand-teal/10 rounded-xl w-fit mb-4">
                <MessageCircle className="h-6 w-6 text-brand-teal" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-brand-teal transition-colors">
                Interview Guides
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ace your next interview with expert tips and common questions
              </p>
              <span className="text-brand-teal text-sm font-medium inline-flex items-center gap-1">
                Read More{" "}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/free-resources/cover-letter-samples"
              className="bg-card rounded-2xl border p-6 hover:shadow-lg hover:border-brand-teal/50 transition-all group"
            >
              <div className="p-3 bg-brand-gold/10 rounded-xl w-fit mb-4">
                <Mail className="h-6 w-6 text-brand-gold" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-brand-teal transition-colors">
                Cover Letter Samples
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Free cover letter templates and examples for any industry
              </p>
              <span className="text-brand-teal text-sm font-medium inline-flex items-center gap-1">
                Get Templates{" "}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/career-tips/job-search-guides"
              className="bg-card rounded-2xl border p-6 hover:shadow-lg hover:border-brand-teal/50 transition-all group"
            >
              <div className="p-3 bg-green-500/10 rounded-xl w-fit mb-4">
                <Search className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-brand-teal transition-colors">
                Job Search Strategies
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Proven techniques to find and land your dream job faster
              </p>
              <span className="text-brand-teal text-sm font-medium inline-flex items-center gap-1">
                Learn More{" "}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
