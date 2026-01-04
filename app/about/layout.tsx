import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CareerCVPro | South Africa's Career Platform",
  description:
    "Learn about CareerCVPro - South Africa's dedicated career platform helping job seekers find employment with professional CV services, job listings, and career guidance.",
  keywords: [
    "CareerCVPro",
    "Career CV Pro",
    "about CareerCVPro",
    "South Africa career platform",
    "job search South Africa",
    "CV writing company",
    "career guidance South Africa",
    "employment assistance",
  ],
  openGraph: {
    title: "About CareerCVPro | South Africa's Career Platform",
    description:
      "CareerCVPro helps South Africans get hired with professional CV services, curated job listings, and expert career guidance.",
    type: "website",
    url: "https://www.careercvpro.co.za/about",
  },
  alternates: {
    canonical: "https://www.careercvpro.co.za/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
