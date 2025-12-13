import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "LinkedIn Profile Optimization South Africa | Get Found by Recruiters | R150",
  description:
    "Professional LinkedIn profile optimization service in South Africa. Get found by recruiters with keyword-rich headlines, compelling summaries & optimized experience sections. Only R150, 24-hour delivery.",
  keywords: [
    "LinkedIn profile optimization South Africa",
    "LinkedIn optimization service",
    "LinkedIn profile writing",
    "get found on LinkedIn",
    "LinkedIn headline optimization",
    "LinkedIn summary writing",
    "LinkedIn profile makeover",
    "professional LinkedIn profile",
    "recruiter visibility LinkedIn",
    "LinkedIn keyword optimization",
    "LinkedIn profile review",
    "South Africa LinkedIn service",
    "affordable LinkedIn optimization",
  ],
  openGraph: {
    title: "LinkedIn Profile Optimization | Get Found by Recruiters | R150",
    description:
      "Get found by recruiters with professional LinkedIn optimization. Keyword-rich headlines, compelling summaries & optimized experience. Only R150.",
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: "/og-linkedin-optimization.jpg",
        width: 1200,
        height: 630,
        alt: "LinkedIn Profile Optimization Service South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Profile Optimization South Africa | R150",
    description:
      "Get found by recruiters with professional LinkedIn optimization. 24-hour delivery, no login required.",
  },
  alternates: {
    canonical:
      "https://www.careercvpro.co.za/cv-services/linkedin-optimization",
  },
};

export default function LinkedInOptimizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "LinkedIn Profile Optimization",
    description:
      "Professional LinkedIn profile optimization service to increase recruiter visibility and job opportunities in South Africa.",
    provider: {
      "@type": "Organization",
      name: "CareerCVPro",
      url: "https://www.careercvpro.co.za",
    },
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    offers: [
      {
        "@type": "Offer",
        name: "LinkedIn Only",
        price: "150",
        priceCurrency: "ZAR",
        description: "Complete LinkedIn profile optimization",
      },
      {
        "@type": "Offer",
        name: "LinkedIn + CV",
        price: "230",
        priceCurrency: "ZAR",
        description: "LinkedIn optimization plus matching CV",
      },
      {
        "@type": "Offer",
        name: "Complete Package",
        price: "250",
        priceCurrency: "ZAR",
        description: "LinkedIn, CV, and Cover Letter",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does LinkedIn optimization work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We rewrite your entire LinkedIn profile including your headline, About section, work experience, and skills. You receive the optimized content in a document, which you then copy-paste into your LinkedIn profile.",
        },
      },
      {
        "@type": "Question",
        name: "Will you need access to my LinkedIn account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, we never need your login credentials. Simply share your profile URL or a PDF export. We provide you with the optimized content to update yourself, keeping your account secure.",
        },
      },
      {
        "@type": "Question",
        name: "How long does LinkedIn optimization take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most LinkedIn optimizations are completed within 24 hours. If you order the combo package with CV, both are typically delivered same-day during business hours.",
        },
      },
      {
        "@type": "Question",
        name: "Do you guarantee more LinkedIn profile views?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While we can't guarantee specific numbers, our clients typically see 200-400% increase in profile views within the first month. The optimization focuses on searchability and recruiter appeal.",
        },
      },
      {
        "@type": "Question",
        name: "How much does LinkedIn optimization cost in South Africa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our LinkedIn optimization service costs R150. We also offer combo packages: LinkedIn + CV for R200, and the Complete Package (LinkedIn + CV + Cover Letter) for R280.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.careercvpro.co.za",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "CV Services",
        item: "https://www.careercvpro.co.za/cv-services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "LinkedIn Optimization",
        item: "https://www.careercvpro.co.za/cv-services/linkedin-optimization",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Get Your LinkedIn Profile Optimized",
    description:
      "Simple steps to get your LinkedIn profile professionally optimized for recruiter visibility.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Share Your Profile",
        text: "Send us your current LinkedIn profile URL or PDF export via WhatsApp, along with your target job/industry.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Expert Review",
        text: "Our LinkedIn specialists analyze your profile against industry standards and recruiter expectations.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Optimization",
        text: "We rewrite every section with powerful keywords, compelling copy, and professional formatting.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Delivery & Support",
        text: "Receive your optimized content with step-by-step instructions for updating your profile.",
      },
    ],
    totalTime: "PT24H",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "ZAR",
      value: "150",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {children}
    </>
  );
}
