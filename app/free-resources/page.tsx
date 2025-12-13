import {
  Download,
  FileCheck,
  Mail,
  HelpCircle,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Free Resources",
  description:
    "Free CV samples, cover letter templates, interview questions and career checklists for South African job seekers.",
};

const resources = [
  {
    title: "CV Samples",
    href: "/free-resources/cv-samples",
    description: "Download free CV templates for any industry",
    icon: FileCheck,
  },
  {
    title: "Cover Letter Samples",
    href: "/free-resources/cover-letter-samples",
    description: "Professional cover letter examples",
    icon: Mail,
  },
  {
    title: "Interview Questions",
    href: "/free-resources/interview-questions",
    description: "Common questions & best answers",
    icon: HelpCircle,
  },
  {
    title: "Career Checklists",
    href: "/free-resources/career-checklists",
    description: "Job search & application checklists",
    icon: ClipboardList,
  },
];

export default function FreeResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
            <Download className="h-8 w-8 text-brand-teal" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Free Resources</h1>
          <p className="text-muted-foreground text-lg">
            Download free templates and guides to boost your job search
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="p-8 bg-card border rounded-2xl hover:shadow-lg hover:border-brand-teal transition-all group"
            >
              <resource.icon className="h-10 w-10 text-brand-teal mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
              <p className="text-muted-foreground">{resource.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
