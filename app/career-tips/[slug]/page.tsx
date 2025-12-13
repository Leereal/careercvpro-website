import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Article",
  description: "Career advice and tips for South African job seekers.",
};

export default function ArticlePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
          <BookOpen className="h-8 w-8 text-brand-teal" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Article</h1>
        <p className="text-muted-foreground text-lg">
          This page will display individual career articles.
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Content coming soon.
        </p>
      </div>
    </div>
  );
}
