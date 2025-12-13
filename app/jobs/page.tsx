import type { Metadata } from "next";
import JobsPageClient from "./page.client";

export const metadata: Metadata = {
  title: "Jobs in South Africa | Find Employment Opportunities | CareerCVPro",
  description:
    "Find jobs across South Africa - Gauteng, Western Cape, KZN and all provinces. Security, retail, call centre, government jobs, learnerships and internships. Updated daily.",
  keywords: [
    "jobs in South Africa",
    "South African jobs",
    "employment South Africa",
    "jobs near me",
    "Gauteng jobs",
    "Cape Town jobs",
    "Durban jobs",
    "entry level jobs",
    "no experience jobs",
    "government jobs",
    "learnerships",
    "internships South Africa",
  ],
  openGraph: {
    title: "Jobs in South Africa | Find Employment Opportunities",
    description:
      "Browse thousands of jobs across all 9 provinces. Entry-level to senior positions, learnerships, and government jobs.",
    type: "website",
    locale: "en_ZA",
  },
  alternates: {
    canonical: "https://www.careercvpro.co.za/jobs",
  },
};

export default function JobsPage() {
  return <JobsPageClient />;
}
