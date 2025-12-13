import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Workplace Success Guide South Africa 2025/2026 | Thrive at Work | CareerCVPro",
  description:
    "Succeed in your South African workplace. First 90 days guide, office politics, asking for raises, dealing with difficult colleagues, and SA workplace culture tips.",
  keywords: [
    "workplace success South Africa",
    "first 90 days new job",
    "office politics tips",
    "how to ask for a raise South Africa",
    "dealing with difficult colleagues",
    "workplace communication",
    "imposter syndrome",
    "work life balance",
    "career advancement tips",
    "SA workplace culture",
    "ubuntu workplace",
    "employee rights South Africa",
    "CCMA",
    "workplace harassment",
    "professional development",
    "getting promoted",
    "workplace etiquette",
    "email etiquette work",
    "meeting etiquette",
    "remote work tips",
  ],
  authors: [{ name: "CareerCVPro" }],
  creator: "CareerCVPro",
  publisher: "CareerCVPro",
  openGraph: {
    title: "Workplace Success Guide South Africa 2025/2026 | Thrive at Work",
    description:
      "Succeed in your South African workplace. First 90 days guide, office politics, raises, and SA workplace culture tips.",
    type: "article",
    locale: "en_ZA",
    siteName: "CareerCVPro",
    images: [
      {
        url: "/og-workplace-guide.png",
        width: 1200,
        height: 630,
        alt: "Workplace Success Guide South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Workplace Success Guide South Africa 2025/2026",
    description:
      "Succeed in your workplace with our comprehensive guide covering first 90 days, office politics, and SA culture.",
  },
  alternates: {
    canonical: "https://careercvpro.co.za/career-tips/workplace-guides",
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
  headline: "Workplace Success Guide South Africa 2025/2026",
  description:
    "Learn how to succeed in South African workplaces with our comprehensive guide covering first 90 days, office politics, asking for raises, and workplace culture.",
  image: "https://careercvpro.co.za/og-workplace-guide.png",
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
    "@id": "https://careercvpro.co.za/career-tips/workplace-guides",
  },
  articleSection: "Career Advice",
  keywords:
    "workplace success, South Africa, first 90 days, office politics, asking for raise, workplace culture",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How soon is too soon to ask for a raise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally, wait at least 6-12 months before asking for a raise, unless your role has significantly expanded. The best times are during performance reviews, after completing major projects, or when taking on additional responsibilities. Come prepared with documentation of your achievements and market salary data.",
      },
    },
    {
      "@type": "Question",
      name: "Should I be friends with my colleagues?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Friendly, yes. Best friends, be careful. Building positive relationships is important for career success and job satisfaction. However, maintain professional boundaries. Avoid gossip, be mindful about sharing personal information, and remember that workplace dynamics can change.",
      },
    },
    {
      "@type": "Question",
      name: "How do I deal with being overlooked for promotion?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "First, ask for specific feedback on why you weren't selected and what you need to improve. Create a development plan addressing those gaps. Make your achievements more visible to decision-makers. If consistently overlooked despite strong performance, consider whether this company values what you offer.",
      },
    },
    {
      "@type": "Question",
      name: "What should I do if I witness workplace harassment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Document what you witnessed with dates, times, and details. Check your company's policy on reporting. Support the person affected and encourage them to report. Report to HR or use anonymous channels if available. In serious cases, the CCMA or Department of Labour can assist.",
      },
    },
    {
      "@type": "Question",
      name: "How do I say 'no' to extra work without damaging my reputation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Be honest about your current workload: 'I'd love to help, but I'm currently focused on [X] which is due [date]. Can we discuss priorities?' Offer alternatives: 'I can't take this on fully, but I could [smaller commitment].' Don't make excuses - be direct but professional.",
      },
    },
    {
      "@type": "Question",
      name: "Is it bad to job hunt while employed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, it's actually the ideal position to be in. You have leverage, can be selective, and aren't under pressure to accept anything. Just be discreet: don't use company resources for your search, schedule interviews outside work hours, and don't discuss your search with colleagues.",
      },
    },
    {
      "@type": "Question",
      name: "How do I handle a counter-offer from my current employer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Consider why you wanted to leave in the first place - if it was only salary, a counter might work. But if it was culture, management, or growth, more money won't fix that. Statistics show most people who accept counter-offers leave within 18 months anyway.",
      },
    },
    {
      "@type": "Question",
      name: "What are my rights during retrenchment in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your employer must follow a fair procedure (consultation, selection criteria, alternatives to retrenchment). You're entitled to severance pay of at least 1 week per completed year of service. You can claim UIF. If the process was unfair, refer to CCMA within 30 days.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Succeed in Your First 90 Days at a New Job",
  description:
    "A step-by-step guide to making a great impression and setting yourself up for success in a new role",
  totalTime: "P90D",
  step: [
    {
      "@type": "HowToStep",
      name: "Days 1-30: Learn & Observe",
      text: "Learn everyone's names and roles. Understand company culture and unwritten rules. Study processes, systems, and tools. Listen more than you speak in meetings.",
    },
    {
      "@type": "HowToStep",
      name: "Build Initial Relationships",
      text: "Build relationships with your immediate team. Clarify expectations with your manager. Identify quick wins you can deliver.",
    },
    {
      "@type": "HowToStep",
      name: "Days 31-60: Contribute & Connect",
      text: "Start delivering on your core responsibilities. Expand your network beyond your team. Schedule one-on-ones with key stakeholders.",
    },
    {
      "@type": "HowToStep",
      name: "Add Value Early",
      text: "Share ideas thoughtfully in meetings. Ask for feedback from your manager. Document processes and learnings.",
    },
    {
      "@type": "HowToStep",
      name: "Days 61-90: Add Value & Lead",
      text: "Propose improvements based on observations. Take ownership of significant projects. Mentor newer team members if appropriate.",
    },
    {
      "@type": "HowToStep",
      name: "Establish Your Brand",
      text: "Build your personal brand internally. Set goals for the next quarter. Schedule a 90-day review with your manager.",
    },
  ],
};

export default function WorkplaceGuidesLayout({
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
