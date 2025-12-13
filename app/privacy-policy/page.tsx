"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Cookie,
  Mail,
  FileText,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Settings,
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

const informationCollected = [
  {
    icon: Mail,
    title: "Contact Information",
    description:
      "Name and contact details when voluntarily submitted through forms",
  },
  {
    icon: FileText,
    title: "Uploaded Documents",
    description: "CVs and other documents only when using our CV services",
  },
  {
    icon: Mail,
    title: "Email Address",
    description: "When subscribing to updates or contacting us",
  },
  {
    icon: Database,
    title: "Usage Data",
    description: "Basic usage data collected via cookies and analytics tools",
  },
];

const howWeUseInfo = [
  "Respond to enquiries and support requests",
  "Provide CV review or writing services (if requested)",
  "Improve website content and user experience",
  "Communicate relevant updates or information",
];

const cookieUses = [
  "Understand how visitors use the site",
  "Improve performance and usability",
  "Display relevant advertisements via Google AdSense",
];

export default function PrivacyPolicyPage() {
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
              <Shield className="h-4 w-4 text-brand-gold" />
              <span>Your Privacy Matters</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Privacy Policy
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-300 mb-4"
            >
              Your privacy is important to us. This Privacy Policy explains how
              we collect, use, and protect your information when you use this
              website.
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

      {/* Information We Collect */}
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
                  <Database className="h-5 w-5 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Information We Collect
                </h2>
              </div>
              <p className="text-muted-foreground">
                We may collect the following information:
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6"
            >
              {informationCollected.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-brand-teal/50 transition-all"
                >
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-brand-teal" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How We Use Your Information */}
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
                  <Eye className="h-5 w-5 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  How We Use Your Information
                </h2>
              </div>
              <p className="text-muted-foreground">
                Information collected is used to:
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <div className="space-y-4">
                {howWeUseInfo.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                    </div>
                    <p className="text-lg">{item}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-xl">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-green-800 dark:text-green-300 font-medium">
                    We do not sell, rent, or trade personal information to third
                    parties.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cookies and Analytics */}
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
                  <Cookie className="h-5 w-5 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Cookies and Analytics
                </h2>
              </div>
              <p className="text-muted-foreground">
                This website uses cookies to:
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="space-y-4">
                  {cookieUses.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                      </div>
                      <p className="text-lg">{item}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted rounded-xl">
                  <div className="flex items-start gap-3">
                    <Settings className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      You may disable cookies in your browser settings if you
                      prefer.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Google AdSense */}
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
                  Google AdSense
                </h2>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <p className="text-muted-foreground mb-6">
                Google may use cookies (including the DoubleClick cookie) to
                display ads based on users&apos; visits to this and other
                websites.
              </p>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-800 dark:text-blue-300 font-medium mb-2">
                      Opt Out of Personalised Advertising
                    </p>
                    <p className="text-blue-700 dark:text-blue-400 text-sm">
                      Users may opt out of personalised advertising by visiting{" "}
                      <a
                        href="https://www.google.com/settings/ads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline"
                      >
                        Google&apos;s Ads Settings
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Data Protection */}
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
                  <Lock className="h-5 w-5 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Data Protection
                </h2>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-brand-navy to-brand-teal-dark rounded-2xl p-8 text-white"
            >
              <p className="text-lg text-gray-300 mb-6">
                We take reasonable steps to protect your personal information.
                However, no online platform can guarantee complete security.
              </p>

              <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                <p className="font-medium">
                  By using this website, you consent to this Privacy Policy.
                </p>
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
              Questions About Privacy?
            </h2>
            <p className="text-muted-foreground mb-8">
              If you have any questions about this Privacy Policy or how we
              handle your data, please don&apos;t hesitate to contact us.
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
