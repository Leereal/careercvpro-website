import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description:
    "CareerCVPro Privacy Policy - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
            <Shield className="h-8 w-8 text-brand-teal" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: December 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">
            At CareerCVPro, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            Information We Collect
          </h2>
          <p className="text-muted-foreground">
            Privacy policy content coming soon. This page will contain detailed
            information about data collection, usage, and your rights.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this Privacy Policy, please contact us
            at info@careercvpro.co.za
          </p>
        </div>
      </div>
    </div>
  );
}
