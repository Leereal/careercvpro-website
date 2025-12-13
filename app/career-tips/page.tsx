import {
  BookOpen,
  FileText,
  MessageSquare,
  Search,
  Building2,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Career Tips",
  description:
    "Expert career advice for South African job seekers. CV guides, interview tips, job search strategies and workplace guides.",
};

const categories = [
  {
    title: "CV Guides",
    href: "/career-tips/cv-guides",
    description: "Learn how to write a winning South African CV",
    icon: FileText,
  },
  {
    title: "Interview Guides",
    href: "/career-tips/interview-guides",
    description: "Ace your next interview with expert tips",
    icon: MessageSquare,
  },
  {
    title: "Job Search Guides",
    href: "/career-tips/job-search-guides",
    description: "Proven strategies to land your dream job",
    icon: Search,
  },
  {
    title: "Workplace Guides",
    href: "/career-tips/workplace-guides",
    description: "Thrive in your new role from day one",
    icon: Building2,
  },
];

export default function CareerTipsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
            <BookOpen className="h-8 w-8 text-brand-teal" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Career Tips & Guides</h1>
          <p className="text-muted-foreground text-lg">
            Expert advice to help you succeed in your job search and career
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="p-8 bg-card border rounded-2xl hover:shadow-lg hover:border-brand-teal transition-all group"
            >
              <category.icon className="h-10 w-10 text-brand-teal mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
