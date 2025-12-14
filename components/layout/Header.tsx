"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Briefcase,
  MapPin,
  Grid3X3,
  FileText,
  MessageSquare,
  Search,
  BookOpen,
  Users,
  Target,
  Building2,
  FileCheck,
  PenTool,
  Mail,
  Download,
  ClipboardList,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Linkedin,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

interface NavChild {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

const navigation: NavItem[] = [
  {
    label: "Jobs",
    children: [
      {
        label: "Browse All Jobs",
        href: "/jobs",
        description: "Explore thousands of opportunities across South Africa",
        icon: <Briefcase className="h-5 w-5" />,
      },
      {
        label: "Jobs by Province",
        href: "/jobs/by-province",
        description: "Find jobs in Gauteng, Western Cape, KZN & more",
        icon: <MapPin className="h-5 w-5" />,
      },
      {
        label: "Jobs by Category",
        href: "/jobs/by-category",
        description: "Security, Retail, Admin, Call Centre & more",
        icon: <Grid3X3 className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Career Tips",
    children: [
      {
        label: "CV Guides",
        href: "/career-tips/cv-guides",
        description: "Learn how to write a winning South African CV",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        label: "Interview Guides",
        href: "/career-tips/interview-guides",
        description: "Ace your next interview with expert tips",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        label: "Job Search Guides",
        href: "/career-tips/job-search-guides",
        description: "Proven strategies to land your dream job",
        icon: <Search className="h-5 w-5" />,
      },
      {
        label: "Workplace Guides",
        href: "/career-tips/workplace-guides",
        description: "Thrive in your new role from day one",
        icon: <Building2 className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Free Resources",
    children: [
      {
        label: "CV Samples",
        href: "/free-resources/cv-samples",
        description: "CV templates for any industry",
        icon: <FileCheck className="h-5 w-5" />,
      },
      {
        label: "Cover Letter Samples",
        href: "/free-resources/cover-letter-samples",
        description: "Professional cover letter examples",
        icon: <Mail className="h-5 w-5" />,
      },
      {
        label: "Interview Questions",
        href: "/free-resources/interview-questions",
        description: "Common questions & best answers",
        icon: <HelpCircle className="h-5 w-5" />,
      },
      {
        label: "Career Checklists",
        href: "/free-resources/career-checklists",
        description: "Job search & application checklists",
        icon: <ClipboardList className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "CV Services",
    children: [
      {
        label: "CV Revamp",
        href: "/cv-services/cv-revamp",
        description: "Transform your existing CV into a job magnet",
        icon: <Sparkles className="h-5 w-5" />,
      },
      {
        label: "CV Writing",
        href: "/cv-services/cv-writing",
        description: "Professional CV written from scratch",
        icon: <PenTool className="h-5 w-5" />,
      },
      {
        label: "Cover Letter Writing",
        href: "/cv-services/cover-letter-writing",
        description: "Compelling cover letters that get noticed",
        icon: <Mail className="h-5 w-5" />,
      },
      {
        label: "LinkedIn Optimization",
        href: "/cv-services/linkedin-optimization",
        description: "Get found by recruiters on LinkedIn",
        icon: <Linkedin className="h-5 w-5" />,
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedItems, setMobileExpandedItems] = useState<string[]>([]);

  // Helper to check if a nav item is active
  const isNavItemActive = (item: NavItem): boolean => {
    if (item.href) {
      return pathname === item.href;
    }
    if (item.children) {
      return item.children.some((child) => pathname.startsWith(child.href));
    }
    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileExpanded = (label: string) => {
    setMobileExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      {/* Top Bar */}
      <div className="hidden lg:block bg-brand-navy text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-9 text-sm">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                South Africa&apos;s Career Platform
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy-policy"
                className="hover:text-brand-gold transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="hover:text-brand-gold transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/disclaimer"
                className="hover:text-brand-gold transition-colors"
              >
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Image
                src="/logo-black.png"
                alt="CareerCVPro Logo"
                width={48}
                height={48}
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-brand-gold to-yellow-600 bg-clip-text text-transparent">
                CareerCVPro
              </span>
              <span className="text-[10px] lg:text-xs text-muted-foreground -mt-1 hidden sm:block">
                Your Career, Our Priority
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      "hover:bg-accent hover:text-accent-foreground",
                      isNavItemActive(item) &&
                        "bg-brand-teal text-white hover:bg-brand-teal-dark hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      "hover:bg-accent hover:text-accent-foreground",
                      activeDropdown === item.label &&
                        "bg-accent text-accent-foreground",
                      isNavItemActive(item) &&
                        "bg-gradient-to-r from-brand-teal to-brand-teal-dark text-white hover:from-brand-teal-dark hover:to-brand-teal hover:text-white"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        activeDropdown === item.label && "rotate-180"
                      )}
                    />
                  </button>
                )}

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 p-2",
                        "bg-card rounded-2xl shadow-2xl border border-border",
                        "before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2",
                        "before:border-8 before:border-transparent before:border-b-card"
                      )}
                    >
                      <div className="space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent transition-colors group/item"
                          >
                            <div
                              className={cn(
                                "p-2 rounded-lg transition-colors",
                                isNavItemActive(item)
                                  ? "bg-brand-teal/10 text-brand-teal group-hover/item:bg-brand-teal group-hover/item:text-white"
                                  : "bg-muted text-muted-foreground group-hover/item:bg-primary group-hover/item:text-primary-foreground"
                              )}
                            >
                              {child.icon}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">
                                {child.label}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {child.description}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/cv-services"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-teal to-brand-teal-dark rounded-full hover:shadow-lg hover:shadow-brand-teal/30 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              <span>Get Your CV Done</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-xl text-base font-medium",
                          "hover:bg-accent transition-colors"
                        )}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleMobileExpanded(item.label)}
                          className={cn(
                            "flex items-center justify-between w-full p-3 rounded-xl text-base font-medium",
                            "hover:bg-accent transition-colors",
                            mobileExpandedItems.includes(item.label) &&
                              "bg-accent"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            {item.label}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform duration-200",
                              mobileExpandedItems.includes(item.label) &&
                                "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileExpandedItems.includes(item.label) &&
                            item.children && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 mt-1 space-y-1">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors"
                                    >
                                      <div
                                        className={cn(
                                          "p-2 rounded-lg",
                                          isNavItemActive(item)
                                            ? "bg-brand-teal/10 text-brand-teal"
                                            : "bg-muted text-muted-foreground"
                                        )}
                                      >
                                        {child.icon}
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">
                                          {child.label}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {child.description}
                                        </p>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-4 pt-4 border-t border-border">
                <Link
                  href="/cv-services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full p-4 text-base font-semibold text-white bg-gradient-to-r from-brand-teal to-brand-teal-dark rounded-xl"
                >
                  <Sparkles className="h-5 w-5" />
                  Get Your CV Done Today
                </Link>
              </div>

              {/* Mobile Legal Links */}
              <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-3 text-xs text-muted-foreground">
                <Link href="/privacy-policy" className="hover:text-foreground">
                  Privacy
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-foreground"
                >
                  Terms
                </Link>
                <Link href="/disclaimer" className="hover:text-foreground">
                  Disclaimer
                </Link>
                <Link href="/cookie-policy" className="hover:text-foreground">
                  Cookies
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
