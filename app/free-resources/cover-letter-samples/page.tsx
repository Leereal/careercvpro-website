import { Mail } from "lucide-react";

export const metadata = {
  title: "Cover Letter Samples",
  description:
    "Free cover letter templates for South African job seekers. Professional examples that get noticed.",
};

export default function CoverLetterSamplesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
          <Mail className="h-8 w-8 text-brand-teal" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Cover Letter Samples</h1>
        <p className="text-muted-foreground text-lg">
          Professional cover letter examples that get you noticed
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Templates coming soon.
        </p>
      </div>
    </div>
  );
}
