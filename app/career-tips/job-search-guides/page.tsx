import { Search } from "lucide-react";

export const metadata = {
  title: "Job Search Guides",
  description:
    "Proven job search strategies for South African job seekers. Learn where to find jobs and how to apply effectively.",
};

export default function JobSearchGuidesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
          <Search className="h-8 w-8 text-brand-teal" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Job Search Guides</h1>
        <p className="text-muted-foreground text-lg">
          Proven strategies to land your dream job in South Africa
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Articles coming soon.
        </p>
      </div>
    </div>
  );
}
