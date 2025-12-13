import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Free CV Templates & Samples South Africa 2025 | ATS-Optimized | CareerCVPro",
  description:
    "Download free professional CV templates for South African job seekers. 4 ATS-optimized designs with industry-specific tips for IT, Finance, Healthcare, Admin & more. Get hired faster.",
  keywords: [
    "CV templates South Africa",
    "free CV samples",
    "CV format South Africa",
    "ATS CV template",
    "professional CV template",
    "CV examples",
    "resume template South Africa",
    "CV download free",
    "modern CV template",
    "creative CV design",
    "professional CV format",
    "CV for job application",
    "best CV format 2025",
    "IT CV template",
    "finance CV template",
    "healthcare CV template",
    "admin CV template",
    "South African CV format",
    "CV template Word",
    "CV template PDF",
    "graduate CV template",
    "experienced CV template",
    "Johannesburg CV",
    "Cape Town CV",
    "Durban CV",
  ],
  authors: [{ name: "CareerCVPro" }],
  creator: "CareerCVPro",
  publisher: "CareerCVPro",
  openGraph: {
    title: "Free CV Templates South Africa | 4 ATS-Optimized Designs",
    description:
      "Professional CV templates for SA job seekers. Modern, classic & creative designs with industry tips. Download free or get customized for R80.",
    type: "website",
    locale: "en_ZA",
    siteName: "CareerCVPro",
    images: [
      {
        url: "/img1.png",
        width: 600,
        height: 800,
        alt: "Professional CV Template South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CV Templates | ATS-Optimized | South Africa 2025",
    description:
      "4 professional CV templates with industry-specific tips. Modern, classic & creative designs for SA job seekers.",
  },
  alternates: {
    canonical: "https://careercvpro.co.za/free-resources/cv-samples",
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
  headline: "Free Professional CV Templates for South African Job Seekers",
  description:
    "ATS-optimized CV templates with industry-specific tips for IT, Finance, Healthcare, Administration and more.",
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
    "@id": "https://careercvpro.co.za/free-resources/cv-samples",
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CV Templates Collection",
  description: "Professional CV templates for South African job seekers",
  numberOfItems: 4,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Modern Sidebar CV Template",
      description:
        "Two-column design with dark green sidebar. Best for IT, Marketing, Project Managers. ATS Score: 85%",
      image: "https://careercvpro.co.za/img1.png",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Classic Professional CV Template",
      description:
        "Traditional single-column ATS-optimized format. Best for Finance, Legal, Government. ATS Score: 98%",
      image: "https://careercvpro.co.za/img2.png",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Creative Photo CV Template",
      description:
        "Eye-catching design with photo placeholder. Best for Creative, Sales, Hospitality. ATS Score: 75%",
      image: "https://careercvpro.co.za/img3.png",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Modern Compact CV Template",
      description:
        "Space-efficient design with skill tags. Best for Experienced Professionals, Technical Roles. ATS Score: 90%",
      image: "https://careercvpro.co.za/img4.png",
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create an ATS-Friendly CV",
  description:
    "Step-by-step guide to creating a CV that passes Applicant Tracking Systems",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Use Action Verbs",
      text: "Start bullet points with powerful verbs: Developed, Implemented, Managed, Achieved",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Quantify Achievements",
      text: "Use numbers: 'Increased sales by 35%' is stronger than 'Improved sales'",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Tailor Each Application",
      text: "Customize your CV by including keywords from the job description",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Keep it Concise",
      text: "2 pages maximum for experienced professionals, 1 page for graduates",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Use ATS-Friendly Format",
      text: "Use standard section headers, avoid tables/graphics, stick to common fonts",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Proofread Thoroughly",
      text: "Spelling mistakes are the #1 reason CVs get rejected",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best CV format for South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best CV format for South Africa depends on your industry. For corporate roles (finance, legal, government), use a classic single-column format. For creative and tech roles, modern two-column designs work well. Always ensure your CV is ATS-optimized with standard section headers.",
      },
    },
    {
      "@type": "Question",
      name: "What is ATS and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ATS (Applicant Tracking System) is software used by over 90% of large South African companies to screen CVs before a human sees them. If your CV isn't ATS-friendly, it may be rejected automatically. Use standard formatting, include relevant keywords, and avoid tables and graphics.",
      },
    },
    {
      "@type": "Question",
      name: "How long should a CV be in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In South Africa, a CV should typically be 1-2 pages. Graduates and those with less than 5 years experience should aim for 1 page. Experienced professionals can use 2 pages. Senior executives may extend to 3 pages if necessary.",
      },
    },
    {
      "@type": "Question",
      name: "Should I include a photo on my CV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In South Africa, photos are optional and depend on the industry. Customer-facing roles, hospitality, and creative industries often welcome photos. For corporate, government, and technical roles, it's generally not necessary. If included, use a professional headshot.",
      },
    },
    {
      "@type": "Question",
      name: "What should I include in a South African CV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A South African CV should include: Contact details, Professional summary, Work experience (with achievements), Education and qualifications, Skills (both technical and soft), and optionally References. Include your ID number only if specifically requested.",
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
      name: "Free Resources",
      item: "https://careercvpro.co.za/free-resources",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "CV Samples",
      item: "https://careercvpro.co.za/free-resources/cv-samples",
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
