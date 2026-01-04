"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  Shield,
  Star,
  Zap,
  Phone,
  ChevronDown,
  FileText,
  RefreshCw,
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Users,
  Briefcase,
  MessageSquare,
} from "lucide-react";

// Before/After Comparison Component
function BeforeAfterComparison() {
  const [showAfter, setShowAfter] = useState(false);

  const beforeIssues = [
    "Generic objective statement",
    "Duties-focused descriptions",
    "Inconsistent formatting",
    "No keywords for ATS",
    "Missing achievements",
    "Outdated contact info format",
  ];

  const afterImprovements = [
    "Powerful professional summary",
    "Achievement-focused bullets",
    "Clean, modern layout",
    "ATS-optimized keywords",
    "Quantified accomplishments",
    "Professional contact section",
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Toggle */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setShowAfter(false)}
          className={`flex-1 py-4 px-6 font-semibold transition-colors ${
            !showAfter
              ? "bg-red-50 text-red-700 border-b-2 border-red-500"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <XCircle className="h-5 w-5" />
            Before Revamp
          </span>
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className={`flex-1 py-4 px-6 font-semibold transition-colors ${
            showAfter
              ? "bg-green-50 text-green-700 border-b-2 border-green-500"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            After Revamp
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {!showAfter ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-3"
            >
              {beforeIssues.map((issue, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-red-50 rounded-lg"
                >
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span className="text-red-700">{issue}</span>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {afterImprovements.map((improvement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-green-700">{improvement}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// FAQ Accordion
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-semibold text-brand-navy pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5">
              <p className="text-muted-foreground">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Process Step Component
function ProcessStep({
  number,
  title,
  description,
  icon: Icon,
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <motion.div
      className="relative flex gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-brand-teal rounded-full flex items-center justify-center text-white font-bold text-lg">
          {number}
        </div>
        {number < 4 && <div className="w-0.5 h-full bg-brand-teal/20 mt-2" />}
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="h-5 w-5 text-brand-teal" />
          <h3 className="font-bold text-brand-navy text-lg">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

export default function CVRevampPage() {
  const faqs = [
    {
      question: "What's the difference between CV writing and CV revamp?",
      answer:
        "CV writing creates a brand new CV from scratch, typically for first-time job seekers or career changers. CV revamp takes your existing CV and transforms it - improving the structure, wording, formatting, and ATS optimization while keeping your original content as the foundation.",
    },
    {
      question: "How long does the CV revamp take?",
      answer:
        "Our standard turnaround is less than 1 hour. We understand job hunting is time-sensitive, so we prioritize quick delivery without compromising quality. For urgent requests, let us know via WhatsApp.",
    },
    {
      question: "What format will I receive my revamped CV in?",
      answer:
        "You'll receive your CV in PDF format. The PDF maintains formatting perfectly for applications.",
    },
    {
      question: "Do you offer revisions?",
      answer:
        "Yes! We offer unlimited revisions until you're 100% satisfied. Your satisfaction is guaranteed - if you're not happy, we'll keep working on it.",
    },
    {
      question: "Will my CV pass ATS (Applicant Tracking Systems)?",
      answer:
        "Absolutely. We specifically optimize your CV for ATS systems used by South African employers. This includes proper formatting, relevant keywords, and a structure that ATS software can read easily.",
    },
    {
      question: "What information do you need from me?",
      answer:
        "Simply send us your current CV via WhatsApp. If you have a target job or industry in mind, let us know so we can optimize accordingly. You can also share any achievements or updates you'd like included.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-teal/90 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-teal/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-brand-gold" />
                <span className="text-sm font-medium">
                  Most Popular Service
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                CV Revamp Service
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Transform your existing CV into a powerful, ATS-optimized
                document that gets you noticed by South African employers.
              </p>

              {/* Price Badge */}
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 mb-8">
                <div>
                  <span className="text-white/60 line-through text-lg">
                    R250
                  </span>
                  <span className="text-4xl font-bold text-brand-gold ml-3">
                    R80
                  </span>
                </div>
                <div className="h-12 w-px bg-white/20" />
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand-gold" />
                    <span className="text-sm">Less than 1 hour</span>
                  </div>
                  <span className="text-xs text-white/60">Turnaround time</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/27749201395?text=Hi%2C%20I%20want%20to%20revamp%20my%20CV.%20Here%20is%20my%20current%20CV..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  Order via WhatsApp
                </a>
                {/* <Link
                  href="/cv-services/order"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-colors border border-white/20"
                >
                  Order Online
                  <ArrowRight className="h-5 w-5" />
                </Link> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                What's Included in Your CV Revamp
              </h2>
              <p className="text-muted-foreground">
                Everything you need to stand out in the South African job market
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Target,
                  title: "ATS Optimization",
                  description:
                    "Formatted to pass Applicant Tracking Systems used by major SA employers",
                },
                {
                  icon: Sparkles,
                  title: "Professional Formatting",
                  description:
                    "Clean, modern layout that's easy to read and visually appealing",
                },
                {
                  icon: TrendingUp,
                  title: "Achievement Focus",
                  description:
                    "Transform duty descriptions into impactful achievement statements",
                },
                {
                  icon: FileText,
                  title: "Keyword Enhancement",
                  description:
                    "Industry-specific keywords that recruiters search for",
                },
                {
                  icon: RefreshCw,
                  title: "Unlimited Revisions",
                  description:
                    "We'll keep refining until you're 100% satisfied",
                },
                {
                  icon: Clock,
                  title: "Fast Delivery",
                  description: "Get your revamped CV in less than 1 hour",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 p-5 bg-white rounded-xl border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-brand-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                See the Transformation
              </h2>
              <p className="text-muted-foreground">
                Click to compare what we fix in your CV
              </p>
            </div>

            <BeforeAfterComparison />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground">
                Simple 4-step process to get your revamped CV
              </p>
            </div>

            <div className="space-y-2">
              <ProcessStep
                number={1}
                title="Send Your CV"
                description="WhatsApp your current CV to +27 74 920 1395. Tell us your target job or industry if you have one in mind."
                icon={FileText}
              />
              <ProcessStep
                number={2}
                title="Make Payment"
                description="Pay R80 via EFT, Instant EFT, or Capitec Pay. Payment details provided on WhatsApp."
                icon={Shield}
              />
              <ProcessStep
                number={3}
                title="We Transform Your CV"
                description="Our experts revamp your CV with ATS optimization, achievement-focused content, and professional formatting."
                icon={Sparkles}
              />
              <ProcessStep
                number={4}
                title="Receive & Review"
                description="Get your revamped CV in  PDF format. Request unlimited revisions until you're satisfied and within 7 days."
                icon={CheckCircle2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who Needs This */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                Is CV Revamp Right for You?
              </h2>
              <p className="text-muted-foreground">
                This service is perfect if you...
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Eye,
                  title: "Not Getting Interviews",
                  description:
                    "You're applying but not hearing back. Your CV might not be passing ATS filters.",
                },
                {
                  icon: Clock,
                  title: "CV Is Outdated",
                  description:
                    "Your CV hasn't been updated in years and doesn't reflect your current skills.",
                },
                {
                  icon: AlertTriangle,
                  title: "DIY CV Isn't Working",
                  description:
                    "You created your own CV but it doesn't look professional enough.",
                },
                {
                  icon: Target,
                  title: "Changing Industries",
                  description:
                    "Need your CV repositioned to highlight transferable skills for a new field.",
                },
                {
                  icon: TrendingUp,
                  title: "Seeking Promotion",
                  description:
                    "Applying for senior roles and need your CV to reflect leadership abilities.",
                },
                {
                  icon: Users,
                  title: "Returning to Work",
                  description:
                    "Re-entering the job market after a career break and need to update your CV.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 p-5 bg-white rounded-xl border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                What Our Clients Say
              </h2>
              <p className="text-muted-foreground">
                Real results from real South African job seekers
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sipho M.",
                  location: "Johannesburg",
                  content:
                    "Got my CV back in 40 minutes! Applied to 3 jobs and got 2 interview calls within a week.",
                  role: "Now at Standard Bank",
                },
                {
                  name: "Lerato K.",
                  location: "Cape Town",
                  content:
                    "My old CV wasn't getting responses. After the revamp, I started getting calls immediately. Best R80 spent!",
                  role: "HR Administrator",
                },
                {
                  name: "James P.",
                  location: "Durban",
                  content:
                    "The ATS optimization really works. I was applying for months with no luck, then got 3 interviews in 2 weeks.",
                  role: "IT Specialist",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-brand-gold text-brand-gold"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div>
                    <p className="font-semibold text-brand-navy">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location} • {testimonial.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-brand-navy to-brand-navy/90">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your CV?
            </h2>
            <p className="text-white/80 mb-4">
              Join thousands of South Africans who landed interviews with our
              revamped CVs.
            </p>
            <div className="inline-flex items-center gap-3 bg-white/10 rounded-xl px-6 py-3 mb-8">
              <span className="text-white/60 line-through">R250</span>
              <span className="text-3xl font-bold text-brand-gold">R80</span>
              <span className="text-white/60">• Less than 1 hour delivery</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/27749201395?text=Hi%2C%20I%20want%20to%20revamp%20my%20CV"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                <Phone className="h-5 w-5" />
                WhatsApp: +27 74 920 1395
              </a>
              <a
                href="https://wa.me/27844613158?text=Hi%2C%20I%20want%20to%20revamp%20my%20CV"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-colors border border-white/20"
              >
                <Phone className="h-5 w-5" />
                WhatsApp: +27 84 461 3158
              </a>
            </div>

            <p className="text-white/60 text-sm mt-8">
              Simply send your current CV via WhatsApp and we&apos;ll take care
              of the rest!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
