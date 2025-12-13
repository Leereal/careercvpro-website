import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Job Search Guide South Africa 2025/2026 | Find Jobs Fast | CareerCVPro",
  description:
    "Complete job search guide for South Africa. Top job portals, networking strategies, industry tips, and proven methods to find employment. Free comprehensive guide.",
  keywords: [
    "job search South Africa",
    "how to find a job in South Africa",
    "job portals South Africa",
    "LinkedIn job search",
    "careers24",
    "indeed south africa",
    "pnet jobs",
    "networking for jobs",
    "hidden job market",
    "recruitment agencies South Africa",
    "job search tips 2025",
    "job search tips 2026",
    "find employment South Africa",
    "job hunting strategies",
    "government jobs South Africa",
    "IT jobs South Africa",
    "graduate jobs South Africa",
    "job search timeline",
    "career change South Africa",
    "remote jobs South Africa",
  ],
  authors: [{ name: "CareerCVPro" }],
  creator: "CareerCVPro",
  publisher: "CareerCVPro",
  openGraph: {
    title: "Job Search Guide South Africa 2025/2026 | Find Jobs Fast",
    description:
      "Complete guide to finding employment in South Africa. Top job portals, networking tips, and proven strategies.",
    type: "article",
    locale: "en_ZA",
    siteName: "CareerCVPro",
    images: [
      {
        url: "/og-job-search-guide.png",
        width: 1200,
        height: 630,
        alt: "Job Search Guide South Africa - Find Jobs Fast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Search Guide South Africa 2025/2026",
    description:
      "Complete guide to finding employment in South Africa with top job portals and networking strategies.",
  },
  alternates: {
    canonical: "https://careercvpro.co.za/career-tips/job-search-guides",
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
  headline: "Job Search Guide South Africa 2025/2026 - Complete Guide",
  description:
    "Learn how to find employment in South Africa with our comprehensive job search guide covering top portals, networking strategies, and industry-specific tips.",
  image: "https://careercvpro.co.za/og-job-search-guide.png",
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
    "@id": "https://careercvpro.co.za/career-tips/job-search-guides",
  },
  articleSection: "Career Advice",
  keywords:
    "job search, South Africa, job portals, networking, employment, careers24, indeed, linkedin, pnet",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many jobs should I apply to per week in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Quality trumps quantity. Aim for 5-10 well-tailored applications per week rather than 50 generic ones. Each application should include a customised CV and cover letter that addresses the specific job requirements. Research shows that tailored applications have a much higher success rate than mass applications.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best job portals in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The top job portals in South Africa include LinkedIn Jobs (best for professional roles), Indeed South Africa (largest aggregator), Careers24, PNET, OfferZen (for tech jobs), Gumtree Jobs (entry-level), and company career pages directly. We recommend using multiple platforms for the best results.",
      },
    },
    {
      "@type": "Question",
      name: "How long does job searching typically take in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On average, job searching takes 3-6 months in South Africa, though this varies by industry, experience level, and economic conditions. Entry-level positions may take longer due to high competition with unemployment above 30%. Using multiple job search strategies (networking, online applications, recruitment agencies) can reduce this timeframe.",
      },
    },
    {
      "@type": "Question",
      name: "What is the hidden job market and how do I access it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The hidden job market refers to positions that are never publicly advertised - estimated at 50% of all jobs. Access it through: professional networking at industry events, LinkedIn connections, informational interviews with companies you admire, direct company outreach, recruitment agencies, and referrals from your professional network.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use recruitment agencies in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, recruitment agencies can be valuable. They have access to unadvertised positions and relationships with hiring managers. Register with 3-5 agencies specializing in your industry. Important: legitimate agencies never charge candidates fees - they are paid by employers. Be honest about your salary expectations and keep your recruiter updated.",
      },
    },
    {
      "@type": "Question",
      name: "How important is LinkedIn for job searching in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Very important - 93% of recruiters use LinkedIn to find candidates. Complete your profile to 100%, use a professional headshot, write a compelling headline, post industry content 2-3 times per week, and engage with recruiters. Turn on 'Open to Work' (can be visible to recruiters only) to signal availability.",
      },
    },
    {
      "@type": "Question",
      name: "What's the best time of year to job search in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The strongest hiring periods are January-March (new year budgets), April-May (post financial year for many companies), and August-October. December and June-July tend to be slower due to holidays. However, job searching year-round is recommended as opportunities arise continuously.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find government jobs in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Government positions are advertised in the Public Service Vacancy Circular (PSVC) on dpsa.gov.za, updated weekly. Also check specific department websites, provincial government portals, and local municipality career pages. Government applications often have strict requirements and deadlines - read the full advertisement carefully.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Find a Job in South Africa",
  description:
    "Step-by-step guide to finding employment in the South African job market",
  totalTime: "P3M",
  step: [
    {
      "@type": "HowToStep",
      name: "Prepare Your CV",
      text: "Update your CV to be ATS-friendly and tailored for your target roles. Include achievements with quantifiable results.",
    },
    {
      "@type": "HowToStep",
      name: "Optimize LinkedIn Profile",
      text: "Complete your LinkedIn profile to 100%, add a professional photo, and write a compelling headline and summary.",
    },
    {
      "@type": "HowToStep",
      name: "Set Up Job Alerts",
      text: "Create job alerts on LinkedIn, Indeed, Careers24, PNET, and other relevant portals to receive new listings daily.",
    },
    {
      "@type": "HowToStep",
      name: "Network Strategically",
      text: "Reach out to your professional network, attend industry events, and connect with people at target companies.",
    },
    {
      "@type": "HowToStep",
      name: "Register with Recruitment Agencies",
      text: "Sign up with 3-5 recruitment agencies that specialize in your industry or job type.",
    },
    {
      "@type": "HowToStep",
      name: "Apply Strategically",
      text: "Submit 5-10 tailored applications per week to jobs posted within the last 7 days for best results.",
    },
    {
      "@type": "HowToStep",
      name: "Follow Up",
      text: "Send follow-up emails 1 week after applying if you haven't heard back. Track all applications in a spreadsheet.",
    },
    {
      "@type": "HowToStep",
      name: "Prepare for Interviews",
      text: "Research each company, practice common interview questions, and prepare questions to ask the interviewer.",
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Top Job Portals in South Africa",
  description: "Best websites to find job opportunities in South Africa",
  numberOfItems: 10,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "LinkedIn Jobs",
      url: "https://www.linkedin.com/jobs",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Indeed South Africa",
      url: "https://za.indeed.com",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Careers24",
      url: "https://www.careers24.com",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "PNET",
      url: "https://www.pnet.co.za",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "OfferZen",
      url: "https://www.offerzen.com",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Gumtree Jobs",
      url: "https://www.gumtree.co.za/jobs",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "RecruitMyMom",
      url: "https://www.recruitmymom.co.za",
    },
    {
      "@type": "ListItem",
      position: 8,
      name: "Public Service Vacancy Circular",
      url: "https://www.dpsa.gov.za",
    },
  ],
};

export default function JobSearchGuidesLayout({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {children}
    </>
  );
}
