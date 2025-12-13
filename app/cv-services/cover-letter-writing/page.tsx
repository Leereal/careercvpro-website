"use client";

import { motion } from "framer-motion";
import {
  Mail,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Target,
  Award,
  FileText,
  Sparkles,
  Heart,
  MessageSquare,
  Zap,
  Eye,
  ThumbsUp,
  AlertCircle,
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

const features = [
  {
    icon: Target,
    title: "Job-Specific",
    description:
      "Tailored to the exact role you're applying for—not generic templates",
  },
  {
    icon: Sparkles,
    title: "Attention-Grabbing Opening",
    description:
      "Hooks recruiters from the first sentence and makes them want to read more",
  },
  {
    icon: Award,
    title: "Achievement-Focused",
    description:
      "Highlights your relevant accomplishments that match the job requirements",
  },
  {
    icon: Zap,
    title: "ATS-Friendly",
    description:
      "Includes keywords from the job description to pass automated screening",
  },
  {
    icon: Eye,
    title: "Professional Tone",
    description: "Strikes the right balance between confident and respectful",
  },
  {
    icon: Heart,
    title: "Unlimited Revisions",
    description: "We refine until you're 100% happy with your cover letter",
  },
];

const whyCoverLetter = [
  {
    stat: "83%",
    description:
      "of recruiters say a great cover letter can get you an interview even if your CV isn't perfect",
  },
  {
    stat: "45%",
    description:
      "of job applications are rejected because they don't include a cover letter",
  },
  {
    stat: "26%",
    description:
      "higher chance of getting hired when you submit a tailored cover letter",
  },
];

const whatWeInclude = [
  "Personalized greeting (researched hiring manager name when possible)",
  "Compelling opening hook that grabs attention",
  "Clear explanation of why you want THIS specific job",
  "2-3 relevant achievements that match job requirements",
  "Keywords from the job description for ATS",
  "Strong closing with a call to action",
  "Professional formatting and layout",
];

const coverLetterDonts = [
  {
    wrong: "Dear Sir/Madam, I am writing to apply for the position...",
    right:
      "Dear Ms. Nkosi, Your company's innovative approach to sustainable energy caught my attention...",
    issue: "Generic opening",
  },
  {
    wrong: "I have 5 years of experience in sales and I'm a team player...",
    right:
      "In my 5 years at Vodacom, I exceeded sales targets by 40% and trained 12 new team members...",
    issue: "Vague claims",
  },
  {
    wrong: "Please see my attached CV for more details...",
    right:
      "I'd welcome the opportunity to discuss how my experience scaling retail operations could benefit Pick n Pay's expansion plans...",
    issue: "Weak closing",
  },
];

const process = [
  {
    step: 1,
    title: "Share the Job Ad",
    description: "WhatsApp us the job posting URL or description, plus your CV",
    duration: "2 min",
  },
  {
    step: 2,
    title: "We Research",
    description:
      "We analyze the job requirements and identify key selling points from your CV",
    duration: "15 min",
  },
  {
    step: 3,
    title: "Expert Writing",
    description:
      "Our writers craft a compelling, personalized cover letter for that specific role",
    duration: "30 min",
  },
  {
    step: 4,
    title: "Deliver & Refine",
    description:
      "Receive your cover letter via WhatsApp. Request changes if needed",
    duration: "Done!",
  },
];

const testimonials = [
  {
    name: "Lindiwe P.",
    role: "Marketing Coordinator, Johannesburg",
    content:
      "I'd been applying for months with no responses. After using CareerCVPro's cover letter service, I got 3 interview calls in one week! The cover letter they wrote was so professional and specific to each job.",
    rating: 5,
  },
  {
    name: "James M.",
    role: "IT Support, Cape Town",
    content:
      "Worth every cent! They researched the company and made my cover letter so relevant. The hiring manager even mentioned it during my interview. Got the job!",
    rating: 5,
  },
  {
    name: "Precious N.",
    role: "Admin Assistant, Pretoria",
    content:
      "I never knew what to write in cover letters. They made mine sound professional without being boring. R30 for something that helped me land my dream job? Absolute bargain!",
    rating: 5,
  },
];

const faqs = [
  {
    question: "Do I really need a cover letter?",
    answer:
      "Yes! In South Africa's competitive job market, a cover letter sets you apart. Many recruiters won't consider applications without one, and it's your chance to show personality and enthusiasm that a CV can't convey.",
  },
  {
    question: "Can you write cover letters for any industry?",
    answer:
      "Absolutely! We write cover letters for all industries—finance, healthcare, IT, retail, hospitality, government, NGOs, mining, and more. Just share the job ad and we'll tailor the letter to that specific role.",
  },
  {
    question: "What if I'm applying to multiple jobs?",
    answer:
      "Each cover letter should be tailored to the specific job. We offer a discount if you order multiple cover letters at once—just WhatsApp us to discuss.",
  },
  {
    question: "How long will my cover letter be?",
    answer:
      "We keep cover letters to one page (about 300-400 words)—long enough to make your case, short enough that recruiters will actually read it.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Just send us the job posting (URL or screenshot) and your CV. If you have specific achievements you want highlighted, let us know. We'll handle the rest.",
  },
  {
    question: "Can I get the cover letter and CV combo?",
    answer:
      "Yes! Our popular combo deal includes CV writing/revamp (R80) + Cover Letter (R30) for just R100. That's R10 off and everything you need to apply confidently.",
  },
];

const whatsappNumber = "27749201395";
const whatsappMessage = encodeURIComponent(
  "Hi! I'd like to order the Cover Letter Writing service (R30). Here's the job I'm applying for:"
);
const whatsappComboMessage = encodeURIComponent(
  "Hi! I'd like to order the CV + Cover Letter Combo (R100). Here's the job I'm targeting:"
);

export default function CoverLetterWritingPage() {
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
              <span className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold px-4 py-2 rounded-full text-sm font-medium">
                <Mail className="h-4 w-4" />
                Professional Cover Letter Service
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Cover Letters That{" "}
              <span className="text-brand-teal">Get You Noticed</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Stop sending generic cover letters. Get a compelling, job-specific
              cover letter that makes recruiters want to meet you—for just{" "}
              <span className="text-brand-gold font-bold">R30</span>.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              >
                <MessageSquare className="h-5 w-5" />
                Order Cover Letter - R30
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappComboMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-navy px-8 py-4 rounded-xl font-semibold transition-all"
              >
                CV + Cover Letter Combo - R100
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-teal" />
                <span>1 Hour Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-brand-teal" />
                <span>Unlimited Revisions</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-brand-gold" />
                <span>Job-Specific</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Cover Letters Matter */}
      <section className="py-20 bg-gray-50">
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
                Why Cover Letters Still Matter in 2025
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Many job seekers skip cover letters. That's your opportunity to
                stand out.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyCoverLetter.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100"
                >
                  <div className="text-5xl font-bold text-brand-teal mb-4">
                    {item.stat}
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
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
                What Makes Our Cover Letters Different
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Not copy-paste templates. Real, personalized cover letters that
                get results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-brand-teal/30 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-teal/10 rounded-xl mb-4">
                    <feature.icon className="h-6 w-6 text-brand-teal" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 bg-brand-navy">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Generic vs. Professional
              </h2>
              <p className="text-gray-300 text-lg">
                See the difference a tailored cover letter makes
              </p>
            </motion.div>

            <div className="space-y-6">
              {coverLetterDonts.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-5 w-5 text-brand-gold" />
                    <span className="text-brand-gold font-medium">
                      {item.issue}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-400 text-sm font-medium">
                          ❌ Generic
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm italic">
                        "{item.wrong}"
                      </p>
                    </div>
                    <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400 text-sm font-medium">
                          ✓ Professional
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm italic">
                        "{item.right}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
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
                Get your tailored cover letter in under an hour
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-brand-teal text-white rounded-full font-bold">
                        {item.step}
                      </span>
                      <span className="text-brand-gold text-sm font-medium">
                        {item.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-brand-navy mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-brand-teal" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Include + Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">
                  What Your Cover Letter Includes
                </h2>
                <p className="text-gray-600 mb-8">
                  Every cover letter is written from scratch, tailored to the
                  specific job you're applying for.
                </p>

                <div className="space-y-4">
                  {whatWeInclude.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-brand-teal mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-6">
                {/* Single Cover Letter */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-brand-navy">
                      Cover Letter Only
                    </h3>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 line-through">
                        R80
                      </span>
                      <div className="text-3xl font-bold text-brand-navy">
                        R30
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Perfect if you already have a great CV
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Order Now - R30
                  </a>
                </div>

                {/* Combo Deal */}
                <div className="bg-gradient-to-br from-brand-gold/10 to-brand-teal/10 rounded-3xl p-8 border-2 border-brand-gold relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <span className="bg-brand-gold text-brand-navy text-xs font-bold px-3 py-1 rounded-full">
                      BEST VALUE
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-brand-navy">
                      CV + Cover Letter Combo
                    </h3>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 line-through">
                        R110
                      </span>
                      <div className="text-3xl font-bold text-brand-navy">
                        R100
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Complete application package—save R10!
                  </p>
                  <div className="space-y-2 mb-4">
                    {[
                      "CV Writing/Revamp (R80 value)",
                      "Tailored Cover Letter (R30 value)",
                      "Same-day delivery",
                      "Unlimited revisions",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappComboMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-navy px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                  >
                    <ThumbsUp className="h-5 w-5" />
                    Get Combo - R100
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
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
                What Our Clients Say
              </h2>
              <p className="text-gray-600 text-lg">
                Real results from real South African job seekers
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
                        className="h-5 w-5 text-brand-gold fill-brand-gold"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-brand-navy">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
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
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
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
              Ready to Stand Out?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-teal-100 mb-8"
            >
              Get a cover letter that makes recruiters want to meet you. Just
              R30, delivered in under an hour.
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
                Order Cover Letter - R30
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappComboMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-navy hover:bg-brand-gold/90 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
              >
                CV + Cover Letter - R100
              </a>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-teal-100 text-sm mt-6"
            >
              WhatsApp us:{" "}
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brand-navy mb-8">
              Other Services
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/cv-services/cv-writing"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                CV Writing - R80
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cv-services/cv-revamp"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                CV Revamp - R80
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cv-services/linkedin-optimization"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                LinkedIn Optimization - R150
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cv-services"
                className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navy-light text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
