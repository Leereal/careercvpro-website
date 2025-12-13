import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Cover Letter Writing Service South Africa | R30 | Job-Specific | CareerCVPro",
  description:
    "Professional cover letter writing service for R30. Get a tailored, job-specific cover letter that makes recruiters want to meet you. 1-hour delivery, unlimited revisions.",
  keywords: [
    "cover letter writing South Africa",
    "professional cover letter",
    "cover letter service",
    "job application letter",
    "covering letter",
    "motivation letter South Africa",
    "cover letter writer",
    "affordable cover letter",
    "cheap cover letter service",
    "cover letter for job application",
    "tailored cover letter",
    "custom cover letter",
    "cover letter help",
    "Johannesburg cover letter",
    "Cape Town cover letter",
    "Durban cover letter",
    "Pretoria cover letter",
    "South African cover letter",
    "fast cover letter service",
    "same day cover letter",
    "ATS cover letter",
    "job specific cover letter",
  ],
  authors: [{ name: "CareerCVPro" }],
  creator: "CareerCVPro",
  publisher: "CareerCVPro",
  openGraph: {
    title: "Cover Letter Writing Service | R30 | Job-Specific",
    description:
      "Get a tailored cover letter that makes recruiters want to meet you. R30 only, 1-hour delivery.",
    type: "website",
    locale: "en_ZA",
    siteName: "CareerCVPro",
    images: [
      {
        url: "/og-cover-letter.png",
        width: 1200,
        height: 630,
        alt: "Cover Letter Writing Service South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cover Letter Writing | R30 | 1-Hour Delivery",
    description:
      "Professional, job-specific cover letters for R30. Unlimited revisions, fast delivery.",
  },
  alternates: {
    canonical: "https://careercvpro.co.za/cv-services/cover-letter-writing",
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
  name: "Cover Letter Writing Service",
  description:
    "Professional cover letter writing service that creates tailored, job-specific cover letters to help you stand out to employers.",
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
  serviceType: "Cover Letter Writing",
  offers: {
    "@type": "Offer",
    price: "30",
    priceCurrency: "ZAR",
    availability: "https://schema.org/InStock",
    validFrom: "2025-01-01",
    priceValidUntil: "2025-12-31",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "350",
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
      name: "Do I really need a cover letter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! In South Africa's competitive job market, a cover letter sets you apart. Many recruiters won't consider applications without one, and it's your chance to show personality and enthusiasm that a CV can't convey.",
      },
    },
    {
      "@type": "Question",
      name: "Can you write cover letters for any industry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! We write cover letters for all industries—finance, healthcare, IT, retail, hospitality, government, NGOs, mining, and more. Just share the job ad and we'll tailor the letter to that specific role.",
      },
    },
    {
      "@type": "Question",
      name: "What do you need from me to write my cover letter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Just send us the job posting (URL or screenshot) and your CV. If you have specific achievements you want highlighted, let us know. We'll handle the rest.",
      },
    },
    {
      "@type": "Question",
      name: "How long will my cover letter be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We keep cover letters to one page (about 300-400 words)—long enough to make your case, short enough that recruiters will actually read it.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a cover letter cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our cover letter writing service costs R30. We also offer a CV + Cover Letter combo for R100 (save R10). Both include unlimited revisions.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can I get my cover letter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We deliver most cover letters within 1 hour. Simply WhatsApp us the job posting and your CV, and we'll get started right away.",
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
      name: "Cover Letter Writing",
      item: "https://careercvpro.co.za/cv-services/cover-letter-writing",
    },
  ],
};

export default function CoverLetterWritingLayout({
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
