"use client";

import { motion } from "framer-motion";
import {
  PenTool,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Target,
  Award,
  FileText,
  Users,
  Briefcase,
  GraduationCap,
  TrendingUp,
  MessageSquare,
  Zap,
  Heart,
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
    title: "ATS-Optimized",
    description:
      "Designed to pass Applicant Tracking Systems used by 90% of SA employers",
  },
  {
    icon: Award,
    title: "Industry-Specific",
    description:
      "Tailored for your industry—finance, healthcare, IT, retail, mining & more",
  },
  {
    icon: FileText,
    title: "Professional Format",
    description:
      "Clean, modern design that catches recruiters' attention instantly",
  },
  {
    icon: Zap,
    title: "Keyword Optimized",
    description:
      "Strategic keywords that match job descriptions and boost visibility",
  },
  {
    icon: Shield,
    title: "100% Original",
    description:
      "Unique content written specifically for you—no templates or copy-paste",
  },
  {
    icon: Heart,
    title: "Unlimited Revisions",
    description: "We work until you're 100% satisfied with your new CV",
  },
];

const whoNeedsThis = [
  {
    icon: GraduationCap,
    title: "Recent Graduates",
    description:
      "First-time job seekers who need a professional CV that highlights academic achievements and potential",
  },
  {
    icon: Briefcase,
    title: "Career Changers",
    description:
      "Professionals switching industries who need to reframe their experience for a new field",
  },
  {
    icon: TrendingUp,
    title: "Job Seekers After a Gap",
    description:
      "Returning to work after maternity leave, studies, or unemployment",
  },
  {
    icon: Users,
    title: "Skilled Workers",
    description:
      "Tradespeople, artisans, and technicians who've never had a formal CV",
  },
];

const process = [
  {
    step: 1,
    title: "Send Your Info",
    description:
      "WhatsApp us your work history, qualifications, and the type of jobs you're targeting",
    duration: "5 min",
  },
  {
    step: 2,
    title: "Brief Consultation",
    description:
      "Quick chat to understand your career goals and highlight your unique strengths",
    duration: "10 min",
  },
  {
    step: 3,
    title: "CV Creation",
    description:
      "Our experts craft your CV from scratch with ATS optimization and compelling content",
    duration: "1-2 hours",
  },
  {
    step: 4,
    title: "Review & Deliver",
    description:
      "Receive your polished CV via WhatsApp. Request unlimited revisions if needed",
    duration: "Done!",
  },
];

const testimonials = [
  {
    name: "Thabo M.",
    role: "Graduate, Johannesburg",
    content:
      "As a fresh graduate with no work experience, I was worried. CareerCVPro created a CV that highlighted my internships and academic projects. Got called for 3 interviews within a week!",
    rating: 5,
  },
  {
    name: "Nomsa K.",
    role: "Career Changer, Cape Town",
    content:
      "Moving from hospitality to admin was scary. They rewrote my CV to show transferable skills I didn't even know I had. Started my new office job last month!",
    rating: 5,
  },
  {
    name: "David V.",
    role: "Electrician, Durban",
    content:
      "Never had a proper CV in 15 years of work. They created something professional that got me a position at a big construction company. R80 well spent!",
    rating: 5,
  },
];

const faqs = [
  {
    question: "What information do you need from me?",
    answer:
      "We need your work history (even informal jobs count), education/qualifications, skills, and the type of jobs you're applying for. Don't worry if your info is scattered—we'll help organize it.",
  },
  {
    question: "What if I have no work experience?",
    answer:
      "No problem! We specialize in creating CVs for graduates and first-time job seekers. We'll highlight your education, volunteer work, internships, projects, and transferable skills.",
  },
  {
    question: "How is this different from CV revamp?",
    answer:
      "CV writing creates your CV from scratch—ideal if you don't have a CV or yours is very outdated. CV revamp transforms an existing CV you already have. Both cost R80.",
  },
  {
    question: "Can you write industry-specific CVs?",
    answer:
      "Absolutely! We write CVs for all industries including finance, healthcare, IT, retail, hospitality, mining, construction, government, NGOs, and more. Just tell us your target industry.",
  },
  {
    question: "How long until I receive my CV?",
    answer:
      "Standard delivery is within 2 hours. For complex CVs or during busy periods, it may take up to 4 hours. Same-day delivery is guaranteed.",
  },
  {
    question: "What format will I receive?",
    answer:
      "You'll receive your CV in PDF format, which maintains perfect formatting across all devices and is preferred by employers.",
  },
];

const whatsappNumber = "27749201395";
const whatsappMessage = encodeURIComponent(
  "Hi! I'd like to order the CV Writing service (R80). I need a professional CV written from scratch."
);

export default function CVWritingPage() {
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
                <PenTool className="h-4 w-4" />
                Professional CV Writing Service
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Get a Professional CV{" "}
              <span className="text-brand-teal">Written From Scratch</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              No CV? Old CV? No problem. Our experts will create a brand new,
              ATS-optimized CV that gets you interviews—for just{" "}
              <span className="text-brand-gold font-bold">R80</span>.
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
                Order on WhatsApp - R80
              </a>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all"
              >
                See How It Works
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-teal" />
                <span>Same-Day Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-brand-teal" />
                <span>Unlimited Revisions</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-brand-gold" />
                <span>500+ Happy Clients</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who Needs This Section */}
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
                Who Needs CV Writing?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our CV writing service is perfect for anyone starting fresh or
                making a major career transition
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoNeedsThis.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-teal/10 rounded-xl mb-4">
                    <item.icon className="h-6 w-6 text-brand-teal" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
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
                What You Get for R80
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                A complete, professional CV created from scratch with everything
                you need to land interviews
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

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-brand-navy">
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
                How It Works
              </h2>
              <p className="text-gray-300 text-lg">
                Get your professional CV in 4 simple steps
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-brand-teal text-white rounded-full font-bold">
                        {item.step}
                      </span>
                      <span className="text-brand-gold text-sm font-medium">
                        {item.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
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

      {/* What We Include Section */}
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
                  What We Include in Your CV
                </h2>
                <p className="text-gray-600 mb-8">
                  Every CV we write is crafted to South African employer
                  standards and optimized for ATS systems.
                </p>

                <div className="space-y-4">
                  {[
                    "Professional summary that captures your unique value",
                    "Work experience with achievement-focused bullet points",
                    "Skills section with relevant keywords for your industry",
                    "Education and qualifications properly formatted",
                    "Contact details and LinkedIn (if applicable)",
                    "Clean, modern design that's easy to read",
                    "ATS-friendly formatting that passes scans",
                    "Industry-specific terminology and keywords",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-brand-teal mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-brand-teal/5 to-brand-navy/5 rounded-3xl p-8 border border-gray-100"
              >
                <div className="text-center mb-6">
                  <span className="text-sm text-gray-500 line-through">
                    R250
                  </span>
                  <div className="text-5xl font-bold text-brand-navy">R80</div>
                  <p className="text-gray-600 mt-2">Complete CV Writing</p>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    "Brand new CV from scratch",
                    "ATS optimization included",
                    "Same-day delivery",
                    "Unlimited revisions",
                    "PDF format",
                    "WhatsApp support",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:scale-105"
                >
                  <MessageSquare className="h-5 w-5" />
                  Order Now - R80
                </a>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Pay only after you're satisfied
                </p>
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
                Success Stories
              </h2>
              <p className="text-gray-600 text-lg">
                Join hundreds of South Africans who landed jobs with our CVs
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
              Ready for Your New CV?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-teal-100 mb-8"
            >
              Get a professional, ATS-optimized CV written from scratch.
              Same-day delivery guaranteed.
            </motion.p>

            <motion.div variants={fadeInUp} className="space-y-4">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-brand-teal hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              >
                <MessageSquare className="h-5 w-5" />
                WhatsApp Us Now - R80
              </a>

              <p className="text-teal-100 text-sm">
                Or call/WhatsApp:{" "}
                <a href="tel:+27749201395" className="underline">
                  074 920 1395
                </a>{" "}
                /{" "}
                <a href="tel:+27844613158" className="underline">
                  084 461 3158
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brand-navy mb-8">
              Need More?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/cv-services/cover-letter-writing"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                Cover Letter Writing - R30
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
