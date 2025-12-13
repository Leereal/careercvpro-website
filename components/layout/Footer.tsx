import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle,
} from "lucide-react";

const footerLinks = {
  jobs: [
    { label: "Browse All Jobs", href: "/jobs" },
    { label: "Jobs by Province", href: "/jobs/by-province" },
    { label: "Jobs by Category", href: "/jobs/by-category" },
  ],
  resources: [
    { label: "CV Samples", href: "/free-resources/cv-samples" },
    {
      label: "Cover Letter Samples",
      href: "/free-resources/cover-letter-samples",
    },
    {
      label: "Interview Questions",
      href: "/free-resources/interview-questions",
    },
    { label: "Career Checklists", href: "/free-resources/career-checklists" },
  ],
  careerTips: [
    { label: "CV Guides", href: "/career-tips/cv-guides" },
    { label: "Interview Guides", href: "/career-tips/interview-guides" },
    { label: "Job Search Guides", href: "/career-tips/job-search-guides" },
    { label: "Workplace Guides", href: "/career-tips/workplace-guides" },
  ],
  services: [
    { label: "CV Revamp", href: "/cv-services/cv-revamp" },
    { label: "CV Writing", href: "/cv-services/cv-writing" },
    {
      label: "Cover Letter Writing",
      href: "/cv-services/cover-letter-writing",
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo-black.png"
                alt="CareerCVPro Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <div>
                <span className="text-xl font-bold text-white">
                  CareerCVPro
                </span>
                <p className="text-xs text-gray-400">
                  Your Career, Our Priority
                </p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-4 max-w-xs">
              We don&apos;t just post jobs — we help South Africans get hired.
              Your career success is our mission.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-brand-teal transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-brand-teal transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-brand-teal transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-brand-teal transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-brand-teal transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Jobs */}
          <div>
            <h3 className="font-semibold mb-4 text-brand-gold">Jobs</h3>
            <ul className="space-y-2">
              {footerLinks.jobs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Tips */}
          <div>
            <h3 className="font-semibold mb-4 text-brand-gold">Career Tips</h3>
            <ul className="space-y-2">
              {footerLinks.careerTips.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-brand-gold">
              Free Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-brand-gold">CV Services</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold mb-4 text-brand-gold">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-teal" />
              <span>South Africa</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-teal" />
              <a
                href="mailto:info@careercvpro.co.za"
                className="hover:text-white"
              >
                info@careercvpro.co.za
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-teal" />
              <a href="tel:+27000000000" className="hover:text-white">
                +27 00 000 0000
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© {currentYear} CareerCVPro. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            We do not charge for job applications. Employers recruit
            independently.
          </p>
        </div>
      </div>
    </footer>
  );
}
