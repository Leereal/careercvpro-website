import { MessageSquare } from "lucide-react";

export const metadata = {
  title: "Interview Guides",
  description:
    "Ace your next job interview with expert tips. Common questions, best answers, and interview preparation strategies.",
};

export default function InterviewGuidesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
          <MessageSquare className="h-8 w-8 text-brand-teal" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Interview Guides</h1>
        <p className="text-muted-foreground text-lg">
          Ace your next interview with expert tips and strategies
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Articles coming soon.
        </p>
      </div>
    </div>
  );
}
