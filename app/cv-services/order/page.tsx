import { ShoppingCart } from "lucide-react";

export const metadata = {
  title: "Order CV Services",
  description:
    "Order professional CV services. Get started with your CV revamp or writing service today.",
};

export default function OrderPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-teal to-brand-teal-dark rounded-2xl mb-6">
          <ShoppingCart className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Order CV Services</h1>
        <p className="text-muted-foreground text-lg">
          Start your order and get your professional CV
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Order form coming soon.
        </p>
      </div>
    </div>
  );
}
