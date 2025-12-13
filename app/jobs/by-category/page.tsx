import { Grid3X3 } from "lucide-react";

export const metadata = {
  title: "Jobs by Category",
  description:
    "Browse jobs by industry - Security, Retail, Admin, Call Centre, Government, Teaching and more across South Africa.",
};

const categories = [
  "Security",
  "Retail",
  "Administration",
  "Call Centre",
  "Government",
  "Teaching",
  "Driving",
  "Hospitality",
  "IT & Technology",
  "Finance",
  "Healthcare",
  "Construction",
];

export default function JobsByCategoryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
            <Grid3X3 className="h-8 w-8 text-brand-teal" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Jobs by Category</h1>
          <p className="text-muted-foreground text-lg">
            Browse opportunities in your preferred industry
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category}
              className="p-6 bg-card border rounded-xl hover:shadow-lg hover:border-brand-teal transition-all cursor-pointer"
            >
              <h2 className="font-semibold">{category}</h2>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
