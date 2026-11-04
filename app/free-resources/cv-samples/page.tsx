"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  CheckCircle,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Lightbulb,
  Briefcase,
  Monitor,
  Building2,
  Stethoscope,
  Calculator,
  Users,
  Hammer,
  X,
  ZoomIn,
  FileText,
  Gift,
  Smartphone,
  Laptop,
  PenLine,
  Send,
  Clock,
  Phone,
  Camera,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePlausible } from "next-plausible";
import {
  freeCVTemplates,
  cvTemplateFaqs,
  cvWritingTips,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  type FreeCVTemplate,
  type TemplateFormat,
} from "@/lib/cv-templates";

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

const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const generalHelpMessage =
  "Hi CareerCVPro! I saw your free CV templates and I'd like help with my CV.";

const fillTemplateMessage = (name: string) =>
  `Hi CareerCVPro! I like the free "${name}" CV template. Can you fill it in with my details for me?`;

const formatLabel: Record<TemplateFormat, string> = {
  word: "Word",
  pdf: "PDF",
};

const fileExt: Record<TemplateFormat, string> = {
  word: ".docx",
  pdf: ".pdf",
};

// Designs our writers use for paid orders (shown as "done-for-you" options).
const professionalDesigns = [
  {
    id: "modern-sidebar",
    name: "Modern Sidebar",
    image: "/img1.png",
    bestFor: "IT, marketing, project managers & consultants",
  },
  {
    id: "classic-professional",
    name: "Classic Professional",
    image: "/img2.png",
    bestFor: "Finance, legal, government & senior roles",
  },
  {
    id: "creative-photo",
    name: "Creative with Photo",
    image: "/img3.png",
    bestFor: "Sales, hospitality & customer-facing roles",
  },
  {
    id: "modern-compact",
    name: "Modern Compact",
    image: "/img4.png",
    bestFor: "Experienced professionals & technical roles",
  },
];

const industryGuides = [
  {
    icon: Monitor,
    industry: "IT & Technology",
    template: "Teal Grid Minimal",
    tips: [
      "List programming languages and frameworks prominently",
      "Include GitHub/portfolio links",
      "Mention specific projects and their impact",
      "Use technical keywords from job descriptions",
    ],
  },
  {
    icon: Calculator,
    industry: "Finance & Accounting",
    template: "Burgundy Classic",
    tips: [
      "Highlight professional certifications (CA, CIMA, etc.)",
      "Include software proficiency (Sage, SAP, Pastel)",
      "Quantify achievements with Rand values",
      "Mention compliance and regulatory knowledge",
    ],
  },
  {
    icon: Stethoscope,
    industry: "Healthcare",
    template: "Emerald Sidebar",
    tips: [
      "Display SANC/HPCSA registration number prominently",
      "List all certifications (BLS, ACLS, etc.)",
      "Include department experience and patient load",
      "Highlight specialisations and training",
    ],
  },
  {
    icon: Building2,
    industry: "Administration",
    template: "Emerald Sidebar",
    tips: [
      "Showcase Microsoft Office proficiency",
      "Highlight organisational and multitasking abilities",
      "Include document processing metrics",
      "Mention diary management experience",
    ],
  },
  {
    icon: Users,
    industry: "Sales & Retail",
    template: "Slate & Orange Infographic",
    tips: [
      "Lead with sales targets and achievements",
      "Include customer satisfaction scores",
      "Highlight product knowledge areas",
      "Mention team leadership experience",
    ],
  },
  {
    icon: Hammer,
    industry: "Construction & Trades",
    template: "Slate & Orange Infographic",
    tips: [
      "Include trade certificate numbers",
      "List safety certifications and OHSA knowledge",
      "Mention equipment and machinery expertise",
      "Highlight major project completions",
    ],
  },
];

const howToSteps = [
  {
    icon: Download,
    title: "Download a template",
    description:
      "Pick the design that suits your industry and tap Download. No sign-up needed.",
  },
  {
    icon: PenLine,
    title: "Replace the sample details",
    description:
      "Each template shows a sample CV for 'Thandiwe Mokoena'. Swap in your name, contacts, experience and education.",
  },
  {
    icon: Sparkles,
    title: "Tailor it to the job",
    description:
      "Mirror keywords from the job advert in your profile and skills. Delete sections you don't need.",
  },
  {
    icon: Send,
    title: "Save as PDF & apply",
    description:
      "Save with a clear file name like 'Thandiwe-Mokoena-CV.pdf' and send it with a cover letter.",
  },
];

function FormatBadge({ format }: { format: TemplateFormat }) {
  return format === "word" ? (
    <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
      <FileText className="h-3 w-3" />
      Word · Editable
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
      <FileText className="h-3 w-3" />
      PDF Design
    </span>
  );
}

function SectionHeading({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-12">
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 ${
          light ? "text-white" : "text-brand-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl mx-auto ${
            light ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function CVSamplesPage() {
  const plausible = usePlausible();
  const [filter, setFilter] = useState<"all" | TemplateFormat>("all");
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const visibleTemplates =
    filter === "all"
      ? freeCVTemplates
      : freeCVTemplates.filter((t) => t.format === filter);

  const selected = previewIndex === null ? null : visibleTemplates[previewIndex];

  const counts = {
    all: freeCVTemplates.length,
    word: freeCVTemplates.filter((t) => t.format === "word").length,
    pdf: freeCVTemplates.filter((t) => t.format === "pdf").length,
  };

  const trackDownload = (t: FreeCVTemplate, placement: string) => {
    plausible("CV Template Download", {
      props: { template: t.name, format: formatLabel[t.format], placement },
    });
  };

  const closePreview = useCallback(() => setPreviewIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setPreviewIndex((i) =>
        i === null
          ? i
          : (i + delta + visibleTemplates.length) % visibleTemplates.length,
      ),
    [visibleTemplates.length],
  );

  // Keyboard navigation + lock background scroll while the preview is open.
  useEffect(() => {
    if (previewIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [previewIndex, closePreview, step]);

  const heroPreviews = [
    freeCVTemplates.find((t) => t.slug === "emerald-sidebar")!,
    freeCVTemplates.find((t) => t.slug === "aurora-gradient-modern")!,
    freeCVTemplates.find((t) => t.slug === "rose-creative-sidebar")!,
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-[#24466f] to-brand-navy py-16 lg:py-20 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-teal/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 bg-brand-teal/20 text-teal-300 px-4 py-2 rounded-full text-sm font-medium">
                  <Gift className="h-4 w-4" />
                  100% Free · Updated for 2026
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Free CV Templates{" "}
                <span className="text-brand-teal">to Download Today</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                {freeCVTemplates.length} modern, professionally designed CV
                templates for South African job seekers. Preview them right
                here, download in Word or PDF, and start applying. No sign-up,
                no payment.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
              >
                <a
                  href="#templates"
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white px-7 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
                >
                  <Eye className="h-5 w-5" />
                  Browse Free Templates
                </a>
                <a
                  href={waLink(generalHelpMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-7 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
                >
                  <MessageSquare className="h-5 w-5" />
                  Let Us Fill It In
                </a>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-gray-300"
              >
                {[
                  `${freeCVTemplates.length} free designs`,
                  "Editable Word (.docx)",
                  "Print-ready A4",
                  "No sign-up or watermark",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-teal" />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Fanned template previews */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative h-[340px] sm:h-[420px] lg:h-[500px] hidden sm:block"
            >
              {heroPreviews.map((t, i) => {
                const pos = [
                  "left-[6%] top-10 -rotate-6 z-10",
                  "left-1/2 -translate-x-1/2 top-0 z-20",
                  "right-[6%] top-10 rotate-6 z-10",
                ][i];
                return (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => {
                      setFilter("all");
                      setPreviewIndex(
                        freeCVTemplates.findIndex((x) => x.slug === t.slug),
                      );
                    }}
                    className={`absolute ${pos} w-[42%] max-w-[260px] aspect-[210/297] rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/20 hover:z-30 hover:scale-105 transition-transform`}
                    aria-label={`Preview the ${t.name} template`}
                  >
                    <Image
                      src={t.previews[0]}
                      alt={`${t.name} free CV template preview`}
                      fill
                      priority
                      sizes="260px"
                      className="object-cover object-top"
                    />
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Free Templates Gallery */}
      <section id="templates" className="py-16 bg-gray-50 scroll-mt-28">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              title="Free CV Template Gallery"
              subtitle="Scroll to preview every template. Tap one to see it full size, then download it free in Word or PDF."
            />

            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {(
                [
                  ["all", "All templates"],
                  ["word", "Word (editable)"],
                  ["pdf", "PDF designs"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors border ${
                    filter === key
                      ? "bg-brand-navy text-white border-brand-navy"
                      : "bg-white text-brand-navy border-gray-200 hover:border-brand-navy"
                  }`}
                >
                  {label}{" "}
                  <span
                    className={
                      filter === key ? "text-teal-300" : "text-gray-400"
                    }
                  >
                    ({counts[key]})
                  </span>
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleTemplates.map((template, index) => (
                <motion.article
                  key={template.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  {/* Preview */}
                  <button
                    type="button"
                    onClick={() => setPreviewIndex(index)}
                    className="relative block w-full bg-gradient-to-b from-slate-100 to-slate-50 px-5 pt-12 pb-5 border-b border-gray-100 cursor-zoom-in"
                    aria-label={`Preview the ${template.name} CV template`}
                  >
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <FormatBadge format={template.format} />
                      <span className="bg-white text-brand-navy text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                        {template.pages} {template.pages === 1 ? "page" : "pages"}
                      </span>
                    </div>
                    <div className="relative aspect-[210/297] rounded-md overflow-hidden bg-white shadow-md ring-1 ring-black/5 group-hover:-translate-y-1 group-hover:shadow-xl transition-all duration-300">
                      <Image
                        src={template.previews[0]}
                        alt={`${template.name} free CV template, ${template.style.toLowerCase()} style`}
                        fill
                        sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 28vw, (min-width: 640px) 42vw, 85vw"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                        <span className="inline-flex items-center gap-2 bg-white text-brand-navy px-4 py-2 rounded-lg font-semibold text-sm shadow">
                          <ZoomIn className="h-4 w-4" />
                          Preview full size
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: template.accent }}
                      />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {template.style}
                      </span>
                    </div>
                    <h3 className="font-bold text-brand-navy text-lg mb-1">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {template.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {template.bestFor.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="bg-brand-teal/10 text-brand-teal-dark text-xs px-2 py-0.5 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewIndex(index)}
                          className="inline-flex items-center justify-center gap-1.5 border border-gray-200 hover:border-brand-navy text-brand-navy px-3 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          Preview
                        </button>
                        <a
                          href={template.file}
                          download={template.downloadName}
                          onClick={() => trackDownload(template, "card")}
                          className="inline-flex items-center justify-center gap-1.5 bg-brand-teal hover:bg-brand-teal-dark text-white px-3 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          {fileExt[template.format]}
                        </a>
                      </div>
                      <a
                        href={waLink(fillTemplateMessage(template.name))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 text-green-700 hover:text-green-800 text-sm font-medium"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Have us fill it in for you
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
              Free for personal use. Word templates open in Microsoft Word,
              Google Docs and WPS Office. PDF designs are print-ready A4 and
              can be edited in Word, Canva or Adobe Acrobat.
            </p>
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      <AnimatePresence>
        {selected && previewIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[60] flex items-center justify-center md:p-6"
            onClick={closePreview}
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.name} CV template preview`}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-white w-full h-full md:h-[92vh] md:max-w-6xl md:rounded-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 md:px-6 py-3">
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-brand-navy truncate">
                    {selected.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Template {previewIndex + 1} of {visibleTemplates.length}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Previous template"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Next template"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={closePreview}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-1"
                    aria-label="Close preview"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto md:overflow-hidden md:grid md:grid-cols-[1fr_380px]">
                {/* Pages */}
                <div className="bg-gray-100 p-4 md:p-8 md:overflow-y-auto">
                  <div className="max-w-[620px] mx-auto space-y-6">
                    {selected.previews.map((src, i) => (
                      <div key={src}>
                        {selected.pages > 1 && (
                          <p className="text-xs font-medium text-gray-500 mb-2">
                            Page {i + 1} of {selected.pages}
                          </p>
                        )}
                        <Image
                          src={src}
                          alt={`${selected.name} CV template, page ${i + 1}`}
                          width={1241}
                          height={1754}
                          sizes="(min-width: 768px) 620px, 100vw"
                          className="w-full h-auto rounded-md shadow-lg bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 md:overflow-y-auto space-y-6 pb-28 md:pb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <FormatBadge format={selected.format} />
                      <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {selected.pages}{" "}
                        {selected.pages === 1 ? "page" : "pages"} · A4
                      </span>
                      {selected.hasPhoto && (
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                          <Camera className="h-3 w-3" />
                          Photo
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{selected.description}</p>
                  </div>

                  <div className="hidden md:block">
                    <a
                      href={selected.file}
                      download={selected.downloadName}
                      onClick={() => trackDownload(selected, "preview")}
                      className="w-full inline-flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white px-6 py-3.5 rounded-xl font-semibold transition-colors"
                    >
                      <Download className="h-5 w-5" />
                      Download Free ({formatLabel[selected.format]}{" "}
                      {fileExt[selected.format]})
                    </a>
                  </div>

                  <div>
                    <h4 className="font-semibold text-brand-navy mb-3">
                      Best for
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.bestFor.map((item) => (
                        <span
                          key={item}
                          className="bg-brand-teal/10 text-brand-teal-dark text-sm px-3 py-1 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-brand-navy mb-3">
                      What&apos;s included
                    </h4>
                    <ul className="space-y-2">
                      {selected.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-gray-600 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      <li className="flex items-start gap-2 text-gray-600 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Fonts: {selected.fonts}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <h4 className="font-semibold text-brand-navy mb-1 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-brand-gold" />
                      How to edit
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selected.format === "word"
                        ? "Open the .docx in Microsoft Word, Google Docs or the free WPS Office app, then type over the sample details."
                        : "Open the PDF in Microsoft Word (File → Open) to convert it into an editable document, then check the layout. Canva and Adobe Acrobat also work."}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="font-semibold text-brand-navy mb-1">
                      No time to fill it in?
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Send us your old CV or your details. Our writers will
                      rewrite and format your CV in the{" "}
                      <strong>{selected.name}</strong> design for just{" "}
                      <strong>R80</strong>, usually the same day.
                    </p>
                    <a
                      href={waLink(fillTemplateMessage(selected.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      <MessageSquare className="h-5 w-5" />
                      WhatsApp Us: {WHATSAPP_DISPLAY}
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile action bar */}
              <div className="md:hidden border-t border-gray-100 bg-white p-3 grid grid-cols-2 gap-2">
                <a
                  href={selected.file}
                  download={selected.downloadName}
                  onClick={() => trackDownload(selected, "preview-mobile")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white px-4 py-3 rounded-xl font-semibold text-sm"
                >
                  <Download className="h-4 w-4" />
                  Download {fileExt[selected.format]}
                </a>
                <a
                  href={waLink(fillTemplateMessage(selected.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-xl font-semibold text-sm"
                >
                  <MessageSquare className="h-4 w-4" />
                  Fill it for me
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Band */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <SectionHeading
                title="Love a Template but Short on Time?"
                subtitle="Our CV writers can do the work for you. Message us on WhatsApp and we'll get started straight away."
              />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: FileCheck,
                  title: "We fill in your template",
                  price: "R80",
                  text: "Send your old CV or details plus the template you like. We rewrite it professionally and format it in that design.",
                  cta: "Fill in my template",
                  href: waLink(
                    "Hi CareerCVPro! I'd like you to put my CV into one of your templates.",
                  ),
                  external: true,
                },
                {
                  icon: Sparkles,
                  title: "Professional CV writing",
                  price: "R80",
                  text: "No CV yet, or yours is outdated? We write a brand-new, ATS-optimised CV from scratch using one of our professional designs.",
                  cta: "See CV writing",
                  href: "/cv-services/cv-writing",
                  external: false,
                },
                {
                  icon: Briefcase,
                  title: "CV + Cover Letter combo",
                  price: "R100",
                  text: "Get your CV and a tailored cover letter for the job you're applying for, ready to send.",
                  cta: "See cover letters",
                  href: "/cv-services/cover-letter-writing",
                  external: false,
                },
              ].map((option) => {
                const className =
                  "mt-auto inline-flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navy/90 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors";
                return (
                  <motion.div
                    key={option.title}
                    variants={fadeInUp}
                    className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                        <option.icon className="h-6 w-6 text-brand-teal" />
                      </div>
                      <span className="text-2xl font-bold text-brand-navy">
                        {option.price}
                      </span>
                    </div>
                    <h3 className="font-bold text-brand-navy text-lg mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">{option.text}</p>
                    {option.external ? (
                      <a
                        href={option.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        <MessageSquare className="h-4 w-4" />
                        {option.cta}
                      </a>
                    ) : (
                      <Link href={option.href} className={className}>
                        {option.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-600"
            >
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-teal" />
                Same-day delivery
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-brand-teal" />
                Unlimited revisions
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-teal" />
                WhatsApp {WHATSAPP_DISPLAY}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How to use */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <SectionHeading
                title="How to Use Your Free CV Template"
                subtitle="From download to job application in four simple steps"
              />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {howToSteps.map((s, i) => (
                <motion.div
                  key={s.title}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative"
                >
                  <span className="absolute top-4 right-5 text-4xl font-bold text-gray-100">
                    {i + 1}
                  </span>
                  <div className="w-11 h-11 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-4">
                    <s.icon className="h-5 w-5 text-brand-teal" />
                  </div>
                  <h3 className="font-semibold text-brand-navy mb-2">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{s.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-brand-navy">
                    Word templates (.docx)
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Fully editable. Open in Microsoft Word, Google Docs or WPS
                  Office and type over the sample text. Best if you want to
                  update your CV yourself for every application.
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Laptop className="h-5 w-5 text-rose-600" />
                  <h3 className="font-semibold text-brand-navy">
                    PDF designs (.pdf)
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Design-led and print-ready. Edit by opening the PDF in
                  Microsoft Word (File → Open), Canva or Adobe Acrobat, then
                  check the layout. Or let us fill it in for you.
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-brand-navy">
                    Only have a phone?
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Use the free Microsoft Word, WPS Office or Google Docs app
                  to edit the Word templates. Stuck? WhatsApp us on{" "}
                  <a
                    href={waLink(generalHelpMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 font-semibold underline"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>{" "}
                  and we&apos;ll help.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional (done-for-you) designs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-brand-gold/10 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="h-4 w-4" />
                Done-for-you
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Our Professional CV Designs
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Prefer to have an expert write it? These are some of the
                designs our writers use for client CVs. Pick one and
                we&apos;ll write your CV in it for R80.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {professionalDesigns.map((design) => (
                <motion.div
                  key={design.id}
                  variants={fadeInUp}
                  className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow flex flex-col"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <Image
                      src={design.image}
                      alt={`${design.name} professional CV design`}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-brand-gold text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                        Done for you · R80
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-brand-navy text-lg mb-1">
                      {design.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Best for {design.bestFor}
                    </p>
                    <a
                      href={waLink(
                        `Hi CareerCVPro! I'd like my CV written in your "${design.name}" design. Can you help?`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Get this design
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry-Specific Tips */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <SectionHeading
                title="Industry-Specific CV Tips"
                subtitle="What to include in your CV, and which free template to start with, based on your industry"
              />
            </motion.div>

            <div className="space-y-4">
              {industryGuides.map((guide) => (
                <motion.div
                  key={guide.industry}
                  variants={fadeInUp}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedIndustry(
                        expandedIndustry === guide.industry
                          ? null
                          : guide.industry,
                      )
                    }
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center">
                        <guide.icon className="h-5 w-5 text-brand-teal" />
                      </div>
                      <span className="font-semibold text-brand-navy">
                        {guide.industry}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                        expandedIndustry === guide.industry ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedIndustry === guide.industry && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 border-t border-gray-100">
                          <ul className="pt-4 space-y-3">
                            {guide.tips.map((tip) => (
                              <li
                                key={tip}
                                className="flex items-start gap-3 text-gray-600"
                              >
                                <CheckCircle className="h-5 w-5 text-brand-teal flex-shrink-0 mt-0.5" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                          <button
                            type="button"
                            onClick={() => {
                              setFilter("all");
                              setPreviewIndex(
                                freeCVTemplates.findIndex(
                                  (t) => t.name === guide.template,
                                ),
                              );
                            }}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-teal hover:underline"
                          >
                            Suggested free template: {guide.template}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CV Writing Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <SectionHeading
                title="CV Writing Best Practices"
                subtitle="Essential tips for filling in your template and creating a winning CV in South Africa"
              />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cvWritingTips.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  variants={fadeInUp}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                >
                  <div className="w-8 h-8 bg-brand-gold/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-brand-gold font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-brand-navy mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ATS Explanation Section */}
      <section className="py-16 bg-brand-navy">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <SectionHeading
                title="What is ATS & Why Does It Matter?"
                light
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Applicant Tracking Systems (ATS)
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Many large South African employers and recruitment
                    agencies use ATS software to screen CVs before a person
                    ever reads them. These systems scan for keywords, section
                    headings and structure.
                  </p>
                  <p className="text-gray-300">
                    If the system can&apos;t read your CV properly, it may be
                    filtered out, even if you&apos;re perfectly qualified for
                    the job.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    How to Get Through ATS
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Use standard headings (Profile, Experience, Education, Skills). All our templates do",
                      "Copy keywords from the job advert into your profile and skills",
                      "Applying mostly through online portals? Pick a cleaner layout like Burgundy Classic or Teal Grid Minimal",
                      "Save in the format the job advert asks for (.docx or PDF)",
                      "Want to be sure? Ask us for an ATS-friendly version",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <CheckCircle className="h-5 w-5 text-brand-teal flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about our free CV templates"
            />
            <div className="space-y-3">
              {cvTemplateFaqs.map((faq, i) => (
                <div
                  key={faq.question}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
                    aria-expanded={expandedFaq === i}
                  >
                    <span className="font-semibold text-brand-navy">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                        expandedFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {/* Kept in the DOM (hidden) so search engines can read every answer */}
                  <div
                    className={`px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4 ${
                      expandedFaq === i ? "block" : "hidden"
                    }`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
              Need Help With Your CV? Talk to Us.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-teal-100 mb-8"
            >
              Send us your details on WhatsApp and our writers will fill in
              any free template on this page, or write you a brand-new CV in
              one of our professional designs. Just R80, delivered same day.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={waLink(generalHelpMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-teal hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              >
                <MessageSquare className="h-5 w-5" />
                Chat on WhatsApp
              </a>
              <Link
                href="/cv-services"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all"
              >
                View All CV Services
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-teal-100 text-sm mt-6"
            >
              WhatsApp or call:{" "}
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="underline font-semibold"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brand-navy mb-8">
              Related Resources
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                ["/free-resources/cover-letter-samples", "Cover Letter Samples"],
                ["/free-resources/interview-questions", "Interview Questions"],
                ["/free-resources/career-checklists", "Career Checklists"],
                ["/career-tips/cv-guides", "CV Writing Guides"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
                >
                  {label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp help button */}
      {previewIndex === null && (
        <a
          href={waLink(generalHelpMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white pl-4 pr-5 py-3 rounded-full font-semibold text-sm shadow-xl transition-transform hover:scale-105"
          aria-label="Get CV help on WhatsApp"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="hidden sm:inline">Need help? WhatsApp us</span>
          <span className="sm:hidden">Help</span>
        </a>
      )}
    </div>
  );
}
