import { Metadata } from "next";
import {
  freeCVTemplates,
  cvTemplateFaqs,
  cvWritingTips,
} from "@/lib/cv-templates";

const SITE = "https://www.careercvpro.co.za";
const PAGE_URL = `${SITE}/free-resources/cv-samples`;
const templateCount = freeCVTemplates.length;
// Social share image. It says "7 Free CV Templates", so regenerate it if the count changes.
const OG_IMAGE = `${SITE}/cv-templates/og-free-cv-templates.jpg`;

export const metadata: Metadata = {
  title: `Free CV Templates South Africa 2026 | ${templateCount} Word & PDF Downloads | CareerCVPro`,
  description: `Download ${templateCount} free, modern CV templates for South African job seekers in Word and PDF. Preview every design, download with no sign-up, and get expert help filling it in from R80.`,
  keywords: [
    "free CV templates South Africa",
    "CV template download",
    "free CV template Word",
    "CV template PDF",
    "CV templates South Africa",
    "free CV samples",
    "CV format South Africa",
    "professional CV template",
    "modern CV template",
    "CV examples",
    "resume template South Africa",
    "CV download free",
    "creative CV design",
    "CV template with photo",
    "best CV format 2026",
    "editable CV template",
    "ATS CV template",
    "graduate CV template",
    "South African CV format",
    "Johannesburg CV",
    "Cape Town CV",
    "Durban CV",
  ],
  authors: [{ name: "CareerCVPro" }],
  creator: "CareerCVPro",
  publisher: "CareerCVPro",
  openGraph: {
    title: `${templateCount} Free CV Templates | Word & PDF | South Africa`,
    description:
      "Modern, professionally designed CV templates for SA job seekers. Preview and download free, or let our writers fill one in for you for R80.",
    type: "website",
    locale: "en_ZA",
    siteName: "CareerCVPro",
    url: PAGE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${templateCount} free CV templates to download in Word and PDF`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${templateCount} Free CV Templates | Word & PDF | South Africa 2026`,
    description:
      "Preview and download modern CV templates free. No sign-up. Expert help available on WhatsApp.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Free Resources",
};

// JSON-LD Structured Data
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Free CV Templates for South African Job Seekers (Word & PDF)",
  description: `${templateCount} free, downloadable CV templates in Word and PDF with industry-specific tips for South African job seekers.`,
  author: {
    "@type": "Organization",
    name: "CareerCVPro",
    url: SITE,
  },
  publisher: {
    "@type": "Organization",
    name: "CareerCVPro",
    url: SITE,
  },
  datePublished: "2025-01-01",
  dateModified: "2026-11-04",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free CV Templates",
  description: "Free downloadable CV templates for South African job seekers",
  numberOfItems: templateCount,
  itemListElement: freeCVTemplates.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "DigitalDocument",
      name: `${t.name} CV Template (${t.format === "word" ? "Word" : "PDF"})`,
      description: `${t.description} Best for: ${t.bestFor.join(", ")}.`,
      image: `${SITE}${t.previews[0]}`,
      url: `${SITE}${t.file}`,
      encodingFormat:
        t.format === "word"
          ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          : "application/pdf",
      isAccessibleForFree: true,
    },
  })),
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create a Winning CV",
  description:
    "Step-by-step tips for filling in a CV template and creating a CV that gets interviews",
  step: cvWritingTips.map((tip, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: tip.title,
    text: tip.description,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cvTemplateFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Free Resources",
      item: `${SITE}/free-resources`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Free CV Templates",
      item: PAGE_URL,
    },
  ],
};

export default function CVSamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
