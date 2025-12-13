import { FileCheck } from "lucide-react";

export const metadata = {
  title: "CV Samples",
  description:
    "Download free CV templates for any industry in South Africa. Professional formats that get results.",
};

export default function CVSamplesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
          <FileCheck className="h-8 w-8 text-brand-teal" />
        </div>
        <h1 className="text-4xl font-bold mb-4">CV Samples</h1>
        <p className="text-muted-foreground text-lg">
          Download free CV templates for any industry
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Templates coming soon.
        </p>
      </div>
    </div>
  );
}
