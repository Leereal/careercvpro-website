import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Common Interview Questions & Answers South Africa 2025/2026 | CareerCVPro",
  description:
    "Master interview questions asked by South African employers. 20+ questions with good/bad answer examples, STAR method guide, and SA-specific tips for salary, load shedding, transport.",
  keywords: [
    "interview questions South Africa",
    "common interview questions",
    "interview answers",
    "tell me about yourself",
    "why do you want to work here",
    "salary expectations South Africa",
    "STAR method interview",
    "behavioral interview questions",
    "SA job interview tips",
    "interview preparation",
    "strengths and weaknesses interview",
    "where do you see yourself in 5 years",
    "job interview tips",
    "how to answer interview questions",
    "interview questions and answers",
    "first job interview",
    "graduate interview questions",
    "load shedding interview question",
    "transport interview question",
    "why did you leave your job",
  ],
  authors: [{ name: "CareerCVPro" }],
  creator: "CareerCVPro",
  publisher: "CareerCVPro",
  openGraph: {
    title: "Common Interview Questions & Answers South Africa 2025/2026",
    description:
      "Master interview questions with good/bad answer examples, STAR method guide, and SA-specific tips.",
    type: "article",
    locale: "en_ZA",
    siteName: "CareerCVPro",
    images: [
      {
        url: "/og-interview-questions.png",
        width: 1200,
        height: 630,
        alt: "Interview Questions South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Common Interview Questions & Answers South Africa 2025/2026",
    description:
      "20+ interview questions with answer examples and SA-specific tips.",
  },
  alternates: {
    canonical: "https://careercvpro.co.za/free-resources/interview-questions",
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
  category: "Career Resources",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Common Interview Questions & Answers for South African Job Seekers 2025/2026",
  description:
    "Comprehensive guide to interview questions asked by South African employers with good/bad answer examples, the STAR method, and SA-specific tips.",
  image: "https://careercvpro.co.za/og-interview-questions.png",
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
    "@id": "https://careercvpro.co.za/free-resources/interview-questions",
  },
  articleSection: "Career Resources",
  keywords:
    "interview questions, South Africa, job interview, STAR method, behavioral questions, salary negotiation",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I answer 'Tell me about yourself'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keep it to 2 minutes using the Present-Past-Future formula: describe your current role, highlight relevant past experience, and explain why you want this job. Focus on professional achievements, not personal details.",
      },
    },
    {
      "@type": "Question",
      name: "What is the STAR method for interviews?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "STAR stands for Situation (set the scene), Task (your responsibility), Action (what you did), and Result (the outcome). Use this structure to answer behavioral questions like 'Tell me about a time when...'",
      },
    },
    {
      "@type": "Question",
      name: "How should I answer salary expectations in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Research market rates on PayScale, Glassdoor, and LinkedIn. Give a range based on your experience and the job location. Say something like: 'Based on my research and experience, I'm looking at R35,000 to R42,000 per month, but I'm open to discussing the total package.'",
      },
    },
    {
      "@type": "Question",
      name: "What should I say when asked about my weaknesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose a real weakness that isn't critical to the job. Explain what you're doing to improve. Example: 'I used to struggle with delegating, but I've learned to trust my team by setting clear expectations and having regular check-ins.'",
      },
    },
    {
      "@type": "Question",
      name: "How do I answer 'Why did you leave your last job?'",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Never badmouth previous employers. Focus on moving toward opportunities, not away from problems. Example: 'I learned a lot but reached a ceiling for growth. I'm looking for new challenges that this role offers with its focus on [specific aspect].'",
      },
    },
    {
      "@type": "Question",
      name: "What questions should I ask at the end of an interview?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prepare 5+ questions. Good examples: 'What does success look like in this role after 6 months?', 'How would you describe the team culture?', 'What are the biggest challenges the team is facing?' Avoid asking about leave or benefits first.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Prepare for a Job Interview",
  description:
    "Step-by-step guide to preparing for job interviews in South Africa",
  step: [
    {
      "@type": "HowToStep",
      name: "Research the Company",
      text: "Study the company's website, recent news, products/services, and culture. Know their mission and values.",
    },
    {
      "@type": "HowToStep",
      name: "Prepare Your Stories",
      text: "Prepare 5-6 stories using the STAR method that demonstrate your skills and achievements.",
    },
    {
      "@type": "HowToStep",
      name: "Practice Common Questions",
      text: "Practice answers to common questions out loud. Record yourself or practice with a friend.",
    },
    {
      "@type": "HowToStep",
      name: "Prepare Questions to Ask",
      text: "Write at least 5 thoughtful questions to ask the interviewer about the role and company.",
    },
    {
      "@type": "HowToStep",
      name: "Plan Logistics",
      text: "Plan your outfit, print extra CVs, map the route, and plan to arrive 10-15 minutes early.",
    },
    {
      "@type": "HowToStep",
      name: "Follow Up",
      text: "Send a thank-you email within 24 hours, reiterating your interest and key points from the interview.",
    },
  ],
};

export default function InterviewQuestionsLayout({
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
