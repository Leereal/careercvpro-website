"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  Clock,
  Shield,
  Star,
  Phone,
  ChevronDown,
  FileText,
  RefreshCw,
  Target,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Users,
  Upload,
  X,
  Loader2,
  MessageCircle,
  User,
  Mail,
  FileUp,
  PenTool,
  MapPin,
  Heart,
  GraduationCap,
  Award,
  Briefcase,
  Languages,
} from "lucide-react";
import { submitCVOrder, type LeadData } from "@/lib/actions/cv-order";
import { toast } from "sonner";

// ============================================
// TYPE DEFINITIONS
// ============================================

interface CVTemplate {
  id: string;
  name: string;
  description: string;
  image: string;
  popular?: boolean;
}

interface ServicePackage {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  originalPrice?: string;
  description: string;
  features: string[];
  popular?: boolean;
  requiresTemplate: boolean;
}

// ============================================
// DATA
// ============================================

const templates: CVTemplate[] = [
  {
    id: "classic-ats",
    name: "Classic ATS Friendly",
    description: "Pass any ATS system with this optimized format",
    image: "/img2.png",
    popular: true,
  },
  {
    id: "modern-ats",
    name: "Modern ATS Friendly",
    description: "Modern design that still passes ATS systems",
    image: "/img4.png",
    popular: true,
  },
  {
    id: "professional-modern",
    name: "Professional Modern",
    description: "Eye-catching design for direct applications",
    image: "/img1.png",
  },
  {
    id: "professional-photo",
    name: "Professional with Photo",
    description: "Add your professional photo for impact",
    image: "/img3.png",
  },
];

const servicePackages: ServicePackage[] = [
  {
    id: "cv-revamp",
    name: "CV Revamp",
    price: "R80",
    priceValue: 80,
    originalPrice: "R250",
    description: "Transform your existing CV into a powerful document",
    features: [
      "ATS-optimized format",
      "Achievement-focused content",
      "Professional formatting",
      "Less than 1 hour delivery",
    ],
    popular: true,
    requiresTemplate: true,
  },
  {
    id: "cv-cover-combo",
    name: "CV + Cover Letter",
    price: "R100",
    priceValue: 100,
    description: "Complete application package",
    features: [
      "Professional CV revamp",
      "Matching cover letter",
      "Tailored to your job",
      "Best value combo",
    ],
    popular: true,
    requiresTemplate: true,
  },
  {
    id: "cover-letter",
    name: "Cover Letter Only",
    price: "R30",
    priceValue: 30,
    description: "Compelling cover letter for your application",
    features: ["Tailored to your job", "Professional tone", "Quick turnaround"],
    requiresTemplate: false,
  },
  {
    id: "linkedin",
    name: "LinkedIn Profile",
    price: "R150",
    priceValue: 150,
    originalPrice: "R500",
    description: "Profile creation or optimization",
    features: [
      "Professional headline",
      "Optimized summary",
      "Keyword-rich content",
    ],
    requiresTemplate: false,
  },
  {
    id: "complete-package",
    name: "Complete Package",
    price: "R250",
    priceValue: 250,
    description: "CV + Cover Letter + LinkedIn",
    features: [
      "Everything you need",
      "Maximum impact",
      "Career transformation",
    ],
    popular: true,
    requiresTemplate: true,
  },
];

// ============================================
// COMPONENTS
// ============================================

// Before/After Comparison Component
function BeforeAfterComparison() {
  const [showAfter, setShowAfter] = useState(false);

  const beforeIssues = [
    "Generic objective statement",
    "Duties-focused descriptions",
    "Inconsistent formatting",
    "No keywords for ATS",
    "Missing achievements",
    "Outdated contact info format",
  ];

  const afterImprovements = [
    "Powerful professional summary",
    "Achievement-focused bullets",
    "Clean, modern layout",
    "ATS-optimized keywords",
    "Quantified accomplishments",
    "Professional contact section",
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setShowAfter(false)}
          className={`flex-1 py-4 px-6 font-semibold transition-colors ${
            !showAfter
              ? "bg-red-50 text-red-700 border-b-2 border-red-500"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <XCircle className="h-5 w-5" />
            Before Revamp
          </span>
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className={`flex-1 py-4 px-6 font-semibold transition-colors ${
            showAfter
              ? "bg-green-50 text-green-700 border-b-2 border-green-500"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            After Revamp
          </span>
        </button>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {!showAfter ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-3"
            >
              {beforeIssues.map((issue, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-red-50 rounded-lg"
                >
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span className="text-red-700">{issue}</span>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {afterImprovements.map((improvement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-green-700">{improvement}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// FAQ Accordion
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-semibold text-brand-navy pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5">
              <p className="text-muted-foreground">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Process Step Component
function ProcessStep({
  number,
  title,
  description,
  icon: Icon,
  isLast = false,
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  isLast?: boolean;
}) {
  return (
    <motion.div
      className="relative flex gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-brand-teal rounded-full flex items-center justify-center text-white font-bold text-lg">
          {number}
        </div>
        {!isLast && <div className="w-0.5 h-full bg-brand-teal/20 mt-2" />}
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="h-5 w-5 text-brand-teal" />
          <h3 className="font-bold text-brand-navy text-lg">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

// File Upload Component
function FileUpload({
  file,
  onFileSelect,
  onRemove,
}: {
  file: File | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        onFileSelect(droppedFile);
      }
    },
    [onFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        onFileSelect(selectedFile);
      }
    },
    [onFileSelect],
  );

  if (file) {
    return (
      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
        <FileText className="h-8 w-8 text-green-600" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-green-800 truncate">{file.name}</p>
          <p className="text-sm text-green-600">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
        <button
          onClick={onRemove}
          className="p-2 hover:bg-green-100 rounded-lg transition-colors"
          type="button"
        >
          <X className="h-5 w-5 text-green-700" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
        isDragging
          ? "border-brand-teal bg-brand-teal/5"
          : "border-gray-300 hover:border-brand-teal/50 hover:bg-gray-50"
      }`}
    >
      <input
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <p className="font-medium text-gray-700 mb-1">
        Drop your CV here or click to upload
      </p>
      <p className="text-sm text-gray-500">
        PDF, DOC, DOCX, JPG, PNG (max 10MB)
      </p>
    </div>
  );
}

// Order Form Component (wrapped for Suspense)
function OrderFormContent() {
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState<string>("cv-revamp");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [hasExistingCV, setHasExistingCV] = useState<boolean | null>(null);

  // Form data for users without CV
  const [formData, setFormData] = useState({
    address: "",
    summary: "",
    skills: "",
    education: "",
    certifications: "",
    experience: "",
    volunteer: "",
    languages: "",
    additionalNotes: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectedPackage = servicePackages.find(
    (pkg) => pkg.id === selectedService,
  );
  const needsTemplate = selectedPackage?.requiresTemplate || false;

  // Get UTM parameters
  const utmSource = searchParams.get("utm_source");
  const utmMedium = searchParams.get("utm_medium");
  const utmCampaign = searchParams.get("utm_campaign");

  const phoneNumber = "27749201395";

  const canProceedToStep2 =
    selectedService && (!needsTemplate || selectedTemplate);

  // For users without CV, they must provide name, phone, and at least some info (skills, education, or experience)
  const hasMinimalInfoForNewCV =
    hasExistingCV === false
      ? formData.skills.trim() ||
        formData.education.trim() ||
        formData.experience.trim()
      : true;

  const canSubmit =
    name.trim() &&
    phone.trim() &&
    canProceedToStep2 &&
    hasExistingCV !== null &&
    hasMinimalInfoForNewCV;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const uploadFormData = new FormData();
      if (file && hasExistingCV) {
        uploadFormData.append("file", file);
      }

      // Prepare lead data with form details for users without CV
      const leadData: Omit<LeadData, "fileUrl" | "fileName"> = {
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim(),
        service: selectedPackage?.name || selectedService,
        servicePrice: selectedPackage?.price || "",
        template: selectedTemplate
          ? templates.find((t) => t.id === selectedTemplate)?.name
          : undefined,
        source: "cv-revamp-page",
        utmSource: utmSource || undefined,
        utmMedium: utmMedium || undefined,
        utmCampaign: utmCampaign || undefined,
        hasExistingCV: hasExistingCV ?? undefined,
        // Include form data for users without CV
        ...(hasExistingCV === false && {
          cvDetails: {
            address: formData.address.trim() || undefined,
            summary: formData.summary.trim() || undefined,
            skills: formData.skills.trim() || undefined,
            education: formData.education.trim() || undefined,
            certifications: formData.certifications.trim() || undefined,
            experience: formData.experience.trim() || undefined,
            volunteer: formData.volunteer.trim() || undefined,
            languages: formData.languages.trim() || undefined,
            additionalNotes: formData.additionalNotes.trim() || undefined,
          },
        }),
      };

      // Submit order
      const result = await submitCVOrder(uploadFormData, leadData);

      if (result.success) {
        // Build WhatsApp message based on whether user has CV or not
        let message = "";

        if (hasExistingCV) {
          // Message for users with existing CV
          message = `👋 Hi! I'd like to order a CV service.\n\n`;
          message += `📋 *Order Details:*\n`;
          message += `• Name: ${name}\n`;
          message += `• Service: ${selectedPackage?.name} - ${selectedPackage?.price}\n`;

          if (selectedTemplate) {
            const template = templates.find((t) => t.id === selectedTemplate);
            message += `• Template: ${template?.name}\n`;
          }

          if (phone) {
            message += `• Phone: ${phone}\n`;
          }

          if (email) {
            message += `• Email: ${email}\n`;
          }

          if (result.fileUrl) {
            message += `\n📎 *My CV:* ${result.fileUrl}\n`;
          } else {
            message += `\n💡 _I'll attach my current CV in the next message._\n`;
          }

          message += `\nPlease send payment details. Thanks!`;
        } else {
          // Message for users without CV (include all details)
          message = `👋 Hi! I'd like to order a CV service.\n\n`;
          message += `✨ *Service Selected:* ${selectedPackage?.name}\n`;
          message += `💰 *Price:* ${selectedPackage?.price}\n`;

          if (selectedTemplate) {
            const template = templates.find((t) => t.id === selectedTemplate);
            message += `📄 *Template:* ${template?.name}\n`;
          }

          message += `\n📋 *My CV Details:*\n\n`;
          message += `1️⃣ *Full Name:* ${name}\n`;
          message += `2️⃣ *Address/City/Town:* ${formData.address || "[Not provided]"}\n`;
          message += `3️⃣ *Phone Number:* ${phone}\n`;
          message += `4️⃣ *Email:* ${email || "[Not provided]"}\n`;
          message += `5️⃣ *Short Summary About Me:*\n${formData.summary || "[Not provided]"}\n\n`;
          message += `6️⃣ *Skills:*\n${formData.skills || "[Not provided]"}\n\n`;
          message += `7️⃣ *Education:*\n${formData.education || "[Not provided]"}\n\n`;
          message += `8️⃣ *Certifications/Awards/Achievements:*\n${formData.certifications || "[Not provided]"}\n\n`;
          message += `9️⃣ *Work Experience:*\n${formData.experience || "[Not provided]"}\n\n`;
          message += `🔟 *Volunteer Work/Internships:*\n${formData.volunteer || "[Not provided]"}\n\n`;
          message += `1️⃣1️⃣ *Languages:*\n${formData.languages || "[Not provided]"}\n`;

          if (formData.additionalNotes) {
            message += `\n📝 *Additional Notes:* ${formData.additionalNotes}\n`;
          }

          message += `\nPlease send payment details. Thanks!`;
        }

        const encodedMessage = encodeURIComponent(message);
        window.open(
          `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
          "_blank",
        );

        toast.success("Order submitted! WhatsApp is opening...");

        // Reset form
        setFile(null);
        setName("");
        setEmail("");
        setPhone("");
        setHasExistingCV(null);
        setFormData({
          address: "",
          summary: "",
          skills: "",
          education: "",
          certifications: "",
          experience: "",
          volunteer: "",
          languages: "",
          additionalNotes: "",
        });
        setStep(1);
      } else {
        toast.error(
          result.error || "Failed to submit order. Please try again.",
        );
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="order-form"
      className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
    >
      {/* Progress Steps */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setStep(1)}
          className={`flex-1 py-4 px-4 font-medium transition-colors ${
            step === 1
              ? "bg-brand-teal/10 text-brand-teal border-b-2 border-brand-teal"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-teal text-white text-sm flex items-center justify-center">
              1
            </span>
            Select Service
          </span>
        </button>
        <button
          onClick={() => canProceedToStep2 && setStep(2)}
          disabled={!canProceedToStep2}
          className={`flex-1 py-4 px-4 font-medium transition-colors ${
            step === 2
              ? "bg-brand-teal/10 text-brand-teal border-b-2 border-brand-teal"
              : canProceedToStep2
                ? "text-gray-500 hover:bg-gray-50"
                : "text-gray-300 cursor-not-allowed"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <span
              className={`w-6 h-6 rounded-full text-sm flex items-center justify-center ${
                step === 2
                  ? "bg-brand-teal text-white"
                  : canProceedToStep2
                    ? "bg-gray-300 text-white"
                    : "bg-gray-200 text-gray-400"
              }`}
            >
              2
            </span>
            Your Details
          </span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Service Selection */}
              <div>
                <h3 className="text-lg font-bold text-brand-navy mb-4">
                  Choose Your Service
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {servicePackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => {
                        setSelectedService(pkg.id);
                        if (!pkg.requiresTemplate) {
                          setSelectedTemplate("");
                        }
                      }}
                      className={`relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border-2 text-left ${
                        selectedService === pkg.id
                          ? "border-brand-teal ring-4 ring-brand-teal/20"
                          : "border-gray-200 hover:border-brand-teal/50"
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-2 -right-2 bg-brand-gold text-brand-navy text-xs font-bold px-3 py-1 rounded-full z-10">
                          POPULAR
                        </div>
                      )}

                      {selectedService === pkg.id && (
                        <div className="absolute top-3 left-3 bg-brand-teal text-white rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}

                      <div className="mb-3 pt-2">
                        <h4 className="font-bold text-lg text-brand-navy">
                          {pkg.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-2xl font-bold text-brand-teal">
                            {pkg.price}
                          </span>
                          {pkg.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {pkg.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">
                        {pkg.description}
                      </p>

                      <ul className="space-y-1">
                        {pkg.features.slice(0, 3).map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-brand-teal flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>

              {/* Template Selection */}
              {selectedService && needsTemplate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h3 className="text-lg font-bold text-brand-navy mb-4">
                    Choose Your Template
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-2 ${
                          selectedTemplate === template.id
                            ? "border-brand-teal ring-4 ring-brand-teal/20"
                            : "border-gray-200 hover:border-brand-teal/50"
                        }`}
                      >
                        {template.popular && (
                          <div className="absolute top-2 right-2 bg-brand-gold text-brand-navy text-xs font-bold px-2 py-0.5 rounded-full z-10">
                            POPULAR
                          </div>
                        )}

                        {selectedTemplate === template.id && (
                          <div className="absolute top-2 left-2 bg-brand-teal text-white rounded-full p-1 z-10">
                            <Check className="h-3 w-3" />
                          </div>
                        )}

                        <div className="aspect-[3/4] relative bg-gray-100">
                          <Image
                            src={template.image}
                            alt={template.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="p-3 text-left">
                          <h4 className="font-semibold text-sm text-brand-navy line-clamp-1">
                            {template.name}
                          </h4>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Continue Button */}
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!canProceedToStep2}
                className={`w-full bg-brand-teal text-white font-semibold py-4 px-6 rounded-xl transition-all ${
                  canProceedToStep2
                    ? "hover:bg-brand-teal/90 hover:shadow-lg"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                {!selectedService
                  ? "Select a Service to Continue"
                  : needsTemplate && !selectedTemplate
                    ? "Select a Template to Continue"
                    : "Continue to Your Details"}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-brand-navy mb-2">
                  Order Summary
                </h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{selectedPackage?.name}</p>
                    {selectedTemplate && (
                      <p className="text-sm text-gray-600">
                        Template:{" "}
                        {templates.find((t) => t.id === selectedTemplate)?.name}
                      </p>
                    )}
                  </div>
                  <span className="text-xl font-bold text-brand-teal">
                    {selectedPackage?.price}
                  </span>
                </div>
              </div>

              {/* CV Status Question */}
              {hasExistingCV === null ? (
                <div className="text-center py-6">
                  <h3 className="text-xl font-semibold mb-2 text-brand-navy">
                    Do you have an existing CV?
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    If you have a CV, you can upload it. If not, we&apos;ll need
                    some information to create one from scratch.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      type="button"
                      onClick={() => setHasExistingCV(true)}
                      className="px-8 py-4 bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <FileText className="h-5 w-5" />
                      Yes, I have a CV
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasExistingCV(false)}
                      className="px-8 py-4 bg-brand-gold hover:bg-yellow-500 text-brand-navy font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <PenTool className="h-5 w-5" />
                      No, create from scratch
                    </button>
                  </div>
                </div>
              ) : hasExistingCV ? (
                /* Form for users WITH existing CV */
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-700 text-sm">
                      <strong>Great!</strong> You can upload your CV or attach
                      it on WhatsApp after submitting.
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-brand-navy">
                      Your Details
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g., 0712345678"
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address{" "}
                        <span className="text-gray-400">(optional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">
                      Upload Your Current CV{" "}
                      <span className="text-gray-400 font-normal text-sm">
                        (optional)
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Attach your CV now so we can start immediately after
                      payment
                    </p>
                    <FileUpload
                      file={file}
                      onFileSelect={setFile}
                      onRemove={() => setFile(null)}
                    />
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      💡 You can also attach your CV directly on WhatsApp after
                      submitting
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 ${
                        canSubmit && !isSubmitting
                          ? "hover:shadow-xl hover:scale-[1.02]"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <MessageCircle className="h-5 w-5" />
                          Complete Order via WhatsApp
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setHasExistingCV(null)}
                      className="w-full text-gray-600 font-medium py-2 hover:text-brand-navy transition-colors"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              ) : (
                /* Form for users WITHOUT existing CV */
                <div className="space-y-6">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-amber-700 text-sm">
                      <strong>No problem!</strong> Please fill in as much
                      information as you can. We&apos;ll create your
                      professional CV from scratch.
                      <span className="font-semibold">
                        {" "}
                        You must provide at least your skills, education, or
                        work experience.
                      </span>
                    </p>
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg border-b pb-2 text-brand-navy">
                      Basic Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <User className="h-4 w-4 inline mr-1" />
                          1️⃣ Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          2️⃣ Address / City / Town
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none"
                          placeholder="e.g., Sandton, Johannesburg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Phone className="h-4 w-4 inline mr-1" />
                          3️⃣ Phone Number{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none"
                          placeholder="+27 XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Mail className="h-4 w-4 inline mr-1" />
                          4️⃣ Email{" "}
                          <span className="text-gray-400">(optional)</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Heart className="h-4 w-4 inline mr-1" />
                      5️⃣ Short Summary About You (2-3 lines)
                    </label>
                    <textarea
                      name="summary"
                      value={formData.summary}
                      onChange={handleFormChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none resize-none"
                      placeholder="Brief description of yourself, career goals, and what makes you a great candidate..."
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Sparkles className="h-4 w-4 inline mr-1" />
                      6️⃣ Skills (list your top skills){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleFormChange}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none resize-none"
                      placeholder="e.g., Microsoft Office, Customer Service, Communication, Problem Solving..."
                    />
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <GraduationCap className="h-4 w-4 inline mr-1" />
                      7️⃣ Education (qualification, institution, year){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="education"
                      value={formData.education}
                      onChange={handleFormChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none resize-none"
                      placeholder="e.g., Matric Certificate, XYZ High School, 2020&#10;National Diploma in Business, Tshwane University, 2023"
                    />
                  </div>

                  {/* Certifications */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Award className="h-4 w-4 inline mr-1" />
                      8️⃣ Certifications / Awards / Achievements
                    </label>
                    <textarea
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleFormChange}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none resize-none"
                      placeholder="e.g., ICDL Certificate, First Aid Certificate, Employee of the Month..."
                    />
                  </div>

                  {/* Work Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Briefcase className="h-4 w-4 inline mr-1" />
                      9️⃣ Work Experience (title, company, dates, duties){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleFormChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none resize-none"
                      placeholder="e.g., Customer Service Representative, ABC Company, Jan 2022 - Present&#10;- Handled customer inquiries and complaints&#10;- Processed orders and returns&#10;- Maintained customer records"
                    />
                  </div>

                  {/* Volunteer */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      🔟 Volunteer Work / Internships (if any)
                    </label>
                    <textarea
                      name="volunteer"
                      value={formData.volunteer}
                      onChange={handleFormChange}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none resize-none"
                      placeholder="e.g., Volunteer Tutor, Community Center, 2021..."
                    />
                  </div>

                  {/* Languages */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Languages className="h-4 w-4 inline mr-1" />
                      1️⃣1️⃣ Languages
                    </label>
                    <input
                      type="text"
                      name="languages"
                      value={formData.languages}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none"
                      placeholder="e.g., English (Fluent), Zulu (Native), Afrikaans (Basic)"
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes / Target Job (Optional)
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleFormChange}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none resize-none"
                      placeholder="Any specific requirements or target job/industry?"
                    />
                  </div>

                  {/* Validation message */}
                  {!hasMinimalInfoForNewCV && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-600 text-sm">
                        ⚠️ Please provide at least your skills, education, or
                        work experience to continue.
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 ${
                        canSubmit && !isSubmitting
                          ? "hover:shadow-xl hover:scale-[1.02]"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <MessageCircle className="h-5 w-5" />
                          Complete Order via WhatsApp
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setHasExistingCV(null)}
                      className="w-full text-gray-600 font-medium py-2 hover:text-brand-navy transition-colors"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              )}

              {/* Back to Step 1 */}
              {hasExistingCV !== null && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-gray-500 text-sm font-medium py-2 hover:text-brand-navy transition-colors"
                >
                  ← Back to Service Selection
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

function OrderForm() {
  return (
    <Suspense
      fallback={
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 animate-pulse h-96" />
      }
    >
      <OrderFormContent />
    </Suspense>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function CVRevampPage() {
  const scrollToForm = () => {
    document
      .getElementById("order-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const faqs = [
    {
      question: "What's the difference between CV writing and CV revamp?",
      answer:
        "CV writing creates a brand new CV from scratch, typically for first-time job seekers or career changers. CV revamp takes your existing CV and transforms it - improving the structure, wording, formatting, and ATS optimization while keeping your original content as the foundation.",
    },
    {
      question: "How long does the CV revamp take?",
      answer:
        "Our standard turnaround is less than 1 hour. We understand job hunting is time-sensitive, so we prioritize quick delivery without compromising quality. For urgent requests, let us know via WhatsApp.",
    },
    {
      question: "What format will I receive my revamped CV in?",
      answer:
        "You'll receive your CV in PDF format. The PDF maintains formatting perfectly for applications.",
    },
    {
      question: "Do you offer revisions?",
      answer:
        "Yes! We offer unlimited revisions until you're 100% satisfied. Your satisfaction is guaranteed - if you're not happy, we'll keep working on it.",
    },
    {
      question: "Will my CV pass ATS (Applicant Tracking Systems)?",
      answer:
        "Absolutely. We specifically optimize your CV for ATS systems used by South African employers. This includes proper formatting, relevant keywords, and a structure that ATS software can read easily.",
    },
    {
      question: "What information do you need from me?",
      answer:
        "Simply send us your current CV via WhatsApp or upload it through the form above. If you have a target job or industry in mind, let us know so we can optimize accordingly. You can also share any achievements or updates you'd like included.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-teal/90 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-teal/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-brand-gold" />
                <span className="text-sm font-medium">
                  Most Popular Service
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Professional CV Services
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Transform your career with expert CV writing, revamp, cover
                letters, and LinkedIn optimization services.
              </p>

              {/* Price Badge */}
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 mb-8">
                <div>
                  <span className="text-white/60 text-sm">Starting from</span>
                  <span className="text-4xl font-bold text-brand-gold ml-2">
                    R30
                  </span>
                </div>
                <div className="h-12 w-px bg-white/20" />
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand-gold" />
                    <span className="text-sm">Less than 1 hour</span>
                  </div>
                  <span className="text-xs text-white/60">Turnaround time</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                <FileUp className="h-5 w-5" />
                Order Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="py-12 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <OrderForm />
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                What&apos;s Included in Your CV Revamp
              </h2>
              <p className="text-muted-foreground">
                Everything you need to stand out in the South African job market
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Target,
                  title: "ATS Optimization",
                  description:
                    "Formatted to pass Applicant Tracking Systems used by major SA employers",
                },
                {
                  icon: Sparkles,
                  title: "Professional Formatting",
                  description:
                    "Clean, modern layout that's easy to read and visually appealing",
                },
                {
                  icon: TrendingUp,
                  title: "Achievement Focus",
                  description:
                    "Transform duty descriptions into impactful achievement statements",
                },
                {
                  icon: FileText,
                  title: "Keyword Enhancement",
                  description:
                    "Industry-specific keywords that recruiters search for",
                },
                {
                  icon: RefreshCw,
                  title: "Unlimited Revisions",
                  description:
                    "We'll keep refining until you're 100% satisfied",
                },
                {
                  icon: Clock,
                  title: "Fast Delivery",
                  description: "Get your revamped CV in less than 1 hour",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 p-5 bg-white rounded-xl border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-brand-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                See the Transformation
              </h2>
              <p className="text-muted-foreground">
                Click to compare what we fix in your CV
              </p>
            </div>

            <BeforeAfterComparison />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground">
                Simple 4-step process to get your revamped CV
              </p>
            </div>

            <div className="space-y-2">
              <ProcessStep
                number={1}
                title="Choose Your Service & Upload CV"
                description="Select your service package and template. Upload your current CV through our form or send via WhatsApp."
                icon={FileText}
              />
              <ProcessStep
                number={2}
                title="Make Payment"
                description="Pay via EFT, Instant EFT, or Capitec Pay. Payment details provided on WhatsApp."
                icon={Shield}
              />
              <ProcessStep
                number={3}
                title="We Transform Your CV"
                description="Our experts revamp your CV with ATS optimization, achievement-focused content, and professional formatting."
                icon={Sparkles}
              />
              <ProcessStep
                number={4}
                title="Receive & Review"
                description="Get your revamped CV in PDF format. Request unlimited revisions until you're satisfied."
                icon={CheckCircle2}
                isLast
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who Needs This */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                Is CV Revamp Right for You?
              </h2>
              <p className="text-muted-foreground">
                This service is perfect if you...
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Eye,
                  title: "Not Getting Interviews",
                  description:
                    "You're applying but not hearing back. Your CV might not be passing ATS filters.",
                },
                {
                  icon: Clock,
                  title: "CV Is Outdated",
                  description:
                    "Your CV hasn't been updated in years and doesn't reflect your current skills.",
                },
                {
                  icon: AlertTriangle,
                  title: "DIY CV Isn't Working",
                  description:
                    "You created your own CV but it doesn't look professional enough.",
                },
                {
                  icon: Target,
                  title: "Changing Industries",
                  description:
                    "Need your CV repositioned to highlight transferable skills for a new field.",
                },
                {
                  icon: TrendingUp,
                  title: "Seeking Promotion",
                  description:
                    "Applying for senior roles and need your CV to reflect leadership abilities.",
                },
                {
                  icon: Users,
                  title: "Returning to Work",
                  description:
                    "Re-entering the job market after a career break and need to update your CV.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 p-5 bg-white rounded-xl border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                What Our Clients Say
              </h2>
              <p className="text-muted-foreground">
                Real results from real South African job seekers
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sipho M.",
                  location: "Johannesburg",
                  content:
                    "Got my CV back in 40 minutes! Applied to 3 jobs and got 2 interview calls within a week.",
                  role: "Now at Standard Bank",
                },
                {
                  name: "Lerato K.",
                  location: "Cape Town",
                  content:
                    "My old CV wasn't getting responses. After the revamp, I started getting calls immediately. Best R80 spent!",
                  role: "HR Administrator",
                },
                {
                  name: "James P.",
                  location: "Durban",
                  content:
                    "The ATS optimization really works. I was applying for months with no luck, then got 3 interviews in 2 weeks.",
                  role: "IT Specialist",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-brand-gold text-brand-gold"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div>
                    <p className="font-semibold text-brand-navy">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location} • {testimonial.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-brand-navy to-brand-navy/90">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your CV?
            </h2>
            <p className="text-white/80 mb-4">
              Join thousands of South Africans who landed interviews with our
              revamped CVs.
            </p>
            <div className="inline-flex items-center gap-3 bg-white/10 rounded-xl px-6 py-3 mb-8">
              <span className="text-white/60">Starting from</span>
              <span className="text-3xl font-bold text-brand-gold">R30</span>
              <span className="text-white/60">• Less than 1 hour delivery</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                <FileUp className="h-5 w-5" />
                Order Now
              </button>
              <a
                href="https://wa.me/27749201395?text=Hi%2C%20I%20want%20to%20revamp%20my%20CV"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-colors border border-white/20"
              >
                <Phone className="h-5 w-5" />
                WhatsApp: +27 74 920 1395
              </a>
            </div>

            <p className="text-white/60 text-sm mt-8">
              Upload your CV through the form above or send directly via
              WhatsApp
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
