import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.careercvpro.co.za";

  // Static pages with their priorities and change frequencies
  const staticPages = [
    // Main pages
    { url: "", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.7, changeFrequency: "monthly" as const },

    // CV Services
    { url: "/cv-services", priority: 0.9, changeFrequency: "weekly" as const },
    {
      url: "/cv-services/cv-writing",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      url: "/cv-services/cv-revamp",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      url: "/cv-services/cover-letter-writing",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      url: "/cv-services/linkedin-optimization",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },

    // Career Tips
    {
      url: "/career-tips/cv-guides",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      url: "/career-tips/interview-guides",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      url: "/career-tips/job-search-guides",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      url: "/career-tips/workplace-guides",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },

    // Free Resources
    {
      url: "/free-resources/cv-samples",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      url: "/free-resources/cover-letter-samples",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      url: "/free-resources/interview-questions",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      url: "/free-resources/career-checklists",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },

    // Jobs (placeholder - will be dynamic in future)
    { url: "/jobs", priority: 0.9, changeFrequency: "daily" as const },

    // Legal pages
    {
      url: "/privacy-policy",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    {
      url: "/terms-of-service",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    { url: "/disclaimer", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  // Province-specific job pages (for future expansion)
  const provincePages = [
    "gauteng",
    "western-cape",
    "kwazulu-natal",
    "eastern-cape",
    "limpopo",
    "mpumalanga",
    "free-state",
    "north-west",
    "northern-cape",
  ].map((province) => ({
    url: `/jobs/${province}`,
    priority: 0.8,
    changeFrequency: "daily" as const,
  }));

  // Category-specific job pages (for future expansion)
  const categoryPages = [
    "security-jobs",
    "retail-jobs",
    "call-centre-jobs",
    "admin-jobs",
    "driver-jobs",
    "government-jobs",
    "learnerships",
    "internships",
  ].map((category) => ({
    url: `/jobs/${category}`,
    priority: 0.8,
    changeFrequency: "daily" as const,
  }));

  // Combine all pages
  const allPages = [...staticPages, ...provincePages, ...categoryPages];

  // Generate sitemap entries
  return allPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
