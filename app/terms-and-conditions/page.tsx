import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions",
  description:
    "CareerCVPro Terms and Conditions - Read our terms of service and usage guidelines.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
            <FileText className="h-8 w-8 text-brand-teal" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-muted-foreground">Last updated: December 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">
            Welcome to CareerCVPro. By accessing and using this website, you
            accept and agree to be bound by the terms and provisions of this
            agreement.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Use of Website</h2>
          <p className="text-muted-foreground">
            Terms and conditions content coming soon. This page will contain
            detailed information about website usage, user responsibilities, and
            limitations.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about these Terms, please contact us at
            info@careercvpro.co.za
          </p>
        </div>
      </div>
    </div>
  );
}
