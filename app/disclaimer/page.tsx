import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Disclaimer",
  description:
    "CareerCVPro Disclaimer - Important information about our job listings and services.",
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
            <AlertTriangle className="h-8 w-8 text-brand-teal" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
          <p className="text-muted-foreground">Last updated: December 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl mb-8">
            <p className="text-amber-800 dark:text-amber-200 font-medium">
              We do not charge for job applications. Employers recruit
              independently.
            </p>
          </div>

          <p className="text-muted-foreground">
            The information provided on CareerCVPro is for general informational
            purposes only. While we strive to keep the information up to date
            and correct, we make no representations or warranties of any kind
            about the completeness, accuracy, reliability, suitability, or
            availability of the information.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Job Listings</h2>
          <p className="text-muted-foreground">
            CareerCVPro is a platform that aggregates and shares job
            opportunities. We are not the employers and do not make hiring
            decisions. Always verify job opportunities directly with the hiring
            company.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">CV Services</h2>
          <p className="text-muted-foreground">
            Our CV services are designed to improve your application materials.
            However, we cannot guarantee employment outcomes as hiring decisions
            are made solely by employers.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this Disclaimer, please contact us at
            info@careercvpro.co.za
          </p>
        </div>
      </div>
    </div>
  );
}
