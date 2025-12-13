import { HelpCircle } from "lucide-react";

export const metadata = {
  title: "Interview Questions",
  description:
    "Common interview questions and best answers for South African job seekers. Prepare for your next interview.",
};

export default function InterviewQuestionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
          <HelpCircle className="h-8 w-8 text-brand-teal" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Interview Questions</h1>
        <p className="text-muted-foreground text-lg">
          Common questions & best answers for South African interviews
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Content coming soon.
        </p>
      </div>
    </div>
  );
}
