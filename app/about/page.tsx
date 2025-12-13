import { Users, Target, Heart, Award } from "lucide-react";

export const metadata = {
  title: "About Us",
  description:
    "Learn about CareerCVPro - South Africa's career platform. We don't just post jobs, we help South Africans get hired.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
            <Users className="h-8 w-8 text-brand-teal" />
          </div>
          <h1 className="text-4xl font-bold mb-4">About CareerCVPro</h1>
          <p className="text-muted-foreground text-lg">
            We don&apos;t just post jobs — we help South Africans get hired.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">
            CareerCVPro was founded with a simple mission: to bridge the gap
            between job seekers and employment opportunities in South Africa. We
            understand that finding a job is more than just browsing listings —
            it requires preparation, guidance, and the right tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-card border rounded-xl text-center">
            <Target className="h-8 w-8 text-brand-teal mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Our Mission</h3>
            <p className="text-sm text-muted-foreground">
              Help South Africans land their dream jobs
            </p>
          </div>
          <div className="p-6 bg-card border rounded-xl text-center">
            <Heart className="h-8 w-8 text-brand-teal mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Our Values</h3>
            <p className="text-sm text-muted-foreground">
              Honesty, support, and real results
            </p>
          </div>
          <div className="p-6 bg-card border rounded-xl text-center">
            <Award className="h-8 w-8 text-brand-teal mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Our Promise</h3>
            <p className="text-sm text-muted-foreground">
              Quality content and professional services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
