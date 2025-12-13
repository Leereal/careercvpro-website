"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Mail,
  MapPin,
  Briefcase,
  CheckCircle,
  Loader2,
} from "lucide-react";

const provinces = [
  { value: "all", label: "All Provinces" },
  { value: "gauteng", label: "Gauteng" },
  { value: "western-cape", label: "Western Cape" },
  { value: "kwazulu-natal", label: "KwaZulu-Natal" },
  { value: "eastern-cape", label: "Eastern Cape" },
  { value: "limpopo", label: "Limpopo" },
  { value: "mpumalanga", label: "Mpumalanga" },
  { value: "north-west", label: "North West" },
  { value: "free-state", label: "Free State" },
  { value: "northern-cape", label: "Northern Cape" },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "security", label: "Security" },
  { value: "retail", label: "Retail & Sales" },
  { value: "admin", label: "Admin & Office" },
  { value: "call-centre", label: "Call Centre" },
  { value: "driver", label: "Driving & Logistics" },
  { value: "hospitality", label: "Hospitality" },
  { value: "healthcare", label: "Healthcare" },
  { value: "it", label: "IT & Technology" },
  { value: "finance", label: "Finance & Accounting" },
  { value: "construction", label: "Construction & Trades" },
  { value: "government", label: "Government" },
  { value: "learnerships", label: "Learnerships" },
  { value: "internships", label: "Internships" },
];

interface JobAlertSignupProps {
  variant?: "inline" | "card" | "banner";
  defaultProvince?: string;
  defaultCategory?: string;
}

export function JobAlertSignup({
  variant = "card",
  defaultProvince = "all",
  defaultCategory = "all",
}: JobAlertSignupProps) {
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState(defaultProvince);
  const [category, setCategory] = useState(defaultCategory);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - replace with actual API endpoint
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For now, we'll just show success - integrate with your email service later
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${
          variant === "banner"
            ? "bg-green-500 text-white py-4"
            : "bg-green-50 border border-green-200 rounded-2xl p-6"
        }`}
      >
        <div className="flex items-center justify-center gap-3">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <div>
            <p
              className={`font-semibold ${
                variant === "banner" ? "text-white" : "text-green-800"
              }`}
            >
              You're subscribed!
            </p>
            <p
              className={`text-sm ${
                variant === "banner" ? "text-green-100" : "text-green-600"
              }`}
            >
              We'll notify you when new jobs match your preferences.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "banner") {
    return (
      <div className="bg-gradient-to-r from-brand-navy to-brand-navy-light py-4">
        <div className="container mx-auto px-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <div className="flex items-center gap-2 text-white">
              <Bell className="h-5 w-5 text-brand-gold" />
              <span className="font-medium">Get Job Alerts:</span>
            </div>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
            >
              {provinces.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-brand-teal hover:bg-brand-teal-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
          {error && (
            <p className="text-red-300 text-sm text-center mt-2">{error}</p>
          )}
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-brand-teal hover:bg-brand-teal-dark text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 inline-flex items-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Bell className="h-5 w-5" />
              Get Alerts
            </>
          )}
        </button>
        {error && <p className="w-full text-red-500 text-sm">{error}</p>}
      </form>
    );
  }

  // Card variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-2xl p-8 text-white"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-brand-teal/20 rounded-xl flex items-center justify-center">
          <Bell className="h-6 w-6 text-brand-teal" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Get Job Alerts</h3>
          <p className="text-gray-300 text-sm">
            Be first to know about new opportunities
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Province</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-brand-teal appearance-none cursor-pointer"
              >
                {provinces.map((p) => (
                  <option
                    key={p.value}
                    value={p.value}
                    className="text-brand-navy"
                  >
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Category</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-brand-teal appearance-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option
                    key={c.value}
                    value={c.value}
                    className="text-brand-navy"
                  >
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && <p className="text-red-300 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Bell className="h-5 w-5" />
              Subscribe to Job Alerts
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </form>
    </motion.div>
  );
}
