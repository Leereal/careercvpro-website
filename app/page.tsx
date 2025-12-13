import Link from "next/link";
import { ArrowRight, Briefcase, FileText, Users, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-teal-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-6">
              <Sparkles className="h-4 w-4 text-brand-gold" />
              <span>South Africa&apos;s Career Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              We Don&apos;t Just Post Jobs —{" "}
              <span className="text-brand-gold">We Help You Get Hired</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Find jobs across South Africa, get expert career tips, and access
              professional CV services to boost your chances of landing your
              dream job.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/jobs"
                className="flex items-center gap-2 px-8 py-4 bg-brand-teal text-white font-semibold rounded-full hover:bg-brand-teal-dark transition-all hover:scale-105"
              >
                <Briefcase className="h-5 w-5" />
                Browse Jobs
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/cv-services"
                className="flex items-center gap-2 px-8 py-4 bg-white text-brand-navy font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105"
              >
                <FileText className="h-5 w-5" />
                CV Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-brand-teal">1000+</p>
              <p className="text-muted-foreground">Active Jobs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-teal">9</p>
              <p className="text-muted-foreground">Provinces Covered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-teal">500+</p>
              <p className="text-muted-foreground">CVs Written</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-teal">50+</p>
              <p className="text-muted-foreground">Career Guides</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Content Placeholder */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">More Content Coming Soon</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We&apos;re building South Africa&apos;s most comprehensive career
            platform. Check back soon for job listings, career tips, and free
            resources.
          </p>
        </div>
      </section>
    </div>
  );
}
