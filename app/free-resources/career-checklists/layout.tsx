import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Free Career Checklists South Africa 2025/2026 | Job Search & Interview | CareerCVPro",
  description:
    "Free interactive and printable career checklists for South African job seekers. Job search preparation, interview prep, first day, resignation, networking, and more.",
  keywords: [
    "career checklists South Africa",
    "job search checklist",
    "interview preparation checklist",
    "first day at work checklist",
    "resignation checklist South Africa",
    "networking checklist",
    "graduate job search checklist",
    "career change checklist",
    "remote work checklist",
    "printable job search checklist",
    "free career resources",
    "job application checklist",
    "CV checklist",
    "LinkedIn checklist",
    "professional documents checklist",
    "SA job seeker resources",
    "employment documents South Africa",
    "job hunting tips",
    "career planning",
    "work from home checklist",
  ],
  authors: [{ name: "CareerCVPro" }],
  creator: "CareerCVPro",
  publisher: "CareerCVPro",
  openGraph: {
    title:
      "Free Career Checklists South Africa 2025/2026 | Job Search & Interview",
    description:
      "Interactive and printable career checklists for SA job seekers. Job search, interview prep, networking, and more.",
    type: "article",
    locale: "en_ZA",
    siteName: "CareerCVPro",
    images: [
      {
        url: "/og-career-checklists.png",
        width: 1200,
        height: 630,
        alt: "Career Checklists South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Career Checklists South Africa 2025/2026",
    description:
      "Interactive and printable career checklists for SA job seekers. Stay organized and land your dream job.",
  },
  alternates: {
    canonical: "https://careercvpro.co.za/free-resources/career-checklists",
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

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Free Career Checklists for South African Job Seekers 2025/2026",
  description:
    "Comprehensive collection of free interactive and printable career checklists including job search preparation, interview prep, networking, and more for South African professionals.",
  image: "https://careercvpro.co.za/og-career-checklists.png",
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
    "@id": "https://careercvpro.co.za/free-resources/career-checklists",
  },
  articleSection: "Career Resources",
  keywords:
    "career checklists, job search, interview preparation, South Africa, job application, networking",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long should a job search take in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On average, job searches in South Africa take 3-6 months. This varies based on industry, experience level, and economic conditions. Using organized checklists can help maximize your chances of a quicker result.",
      },
    },
    {
      "@type": "Question",
      name: "Should I apply to jobs I'm not fully qualified for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! If you meet 60-70% of the requirements, apply anyway. Job descriptions often describe an 'ideal' candidate. Focus on transferable skills and willingness to learn in your application.",
      },
    },
    {
      "@type": "Question",
      name: "How many jobs should I apply to per week?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Quality over quantity. Aim for 5-10 well-tailored applications per week rather than 50 generic ones. Each application should be customized to the specific role and company.",
      },
    },
    {
      "@type": "Question",
      name: "What's the best time to apply for jobs in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tuesday through Thursday mornings tend to have the best response rates. Avoid Mondays (inbox overload) and Fridays (weekend mindset). January-March and July-September are peak hiring seasons in SA.",
      },
    },
    {
      "@type": "Question",
      name: "Should I follow up after applying for a job?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wait at least one week, then send a polite follow-up email. If you applied through a recruiter, follow up with them. Don't follow up more than twice - respect their process.",
      },
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Career Checklists for South African Job Seekers",
  description:
    "Free interactive and printable checklists to organize your job search",
  numberOfItems: 8,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Job Search Preparation Checklist",
      description:
        "Everything you need before starting your job search including CV, LinkedIn, references, and job alerts",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Interview Preparation Checklist",
      description:
        "Be fully prepared for interviews with company research, STAR method practice, outfit planning, and questions to ask",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "First Day at Work Checklist",
      description:
        "Make a great impression on day one with proper documentation, introductions, and orientation tasks",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Resignation Checklist",
      description:
        "Leave professionally with proper notice, handover documentation, and networking maintenance",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Professional Networking Checklist",
      description:
        "Build a powerful network through LinkedIn, events, informational interviews, and follow-ups",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Graduate Job Search Checklist",
      description:
        "Special checklist for new graduates covering skills-focused CVs, graduate programs, and building experience",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "Career Change Checklist",
      description:
        "Successfully transition to a new field with transferable skills identification, upskilling, and networking",
    },
    {
      "@type": "ListItem",
      position: 8,
      name: "Remote Work Setup Checklist",
      description:
        "Set yourself up for remote work success with proper equipment, routines, and load shedding backup plans",
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Prepare for a Job Search in South Africa",
  description:
    "A comprehensive checklist guide to preparing for a successful job search in the South African market",
  step: [
    {
      "@type": "HowToStep",
      name: "Update Your CV",
      text: "Update your CV with recent experience and achievements. Use action verbs and quantify results.",
    },
    {
      "@type": "HowToStep",
      name: "Prepare Cover Letter",
      text: "Write a tailored cover letter template that can be customized for each application.",
    },
    {
      "@type": "HowToStep",
      name: "Update LinkedIn",
      text: "Update your LinkedIn profile with a professional photo, compelling headline, and complete experience.",
    },
    {
      "@type": "HowToStep",
      name: "Research Target Companies",
      text: "Research target companies and industries to understand where you want to work.",
    },
    {
      "@type": "HowToStep",
      name: "Set Up Job Alerts",
      text: "Set up job alerts on Careers24, Indeed, LinkedIn, and other major job portals.",
    },
    {
      "@type": "HowToStep",
      name: "Gather References",
      text: "Gather at least 3 professional references and ask permission before listing them.",
    },
    {
      "@type": "HowToStep",
      name: "Prepare Documents",
      text: "Gather all required documents including certified ID copy, qualifications, and proof of address.",
    },
    {
      "@type": "HowToStep",
      name: "Create Tracking System",
      text: "Create a job application tracking spreadsheet to monitor applications and follow-ups.",
    },
  ],
};

export default function CareerChecklistsLayout({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      {children}
    </>
  );
}
