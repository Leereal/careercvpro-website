import { Briefcase } from "lucide-react";

export const metadata = {
  title: "Job Details",
  description: "View job details and apply for positions across South Africa.",
};

export default function JobDetailsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
          <Briefcase className="h-8 w-8 text-brand-teal" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Job Details</h1>
        <p className="text-muted-foreground text-lg">
          Job details page - This page will display individual job information.
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Content coming soon.
        </p>
      </div>
    </div>
  );
}
