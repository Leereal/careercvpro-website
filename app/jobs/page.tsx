import type { Metadata } from "next";
import JobsPageClient from "./page.client";
import { getAllJobs, getProvinces, getJobCategories } from "@/lib/wordpress";

// Served from cache and rebuilt in the background at most every 5 minutes
// (JOBS_REVALIDATE_SECONDS in lib/wordpress.ts).
export const revalidate = 300;

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
  // Fetch data from WordPress. A WordPress error is left to throw so an empty
  // list isn't cached; Next keeps serving the last good copy instead.
  // getProvinces and getJobCategories fall back to built-in lists themselves.
  const [{ jobs }, provinces, categories] = await Promise.all([
    getAllJobs({ first: 100 }),
    getProvinces(),
    getJobCategories(),
  ]);

  return (
    <JobsPageClient
      initialJobs={jobs}
      provinces={provinces}
      categories={categories}
    />
  );
}
