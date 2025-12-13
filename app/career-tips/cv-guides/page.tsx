import { FileText } from "lucide-react";

export const metadata = {
  title: "CV Guides",
  description:
    "Learn how to write a winning CV for the South African job market. Expert tips on formatting, content, and ATS optimization.",
};

export default function CVGuidesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
          <FileText className="h-8 w-8 text-brand-teal" />
        </div>
        <h1 className="text-4xl font-bold mb-4">CV Guides</h1>
        <p className="text-muted-foreground text-lg">
          Learn how to write a winning CV for the South African job market
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Articles coming soon.
        </p>
      </div>
    </div>
  );
}
