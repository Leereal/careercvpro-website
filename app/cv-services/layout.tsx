import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional CV Services | CareerCVPro",
  description:
    "Get your professional CV in less than an hour! CV writing from R80, Cover Letters R30, LinkedIn Optimization R150. Fast turnaround, unlimited revisions, ATS-optimized.",
  keywords: [
    "CareerCVPro",
    "Career CV Pro",
    "CV writing South Africa",
    "CV services",
    "professional CV",
    "CV revamp",
    "cover letter writing",
    "LinkedIn profile optimization",
    "cheap CV services",
    "fast CV writing",
    "ATS CV",
    "job application help",
  ],
  openGraph: {
    title: "Professional CV Services | CareerCVPro",
    description:
      "Get your professional CV in less than an hour! Starting from R80. Fast, affordable, guaranteed results.",
    type: "website",
    url: "https://www.careercvpro.co.za/cv-services",
  },
  alternates: {
    canonical: "https://www.careercvpro.co.za/cv-services",
  },
};

export default function CVServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
