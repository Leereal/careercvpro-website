"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Globe,
  Briefcase,
  PenTool,
  Shield,
  Scale,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Mail,
  AlertCircle,
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

const websiteUsePoints = [
  "Content is provided for informational and educational purposes only",
  "You agree not to misuse, copy, or redistribute content without permission",
  "You may not use the site for unlawful or fraudulent activities",
];

const jobListingsPoints = [
  "Job listings are shared to assist job seekers",
  "We do not act as an employer or recruitment agency unless stated",
  "Responsibility for applications lies solely with the user",
];

const cvServicesPoints = [
  "CV services are provided based on information supplied by the user",
  "Users are responsible for ensuring submitted information is accurate",
  "Payments for services (where applicable) are non-refundable once work has begun",
];

const notResponsibleFor = [
  "Employment outcomes",
  "Employer decisions",
  "Losses resulting from reliance on website content",
];

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-navy via-[#1a3a5c] to-brand-teal-dark overflow-hidden">
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

        <div className="container mx-auto px-4 relative z-10">
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
              <FileText className="h-4 w-4 text-brand-gold" />
              <span>Legal Agreement</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Terms and Conditions
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-300 mb-4"
            >
              By accessing and using this website, you agree to the following
              terms and conditions.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-sm text-gray-400">
              Last updated: December 2024
            </motion.p>
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

      {/* Use of Website */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                  <Globe className="h-5 w-5 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Use of Website
                </h2>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <div className="space-y-4">
                {websiteUsePoints.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                    </div>
                    <p className="text-lg">{point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Job Listings</h2>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <div className="space-y-4">
                {jobListingsPoints.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                    </div>
                    <p className="text-lg">{point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CV Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                  <PenTool className="h-5 w-5 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">CV Services</h2>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <div className="space-y-4 mb-6">
                {cvServicesPoints.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                    </div>
                    <p className="text-lg">{point}</p>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-800 dark:text-amber-300 font-medium">
                    Payments for services are non-refundable once work has
                    begun.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intellectual Property */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                  <Shield className="h-5 w-5 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Intellectual Property
                </h2>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <p className="text-muted-foreground text-lg">
                All content on this website, including text and layout, is
                protected by applicable intellectual property laws and may not
                be reproduced without permission.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Limitation of Liability */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-brand-navy to-brand-teal-dark rounded-2xl p-8 md:p-12 text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Scale className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Limitation of Liability
                </h2>
              </div>

              <p className="text-gray-300 text-lg mb-6">
                We are not responsible for:
              </p>

              <div className="space-y-3">
                {notResponsibleFor.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                      <XCircle className="h-4 w-4 text-red-400" />
                    </div>
                    <p className="text-lg">{point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Changes to Terms */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Changes to Terms
                </h2>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <p className="text-muted-foreground text-lg">
                We reserve the right to update these terms at any time.
                Continued use of the website constitutes acceptance of any
                changes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-muted-foreground mb-8">
              If you have any questions about these Terms and Conditions, please
              contact us.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-teal text-white font-semibold rounded-full hover:bg-brand-teal-dark transition-all duration-300 hover:scale-105"
            >
              <Mail className="h-5 w-5" />
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
