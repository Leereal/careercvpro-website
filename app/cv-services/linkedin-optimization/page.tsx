"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  ChevronDown,
  Star,
  CheckCircle,
  Target,
  Sparkles,
  Shield,
  Clock,
  MessageSquare,
  ArrowRight,
  Users,
  Eye,
  Search,
  Briefcase,
  TrendingUp,
  Award,
  Globe,
  Zap,
  UserCheck,
  Building2,
} from "lucide-react";
import Link from "next/link";

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

const linkedinStats = [
  {
    icon: Users,
    stat: "10M+",
    label: "South Africans on LinkedIn",
  },
  {
    icon: Search,
    stat: "90%",
    label: "Recruiters use LinkedIn to find candidates",
  },
  {
    icon: Eye,
    stat: "3x",
    label: "More profile views with optimization",
  },
  {
    icon: Briefcase,
    stat: "87%",
    label: "Of recruiters find LinkedIn most effective",
  },
];

const optimizationFeatures = [
  {
    icon: Target,
    title: "Keyword-Rich Headline",
    description:
      "We craft a compelling headline with industry keywords that makes you searchable and stands out to recruiters.",
  },
  {
    icon: Sparkles,
    title: "Compelling About Section",
    description:
      "Your story told professionally—highlighting your unique value proposition and career achievements.",
  },
  {
    icon: Briefcase,
    title: "Experience Optimization",
    description:
      "Each role rewritten with quantified achievements and relevant keywords for maximum impact.",
  },
  {
    icon: Award,
    title: "Skills & Endorsements Strategy",
    description:
      "We identify and add the most searched skills in your industry to boost your ranking.",
  },
  {
    icon: UserCheck,
    title: "Recommendations Guidance",
    description:
      "Templates and strategies to request powerful recommendations from colleagues and managers.",
  },
  {
    icon: Globe,
    title: "Custom URL Setup",
    description:
      "Create a professional, memorable LinkedIn URL that's perfect for your CV and email signature.",
  },
  {
    icon: Eye,
    title: "Profile Photo Tips",
    description:
      "Guidance on professional photos that increase profile views by up to 21x.",
  },
  {
    icon: TrendingUp,
    title: "Activity & Engagement Plan",
    description:
      "Strategies to boost your visibility through posts, comments, and connections.",
  },
];

const beforeAfter = {
  headline: {
    before: "Manager at Company XYZ",
    after:
      "Operations Manager | Supply Chain Expert | Driving Efficiency & Cost Reduction | MBA",
  },
  about: {
    before:
      "I am a hardworking professional with experience in management. I am looking for new opportunities.",
    after:
      "Results-driven Operations Manager with 8+ years of experience optimizing supply chains and reducing costs by up to 30%. Passionate about implementing lean methodologies and building high-performing teams. Currently seeking opportunities to drive operational excellence in the manufacturing sector.",
  },
};

const pricingOptions = [
  {
    name: "LinkedIn Only",
    price: "R150",
    originalPrice: "R500",
    description: "Complete profile optimization",
    features: [
      "Keyword-optimized headline",
      "Professional About section",
      "Experience rewriting (up to 3 roles)",
      "Skills optimization",
      "Custom URL setup",
      "Profile review checklist",
    ],
    popular: false,
    whatsappMessage:
      "Hi! I'd like the LinkedIn Profile Optimization service for R150.",
  },
  {
    name: "LinkedIn + CV",
    price: "R230",
    originalPrice: "R580",
    description: "Profile + matching CV",
    features: [
      "Everything in LinkedIn Only",
      "Professional CV (same content)",
      "Consistent branding",
      "ATS-optimized CV format",
      "Both delivered same day",
      "One round of revisions",
    ],
    popular: true,
    whatsappMessage: "Hi! I'd like the LinkedIn + CV combo package for R230.",
  },
  {
    name: "Complete Package",
    price: "R250",
    originalPrice: "R730",
    description: "LinkedIn + CV + Cover Letter",
    features: [
      "Everything in LinkedIn + CV",
      "Custom cover letter",
      "Interview tips document",
      "Job search strategy guide",
      "Priority delivery",
      "Two rounds of revisions",
    ],
    popular: false,
    whatsappMessage:
      "Hi! I'd like the Complete Package (LinkedIn + CV + Cover Letter) for R250.",
  },
];

const processSteps = [
  {
    step: "1",
    title: "Share Your Profile",
    description:
      "Send us your current LinkedIn profile URL or PDF export via WhatsApp, along with your target job/industry.",
  },
  {
    step: "2",
    title: "Expert Review",
    description:
      "Our LinkedIn specialists analyze your profile against industry standards and recruiter expectations.",
  },
  {
    step: "3",
    title: "Optimization",
    description:
      "We rewrite every section with powerful keywords, compelling copy, and professional formatting.",
  },
  {
    step: "4",
    title: "Delivery & Support",
    description:
      "Receive your optimized content with step-by-step instructions for updating your profile.",
  },
];

const testimonials = [
  {
    name: "David M.",
    role: "Software Developer",
    location: "Johannesburg",
    content:
      "Within 2 weeks of updating my profile with their content, I received 5 recruiter messages. The keyword optimization really works!",
    rating: 5,
  },
  {
    name: "Precious N.",
    role: "HR Manager",
    location: "Durban",
    content:
      "My profile views increased by 400% after the optimization. The About section they wrote perfectly captures my expertise.",
    rating: 5,
  },
  {
    name: "Ahmed K.",
    role: "Sales Executive",
    location: "Cape Town",
    content:
      "Best R150 I ever spent. Got the LinkedIn + CV combo and landed interviews at two top companies within a month.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "How does LinkedIn optimization work?",
    answer:
      "We rewrite your entire LinkedIn profile including your headline, About section, work experience, and skills. You receive the optimized content in a document, which you then copy-paste into your LinkedIn profile. We include step-by-step instructions.",
  },
  {
    question: "Will you need access to my LinkedIn account?",
    answer:
      "No, we never need your login credentials. Simply share your profile URL or a PDF export. We provide you with the optimized content to update yourself, keeping your account secure.",
  },
  {
    question: "How long does it take?",
    answer:
      "Most LinkedIn optimizations are completed within 24 hours. If you order the combo package with CV, both are typically delivered same-day during business hours.",
  },
  {
    question: "What information do you need from me?",
    answer:
      "We need your current LinkedIn profile (URL or export), target job titles/industries, and any specific achievements you want highlighted. A brief WhatsApp chat helps us understand your goals.",
  },
  {
    question: "Do you guarantee more profile views?",
    answer:
      "While we can't guarantee specific numbers, our clients typically see 200-400% increase in profile views within the first month. The optimization focuses on searchability and recruiter appeal.",
  },
  {
    question: "Can you help if I'm changing careers?",
    answer:
      "Absolutely! Career changers benefit greatly from LinkedIn optimization. We highlight transferable skills and reframe your experience to appeal to your target industry.",
  },
];

const whatsappNumber = "27749201395";

export default function LinkedInOptimizationPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0077B5] via-[#005885] to-brand-navy py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                <Linkedin className="h-4 w-4" />
                Professional LinkedIn Service
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              LinkedIn Profile{" "}
              <span className="text-brand-gold">Optimization</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Get found by recruiters. Our experts optimize your LinkedIn
              profile with powerful keywords and compelling content that
              attracts opportunities.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  "Hi! I'd like to get my LinkedIn profile optimized. Can you help?"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0077B5] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              >
                <MessageSquare className="h-5 w-5" />
                Get Started - R150
              </a>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all border border-white/20"
              >
                View Packages
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-6 text-sm text-blue-100"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>24-Hour Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>No Login Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-brand-gold" />
                <span>500+ Profiles Optimized</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why LinkedIn Matters */}
      <section className="py-16 bg-white">
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
                Why LinkedIn Matters in South Africa
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                LinkedIn isn't just a social network—it's where careers are made
                and opportunities discovered
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {linkedinStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-[#0077B5]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-7 w-7 text-[#0077B5]" />
                  </div>
                  <div className="text-3xl font-bold text-brand-navy mb-1">
                    {stat.stat}
                  </div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
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
                What We Optimize
              </h2>
              <p className="text-gray-600 text-lg">
                Every element of your profile, professionally rewritten
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {optimizationFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#0077B5]/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-[#0077B5]" />
                  </div>
                  <h3 className="font-semibold text-brand-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                See the Difference
              </h2>
              <p className="text-gray-600 text-lg">
                Real examples of how we transform LinkedIn profiles
              </p>
            </motion.div>

            <div className="space-y-8">
              {/* Headline Comparison */}
              <motion.div variants={fadeInUp}>
                <h3 className="font-semibold text-brand-navy mb-4 text-lg">
                  Headline
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <span className="text-xs font-medium text-red-600 uppercase tracking-wider">
                      Before
                    </span>
                    <p className="mt-2 text-gray-700">
                      {beforeAfter.headline.before}
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <span className="text-xs font-medium text-green-600 uppercase tracking-wider">
                      After
                    </span>
                    <p className="mt-2 text-gray-700 font-medium">
                      {beforeAfter.headline.after}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* About Comparison */}
              <motion.div variants={fadeInUp}>
                <h3 className="font-semibold text-brand-navy mb-4 text-lg">
                  About Section
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <span className="text-xs font-medium text-red-600 uppercase tracking-wider">
                      Before
                    </span>
                    <p className="mt-2 text-gray-700 text-sm">
                      {beforeAfter.about.before}
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <span className="text-xs font-medium text-green-600 uppercase tracking-wider">
                      After
                    </span>
                    <p className="mt-2 text-gray-700 text-sm">
                      {beforeAfter.about.after}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 text-lg">
                Simple 4-step process to a powerful profile
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                    <div className="w-10 h-10 bg-[#0077B5] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-brand-navy mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-12 -right-3 z-10">
                      <ArrowRight className="h-6 w-6 text-gray-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Choose Your Package
              </h2>
              <p className="text-gray-600 text-lg">
                Affordable professional optimization for every budget
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {pricingOptions.map((option, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`relative rounded-2xl p-6 ${
                    option.popular
                      ? "bg-gradient-to-br from-[#0077B5] to-[#005885] text-white ring-4 ring-[#0077B5]/20"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  {option.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-brand-gold text-brand-navy text-xs font-bold px-3 py-1 rounded-full">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        option.popular ? "text-white" : "text-brand-navy"
                      }`}
                    >
                      {option.name}
                    </h3>
                    <p
                      className={`text-sm mb-4 ${
                        option.popular ? "text-blue-100" : "text-gray-600"
                      }`}
                    >
                      {option.description}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`text-4xl font-bold ${
                          option.popular ? "text-white" : "text-brand-navy"
                        }`}
                      >
                        {option.price}
                      </span>
                      <span
                        className={`text-lg line-through ${
                          option.popular ? "text-blue-200" : "text-gray-400"
                        }`}
                      >
                        {option.originalPrice}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle
                          className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                            option.popular
                              ? "text-brand-gold"
                              : "text-green-500"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            option.popular ? "text-blue-100" : "text-gray-600"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      option.whatsappMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                      option.popular
                        ? "bg-white text-[#0077B5] hover:bg-gray-100"
                        : "bg-[#0077B5] text-white hover:bg-[#005885]"
                    }`}
                  >
                    <MessageSquare className="h-5 w-5" />
                    Get Started
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
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
                Success Stories
              </h2>
              <p className="text-gray-600 text-lg">
                See how LinkedIn optimization changed their careers
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-brand-gold fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0077B5]/10 rounded-full flex items-center justify-center">
                      <Linkedin className="h-5 w-5 text-[#0077B5]" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-navy">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}, {testimonial.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-brand-navy text-left">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 border-t border-gray-100">
                          <p className="pt-4 text-gray-600">{faq.answer}</p>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0077B5] to-[#005885]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Linkedin className="h-16 w-16 text-white/80 mx-auto" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Ready to Get Noticed by Recruiters?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-blue-100 mb-8"
            >
              Your next career opportunity could be one profile optimization
              away. Get started today for just R150.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  "Hi! I'd like to get my LinkedIn profile optimized. Can you help?"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0077B5] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              >
                <MessageSquare className="h-5 w-5" />
                WhatsApp Us Now
              </a>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-blue-100 text-sm mt-6"
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

      {/* Related Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brand-navy mb-8">
              Related Services
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/cv-services/cv-writing"
                className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                CV Writing - R80
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cv-services/cover-letter-writing"
                className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                Cover Letter - R30
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cv-services/cv-revamp"
                className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                CV Revamp - R80
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
