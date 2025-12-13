import { Sparkles, PenTool, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "CV Services",
  description:
    "Professional CV writing and revamp services for South African job seekers. Get a CV that gets you hired.",
};

const services = [
  {
    title: "CV Revamp",
    href: "/cv-services/cv-revamp",
    description:
      "Transform your existing CV into a job magnet. We'll enhance your current CV to highlight your strengths.",
    icon: Sparkles,
    popular: true,
  },
  {
    title: "CV Writing",
    href: "/cv-services/cv-writing",
    description:
      "Professional CV written from scratch. Perfect for career changers or those starting fresh.",
    icon: PenTool,
  },
  {
    title: "Cover Letter Writing",
    href: "/cv-services/cover-letter-writing",
    description:
      "Compelling cover letters that get noticed. Tailored to specific job applications.",
    icon: Mail,
  },
];

export default function CVServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-teal to-brand-teal-dark rounded-2xl mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Professional CV Services</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Not getting callbacks? Our professional CV services help South
            Africans stand out and get hired.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="relative p-8 bg-card border rounded-2xl hover:shadow-lg hover:border-brand-teal transition-all group"
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-brand-gold text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <service.icon className="h-10 w-10 text-brand-teal mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-muted-foreground text-sm mb-4">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-1 text-brand-teal font-medium text-sm">
                Learn More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-brand-teal/10 to-brand-gold/10 rounded-2xl text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-4">
            Contact us via WhatsApp for a free consultation
          </p>
          <Link
            href="/cv-services/order"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white font-semibold rounded-full hover:bg-brand-teal-dark transition-colors"
          >
            Order Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
