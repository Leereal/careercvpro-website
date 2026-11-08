import { MetadataRoute } from "next";
import {
  getAllJobs,
  getAllJobSitemapEntries,
  jobMatchesCategory,
  jobMatchesLocation,
} from "@/lib/wordpress";
import { getAllArticleSlugs } from "@/lib/articles";
import { cityData, provinceData } from "@/lib/job-locations";
import type { Job } from "@/types/wordpress";

const baseUrl = "https://www.careercvpro.co.za";

// Building the sitemap takes about ten WordPress requests and can take close to
// a minute, so serve a cached copy and rebuild it at most once an hour.
export const revalidate = 3600;

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

// Pages that always exist. They get no lastModified: a date that changes on
// every request tells Google nothing.
const staticPages: Array<{
  url: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}> = [
  // Main pages
  { url: "", priority: 1.0, changeFrequency: "daily" },
  { url: "/about", priority: 0.8, changeFrequency: "monthly" },
  { url: "/contact", priority: 0.7, changeFrequency: "monthly" },

  // CV Services
  { url: "/cv-services", priority: 0.9, changeFrequency: "weekly" },
  { url: "/cv-services/cv-writing", priority: 0.8, changeFrequency: "weekly" },
  { url: "/cv-services/cv-revamp", priority: 0.8, changeFrequency: "weekly" },
  {
    url: "/cv-services/cover-letter-writing",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    url: "/cv-services/linkedin-optimization",
    priority: 0.8,
    changeFrequency: "weekly",
  },

  // Career Tips
  { url: "/career-tips", priority: 0.7, changeFrequency: "weekly" },
  { url: "/career-tips/cv-guides", priority: 0.7, changeFrequency: "weekly" },
  {
    url: "/career-tips/interview-guides",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    url: "/career-tips/job-search-guides",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    url: "/career-tips/workplace-guides",
    priority: 0.7,
    changeFrequency: "weekly",
  },

  // Free Resources
  { url: "/free-resources", priority: 0.7, changeFrequency: "weekly" },
  {
    url: "/free-resources/cv-samples",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    url: "/free-resources/cover-letter-samples",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    url: "/free-resources/interview-questions",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    url: "/free-resources/career-checklists",
    priority: 0.7,
    changeFrequency: "weekly",
  },

  // Jobs index
  { url: "/jobs", priority: 0.9, changeFrequency: "daily" },

  // Legal pages
  { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { url: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
  { url: "/disclaimer", priority: 0.3, changeFrequency: "yearly" },
];

// Category + location combinations (e.g. /jobs/retail-jobs-in-gauteng).
// Every location must be a key of provinceData or cityData, or the route 404s.
const categories = [
  "security",
  "retail",
  "call-centre",
  "admin",
  "driver",
  "government",
  "learnerships",
  "internships",
  "it",
  "engineering",
  "finance",
  "hospitality",
  "healthcare",
  "sales",
  "marketing",
];

const categoryLocations = [
  "gauteng",
  "western-cape",
  "kwazulu-natal",
  "eastern-cape",
  "johannesburg",
  "cape-town",
  "durban",
  "pretoria",
];

function newestJobDate(jobs: Job[]): Date | undefined {
  const times = jobs
    .map((job) => new Date(job.postedDate).getTime())
    .filter((time) => !Number.isNaN(time));
  return times.length > 0 ? new Date(Math.max(...times)) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Three independent fetches; the job list pages through WordPress one
  // request at a time inside getAllJobSitemapEntries.
  const [recentResult, allJobsResult, articlesResult] =
    await Promise.allSettled([
      getAllJobs({ first: 100 }, { revalidate }),
      getAllJobSitemapEntries(),
      getAllArticleSlugs(),
    ]);

  // Province, city and category pages filter the newest 100 jobs (see
  // getJobsByLocation), and city and category pages return 404 when nothing
  // matches. Use the same jobs here so the sitemap only lists pages that load
  // and have jobs on them.
  let recentJobs: Job[] = [];
  if (recentResult.status === "fulfilled") {
    recentJobs = recentResult.value.jobs;
  } else {
    console.error("Failed to fetch recent jobs for sitemap:", recentResult.reason);
  }

  const listingPage = (
    slug: string,
    jobs: Job[],
    priority: number
  ): MetadataRoute.Sitemap[number] => ({
    url: `${baseUrl}/jobs/${slug}`,
    lastModified: newestJobDate(jobs),
    changeFrequency: "daily",
    priority,
  });

  for (const province of Object.keys(provinceData)) {
    const jobs = recentJobs.filter((job) => jobMatchesLocation(job, province));
    if (jobs.length > 0) entries.push(listingPage(province, jobs, 0.8));
  }

  for (const city of Object.keys(cityData)) {
    const jobs = recentJobs.filter((job) => jobMatchesLocation(job, city));
    if (jobs.length > 0) entries.push(listingPage(city, jobs, 0.85));
  }

  for (const category of categories) {
    for (const location of categoryLocations) {
      const jobs = recentJobs.filter(
        (job) =>
          jobMatchesLocation(job, location) && jobMatchesCategory(job, category)
      );
      if (jobs.length > 0) {
        entries.push(listingPage(`${category}-jobs-in-${location}`, jobs, 0.75));
      }
    }
  }

  // Every published job, not just the newest 100.
  if (allJobsResult.status === "fulfilled") {
    for (const job of allJobsResult.value) {
      const lastModified = new Date(job.modified || job.date);
      entries.push({
        url: `${baseUrl}/jobs/${job.slug}`,
        ...(!Number.isNaN(lastModified.getTime()) && { lastModified }),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  } else {
    console.error("Failed to fetch jobs for sitemap:", allJobsResult.reason);
  }

  // Career tips articles
  if (articlesResult.status === "fulfilled") {
    for (const slug of articlesResult.value) {
      entries.push({
        url: `${baseUrl}/career-tips/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } else {
    console.error("Failed to fetch articles for sitemap:", articlesResult.reason);
  }

  return entries;
}
