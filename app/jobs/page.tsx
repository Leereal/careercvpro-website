import type { Metadata } from "next";
import JobsPageClient from "./page.client";
import { getAllJobs, getProvinces, getJobCategories } from "@/lib/wordpress";

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

export default async function JobsPage() {
  // Fetch data from WordPress
  let jobs: Awaited<ReturnType<typeof getAllJobs>>["jobs"] = [];
  let provinces: Awaited<ReturnType<typeof getProvinces>> = [];
  let categories: Awaited<ReturnType<typeof getJobCategories>> = [];

  try {
    const [jobsResult, provincesResult, categoriesResult] = await Promise.all([
      getAllJobs({ first: 100 }),
      getProvinces(),
      getJobCategories(),
    ]);

    jobs = jobsResult.jobs;
    provinces = provincesResult;
    categories = categoriesResult;
  } catch (error) {
    console.error("Failed to fetch from WordPress:", error);
    // Jobs will be empty, client shows "no jobs" state
  }

  return (
    <JobsPageClient
      initialJobs={jobs}
      provinces={provinces}
      categories={categories}
    />
  );
}
