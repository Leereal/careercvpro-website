import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Writing Service South Africa | R80 | From Scratch | CareerCVPro",
  description:
    "Professional CV writing service for R80. Get a brand new CV written from scratch by experts. ATS-optimized, same-day delivery, unlimited revisions. Perfect for graduates & career changers.",
  keywords: [
    "CV writing South Africa",
    "professional CV writer",
    "CV writing service",
    "write my CV",
    "CV for graduates",
    "first job CV",
    "career changer CV",
    "ATS CV writing",
    "affordable CV service",
    "cheap CV writing South Africa",
    "CV from scratch",
    "new CV",
    "professional resume writer",
    "job application CV",
    "CV for job seekers",
    "Johannesburg CV writer",
    "Cape Town CV writer",
    "Durban CV writer",
    "Pretoria CV writer",
    "South African CV writers",
    "same day CV",
    "fast CV service",
    "graduate CV",
    "entry level CV",
  ],
  authors: [{ name: "CareerCVPro" }],
  creator: "CareerCVPro",
  publisher: "CareerCVPro",
  openGraph: {
    title: "CV Writing Service | R80 | From Scratch | Same-Day Delivery",
    description:
      "Get a professional CV written from scratch. ATS-optimized, perfect for graduates and career changers. R80 only.",
    type: "website",
    locale: "en_ZA",
    siteName: "CareerCVPro",
    images: [
      {
        url: "/og-cv-writing.png",
        width: 1200,
        height: 630,
        alt: "CV Writing Service South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Writing Service | R80 | Same-Day Delivery",
    description:
      "Professional CV writing for R80. Written from scratch, ATS-optimized, unlimited revisions.",
  },
  alternates: {
    canonical: "https://careercvpro.co.za/cv-services/cv-writing",
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
  name: "CV Writing Service",
  description:
    "Professional CV writing service that creates a brand new, ATS-optimized CV from scratch for job seekers.",
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
  serviceType: "CV Writing",
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
      name: "What information do you need to write my CV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We need your work history (even informal jobs count), education/qualifications, skills, and the type of jobs you're applying for. Don't worry if your info is scattered—we'll help organize it.",
      },
    },
    {
      "@type": "Question",
      name: "What if I have no work experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No problem! We specialize in creating CVs for graduates and first-time job seekers. We'll highlight your education, volunteer work, internships, projects, and transferable skills.",
      },
    },
    {
      "@type": "Question",
      name: "How is CV writing different from CV revamp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CV writing creates your CV from scratch—ideal if you don't have a CV or yours is very outdated. CV revamp transforms an existing CV you already have. Both cost R80.",
      },
    },
    {
      "@type": "Question",
      name: "How long until I receive my CV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard delivery is within 2 hours. For complex CVs or during busy periods, it may take up to 4 hours. Same-day delivery is guaranteed.",
      },
    },
    {
      "@type": "Question",
      name: "Can you write industry-specific CVs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! We write CVs for all industries including finance, healthcare, IT, retail, hospitality, mining, construction, government, NGOs, and more.",
      },
    },
    {
      "@type": "Question",
      name: "How much does CV writing cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our CV writing service costs R80 (reduced from R250). This includes a brand new CV from scratch, ATS optimization, professional formatting, and unlimited revisions.",
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
      name: "CV Writing",
      item: "https://careercvpro.co.za/cv-services/cv-writing",
    },
  ],
};

export default function CVWritingLayout({
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
