import { MapPin } from "lucide-react";

export const metadata = {
  title: "Jobs by Province",
  description:
    "Find jobs in all South African provinces - Gauteng, Western Cape, KwaZulu-Natal, Eastern Cape, Limpopo, and more.",
};

const provinces = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Free State",
  "Northern Cape",
];

export default function JobsByProvincePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
            <MapPin className="h-8 w-8 text-brand-teal" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Jobs by Province</h1>
          <p className="text-muted-foreground text-lg">
            Select a province to browse available job opportunities
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {provinces.map((province) => (
            <div
              key={province}
              className="p-6 bg-card border rounded-xl hover:shadow-lg hover:border-brand-teal transition-all cursor-pointer"
            >
              <MapPin className="h-5 w-5 text-brand-teal mb-2" />
              <h2 className="font-semibold">{province}</h2>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
