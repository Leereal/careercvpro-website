"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Briefcase,
  FileText,
  Users,
  Sparkles,
  ArrowRight,
  Heart,
  Facebook,
  Bell,
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

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp (Primary)",
    description:
      "Fastest way to reach us - instant responses during business hours",
    contact: "+27 74 920 1395",
    link: "https://wa.me/27749201395",
    linkText: "Start WhatsApp Chat",
    highlight: true,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp (Secondary)",
    description: "Alternative WhatsApp line for CV services inquiries",
    contact: "+27 84 461 3158",
    link: "https://wa.me/27844613158",
    linkText: "Chat on WhatsApp",
    highlight: true,
  },
  {
    icon: Mail,
    title: "Email",
    description:
      "For detailed inquiries, partnerships, or formal communication",
    contact: "info@careercvpro.co.za",
    link: "mailto:info@careercvpro.co.za",
    linkText: "Send Email",
    highlight: false,
  },
  {
    icon: MapPin,
    title: "Location",
    description:
      "Proudly based in South Africa, serving job seekers nationwide",
    contact: "Gauteng, South Africa",
    link: null,
    linkText: null,
    highlight: false,
  },
];

const communityLinks = [
  {
    icon: Facebook,
    title: "Facebook Page",
    description:
      "Follow us for job tips, career advice, and the latest opportunities",
    link: "https://www.facebook.com/careercvpro",
    linkText: "Follow on Facebook",
    color: "blue",
  },
  {
    icon: Bell,
    title: "WhatsApp Job Alerts Group",
    description:
      "Join our community to receive instant job updates and career tips",
    link: "https://chat.whatsapp.com/LfmPek6TI8zCAgRhyP86T3",
    linkText: "Join WhatsApp Group",
    color: "green",
  },
];

const businessHours = [
  { day: "Monday - Friday", hours: "08:00 - 18:00" },
  { day: "Saturday", hours: "09:00 - 14:00" },
  { day: "Sunday & Public Holidays", hours: "Closed" },
];

const inquiryTypes = [
  {
    icon: Briefcase,
    title: "Job Listings",
    description: "Questions about job postings or applying for positions",
  },
  {
    icon: FileText,
    title: "CV Services",
    description: "Inquiries about CV writing, revamps, or cover letters",
  },
  {
    icon: Users,
    title: "Partnerships",
    description: "Recruitment agencies or employer collaboration",
  },
  {
    icon: HelpCircle,
    title: "General Support",
    description: "Any other questions or feedback",
  },
];

const faqs = [
  {
    question: "How quickly will I receive a response?",
    answer:
      "We aim to respond to all WhatsApp messages within 2-4 hours during business hours. Email inquiries are typically answered within 24-48 hours.",
  },
  {
    question: "What are your CV service turnaround times?",
    answer:
      "Standard CV services are completed within 3-5 business days. Express services (within 24-48 hours) are available for an additional fee. Contact us via WhatsApp for urgent requests.",
  },
  {
    question: "Do you offer refunds on CV services?",
    answer:
      "We offer unlimited revisions until you're satisfied with your CV. If you're not happy after the revision process, we'll discuss options on a case-by-case basis.",
  },
  {
    question: "Can you help me find a specific type of job?",
    answer:
      "While we don't offer personalised job matching, our website features thousands of job listings across various industries. Use our search filters to find opportunities that match your skills and location.",
  },
  {
    question: "Do you guarantee employment?",
    answer:
      "No, we do not guarantee employment. We provide job listings and CV services to help you in your job search, but the hiring decision rests with employers.",
  },
  {
    question: "How do I submit my CV for a job listing?",
    answer:
      "Each job listing includes application instructions. Most jobs require you to apply directly through the employer's website or email. We don't collect or forward applications.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format the message for WhatsApp
    const subjectLabels: Record<string, string> = {
      "job-listings": "Job Listings Inquiry",
      "cv-services": "CV Services",
      partnership: "Partnership / Advertising",
      feedback: "Feedback / Suggestion",
      technical: "Technical Issue",
      other: "Other",
    };

    const whatsappMessage = `*New Contact Form Submission*
━━━━━━━━━━━━━━━━━━━━━
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || "Not provided"}
*Subject:* ${subjectLabels[formData.subject] || formData.subject}
━━━━━━━━━━━━━━━━━━━━━
*Message:*
${formData.message}
━━━━━━━━━━━━━━━━━━━━━
_Sent from CareerCVPro Contact Form_`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/27749201395?text=${encodedMessage}`;

    // Small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Reset form after showing success
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
              <Heart className="h-4 w-4 text-brand-gold" />
              <span className="text-white/90 text-sm font-medium">
                We&apos;re Here to Help
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in Touch with{" "}
              <span className="text-brand-gold">CareerCVPro</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Have questions about our services or need assistance with your job
              search? We&apos;re just a message away. Reach out via WhatsApp for
              the fastest response!
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="https://wa.me/27749201395"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us Now
              </a>
              <a
                href="mailto:info@careercvpro.co.za"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
                Send an Email
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

      {/* Contact Methods Section */}
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
              Ways to <span className="text-brand-teal">Reach Us</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the contact method that works best for you. WhatsApp is our
              preferred channel for quick responses.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                  method.highlight
                    ? "bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30 hover:border-green-500/50"
                    : "bg-card border-border hover:border-brand-teal/50"
                }`}
              >
                {method.highlight && (
                  <div className="absolute -top-3 right-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    Recommended
                  </div>
                )}
                <div
                  className={`inline-flex p-3 rounded-xl mb-4 ${
                    method.highlight
                      ? "bg-green-500/20 text-green-600"
                      : "bg-brand-teal/10 text-brand-teal"
                  }`}
                >
                  <method.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {method.description}
                </p>
                <p className="font-medium text-foreground mb-3">
                  {method.contact}
                </p>
                {method.link && (
                  <a
                    href={method.link}
                    target={
                      method.link.startsWith("https") ? "_blank" : undefined
                    }
                    rel={
                      method.link.startsWith("https")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                      method.highlight
                        ? "text-green-600 hover:text-green-700"
                        : "text-brand-teal hover:text-brand-teal-dark"
                    }`}
                  >
                    {method.linkText}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-navy/5 to-brand-teal/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our <span className="text-brand-gold">Community</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay connected and never miss a job opportunity! Follow us on
              social media and join our WhatsApp group for instant updates.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {communityLinks.map((community, index) => (
              <motion.a
                key={index}
                href={community.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className={`relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group ${
                  community.color === "blue"
                    ? "bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/30 hover:border-blue-500/50"
                    : "bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30 hover:border-green-500/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-4 rounded-2xl ${
                      community.color === "blue"
                        ? "bg-blue-500/20 text-blue-600"
                        : "bg-green-500/20 text-green-600"
                    }`}
                  >
                    <community.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2">
                      {community.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {community.description}
                    </p>
                    <span
                      className={`inline-flex items-center gap-2 font-semibold ${
                        community.color === "blue"
                          ? "text-blue-600 group-hover:text-blue-700"
                          : "text-green-600 group-hover:text-green-700"
                      }`}
                    >
                      {community.linkText}
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
                <div
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${
                    community.color === "blue"
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {community.color === "blue" ? "Follow Us" : "Join Free"}
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-muted-foreground mt-8"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            🔔 Get instant job alerts, career tips, and exclusive resources
            delivered straight to you!
          </motion.p>
        </div>
      </section>

      {/* Business Hours & Inquiry Types */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Business Hours */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-teal/10 rounded-xl">
                  <Clock className="h-6 w-6 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Business Hours
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Our team is available during these hours. WhatsApp messages
                received outside business hours will be responded to on the next
                business day.
              </p>
              <div className="bg-card rounded-2xl border overflow-hidden">
                {businessHours.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-4 ${
                      index !== businessHours.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <span className="font-medium">{item.day}</span>
                    <span
                      className={`${
                        item.hours === "Closed"
                          ? "text-red-500"
                          : "text-brand-teal font-semibold"
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                * All times are in South African Standard Time (SAST/CAT)
              </p>
            </motion.div>

            {/* Inquiry Types */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-gold/10 rounded-xl">
                  <Sparkles className="h-6 w-6 text-brand-gold" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  How Can We Help?
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Let us know what you need assistance with so we can direct you
                to the right team member.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {inquiryTypes.map((type, index) => (
                  <div
                    key={index}
                    className="p-4 bg-card rounded-xl border hover:border-brand-teal/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-brand-teal/10 rounded-lg">
                        <type.icon className="h-5 w-5 text-brand-teal" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{type.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Send Us a <span className="text-brand-teal">Message</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Fill out the form below and click send. Your message will be
                formatted and sent directly via WhatsApp for a faster response.
              </p>
            </motion.div>

            <motion.div
              className="bg-card rounded-2xl border p-8 lg:p-10"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-6">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Ready!</h3>
                  <p className="text-muted-foreground">
                    WhatsApp should have opened with your message. Just tap send
                    to complete!
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Didn&apos;t open?{" "}
                    <a
                      href="https://wa.me/27749201395"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-teal hover:underline"
                    >
                      Click here to message us directly
                    </a>
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2"
                      >
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal transition-all"
                        placeholder="+27 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="job-listings">
                          Job Listings Inquiry
                        </option>
                        <option value="cv-services">CV Services</option>
                        <option value="partnership">
                          Partnership / Advertising
                        </option>
                        <option value="feedback">Feedback / Suggestion</option>
                        <option value="technical">Technical Issue</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4">
                    <p className="text-sm text-muted-foreground">
                      * Required fields. Opens WhatsApp to send.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Preparing...
                        </>
                      ) : (
                        <>
                          <MessageCircle className="h-5 w-5" />
                          Send via WhatsApp
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

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
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find quick answers to common questions. Can&apos;t find what
              you&apos;re looking for? Contact us directly!
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
                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                )}
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
                Ready to Start Your Job Search?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Browse thousands of job opportunities across South Africa or let
                us help you create a professional CV that gets results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/jobs"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold hover:bg-yellow-500 text-brand-navy font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Briefcase className="h-5 w-5" />
                  Browse Jobs
                </a>
                <a
                  href="/cv-services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300"
                >
                  <FileText className="h-5 w-5" />
                  CV Services
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
