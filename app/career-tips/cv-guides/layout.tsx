import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "How to Write a CV in South Africa 2025/2026 | Complete Guide | CareerCVPro",
  description:
    "Learn how to write a professional CV for the South African job market. Expert tips on formatting, ATS optimization, what to include & avoid. Free guide with examples.",
  keywords: [
    "how to write a CV South Africa",
    "CV writing tips South Africa",
    "South African CV format",
    "CV template South Africa",
    "ATS friendly CV",
    "professional CV writing",
    "CV examples South Africa",
    "curriculum vitae South Africa",
    "job application CV",
    "CV guide 2025",
    "CV guide 2026",
    "best CV format",
    "what to include in CV",
    "CV mistakes to avoid",
    "entry level CV",
    "graduate CV South Africa",
    "work experience CV",
    "skills for CV",
    "CV personal statement",
    "CV summary examples",
  ],
  authors: [{ name: "CareerCVPro" }],
  creator: "CareerCVPro",
  publisher: "CareerCVPro",
  openGraph: {
    title: "How to Write a CV in South Africa 2025/2026 | Complete Guide",
    description:
      "Learn how to write a professional CV for the South African job market. Expert tips on formatting, ATS optimization, what to include & avoid.",
    type: "article",
    locale: "en_ZA",
    siteName: "CareerCVPro",
    images: [
      {
        url: "/og-cv-guide.png",
        width: 1200,
        height: 630,
        alt: "How to Write a CV in South Africa - Complete Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write a CV in South Africa 2025/2026",
    description:
      "Complete guide to writing a professional CV for the South African job market.",
  },
  alternates: {
    canonical: "https://careercvpro.co.za/career-tips/cv-guides",
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
  category: "Career Advice",
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Write a CV in South Africa 2025/2026 - Complete Guide",
  description:
    "Learn how to write a professional CV for the South African job market. Expert tips on formatting, ATS optimization, what to include and avoid.",
  image: "https://careercvpro.co.za/og-cv-guide.png",
  author: {
    "@type": "Organization",
    name: "CareerCVPro",
    url: "https://careercvpro.co.za",
  },
  publisher: {
    "@type": "Organization",
    name: "CareerCVPro",
    logo: {
      "@type": "ImageObject",
      url: "https://careercvpro.co.za/logo.png",
    },
  },
  datePublished: "2025-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://careercvpro.co.za/career-tips/cv-guides",
  },
  articleSection: "Career Advice",
  keywords:
    "CV writing, South Africa, CV tips, ATS, curriculum vitae, job application, professional CV",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long should my CV be in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most positions in South Africa, your CV should be 2 pages maximum. If you're a recent graduate or have less than 5 years of experience, aim for 1 page. Senior executives or academics may extend to 3 pages, but only if the content is highly relevant.",
      },
    },
    {
      "@type": "Question",
      name: "Should I include a photo on my South African CV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally, no. Including a photo can lead to unconscious bias and is not expected in South Africa. Exceptions include roles in modelling, acting, hospitality, or when specifically requested by the employer.",
      },
    },
    {
      "@type": "Question",
      name: "What is ATS and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ATS (Applicant Tracking System) is software used by companies to scan and filter CVs before a human sees them. In South Africa, most large employers use ATS. To pass, use standard headings, include relevant keywords from the job description, avoid tables/graphics, and save your CV as a Word document or simple PDF.",
      },
    },
    {
      "@type": "Question",
      name: "Should I include my ID number on my CV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only include your South African ID number if the job advertisement specifically requests it. Otherwise, leave it out to protect yourself from identity theft and potential age discrimination.",
      },
    },
    {
      "@type": "Question",
      name: "How far back should my work history go?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally, include the last 10-15 years of relevant work experience. For older positions, you can briefly list them without detailed descriptions. Focus more detail on recent and relevant roles.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between a CV and a resume in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In South Africa, 'CV' and 'resume' are often used interchangeably. However, traditionally a CV is more comprehensive (2+ pages) while a resume is a brief 1-page summary. Most South African employers expect a 'CV' that's 1-2 pages long.",
      },
    },
    {
      "@type": "Question",
      name: "Should I include my matric results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you're a recent school leaver or have limited higher education, include your matric results. Once you have a tertiary qualification or several years of work experience, you can simply state 'Matric Certificate' with the year and school name.",
      },
    },
    {
      "@type": "Question",
      name: "How do I explain gaps in my employment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Be honest but strategic. Brief gaps don't need explanation. For longer gaps, mention productive activities: studying, freelancing, volunteering, caring for family, or skill development. Address significant gaps in your cover letter.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Write a Professional CV in South Africa",
  description:
    "Step-by-step guide to creating a winning CV for the South African job market",
  totalTime: "PT1H",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "ZAR",
    value: "0",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Add Personal Details",
      text: "Include your full name, phone number, professional email, and location (city/province). Avoid including ID number, photo, or date of birth.",
    },
    {
      "@type": "HowToStep",
      name: "Write a Professional Summary",
      text: "Create a 3-4 sentence summary highlighting your job title, years of experience, key skills, and career goals.",
    },
    {
      "@type": "HowToStep",
      name: "List Work Experience",
      text: "Add your work history in reverse chronological order. Focus on achievements with quantifiable results, not just duties.",
    },
    {
      "@type": "HowToStep",
      name: "Add Education",
      text: "List your qualifications from highest to lowest. Include institution name, qualification, and year completed.",
    },
    {
      "@type": "HowToStep",
      name: "Include Skills",
      text: "Add a mix of hard skills (technical) and soft skills (interpersonal). Prioritize skills mentioned in the job description.",
    },
    {
      "@type": "HowToStep",
      name: "Format Properly",
      text: "Use a clean layout with clear headings, bullet points, and consistent spacing. Save as PDF or Word document.",
    },
  ],
};

export default function CVGuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      {children}
    </>
  );
}
