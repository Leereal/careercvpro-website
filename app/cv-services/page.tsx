"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  PenTool,
  Mail,
  Linkedin,
  ArrowRight,
  Check,
  MessageCircle,
  FileText,
  Upload,
  User,
  MapPin,
  Phone,
  AtSign,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Heart,
  Clock,
  Shield,
  Star,
  Zap,
  ChevronDown,
  X,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  icon: React.ElementType;
  features: string[];
  popular?: boolean;
  turnaround: string;
}

const services: Service[] = [
  {
    id: "cv-only",
    title: "CV Only",
    description:
      "Professional CV written or revamped to highlight your skills and experience",
    price: 80,
    originalPrice: 250,
    icon: FileText,
    features: [
      "ATS-friendly format",
      "Professional layout",
      "Keyword optimization",
      "Unlimited revisions",
      "Word & PDF formats",
    ],
    popular: true,
    turnaround: "Less than 1 hour",
  },
  {
    id: "cover-letter",
    title: "Cover Letter Only",
    description:
      "Compelling cover letter tailored to your target job or industry",
    price: 30,
    originalPrice: 80,
    icon: Mail,
    features: [
      "Personalized content",
      "Job-specific targeting",
      "Professional tone",
      "Editable format",
    ],
    turnaround: "30 minutes",
  },
  {
    id: "cv-cover-combo",
    title: "CV + Cover Letter Combo",
    description: "Complete package: Professional CV plus matching cover letter",
    price: 100,
    originalPrice: 330,
    icon: PenTool,
    features: [
      "Everything in CV Only",
      "Matching cover letter",
      "Consistent branding",
      "Best value package",
      "Priority support",
    ],
    turnaround: "1-2 hours",
  },
  {
    id: "linkedin",
    title: "LinkedIn Profile Optimization",
    description:
      "Stand out to recruiters with a professionally optimized LinkedIn profile",
    price: 150,
    originalPrice: 500,
    icon: Linkedin,
    features: [
      "Headline optimization",
      "About section rewrite",
      "Experience enhancement",
      "Skills & endorsements",
      "Recruiter visibility tips",
    ],
    turnaround: "2-3 hours",
  },
];

const testimonials = [
  {
    name: "Thabo M.",
    role: "Got hired at FNB",
    content:
      "Within 2 weeks of using my new CV, I got 5 interview calls. Amazing service!",
    rating: 5,
  },
  {
    name: "Nomsa K.",
    role: "Administrative Assistant",
    content:
      "The turnaround was incredible - had my CV in 45 minutes. Very professional!",
    rating: 5,
  },
  {
    name: "David S.",
    role: "IT Professional",
    content:
      "My LinkedIn profile views increased by 300% after the optimization. Worth every rand!",
    rating: 5,
  },
];

const whyChooseUs = [
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Get your CV in less than an hour - perfect for urgent applications",
  },
  {
    icon: Shield,
    title: "Satisfaction Guaranteed",
    description: "Unlimited revisions until you're 100% happy with your CV",
  },
  {
    icon: Star,
    title: "Expert Writers",
    description: "Our team understands the South African job market",
  },
  {
    icon: Zap,
    title: "ATS Optimized",
    description: "CVs designed to pass Applicant Tracking Systems",
  },
];

export default function CVServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [hasExistingCV, setHasExistingCV] = useState<boolean | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    summary: "",
    skills: "",
    education: "",
    certifications: "",
    experience: "",
    volunteer: "",
    languages: "",
    additionalNotes: "",
  });

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setShowOrderForm(true);
    // Scroll to order form
    setTimeout(() => {
      document
        .getElementById("order-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getSelectedServiceDetails = () => {
    return services.find((s) => s.id === selectedService);
  };

  const handleSubmitOrder = () => {
    const service = getSelectedServiceDetails();
    if (!service) return;

    let whatsappMessage = "";

    if (hasExistingCV) {
      // Message for users with existing CV
      whatsappMessage = `👋 Hi there! I'd like to order your CV services.

✨ *Service Selected:* ${service.title}
💰 *Price:* R${service.price}

👉 I have an existing CV that I'll send for revamp.

*My Details:*
📛 Name: ${formData.fullName || "[To provide]"}
📧 Email: ${formData.email || "[To provide]"}
📱 Phone: ${formData.phone || "[To provide]"}

${
  formData.additionalNotes
    ? `📝 Additional Notes: ${formData.additionalNotes}`
    : ""
}

_I'll attach my current CV in the next message._`;
    } else {
      // Message for users without CV (need full details)
      whatsappMessage = `👋 Hi there! I'd like to order your CV services.

✨ *Service Selected:* ${service.title}
💰 *Price:* R${service.price}

📋 *My CV Details:*

1️⃣ *Full Name:* ${formData.fullName || "[Not provided]"}
2️⃣ *Address/City/Town:* ${formData.address || "[Not provided]"}
3️⃣ *Phone Number:* ${formData.phone || "[Not provided]"}
4️⃣ *Email:* ${formData.email || "[Not provided]"}
5️⃣ *Short Summary About Me:*
${formData.summary || "[Not provided]"}

6️⃣ *Skills:*
${formData.skills || "[Not provided]"}

7️⃣ *Education:*
${formData.education || "[Not provided]"}

8️⃣ *Certifications/Awards/Achievements:*
${formData.certifications || "[Not provided]"}

9️⃣ *Work Experience:*
${formData.experience || "[Not provided]"}

🔟 *Volunteer Work/Internships:*
${formData.volunteer || "[Not provided]"}

1️⃣1️⃣ *Languages:*
${formData.languages || "[Not provided]"}

${
  formData.additionalNotes
    ? `📝 Additional Notes: ${formData.additionalNotes}`
    : ""
}`;
    }

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/27749201395?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy to-brand-teal overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/30 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="h-4 w-4 text-brand-gold" />
              <span className="text-brand-gold text-sm font-semibold">
                🔥 Limited Time Promo - Up to 70% OFF!
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get Your <span className="text-brand-gold">Professional CV</span>
              <br />
              in Less Than an Hour
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Not getting callbacks? Our expert CV writers help South Africans
              stand out and land interviews. Fast, affordable, and guaranteed
              results.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold hover:bg-yellow-500 text-brand-navy font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Sparkles className="h-5 w-5" />
                View Pricing
              </a>
              <a
                href="https://wa.me/27749201395?text=Hi!%20I'm%20interested%20in%20your%20CV%20services.%20Can%20you%20tell%20me%20more?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ✨ Promo <span className="text-brand-gold">Price List</span> ✨
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the service that fits your needs. All prices include
              unlimited revisions until you&apos;re satisfied!
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl ${
                  selectedService === service.id
                    ? "border-brand-teal bg-brand-teal/5 shadow-xl"
                    : service.popular
                    ? "border-brand-gold bg-gradient-to-br from-brand-gold/5 to-brand-gold/10"
                    : "border-border bg-card hover:border-brand-teal/50"
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-brand-gold text-brand-navy text-xs font-bold rounded-full whitespace-nowrap">
                      🔥 Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div
                    className={`inline-flex p-3 rounded-xl mb-3 ${
                      service.popular
                        ? "bg-brand-gold/20 text-brand-gold"
                        : "bg-brand-teal/10 text-brand-teal"
                    }`}
                  >
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.description}
                  </p>
                </div>

                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-brand-teal">
                      R{service.price}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      R{service.originalPrice}
                    </span>
                  </div>
                  <p className="text-xs text-green-600 font-semibold">
                    Save R{service.originalPrice - service.price}!
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>{service.turnaround}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleServiceSelect(service.id)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    selectedService === service.id
                      ? "bg-brand-teal text-white"
                      : service.popular
                      ? "bg-brand-gold hover:bg-yellow-500 text-brand-navy"
                      : "bg-brand-teal/10 hover:bg-brand-teal hover:text-white text-brand-teal"
                  }`}
                >
                  {selectedService === service.id
                    ? "✓ Selected"
                    : "Select This"}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Order Form Section */}
      <AnimatePresence>
        {showOrderForm && (
          <motion.section
            id="order-form"
            className="py-16 lg:py-24 bg-muted/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Complete Your <span className="text-brand-teal">Order</span>
                  </h2>
                  <p className="text-muted-foreground">
                    You selected:{" "}
                    <span className="font-semibold text-brand-teal">
                      {getSelectedServiceDetails()?.title}
                    </span>{" "}
                    -{" "}
                    <span className="font-bold text-brand-gold">
                      R{getSelectedServiceDetails()?.price}
                    </span>
                  </p>
                </motion.div>

                <motion.div
                  className="bg-card rounded-2xl border p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* CV Status Question */}
                  {hasExistingCV === null ? (
                    <div className="text-center py-8">
                      <h3 className="text-xl font-semibold mb-6">
                        Do you have an existing CV to revamp?
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={() => setHasExistingCV(true)}
                          className="px-8 py-4 bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <FileText className="h-5 w-5" />
                          Yes, I have a CV
                        </button>
                        <button
                          onClick={() => setHasExistingCV(false)}
                          className="px-8 py-4 bg-brand-gold hover:bg-yellow-500 text-brand-navy font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <PenTool className="h-5 w-5" />
                          No, create from scratch
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        If you have an existing CV, you&apos;ll just send it to
                        us on WhatsApp.
                        <br />
                        If not, we&apos;ll need some information to create your
                        CV.
                      </p>
                    </div>
                  ) : hasExistingCV ? (
                    /* Form for users WITH existing CV */
                    <div className="space-y-6">
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <p className="text-green-700 dark:text-green-400 text-sm">
                          <strong>Great!</strong> You&apos;ll just need to
                          provide basic contact details. After clicking the
                          button below, please send your existing CV as an
                          attachment on WhatsApp.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            <User className="h-4 w-4 inline mr-2" />
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            <AtSign className="h-4 w-4 inline mr-2" />
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <Phone className="h-4 w-4 inline mr-2" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal"
                          placeholder="+27 XX XXX XXXX"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          name="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal resize-none"
                          placeholder="Any specific requirements or target job/industry?"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                          onClick={() => setHasExistingCV(null)}
                          className="px-6 py-3 border border-border rounded-xl hover:bg-muted transition-colors"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={handleSubmitOrder}
                          className="flex-1 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="h-5 w-5" />
                          Send Order via WhatsApp
                        </button>
                      </div>

                      <p className="text-sm text-muted-foreground text-center">
                        💡 Remember to attach your existing CV in the WhatsApp
                        chat!
                      </p>
                    </div>
                  ) : (
                    /* Form for users WITHOUT existing CV */
                    <div className="space-y-6">
                      <div className="p-4 bg-brand-gold/10 border border-brand-gold/30 rounded-xl">
                        <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                          <strong>No problem!</strong> Please fill in as much
                          information as you can. We&apos;ll create your
                          professional CV from scratch.
                        </p>
                      </div>

                      {/* Basic Info */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg border-b pb-2">
                          Basic Information
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              <User className="h-4 w-4 inline mr-2" />
                              1️⃣ Full Name *
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              <MapPin className="h-4 w-4 inline mr-2" />
                              2️⃣ Address / City / Town *
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                              placeholder="e.g., Sandton, Johannesburg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              <Phone className="h-4 w-4 inline mr-2" />
                              3️⃣ Phone Number *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                              placeholder="+27 XX XXX XXXX"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              <AtSign className="h-4 w-4 inline mr-2" />
                              4️⃣ Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Summary */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <Heart className="h-4 w-4 inline mr-2" />
                          5️⃣ Short Summary About You (2-3 lines)
                        </label>
                        <textarea
                          name="summary"
                          value={formData.summary}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 resize-none"
                          placeholder="Brief description of yourself, career goals, and what makes you a great candidate..."
                        />
                      </div>

                      {/* Skills */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <Sparkles className="h-4 w-4 inline mr-2" />
                          6️⃣ Skills (list your top skills)
                        </label>
                        <textarea
                          name="skills"
                          value={formData.skills}
                          onChange={handleChange}
                          rows={2}
                          className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 resize-none"
                          placeholder="e.g., Microsoft Office, Customer Service, Communication, Problem Solving..."
                        />
                      </div>

                      {/* Education */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <GraduationCap className="h-4 w-4 inline mr-2" />
                          7️⃣ Education (qualification, institution, year)
                        </label>
                        <textarea
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 resize-none"
                          placeholder="e.g., Matric Certificate, XYZ High School, 2020&#10;National Diploma in Business, Tshwane University, 2023"
                        />
                      </div>

                      {/* Certifications */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <Award className="h-4 w-4 inline mr-2" />
                          8️⃣ Certifications / Awards / Achievements
                        </label>
                        <textarea
                          name="certifications"
                          value={formData.certifications}
                          onChange={handleChange}
                          rows={2}
                          className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 resize-none"
                          placeholder="e.g., ICDL Certificate, First Aid Certificate, Employee of the Month..."
                        />
                      </div>

                      {/* Work Experience */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <Briefcase className="h-4 w-4 inline mr-2" />
                          9️⃣ Work Experience (for each job: title, company,
                          dates, main duties)
                        </label>
                        <textarea
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 resize-none"
                          placeholder="e.g., Customer Service Representative, ABC Company, Jan 2022 - Present&#10;- Handled customer inquiries and complaints&#10;- Processed orders and returns&#10;- Maintained customer records"
                        />
                      </div>

                      {/* Volunteer */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          🔟 Volunteer Work / Internships (if any)
                        </label>
                        <textarea
                          name="volunteer"
                          value={formData.volunteer}
                          onChange={handleChange}
                          rows={2}
                          className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 resize-none"
                          placeholder="e.g., Volunteer Tutor, Community Center, 2021..."
                        />
                      </div>

                      {/* Languages */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <Languages className="h-4 w-4 inline mr-2" />
                          1️⃣1️⃣ Languages
                        </label>
                        <input
                          type="text"
                          name="languages"
                          value={formData.languages}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                          placeholder="e.g., English (Fluent), Zulu (Native), Afrikaans (Basic)"
                        />
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Additional Notes / Target Job (Optional)
                        </label>
                        <textarea
                          name="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={handleChange}
                          rows={2}
                          className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50 resize-none"
                          placeholder="Any specific requirements or target job/industry?"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                          onClick={() => setHasExistingCV(null)}
                          className="px-6 py-3 border border-border rounded-xl hover:bg-muted transition-colors"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={handleSubmitOrder}
                          className="flex-1 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="h-5 w-5" />
                          Send Order via WhatsApp
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Change Service */}
                <div className="text-center mt-6">
                  <button
                    onClick={() => {
                      setShowOrderForm(false);
                      setSelectedService(null);
                      setHasExistingCV(null);
                    }}
                    className="text-sm text-muted-foreground hover:text-brand-teal transition-colors"
                  >
                    ← Change selected service
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-brand-teal">CareerCVPro</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We&apos;re committed to helping South Africans succeed in their
              job search
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6 rounded-2xl bg-card border hover:shadow-lg transition-all"
              >
                <div className="inline-flex p-3 rounded-xl bg-brand-teal/10 text-brand-teal mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-brand-gold">Clients Say</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Real results from real South Africans
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-card border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-brand-gold text-brand-gold"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-brand-teal">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="relative bg-gradient-to-r from-brand-navy to-brand-teal rounded-3xl p-8 lg:p-12 overflow-hidden"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Land Your Dream Job?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Don&apos;t let a weak CV hold you back. Get your professional CV
                today and start getting callbacks!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold hover:bg-yellow-500 text-brand-navy font-bold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="h-5 w-5" />
                  Get Started Now
                </a>
                <a
                  href="https://wa.me/27749201395"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300"
                >
                  <MessageCircle className="h-5 w-5" />
                  Ask a Question
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
