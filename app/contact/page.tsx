import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with CareerCVPro. Contact us for job inquiries, CV services, or general questions.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-2xl mb-6">
            <Mail className="h-8 w-8 text-brand-teal" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            We&apos;d love to hear from you. Get in touch with our team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="p-6 bg-card border rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-teal/10 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat with us directly for quick responses
                  </p>
                  <a
                    href="#"
                    className="text-brand-teal font-medium text-sm mt-2 inline-block"
                  >
                    Start Chat →
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card border rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-teal/10 rounded-lg">
                  <Mail className="h-6 w-6 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    Send us an email anytime
                  </p>
                  <a
                    href="mailto:info@careercvpro.co.za"
                    className="text-brand-teal font-medium text-sm mt-2 inline-block"
                  >
                    info@careercvpro.co.za
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card border rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-teal/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">South Africa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-card border rounded-xl">
            <h3 className="font-semibold mb-4">Send us a Message</h3>
            <p className="text-sm text-muted-foreground">
              Contact form coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
