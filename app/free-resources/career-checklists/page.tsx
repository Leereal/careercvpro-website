import { ClipboardList } from "lucide-react";

export const metadata = {
  title: "Career Checklists",
  description:
    "Job search and application checklists for South African job seekers. Stay organized and land your dream job.",
};

export default function CareerChecklistsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
          <ClipboardList className="h-8 w-8 text-brand-teal" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Career Checklists</h1>
        <p className="text-muted-foreground text-lg">
          Stay organized with our job search and application checklists
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Checklists coming soon.
        </p>
      </div>
    </div>
  );
}
