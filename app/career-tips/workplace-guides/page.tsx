import { Building2 } from "lucide-react";

export const metadata = {
  title: "Workplace Guides",
  description:
    "Thrive in your new role from day one. Professional tips for success in the South African workplace.",
};

export default function WorkplaceGuidesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
          <Building2 className="h-8 w-8 text-brand-teal" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Workplace Guides</h1>
        <p className="text-muted-foreground text-lg">
          Thrive in your new role from day one
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Articles coming soon.
        </p>
      </div>
    </div>
  );
}
