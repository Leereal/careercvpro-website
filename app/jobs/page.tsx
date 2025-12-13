import { Briefcase, MapPin, Grid3X3 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Jobs",
  description:
    "Find jobs across South Africa - Gauteng, Western Cape, KZN and all provinces. Entry-level, no experience, and professional positions available.",
};

export default function JobsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
          <Briefcase className="h-8 w-8 text-brand-teal" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Browse Jobs</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Find your next opportunity across South Africa. Browse by province or
          category.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Link
            href="/jobs/by-province"
            className="p-8 bg-card border rounded-2xl hover:shadow-lg hover:border-brand-teal transition-all group"
          >
            <MapPin className="h-10 w-10 text-brand-teal mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-semibold mb-2">Jobs by Province</h2>
            <p className="text-muted-foreground">
              Find jobs in Gauteng, Western Cape, KwaZulu-Natal and more
            </p>
          </Link>

          <Link
            href="/jobs/by-category"
            className="p-8 bg-card border rounded-2xl hover:shadow-lg hover:border-brand-teal transition-all group"
          >
            <Grid3X3 className="h-10 w-10 text-brand-teal mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-semibold mb-2">Jobs by Category</h2>
            <p className="text-muted-foreground">
              Security, Retail, Admin, Call Centre, Government and more
            </p>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground mt-12">
          Job listings coming soon. We&apos;re currently building our database.
        </p>
      </div>
    </div>
  );
}
