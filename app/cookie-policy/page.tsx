import { Cookie } from "lucide-react";

export const metadata = {
  title: "Cookie Policy",
  description:
    "CareerCVPro Cookie Policy - Learn how we use cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
            <Cookie className="h-8 w-8 text-brand-teal" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">Last updated: December 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">
            This Cookie Policy explains how CareerCVPro uses cookies and similar
            technologies to recognize you when you visit our website.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">What are Cookies?</h2>
          <p className="text-muted-foreground">
            Cookies are small data files that are placed on your computer or
            mobile device when you visit a website. They are widely used to make
            websites work more efficiently and to provide information to website
            owners.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            How We Use Cookies
          </h2>
          <p className="text-muted-foreground">
            Cookie policy content coming soon. This page will contain detailed
            information about the types of cookies we use and how you can manage
            your preferences.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this Cookie Policy, please contact us at
            info@careercvpro.co.za
          </p>
        </div>
      </div>
    </div>
  );
}
