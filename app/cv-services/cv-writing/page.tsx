import { PenTool } from "lucide-react";

export const metadata = {
  title: "CV Writing",
  description:
    "Professional CV written from scratch. Expert CV writing service for South African job seekers.",
};

export default function CVWritingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-teal to-brand-teal-dark rounded-2xl mb-6">
          <PenTool className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">CV Writing Service</h1>
        <p className="text-muted-foreground text-lg">
          Professional CV written from scratch by experts
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Service details and pricing coming soon.
        </p>
      </div>
    </div>
  );
}
