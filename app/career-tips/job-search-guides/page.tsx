"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle,
  XCircle,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Target,
  Users,
  Globe,
  Phone,
  Building2,
  ChevronDown,
  Clock,
  Star,
  Zap,
  MessageCircle,
  Mail,
  Linkedin,
  MapPin,
  Calendar,
  TrendingUp,
  Shield,
  Heart,
  Handshake,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Eye,
  MousePointer,
  Send,
  RefreshCw,
  Bell,
  Bookmark,
  Share2,
  Network,
  Coffee,
  Smartphone,
  Laptop,
  Building,
  Factory,
  Stethoscope,
  Hammer,
  ShoppingBag,
  Truck,
  Utensils,
  Banknote,
  HelpCircle,
  ExternalLink,
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

// Featured job search articles
const featuredArticles = [
  {
    title: "Complete Job Search Strategy for South Africa 2025/2026",
    description:
      "A step-by-step guide to finding employment in SA's competitive job market.",
    readTime: "15 min read",
    icon: Target,
    featured: true,
  },
  {
    title: "Top 20 Job Portals in South Africa",
    description:
      "The best websites and platforms to find job opportunities in SA.",
    readTime: "10 min read",
    icon: Globe,
    featured: true,
  },
  {
    title: "LinkedIn Job Search Mastery",
    description:
      "How to optimise your LinkedIn profile and find jobs through the platform.",
    readTime: "12 min read",
    icon: Linkedin,
  },
  {
    title: "Networking Your Way to Employment",
    description:
      "Building professional connections that lead to job opportunities.",
    readTime: "8 min read",
    icon: Network,
  },
  {
    title: "Government & Public Sector Jobs",
    description:
      "How to find and apply for government positions in South Africa.",
    readTime: "10 min read",
    icon: Building2,
  },
  {
    title: "Working Abroad from South Africa",
    description:
      "Remote work opportunities and emigration job search strategies.",
    readTime: "11 min read",
    icon: Globe,
  },
];

// Top job portals in South Africa
const jobPortals = [
  {
    name: "LinkedIn Jobs",
    url: "https://www.linkedin.com/jobs",
    displayUrl: "linkedin.com/jobs",
    description:
      "Professional networking + job search. Best for corporate & professional roles.",
    type: "Professional Network",
    free: true,
    highlight: true,
  },
  {
    name: "Indeed South Africa",
    url: "https://za.indeed.com",
    displayUrl: "za.indeed.com",
    description:
      "Largest job aggregator. Pulls listings from multiple sources.",
    type: "Job Aggregator",
    free: true,
    highlight: true,
  },
  {
    name: "Careers24",
    url: "https://www.careers24.com",
    displayUrl: "careers24.com",
    description: "One of SA's oldest job boards. Wide variety of industries.",
    type: "Job Board",
    free: true,
    highlight: false,
  },
  {
    name: "PNET",
    url: "https://www.pnet.co.za",
    displayUrl: "pnet.co.za",
    description:
      "Popular SA job board with salary insights and company reviews.",
    type: "Job Board",
    free: true,
    highlight: false,
  },
  {
    name: "Gumtree Jobs",
    url: "https://www.gumtree.co.za/s-jobs/v1c8p1",
    displayUrl: "gumtree.co.za/jobs",
    description: "Good for entry-level, part-time, and informal sector jobs.",
    type: "Classifieds",
    free: true,
    highlight: false,
  },
  {
    name: "Joburg.co.za",
    url: "https://www.joburg.co.za",
    displayUrl: "joburg.co.za",
    description: "Johannesburg-focused job listings across all industries.",
    type: "Regional",
    free: true,
    highlight: false,
  },
  {
    name: "OfferZen",
    url: "https://www.offerzen.com",
    displayUrl: "offerzen.com",
    description: "Tech & developer jobs. Companies apply to you!",
    type: "Tech Specialist",
    free: true,
    highlight: true,
  },
  {
    name: "RecruitMyMom",
    url: "https://www.recruitmymom.co.za",
    displayUrl: "recruitmymom.co.za",
    description:
      "Flexible, part-time, and remote jobs. Great for working parents.",
    type: "Flexible Work",
    free: true,
    highlight: false,
  },
  {
    name: "Public Service Vacancy Circular",
    url: "https://www.dpsa.gov.za/dpsa2g/vacancies.asp",
    displayUrl: "dpsa.gov.za",
    description: "Official government job listings. Updated weekly.",
    type: "Government",
    free: true,
    highlight: false,
  },
  {
    name: "Mr Price Group Careers",
    url: "https://www.mrpricegroup.com/careers",
    displayUrl: "mrpricegroup.com/careers",
    description:
      "Direct company careers page - example of checking employer sites.",
    type: "Company Direct",
    free: true,
    highlight: false,
  },
];

// Job search strategies
const searchStrategies = [
  {
    id: "online-applications",
    title: "Online Job Applications",
    icon: Laptop,
    effectiveness: "Medium",
    timeInvestment: "High",
    description: "Applying through job portals and company websites",
    tips: [
      "Apply to jobs posted within the last 7 days for best results",
      "Tailor your CV for each application using keywords from the job ad",
      "Follow up 1 week after applying if you haven't heard back",
      "Keep a spreadsheet tracking all applications",
      "Set up job alerts on multiple platforms",
    ],
    stats: "Only 2-5% of online applications result in interviews",
  },
  {
    id: "networking",
    title: "Professional Networking",
    icon: Network,
    effectiveness: "Very High",
    timeInvestment: "Medium",
    description: "Building relationships that lead to opportunities",
    tips: [
      "70-80% of jobs are filled through networking",
      "Attend industry events, conferences, and meetups",
      "Reconnect with former colleagues and classmates",
      "Join professional associations in your field",
      "Offer value before asking for help",
    ],
    stats: "Referred candidates are 4x more likely to be hired",
  },
  {
    id: "linkedin",
    title: "LinkedIn Strategy",
    icon: Linkedin,
    effectiveness: "High",
    timeInvestment: "Medium",
    description: "Leveraging the world's largest professional network",
    tips: [
      "Complete your profile to 100% - it increases visibility",
      "Use a professional headshot and compelling headline",
      "Post industry content 2-3 times per week",
      "Engage with recruiters and hiring managers",
      "Turn on 'Open to Work' (visible to recruiters only)",
    ],
    stats: "93% of recruiters use LinkedIn to find candidates",
  },
  {
    id: "recruitment-agencies",
    title: "Recruitment Agencies",
    icon: Users,
    effectiveness: "Medium-High",
    timeInvestment: "Low",
    description: "Let recruiters find opportunities for you",
    tips: [
      "Register with 3-5 agencies in your industry",
      "Be honest about your salary expectations",
      "Keep your recruiter updated on your job search",
      "Ask about contract and temp-to-perm opportunities",
      "Don't pay upfront fees - legitimate agencies are free for candidates",
    ],
    stats: "Agencies fill 15-20% of all professional positions",
  },
  {
    id: "direct-approach",
    title: "Direct Company Approach",
    icon: Building2,
    effectiveness: "High",
    timeInvestment: "High",
    description:
      "Reaching out to companies directly, even without advertised positions",
    tips: [
      "Research companies you'd love to work for",
      "Find the hiring manager on LinkedIn",
      "Send a personalised email or LinkedIn message",
      "Offer to meet for an informational interview",
      "Follow up once after 1-2 weeks",
    ],
    stats: "50% of jobs are never advertised publicly",
  },
  {
    id: "social-media",
    title: "Social Media Job Hunt",
    icon: Share2,
    effectiveness: "Medium",
    timeInvestment: "Low",
    description:
      "Finding opportunities on Facebook, Twitter, and other platforms",
    tips: [
      "Join Facebook job groups for your industry/location",
      "Follow company pages on social media",
      "Engage with industry hashtags on Twitter/X",
      "Clean up your social media presence",
      "Share your job search status (tastefully)",
    ],
    stats: "70% of employers check social media before hiring",
  },
];

// Industry-specific tips
const industryTips = [
  {
    industry: "Information Technology",
    icon: Laptop,
    portals: ["OfferZen", "LinkedIn", "Stack Overflow Jobs"],
    tips: "Build a GitHub portfolio, contribute to open source, get certified",
    hotSkills: ["Python", "Cloud (AWS/Azure)", "Data Science", "Cybersecurity"],
  },
  {
    industry: "Finance & Banking",
    icon: Banknote,
    portals: ["LinkedIn", "Careers24", "Company websites"],
    tips: "Get CA, CFA, or CIMA certification. Network at industry events",
    hotSkills: [
      "Financial Analysis",
      "Risk Management",
      "Compliance",
      "Fintech",
    ],
  },
  {
    industry: "Healthcare",
    icon: Stethoscope,
    portals: ["MedPages", "LinkedIn", "Hospital websites"],
    tips: "Keep HPCSA registration current. Consider locum work to start",
    hotSkills: [
      "Nursing",
      "Pharmacy",
      "Medical Technology",
      "Healthcare Admin",
    ],
  },
  {
    industry: "Retail & FMCG",
    icon: ShoppingBag,
    portals: ["Careers24", "Indeed", "Gumtree"],
    tips: "Start in-store and work up. Customer service experience valued",
    hotSkills: [
      "Sales",
      "Stock Management",
      "Customer Service",
      "Visual Merchandising",
    ],
  },
  {
    industry: "Engineering & Construction",
    icon: Hammer,
    portals: ["LinkedIn", "Engineering News Jobs", "Bizcommunity"],
    tips: "ECSA registration essential. Project experience trumps qualifications",
    hotSkills: ["Project Management", "AutoCAD", "Renewable Energy", "BIM"],
  },
  {
    industry: "Hospitality & Tourism",
    icon: Utensils,
    portals: ["Hosco", "Careers24", "Gumtree"],
    tips: "Seasonal opportunities available. Multi-language skills valuable",
    hotSkills: ["Food & Beverage", "Guest Relations", "Events", "Management"],
  },
];

// Common job search mistakes
const jobSearchMistakes = [
  {
    mistake: "Applying to hundreds of jobs with the same CV",
    why: "Employers can tell when a CV isn't tailored. ATS systems filter generic applications.",
    fix: "Customise your CV for each application. Quality over quantity.",
    icon: RefreshCw,
  },
  {
    mistake: "Only applying to advertised positions",
    why: "Up to 50% of jobs are never posted publicly (the 'hidden job market').",
    fix: "Network, approach companies directly, and work with recruiters.",
    icon: Eye,
  },
  {
    mistake: "Neglecting your LinkedIn profile",
    why: "93% of recruiters use LinkedIn. An incomplete profile means missed opportunities.",
    fix: "Complete your profile 100%, add a professional photo, and post regularly.",
    icon: Linkedin,
  },
  {
    mistake: "Not following up after applying",
    why: "Applications get lost. Following up shows initiative and interest.",
    fix: "Send a polite follow-up email 1 week after applying.",
    icon: Mail,
  },
  {
    mistake: "Having an unprofessional email address",
    why: "coolboy99@gmail.com doesn't inspire confidence in hiring managers.",
    fix: "Create a professional email: firstname.lastname@gmail.com",
    icon: Mail,
  },
  {
    mistake: "Ignoring your online presence",
    why: "70% of employers Google candidates. Inappropriate content can cost you jobs.",
    fix: "Google yourself. Clean up or privatise social media. Build a positive presence.",
    icon: Globe,
  },
  {
    mistake: "Being too picky too early",
    why: "Holding out for the 'perfect' job can lead to long unemployment gaps.",
    fix: "Consider stepping-stone roles that build experience and connections.",
    icon: Target,
  },
  {
    mistake: "Not preparing for each application",
    why: "Rushing applications leads to errors and generic submissions.",
    fix: "Research each company. Understand the role. Tailor your approach.",
    icon: BookOpen,
  },
];

// Job search timeline
const jobSearchTimeline = [
  {
    week: "Week 1-2",
    title: "Foundation",
    tasks: [
      "Update your CV and have it professionally reviewed",
      "Create/update your LinkedIn profile",
      "List target companies and industries",
      "Set up job alerts on 3-5 platforms",
      "Reach out to your network",
    ],
  },
  {
    week: "Week 3-4",
    title: "Active Search",
    tasks: [
      "Apply to 5-10 tailored applications per week",
      "Register with 2-3 recruitment agencies",
      "Start direct company outreach",
      "Attend networking events",
      "Post on LinkedIn weekly",
    ],
  },
  {
    week: "Week 5-8",
    title: "Intensify",
    tasks: [
      "Follow up on all applications",
      "Expand your network reach",
      "Consider temp/contract opportunities",
      "Upskill while searching (free online courses)",
      "Review and refine your approach",
    ],
  },
  {
    week: "Week 9+",
    title: "Adapt & Persist",
    tasks: [
      "Get feedback on your CV and interview skills",
      "Consider adjacent industries or roles",
      "Explore freelance or project work",
      "Stay positive and maintain routine",
      "Celebrate small wins",
    ],
  },
];

// FAQs
const faqs = [
  {
    question: "How many jobs should I apply to per week?",
    answer:
      "Quality trumps quantity. Aim for 5-10 well-tailored applications per week rather than 50 generic ones. Each application should include a customised CV and cover letter that addresses the specific job requirements.",
  },
  {
    question: "Should I apply for jobs I'm not 100% qualified for?",
    answer:
      "Yes! If you meet 60-70% of the requirements, apply. Job descriptions often describe an 'ideal' candidate that rarely exists. Women especially tend to only apply when they meet 100% of criteria, while men apply at 60%. Don't self-select out.",
  },
  {
    question: "How long does job searching typically take in South Africa?",
    answer:
      "On average, job searching takes 3-6 months in South Africa, though this varies by industry, experience level, and economic conditions. Entry-level positions may take longer due to high competition. Stay persistent and use multiple job search strategies.",
  },
  {
    question: "Is it worth paying for premium job board memberships?",
    answer:
      "Usually not necessary. Most jobs can be found through free platforms. However, LinkedIn Premium can be valuable for InMail messages to recruiters and seeing who viewed your profile. Consider a 1-month trial during active job searching.",
  },
  {
    question: "How do I find jobs in the 'hidden job market'?",
    answer:
      "The hidden job market (unadvertised positions) is accessed through: networking at industry events, LinkedIn connections, informational interviews, direct company outreach, recruitment agencies, and referrals from your professional network.",
  },
  {
    question: "Should I apply for jobs in other cities/provinces?",
    answer:
      "If you're willing to relocate, definitely expand your search. Mention your willingness to relocate in your cover letter. Some companies may offer relocation assistance. Consider remote work opportunities as well.",
  },
  {
    question: "How do I explain being unemployed for a long time?",
    answer:
      "Focus on what you've been doing: upskilling, freelancing, volunteering, or caring for family. Frame the gap positively: 'I used this time to complete certifications in...' or 'I took time to reassess my career direction.' Never apologise or sound defensive.",
  },
  {
    question: "What's the best time of year to job search in South Africa?",
    answer:
      "January-March (new year budgets), April-May (post-financial year), and August-October are typically strong hiring periods. December and June-July are slower due to holidays. However, job searching year-round is recommended.",
  },
];

// South Africa specific job search tips
const saSpecificTips = [
  {
    title: "Load Shedding Planning",
    description:
      "Keep devices charged, have mobile data backup, and plan online applications around load shedding schedules.",
    icon: Zap,
  },
  {
    title: "BEE & Employment Equity",
    description:
      "Understand how BEE affects hiring. Some positions prioritise candidates from designated groups. This is part of transformation in SA.",
    icon: Shield,
  },
  {
    title: "Public Transport Considerations",
    description:
      "Factor in commute times and costs when applying. Many SA employers ask about reliable transport during interviews.",
    icon: Truck,
  },
  {
    title: "WhatsApp for Job Search",
    description:
      "Many SA recruiters and employers use WhatsApp. Keep a professional WhatsApp profile and respond promptly.",
    icon: Smartphone,
  },
  {
    title: "Reference Letter Culture",
    description:
      "Unlike some countries, SA employers often request reference letters. Keep copies from previous employers.",
    icon: FileText,
  },
  {
    title: "ITC & Criminal Checks",
    description:
      "Many employers do ITC (credit) and criminal record checks. Address any issues proactively if needed.",
    icon: Shield,
  },
];

export default function JobSearchGuidesPage() {
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>(
    "online-applications"
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleStrategy = (strategyId: string) => {
    setExpandedStrategy(expandedStrategy === strategyId ? null : strategyId);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-teal/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/20 rounded-full text-brand-gold text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Search className="h-4 w-4" />
              Job Search Strategy Guide
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Find Your <span className="text-brand-gold">Dream Job</span>
              <br />
              in South Africa
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Proven job search strategies, top job portals, networking tips,
              and insider advice for the South African job market. Updated for
              2025/2026.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#strategies"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold hover:bg-yellow-500 text-brand-navy font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Target className="h-5 w-5" />
                Search Strategies
              </a>
              <a
                href="#portals"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300"
              >
                <Globe className="h-5 w-5" />
                Top Job Portals
              </a>
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
                32%
              </p>
              <p className="text-sm text-muted-foreground">
                SA unemployment rate (expanded)
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                70%
              </p>
              <p className="text-sm text-muted-foreground">
                of jobs filled through networking
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                3-6
              </p>
              <p className="text-sm text-muted-foreground">
                months average job search
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                50%
              </p>
              <p className="text-sm text-muted-foreground">
                of jobs never advertised
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              📚 Job Search Guide Articles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              In-depth guides to help you navigate the South African job market
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredArticles.map((article, index) => (
              <motion.article
                key={index}
                variants={fadeInUp}
                className={`group bg-card rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  article.featured ? "ring-2 ring-brand-gold/50" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        article.featured
                          ? "bg-brand-gold/20 text-brand-gold"
                          : "bg-brand-teal/10 text-brand-teal"
                      }`}
                    >
                      <article.icon className="h-6 w-6" />
                    </div>
                    {article.featured && (
                      <span className="px-2 py-1 bg-brand-gold/20 text-brand-gold text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-brand-teal transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                    <span className="text-brand-teal text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Guide
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job Search Strategies */}
      <section id="strategies" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🎯 Job Search Strategies
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Different approaches to finding employment - use a combination for
              best results
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {searchStrategies.map((strategy) => (
              <motion.div
                key={strategy.id}
                className="bg-card rounded-2xl border overflow-hidden"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleStrategy(strategy.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal">
                      <strategy.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{strategy.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            strategy.effectiveness === "Very High"
                              ? "bg-green-100 text-green-700"
                              : strategy.effectiveness === "High"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {strategy.effectiveness} Effectiveness
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {strategy.timeInvestment} Time Investment
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                      expandedStrategy === strategy.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {expandedStrategy === strategy.id && (
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
                      <div className="px-6 pb-6 space-y-4">
                        <p className="text-muted-foreground">
                          {strategy.description}
                        </p>

                        <div className="bg-muted/30 rounded-xl p-4">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-brand-gold" />
                            Key Tips:
                          </h4>
                          <ul className="space-y-2">
                            {strategy.tips.map((tip, tipIndex) => (
                              <motion.li
                                key={tipIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: tipIndex * 0.05 }}
                                className="flex items-start gap-2 text-sm"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {tip}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center gap-2 bg-brand-teal/10 rounded-lg p-3">
                          <TrendingUp className="h-4 w-4 text-brand-teal flex-shrink-0" />
                          <p className="text-sm">
                            <strong>Did you know?</strong> {strategy.stats}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Job Portals */}
      <section id="portals" className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🌐 Top Job Portals in South Africa
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Where to find job listings online - we recommend using multiple
              platforms
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {jobPortals.map((portal, index) => (
              <motion.a
                key={index}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className={`group bg-card rounded-xl border p-5 hover:shadow-lg transition-all cursor-pointer ${
                  portal.highlight ? "ring-2 ring-brand-teal/50" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2 group-hover:text-brand-teal transition-colors">
                      {portal.name}
                      {portal.highlight && (
                        <Star className="h-4 w-4 text-brand-gold fill-brand-gold" />
                      )}
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-brand-teal transition-colors" />
                    </h3>
                    <p className="text-xs text-brand-teal">
                      {portal.displayUrl}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full">
                    {portal.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {portal.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {portal.free && (
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                        Free
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-brand-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Visit Site <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="bg-brand-gold/10 rounded-xl p-6 border border-brand-gold/30">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-brand-navy mb-2">
                    Pro Tip: Don&apos;t Just Apply Online!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    While job portals are useful, remember that 50-70% of jobs
                    are filled through networking and direct approaches. Use
                    online platforms as ONE part of your strategy, not your
                    entire strategy.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Tips */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🏢 Industry-Specific Job Search Tips
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Different industries have different job search norms
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {industryTips.map((industry, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-card rounded-2xl border p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal">
                    <industry.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold">{industry.industry}</h3>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      Best Portals:
                    </p>
                    <p>{industry.portals.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      Tips:
                    </p>
                    <p className="text-muted-foreground">{industry.tips}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      Hot Skills:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {industry.hotSkills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="text-xs px-2 py-0.5 bg-brand-teal/10 text-brand-teal rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Common Mistakes */}
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
              ❌ Common Job Search Mistakes to Avoid
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don&apos;t sabotage your job search with these common errors
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {jobSearchMistakes.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-card rounded-xl border p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-100 rounded-lg text-red-600 flex-shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-700 mb-1">
                      {item.mistake}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.why}
                    </p>
                    <p className="text-sm flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Fix:</strong> {item.fix}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job Search Timeline */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              📅 Job Search Timeline
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A week-by-week guide to structuring your job search
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-teal/30 transform md:-translate-x-1/2" />

              {jobSearchTimeline.map((phase, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-start gap-6 mb-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-brand-teal rounded-full transform -translate-x-1/2 border-4 border-background z-10" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className="bg-card rounded-xl border p-5">
                      <span className="text-xs font-semibold text-brand-teal">
                        {phase.week}
                      </span>
                      <h3 className="font-bold text-lg mb-3">{phase.title}</h3>
                      <ul
                        className={`space-y-2 ${
                          index % 2 === 0 ? "md:text-right" : ""
                        }`}
                      >
                        {phase.tasks.map((task, taskIndex) => (
                          <li
                            key={taskIndex}
                            className={`text-sm text-muted-foreground flex items-start gap-2 ${
                              index % 2 === 0 ? "md:flex-row-reverse" : ""
                            }`}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SA Specific Tips */}
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
              🇿🇦 South Africa-Specific Tips
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unique considerations for job searching in SA
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {saSpecificTips.map((tip, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-card rounded-2xl border p-6 hover:shadow-lg transition-all"
              >
                <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal w-fit mb-4">
                  <tip.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ❓ Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about job searching in South Africa
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
      <section className="py-16 lg:py-24 bg-gradient-to-r from-brand-navy to-brand-navy/90">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Job Search?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Make sure your CV is ready to impress. A professional CV is your
              ticket to interviews.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cv-services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold hover:bg-yellow-500 text-brand-navy font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Zap className="h-5 w-5" />
                Get a Professional CV - From R80
              </Link>
              <Link
                href="/career-tips/cv-guides"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300"
              >
                <BookOpen className="h-5 w-5" />
                Read CV Writing Guide
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-white/60 text-sm flex-wrap">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                ATS-Optimized
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                24-Hour Delivery
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                WhatsApp Support
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
