"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Target,
  Users,
  Zap,
  BookOpen,
  Shield,
  Briefcase,
  MessageCircle,
  FileText,
  XCircle,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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

const whatWeDo = [
  {
    icon: Briefcase,
    title: "Share Job Listings",
    description:
      "Curated job opportunities shared for informational purposes to help you find relevant openings",
  },
  {
    icon: BookOpen,
    title: "Career Guidance",
    description:
      "Practical articles and guides written specifically for South African job seekers",
  },
  {
    icon: FileText,
    title: "CV Services",
    description:
      "Optional CV and cover letter support services for those who need additional help",
  },
];

const whatWeDoNot = [
  "We do not guarantee employment",
  "We do not charge for job applications",
  "We are not a recruitment agency unless explicitly stated",
];

const values = [
  {
    icon: Heart,
    title: "Honesty",
    description:
      "We are transparent about what we can and cannot do, and we avoid making false promises.",
  },
  {
    icon: Target,
    title: "Clarity",
    description:
      "Job information is presented clearly, making it easy for job seekers to understand requirements.",
  },
  {
    icon: Users,
    title: "Support",
    description:
      "We provide practical resources and guidance to help job seekers succeed in their search.",
  },
  {
    icon: Shield,
    title: "Trust",
    description:
      "Your data is protected, and we maintain high standards of privacy and security.",
  },
];

const milestones = [
  { number: "10,000+", label: "Job Seekers Helped" },
  { number: "5,000+", label: "CVs Improved" },
  { number: "50+", label: "Career Guides Published" },
  { number: "9", label: "Provinces Covered" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-brand-navy via-[#1a3a5c] to-brand-teal-dark overflow-hidden">
        {/* Floating Background Elements */}
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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-white text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6 border border-white/20"
            >
              <Heart className="h-4 w-4 text-brand-gold" />
              <span>About CareerCVPro</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Supporting Job Seekers Across{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-400">
                South Africa
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-300 mb-8"
            >
              We are a South Africa–focused job and career information platform
              created to support job seekers with reliable job listings,
              practical career guidance, and employment resources.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-teal text-white font-semibold rounded-full hover:bg-brand-teal-dark transition-all duration-300 hover:scale-105"
              >
                Get in Touch
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                Browse Jobs
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
            className="w-full"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background relative -mt-1">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our goal is to make job searching clearer and more accessible by
                providing job opportunities organised by province and category,
                career tips written for South African job seekers, free
                resources to help improve job applications, and optional CV
                review and writing support.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We understand that many job seekers struggle not because they
                lack potential, but because they lack clear information and
                guidance. This platform was created to address that gap.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-2xl p-8 md:p-12"
            >
              <h3 className="text-2xl font-bold mb-8">What We Provide</h3>
              <div className="space-y-4">
                {[
                  "Job opportunities organised by province and category",
                  "Career tips written for South African job seekers",
                  "Free resources to help improve job applications",
                  "Optional CV review and writing support",
                ].map((goal, index) => (
                  <motion.div
                    key={goal}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-5 w-5 text-brand-teal" />
                    </div>
                    <p className="text-lg">{goal}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Impact & Growth
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Since our launch, we&apos;ve been helping South Africans find jobs
              and build stronger careers.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {milestones.map((milestone) => (
              <motion.div
                key={milestone.label}
                variants={scaleIn}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:border-brand-teal/50 transition-all"
              >
                <p className="text-4xl md:text-5xl font-bold text-brand-teal mb-2">
                  {milestone.number}
                </p>
                <p className="text-muted-foreground">{milestone.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              What We Do
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              {whatWeDo.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:border-brand-teal/50 transition-all group"
                >
                  <div className="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-teal group-hover:scale-110 transition-all duration-300">
                    <item.icon className="h-7 w-7 text-brand-teal group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl p-8 md:p-12"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <XCircle className="h-7 w-7 text-red-500" />
                What We Do Not Do
              </h3>
              <div className="space-y-4">
                {whatWeDoNot.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                    <p className="text-lg">{item}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-muted-foreground mt-6 pt-6 border-t border-red-200 dark:border-red-900/50">
                Employers recruit independently, and all job listings are shared
                to assist job seekers in finding opportunities and understanding
                application requirements.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Our Core Values
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Everything we do is guided by these principles
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-brand-teal/50 transition-all"
              >
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-brand-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-gradient-to-br from-brand-navy to-brand-teal-dark text-white">
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
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Our Commitment
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Our commitment is to honesty, clarity, and practical support for
              job seekers across South Africa. Employers recruit independently,
              and all job listings are shared to assist job seekers in finding
              opportunities and understanding application requirements.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold text-brand-navy font-semibold rounded-full hover:bg-yellow-400 transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Us
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                <Briefcase className="h-5 w-5" />
                Browse Jobs
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.div variants={staggerContainer} className="space-y-4">
              {[
                {
                  q: "Is this a recruitment agency?",
                  a: "No. We are a job and career information platform. We share job listings for informational purposes. Employers recruit independently.",
                },
                {
                  q: "Do you charge for job applications?",
                  a: "No. All job applications and listings are completely free. We never charge job seekers to apply for positions.",
                },
                {
                  q: "Can you guarantee I'll get a job?",
                  a: "No. While we provide resources and guidance, employment outcomes depend on many factors including employer decisions, your qualifications, and application quality.",
                },
                {
                  q: "How accurate are the job listings?",
                  a: "We aim to keep all listings accurate and up-to-date. However, we recommend verifying job details directly with the employer.",
                },
                {
                  q: "What about my personal information?",
                  a: "Your privacy is important. We only collect information you voluntarily provide and use it to assist you. We never sell personal data to third parties.",
                },
                {
                  q: "Can CV services guarantee interviews?",
                  a: "No. CV services improve document presentation but cannot guarantee interviews or employment. These services are optional support.",
                },
              ].map((faq) => (
                <motion.div
                  key={faq.q}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-brand-teal flex-shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of South Africans finding jobs and building
              stronger careers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-white font-semibold rounded-full hover:bg-brand-teal-dark transition-all duration-300 hover:scale-105"
              >
                <Briefcase className="h-5 w-5" />
                Browse Jobs
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/career-tips"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card border border-border text-foreground font-semibold rounded-full hover:bg-accent transition-all"
              >
                <BookOpen className="h-5 w-5" />
                Read Career Tips
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
