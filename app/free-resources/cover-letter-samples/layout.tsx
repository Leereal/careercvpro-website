import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Free Cover Letter Samples & Templates | South Africa 2025 | CareerCVPro",
  description:
    "Free cover letter templates for South African job seekers. 9 industry-specific samples for graduates, admin, IT, healthcare, retail, finance & more. Copy, customize, and land interviews.",
  keywords: [
    "cover letter samples South Africa",
    "cover letter templates",
    "free cover letter examples",
    "cover letter for job application",
    "professional cover letter",
    "cover letter format",
    "graduate cover letter",
    "entry level cover letter",
    "career change cover letter",
    "admin cover letter",
    "IT cover letter",
    "nursing cover letter",
    "retail cover letter",
    "finance cover letter",
    "HR cover letter",
    "construction cover letter",
    "cover letter tips",
    "how to write cover letter",
    "South African cover letter",
    "cover letter 2025",
    "job application letter",
    "motivation letter template",
  ],
  authors: [{ name: "CareerCVPro" }],
  creator: "CareerCVPro",
  publisher: "CareerCVPro",
  openGraph: {
    title: "Free Cover Letter Samples & Templates | South Africa 2025",
    description:
      "9 industry-specific cover letter templates for SA job seekers. Copy, customize, and land that interview.",
    type: "website",
    locale: "en_ZA",
    siteName: "CareerCVPro",
    images: [
      {
        url: "/og-cover-letter-samples.png",
        width: 1200,
        height: 630,
        alt: "Free Cover Letter Samples South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Cover Letter Samples | 9 Industry Templates",
    description:
      "Professional cover letter templates for SA job seekers. Graduate, admin, IT, healthcare & more.",
  },
  alternates: {
    canonical: "https://careercvpro.co.za/free-resources/cover-letter-samples",
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
  headline:
    "Free Cover Letter Samples & Templates for South African Job Seekers",
  description:
    "Professional cover letter templates for 9 different industries, with tips and examples for South African job seekers.",
  author: {
    "@type": "Organization",
    name: "CareerCVPro",
    url: "https://careercvpro.co.za",
  },
  publisher: {
    "@type": "Organization",
    name: "CareerCVPro",
    url: "https://careercvpro.co.za",
  },
  datePublished: "2025-01-01",
  dateModified: "2025-12-13",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://careercvpro.co.za/free-resources/cover-letter-samples",
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Cover Letter Samples by Industry",
  description:
    "Professional cover letter templates for different industries and career stages",
  numberOfItems: 9,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Graduate / Entry-Level Cover Letter",
      description:
        "Cover letter template for recent graduates and first-time job seekers",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Career Changer Cover Letter",
      description:
        "Cover letter template for professionals transitioning to new industries",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Administrative / Office Cover Letter",
      description:
        "Cover letter template for admin assistants, receptionists, and office managers",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Retail / Hospitality Cover Letter",
      description:
        "Cover letter template for sales associates, store managers, and hospitality staff",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Healthcare / Nursing Cover Letter",
      description:
        "Cover letter template for nurses, healthcare assistants, and medical professionals",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "IT / Technology Cover Letter",
      description:
        "Cover letter template for developers, IT support, and tech professionals",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "Finance / Accounting Cover Letter",
      description:
        "Cover letter template for accountants, bookkeepers, and finance professionals",
    },
    {
      "@type": "ListItem",
      position: 8,
      name: "Construction / Trades Cover Letter",
      description:
        "Cover letter template for artisans, tradespeople, and construction workers",
    },
    {
      "@type": "ListItem",
      position: 9,
      name: "HR / Recruitment Cover Letter",
      description:
        "Cover letter template for HR officers, recruiters, and people managers",
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Write a Cover Letter for South African Jobs",
  description: "Step-by-step guide to writing an effective cover letter",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Research the Company",
      text: "Mention specific details about the company to show genuine interest",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Customize Every Letter",
      text: "Never send generic letters—tailor each one to the specific job",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Lead with Impact",
      text: "Start with a compelling hook, not 'I am writing to apply...'",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Show, Don't Tell",
      text: "Use specific examples and numbers instead of vague claims",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Keep it Concise",
      text: "One page maximum—recruiters spend seconds scanning cover letters",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "End with Action",
      text: "Close with a clear call to action requesting an interview",
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://careercvpro.co.za",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Free Resources",
      item: "https://careercvpro.co.za/free-resources",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Cover Letter Samples",
      item: "https://careercvpro.co.za/free-resources/cover-letter-samples",
    },
  ],
};

export default function CoverLetterSamplesLayout({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
