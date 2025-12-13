"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Briefcase,
  FileText,
  ExternalLink,
  XCircle,
  CheckCircle2,
  Shield,
  Mail,
  AlertCircle,
  Info,
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

const noGuaranteePoints = [
  "We do not guarantee job placement or employment outcomes",
  "Employers and organisations recruit independently",
  "Applying for a job through information shared on this website does not ensure selection or hiring",
];

const liabilityPoints = [
  "Employment outcomes",
  "Employer decisions",
  "Losses resulting from reliance on website content",
];

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-navy via-[#1a3a5c] to-brand-teal-dark overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full text-sm mb-6 border border-amber-500/30"
            >
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>Important Information</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Disclaimer
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-300 mb-4"
            >
              This website provides job listings, career information, and
              educational content for general informational purposes only.
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

      {/* Important Notice */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="p-6 md:p-8 bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-800 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-2">
                    Key Points to Understand
                  </h3>
                  <ul className="space-y-2 text-amber-700 dark:text-amber-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      We do not charge for job applications
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      Employers recruit independently
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      No employment guarantees are made
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* No Employment Guarantee */}
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
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  No Employment Guarantee
                </h2>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <div className="space-y-4">
                {noGuaranteePoints.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mt-0.5">
                      <XCircle className="h-4 w-4 text-red-500" />
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
              <p className="text-muted-foreground text-lg mb-6">
                Job information is sourced from publicly available platforms or
                submitted by third parties. While we aim to keep information
                accurate and up to date, we do not guarantee the completeness or
                accuracy of all listings.
              </p>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-800 dark:text-blue-300 font-medium">
                    Users are encouraged to verify job details directly with the
                    employer.
                  </p>
                </div>
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
                  <FileText className="h-5 w-5 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">CV Services</h2>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <p className="text-muted-foreground text-lg">
                CV review and writing services are offered as optional support
                services. These services improve document presentation but do
                not guarantee interviews or employment.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* External Links */}
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
                  <ExternalLink className="h-5 w-5 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  External Links
                </h2>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <p className="text-muted-foreground text-lg">
                This website may contain links to external websites. We are not
                responsible for the content, policies, or practices of
                third-party sites.
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
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Limitation of Liability
                </h2>
              </div>

              <p className="text-gray-300 text-lg mb-6">
                By using this website, you agree that the owners are not liable
                for any loss or damages arising from reliance on the information
                provided, including but not limited to:
              </p>

              <div className="space-y-3">
                {liabilityPoints.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-brand-gold flex-shrink-0" />
                    <p className="text-lg">{point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Questions About This Disclaimer?
            </h2>
            <p className="text-muted-foreground mb-8">
              If you have any questions about this Disclaimer, please contact
              us.
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
