import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Revamp Service South Africa | R80 | Fast Turnaround | CareerCVPro",
  description:
    "Professional CV revamp service for R80. Transform your existing CV into an ATS-optimized, interview-winning document. Less than 1 hour turnaround. Unlimited revisions.",
  keywords: [
    "CV revamp South Africa",
    "CV makeover",
    "CV rewrite service",
    "professional CV service",
    "ATS CV optimization",
    "CV update service",
    "affordable CV service",
    "cheap CV writing South Africa",
    "CV improvement",
    "resume revamp",
    "CV transformation",
    "job application CV",
    "CV formatting service",
    "Johannesburg CV service",
    "Cape Town CV service",
    "Durban CV service",
    "Pretoria CV service",
    "South African CV writers",
    "fast CV service",
    "same day CV",
  ],
  authors: [{ name: "CareerCVPro" }],
  creator: "CareerCVPro",
  publisher: "CareerCVPro",
  openGraph: {
    title: "CV Revamp Service | R80 | Less Than 1 Hour",
    description:
      "Transform your existing CV into a job magnet. ATS-optimized, professionally formatted. R80 only.",
    type: "website",
    locale: "en_ZA",
    siteName: "CareerCVPro",
    images: [
      {
        url: "/og-cv-revamp.png",
        width: 1200,
        height: 630,
        alt: "CV Revamp Service South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Revamp Service | R80 | Fast Turnaround",
    description:
      "Professional CV revamp for R80. ATS-optimized, unlimited revisions, less than 1 hour delivery.",
  },
  alternates: {
    canonical: "https://careercvpro.co.za/cv-services/cv-revamp",
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
  category: "Services",
};

// JSON-LD Structured Data
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CV Revamp Service",
  description:
    "Professional CV revamp service that transforms your existing CV into an ATS-optimized, interview-winning document.",
  provider: {
    "@type": "Organization",
    name: "CareerCVPro",
    url: "https://careercvpro.co.za",
    telephone: "+27749201395",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ZA",
    },
  },
  areaServed: {
    "@type": "Country",
    name: "South Africa",
  },
  serviceType: "CV Writing and Revamp",
  offers: {
    "@type": "Offer",
    price: "80",
    priceCurrency: "ZAR",
    availability: "https://schema.org/InStock",
    validFrom: "2025-01-01",
    priceValidUntil: "2025-12-31",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What's the difference between CV writing and CV revamp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CV writing creates a brand new CV from scratch, typically for first-time job seekers or career changers. CV revamp takes your existing CV and transforms it - improving the structure, wording, formatting, and ATS optimization while keeping your original content as the foundation.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the CV revamp take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our standard turnaround is less than 1 hour. We understand job hunting is time-sensitive, so we prioritize quick delivery without compromising quality.",
      },
    },
    {
      "@type": "Question",
      name: "What format will I receive my revamped CV in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You'll receive your CV in PDF format. The PDF maintains formatting perfectly for applications.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer revisions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We offer unlimited revisions until you're 100% satisfied. Your satisfaction is guaranteed - if you're not happy, we'll keep working on it.",
      },
    },
    {
      "@type": "Question",
      name: "Will my CV pass ATS (Applicant Tracking Systems)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We specifically optimize your CV for ATS systems used by South African employers. This includes proper formatting, relevant keywords, and a structure that ATS software can read easily.",
      },
    },
    {
      "@type": "Question",
      name: "How much does CV revamp cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our CV revamp service costs R80 (reduced from R250). This includes ATS optimization, professional formatting, keyword enhancement, and unlimited revisions.",
      },
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
      name: "CV Services",
      item: "https://careercvpro.co.za/cv-services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "CV Revamp",
      item: "https://careercvpro.co.za/cv-services/cv-revamp",
    },
  ],
};

export default function CVRevampLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
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
