import type { Metadata } from "next";
import { getAllJobs } from "@/lib/wordpress";
import HomePageClient from "./HomePageClient";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "CareerCVPro | Jobs in South Africa & Professional CV Services",
  description:
    "Find jobs across South Africa - Gauteng, Western Cape, KZN and all provinces. Get professional CV writing services from R80. Security, retail, call centre, government jobs, learnerships and internships.",
  keywords: [
    "CareerCVPro",
    "Career CV Pro",
    "jobs in South Africa",
    "South African jobs",
    "employment South Africa",
    "CV writing South Africa",
    "professional CV services",
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
    title: "CareerCVPro | Jobs in South Africa & Professional CV Services",
    description:
      "Browse thousands of jobs across all 9 provinces. Entry-level to senior positions, learnerships, and government jobs. Professional CV services from R80.",
    type: "website",
    locale: "en_ZA",
    url: "https://www.careercvpro.co.za",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerCVPro | Jobs in South Africa",
    description:
      "Find jobs across South Africa. Get professional CV writing services from R80.",
  },
  alternates: {
    canonical: "https://www.careercvpro.co.za",
  },
};

export default async function HomePage() {
  // Fetch latest jobs from WordPress
  let jobs: Awaited<ReturnType<typeof getAllJobs>>["jobs"] = [];

  try {
    const result = await getAllJobs({ first: 6 });
    jobs = result.jobs;
  } catch (error) {
    console.error("Failed to fetch jobs for homepage:", error);
    jobs = [];
  }

  return <HomePageClient jobs={jobs} />;
}
