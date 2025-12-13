"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  CheckCircle2,
  Circle,
  Download,
  FileText,
  Briefcase,
  GraduationCap,
  Users,
  Target,
  Calendar,
  Clock,
  ChevronDown,
  Printer,
  Share2,
  Star,
  ArrowRight,
  Phone,
  MapPin,
  Building2,
  Mail,
  Linkedin,
  Globe,
  Award,
  TrendingUp,
  UserCheck,
  FileCheck,
  Search,
  MessageSquare,
  FileSpreadsheet,
  File,
} from "lucide-react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Interactive Checklist Component
function InteractiveChecklist({
  title,
  description,
  items,
  color = "teal",
}: {
  title: string;
  description: string;
  items: { text: string; tip?: string }[];
  color?: "teal" | "navy" | "gold";
}) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const progress = (checkedItems.size / items.length) * 100;

  const colorClasses = {
    teal: {
      bg: "bg-brand-teal/10",
      border: "border-brand-teal/20",
      text: "text-brand-teal",
      progress: "bg-brand-teal",
      hover: "hover:bg-brand-teal/5",
    },
    navy: {
      bg: "bg-brand-navy/10",
      border: "border-brand-navy/20",
      text: "text-brand-navy",
      progress: "bg-brand-navy",
      hover: "hover:bg-brand-navy/5",
    },
    gold: {
      bg: "bg-brand-gold/10",
      border: "border-brand-gold/20",
      text: "text-brand-gold",
      progress: "bg-brand-gold",
      hover: "hover:bg-brand-gold/5",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className={`rounded-2xl border ${colors.border} bg-white p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-brand-navy">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-bold ${colors.text}`}>
            {checkedItems.size}/{items.length}
          </span>
          <p className="text-xs text-muted-foreground">completed</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <motion.div
          className={`h-full ${colors.progress} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Checklist Items */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => toggleItem(index)}
            className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
              colors.hover
            } ${checkedItems.has(index) ? "bg-green-50" : ""}`}
            whileTap={{ scale: 0.98 }}
          >
            <div className="mt-0.5">
              {checkedItems.has(index) ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-300" />
              )}
            </div>
            <div className="flex-1">
              <span
                className={`block ${
                  checkedItems.has(index)
                    ? "text-muted-foreground line-through"
                    : "text-brand-navy"
                }`}
              >
                {item.text}
              </span>
              {item.tip && (
                <span className="text-xs text-muted-foreground mt-1 block">
                  💡 {item.tip}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center"
        >
          <Star className="h-6 w-6 text-green-500 mx-auto mb-2" />
          <p className="text-green-700 font-semibold">
            Checklist Complete! Well done! 🎉
          </p>
        </motion.div>
      )}
    </div>
  );
}

// Accordion Section Component
function AccordionSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center">
            <Icon className="h-5 w-5 text-brand-teal" />
          </div>
          <span className="font-semibold text-brand-navy text-left">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
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
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// All Checklists Data for Download All feature
const allChecklistsData = [
  { title: "Job Search Preparation", key: "jobSearch" },
  { title: "Interview Preparation", key: "interview" },
  { title: "First Day at Work", key: "firstDay" },
  { title: "Professional Resignation", key: "resignation" },
  { title: "Professional Networking", key: "networking" },
  { title: "Graduate Job Search", key: "graduate" },
  { title: "Career Change", key: "careerChange" },
  { title: "Remote Work Setup", key: "remote" },
];

// Download All Checklists Component
function DownloadAllChecklists() {
  const handleDownloadAllPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const checkboxSize = 4;

    // All checklist data
    const checklists = [
      { title: "Job Search Preparation", items: jobSearchChecklistItems },
      { title: "Interview Preparation", items: interviewPrepChecklistItems },
      { title: "First Day at Work", items: firstDayChecklistItems },
      { title: "Professional Resignation", items: resignationChecklistItems },
      { title: "Professional Networking", items: networkingChecklistItems },
      { title: "Graduate Job Search", items: graduateJobSearchChecklistItems },
      { title: "Career Change", items: careerChangeChecklistItems },
      { title: "Remote Work Setup", items: remoteJobChecklistItems },
    ];

    // Cover page
    doc.setFillColor(30, 58, 95);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont("helvetica", "bold");
    doc.text("Career Checklists", pageWidth / 2, 80, { align: "center" });

    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.text("Complete Collection", pageWidth / 2, 95, { align: "center" });

    doc.setFontSize(14);
    doc.setTextColor(13, 148, 136);
    doc.text("For South African Job Seekers", pageWidth / 2, 115, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setTextColor(200, 200, 200);
    doc.text("8 Essential Checklists Included:", pageWidth / 2, 145, {
      align: "center",
    });

    doc.setFontSize(11);
    checklists.forEach((cl, i) => {
      doc.text(`${i + 1}. ${cl.title}`, pageWidth / 2, 160 + i * 10, {
        align: "center",
      });
    });

    doc.setTextColor(245, 158, 11);
    doc.setFontSize(14);
    doc.text("CareerCVPro.co.za", pageWidth / 2, pageHeight - 40, {
      align: "center",
    });

    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.text(
      `Downloaded: ${new Date().toLocaleDateString("en-ZA")}`,
      pageWidth / 2,
      pageHeight - 25,
      { align: "center" }
    );

    // Generate each checklist
    checklists.forEach((checklist) => {
      doc.addPage();
      let yPos = margin;

      // Header
      doc.setFillColor(30, 58, 95);
      doc.rect(0, 0, pageWidth, 30, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(checklist.title, margin, 20);

      yPos = 45;

      // Items
      doc.setTextColor(30, 58, 95);
      doc.setFontSize(10);

      checklist.items.forEach((item, index) => {
        if (yPos > pageHeight - 30) {
          doc.addPage();
          yPos = margin;
        }

        // Checkbox
        doc.setDrawColor(30, 58, 95);
        doc.setLineWidth(0.4);
        doc.rect(margin, yPos - 3, checkboxSize, checkboxSize);

        // Number
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(13, 148, 136);
        doc.text(`${index + 1}.`, margin + checkboxSize + 2, yPos);

        // Text
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(30, 58, 95);
        const textWidth = pageWidth - margin * 2 - checkboxSize - 12;
        const splitText = doc.splitTextToSize(item, textWidth);
        doc.text(splitText, margin + checkboxSize + 10, yPos);

        const textHeight = splitText.length * 4;
        yPos += Math.max(8, textHeight) + 2;
      });

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("CareerCVPro.co.za", margin, pageHeight - 10);
    });

    doc.save("careercvpro-all-checklists.pdf");
  };

  const handleDownloadAllExcel = () => {
    const wb = XLSX.utils.book_new();

    // All checklist data
    const checklists = [
      { title: "Job Search", items: jobSearchChecklistItems },
      { title: "Interview Prep", items: interviewPrepChecklistItems },
      { title: "First Day", items: firstDayChecklistItems },
      { title: "Resignation", items: resignationChecklistItems },
      { title: "Networking", items: networkingChecklistItems },
      { title: "Graduate Search", items: graduateJobSearchChecklistItems },
      { title: "Career Change", items: careerChangeChecklistItems },
      { title: "Remote Work", items: remoteJobChecklistItems },
    ];

    // Create a sheet for each checklist
    checklists.forEach((checklist) => {
      const wsData = [
        ["", checklist.title.toUpperCase() + " CHECKLIST"],
        ["", "CareerCVPro.co.za - Your Career Success Partner"],
        ["", `Downloaded: ${new Date().toLocaleDateString("en-ZA")}`],
        [""],
        ["✓", "Task", "Status", "Date Completed", "Notes"],
        ...checklist.items.map((item) => ["☐", item, "", "", ""]),
        [""],
        ["", `Total Items: ${checklist.items.length}`],
      ];

      const ws = XLSX.utils.aoa_to_sheet(wsData);
      ws["!cols"] = [
        { wch: 4 },
        { wch: 55 },
        { wch: 12 },
        { wch: 15 },
        { wch: 25 },
      ];
      ws["!merges"] = [
        { s: { r: 0, c: 1 }, e: { r: 0, c: 4 } },
        { s: { r: 1, c: 1 }, e: { r: 1, c: 4 } },
      ];

      XLSX.utils.book_append_sheet(wb, ws, checklist.title);
    });

    // Add summary sheet
    const summaryData = [
      ["CAREER CHECKLISTS - COMPLETE COLLECTION"],
      ["CareerCVPro.co.za"],
      [""],
      ["This workbook contains 8 essential career checklists:"],
      [""],
      ...checklists.map((cl, i) => [
        `${i + 1}. ${cl.title} (${cl.items.length} items)`,
      ]),
      [""],
      ["HOW TO USE:"],
      ["1. Navigate to each sheet using the tabs at the bottom"],
      ["2. Replace ☐ with ✓ when you complete a task"],
      ["3. Track your progress with Status, Date, and Notes columns"],
      [""],
      ["NEED PROFESSIONAL CV HELP?"],
      ["CV: R80 | Cover Letter: R30 | Combo: R100 | LinkedIn: R150"],
      ["WhatsApp: +27 74 920 1395 | +27 84 461 3158"],
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    wsSummary["!cols"] = [{ wch: 60 }];
    XLSX.utils.book_append_sheet(wb, wsSummary, "Overview");

    // Move Overview to first position
    wb.SheetNames.unshift(wb.SheetNames.pop()!);

    XLSX.writeFile(wb, "careercvpro-all-checklists.xlsx");
  };

  return (
    <div className="bg-gradient-to-br from-brand-navy to-brand-navy/90 rounded-2xl p-6 md:p-8 mb-8 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Download className="h-5 w-5 text-brand-gold" />
            <span className="text-sm font-medium text-brand-gold">
              Complete Package
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Download All 8 Checklists</h3>
          <p className="text-white/70 text-sm">
            Get all career checklists in one file. Excel version is fillable
            with tracking columns!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={handleDownloadAllPDF}
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <File className="h-5 w-5" />
            All PDFs
          </button>
          <button
            onClick={handleDownloadAllExcel}
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <FileSpreadsheet className="h-5 w-5" />
            All Excel
          </button>
        </div>
      </div>
    </div>
  );
}

// Extract checklist items as simple arrays for PDF/Excel generation
const jobSearchChecklistItems = [
  "Update your CV with recent experience and achievements",
  "Write a tailored cover letter template",
  "Update your LinkedIn profile with professional photo",
  "Research target companies and industries",
  "Set up job alerts on Careers24, Indeed, and LinkedIn",
  "Prepare your 30-second elevator pitch",
  "Gather professional references (3 minimum)",
  "Create a job application tracking spreadsheet",
  "Update your professional email signature",
  "Clean up social media profiles",
];

const interviewPrepChecklistItems = [
  "Research the company's history, mission, and values",
  "Study the job description and match your experience",
  "Prepare answers to common interview questions",
  "Practice the STAR method for behavioral questions",
  "Prepare 5-10 thoughtful questions to ask the interviewer",
  "Plan your outfit the night before",
  "Print extra copies of your CV and references",
  "Map out the route and plan to arrive 10-15 minutes early",
  "Prepare a portfolio or work samples if relevant",
  "Get a good night's sleep and eat a healthy breakfast",
];

const firstDayChecklistItems = [
  "Arrive 10-15 minutes early",
  "Bring required documents (ID, bank details, qualifications)",
  "Learn names of immediate team members",
  "Understand reporting structure and key contacts",
  "Set up workstation, email, and access credentials",
  "Review employee handbook and company policies",
  "Locate essential facilities (restroom, kitchen, emergency exits)",
  "Clarify expectations with your manager",
  "Take notes on processes and procedures",
  "Send a thank you message to your recruiter/referral",
];

const resignationChecklistItems = [
  "Review your employment contract for notice period",
  "Secure new position before resigning (if possible)",
  "Write a professional resignation letter",
  "Schedule meeting with manager to resign in person",
  "Prepare for counter-offer conversation",
  "Request written acceptance of resignation",
  "Plan knowledge transfer and handover documentation",
  "Confirm leave days payout and final salary calculation",
  "Return company property (laptop, access cards, etc.)",
  "Update LinkedIn and notify professional contacts",
];

const networkingChecklistItems = [
  "Update LinkedIn profile to 'All-Star' status",
  "Connect with 5 new people in your industry weekly",
  "Join relevant LinkedIn and Facebook industry groups",
  "Attend at least one networking event per month",
  "Follow up with new contacts within 48 hours",
  "Offer value before asking for help",
  "Prepare business cards or digital contact sharing",
  "Schedule informational interviews with industry leaders",
  "Engage meaningfully with others' content online",
  "Maintain a contact database with notes on each person",
];

const graduateJobSearchChecklistItems = [
  "Create a skills-focused CV (academic projects, internships)",
  "Register with graduate recruitment agencies",
  "Apply to graduate programs at major companies",
  "Attend university career fairs and employer events",
  "Complete your LinkedIn profile with education details",
  "Request recommendation letters from professors",
  "Research entry-level salary ranges for your field",
  "Apply for learnerships and internships",
  "Join professional associations (student membership)",
  "Consider volunteering to gain practical experience",
];

const careerChangeChecklistItems = [
  "Identify transferable skills from current role",
  "Research target industry requirements and trends",
  "Fill skill gaps through courses and certifications",
  "Rewrite CV to highlight relevant transferable experience",
  "Build network in new industry",
  "Consider transitional roles or bridge positions",
  "Prepare to explain career change positively",
  "Be prepared for possible salary adjustment",
  "Seek out industry mentors",
  "Start a side project to demonstrate new skills",
];

const remoteJobChecklistItems = [
  "Set up dedicated home office space",
  "Ensure reliable internet connection (backup plan ready)",
  "Test video conferencing setup (camera, mic, lighting)",
  "Establish clear working hours and boundaries",
  "Create daily routine with regular breaks",
  "Set up time tracking if required",
  "Understand tax implications of remote work",
  "Plan for load shedding with UPS/inverter",
  "Establish communication protocols with team",
  "Schedule regular check-ins with manager",
];

// Printable Checklist Data
const jobSearchChecklist = [
  {
    text: "Update your CV with recent experience and achievements",
    tip: "Use action verbs and quantify results",
  },
  {
    text: "Write a tailored cover letter template",
    tip: "Customize for each application",
  },
  {
    text: "Update your LinkedIn profile with professional photo",
    tip: "Use a high-quality headshot with neutral background",
  },
  { text: "Research target companies and industries" },
  { text: "Set up job alerts on Careers24, Indeed, and LinkedIn" },
  { text: "Prepare your 30-second elevator pitch" },
  {
    text: "Gather professional references (3 minimum)",
    tip: "Ask permission before listing anyone",
  },
  { text: "Create a job application tracking spreadsheet" },
  { text: "Update your professional email signature" },
  {
    text: "Clean up social media profiles",
    tip: "Google yourself to see what recruiters will find",
  },
];

const interviewPrepChecklist = [
  { text: "Research the company's history, mission, and values" },
  {
    text: "Study the job description and match your experience",
    tip: "Prepare specific examples for each requirement",
  },
  { text: "Prepare answers to common interview questions" },
  {
    text: "Practice the STAR method for behavioral questions",
    tip: "Situation, Task, Action, Result",
  },
  { text: "Prepare 5-10 thoughtful questions to ask the interviewer" },
  {
    text: "Plan your outfit the night before",
    tip: "Dress one level above the company's dress code",
  },
  { text: "Print extra copies of your CV and references" },
  { text: "Map out the route and plan to arrive 10-15 minutes early" },
  {
    text: "Prepare a portfolio or work samples if relevant",
    tip: "Digital copies on tablet or USB are helpful",
  },
  { text: "Get a good night's sleep and eat a healthy breakfast" },
];

const firstDayChecklist = [
  { text: "Arrive 10-15 minutes early" },
  {
    text: "Bring required documents (ID, bank details, qualifications)",
    tip: "SA ID or passport, proof of address, certified copies",
  },
  { text: "Learn names of immediate team members" },
  { text: "Understand reporting structure and key contacts" },
  { text: "Set up workstation, email, and access credentials" },
  { text: "Review employee handbook and company policies" },
  { text: "Locate essential facilities (restroom, kitchen, emergency exits)" },
  { text: "Clarify expectations with your manager" },
  {
    text: "Take notes on processes and procedures",
    tip: "Keep a dedicated notebook for your first few weeks",
  },
  { text: "Send a thank you message to your recruiter/referral" },
];

const resignationChecklist = [
  {
    text: "Review your employment contract for notice period",
    tip: "Standard is 1 month, some roles require 2-3 months",
  },
  { text: "Secure new position before resigning (if possible)" },
  { text: "Write a professional resignation letter" },
  {
    text: "Schedule meeting with manager to resign in person",
    tip: "Never resign via email or WhatsApp",
  },
  { text: "Prepare for counter-offer conversation" },
  { text: "Request written acceptance of resignation" },
  { text: "Plan knowledge transfer and handover documentation" },
  {
    text: "Confirm leave days payout and final salary calculation",
    tip: "Check UIF contributions and tax certificate timing",
  },
  { text: "Return company property (laptop, access cards, etc.)" },
  { text: "Update LinkedIn and notify professional contacts" },
];

const networkingChecklist = [
  { text: "Update LinkedIn profile to 'All-Star' status" },
  {
    text: "Connect with 5 new people in your industry weekly",
    tip: "Always personalize connection requests",
  },
  { text: "Join relevant LinkedIn and Facebook industry groups" },
  { text: "Attend at least one networking event per month" },
  { text: "Follow up with new contacts within 48 hours" },
  { text: "Offer value before asking for help" },
  {
    text: "Prepare business cards or digital contact sharing",
    tip: "QR code to LinkedIn works well",
  },
  { text: "Schedule informational interviews with industry leaders" },
  { text: "Engage meaningfully with others' content online" },
  { text: "Maintain a contact database with notes on each person" },
];

const graduateJobSearchChecklist = [
  {
    text: "Create a skills-focused CV (academic projects, internships)",
    tip: "Highlight transferable skills from part-time jobs",
  },
  { text: "Register with graduate recruitment agencies" },
  { text: "Apply to graduate programs at major companies" },
  { text: "Attend university career fairs and employer events" },
  {
    text: "Complete your LinkedIn profile with education details",
    tip: "Join alumni groups and follow target companies",
  },
  { text: "Request recommendation letters from professors" },
  {
    text: "Research entry-level salary ranges for your field",
    tip: "Check PayScale and Glassdoor for SA data",
  },
  { text: "Apply for learnerships and internships" },
  { text: "Join professional associations (student membership)" },
  {
    text: "Consider volunteering to gain practical experience",
    tip: "NGOs and community organizations value graduates",
  },
];

const careerChangeChecklist = [
  { text: "Identify transferable skills from current role" },
  { text: "Research target industry requirements and trends" },
  {
    text: "Fill skill gaps through courses and certifications",
    tip: "Coursera, LinkedIn Learning, local colleges",
  },
  {
    text: "Rewrite CV to highlight relevant transferable experience",
    tip: "Use functional or combination CV format",
  },
  { text: "Build network in new industry" },
  { text: "Consider transitional roles or bridge positions" },
  { text: "Prepare to explain career change positively" },
  {
    text: "Be prepared for possible salary adjustment",
    tip: "Entry-level in new field may pay less initially",
  },
  { text: "Seek out industry mentors" },
  { text: "Start a side project to demonstrate new skills" },
];

const remoteJobChecklist = [
  { text: "Set up dedicated home office space" },
  {
    text: "Ensure reliable internet connection (backup plan ready)",
    tip: "Consider Starlink or mobile data as backup in SA",
  },
  { text: "Test video conferencing setup (camera, mic, lighting)" },
  { text: "Establish clear working hours and boundaries" },
  { text: "Create daily routine with regular breaks" },
  {
    text: "Set up time tracking if required",
    tip: "Tools: Toggl, Clockify, RescueTime",
  },
  { text: "Understand tax implications of remote work" },
  {
    text: "Plan for load shedding with UPS/inverter",
    tip: "Essential for SA remote workers",
  },
  { text: "Establish communication protocols with team" },
  { text: "Schedule regular check-ins with manager" },
];

export default function CareerChecklistsPage() {
  const [activeTab, setActiveTab] = useState<"interactive" | "printable">(
    "interactive"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-teal/90 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-teal/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <ClipboardList className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Free Career Resources
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Career Checklists for{" "}
                <span className="text-brand-gold">South African</span> Job
                Seekers
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Interactive and printable checklists to keep your job search
                organized. Track your progress, stay motivated, and land your
                dream job in 2025/2026.
              </p>

              {/* Tab Switcher */}
              <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-xl p-1">
                <button
                  onClick={() => setActiveTab("interactive")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "interactive"
                      ? "bg-white text-brand-navy"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Interactive
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("printable")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "printable"
                      ? "bg-white text-brand-navy"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Printer className="h-4 w-4" />
                    Printable
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {activeTab === "interactive" ? (
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Featured Checklists */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <InteractiveChecklist
                    title="Job Search Checklist"
                    description="Everything you need before starting your job search"
                    items={jobSearchChecklist}
                    color="teal"
                  />
                  <InteractiveChecklist
                    title="Interview Preparation"
                    description="Be fully prepared for your next interview"
                    items={interviewPrepChecklist}
                    color="navy"
                  />
                </div>

                {/* More Checklists */}
                <h2 className="text-2xl font-bold text-brand-navy mb-6">
                  More Career Checklists
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <InteractiveChecklist
                    title="First Day at Work"
                    description="Make a great impression on day one"
                    items={firstDayChecklist}
                    color="gold"
                  />
                  <InteractiveChecklist
                    title="Resignation Checklist"
                    description="Leave professionally and on good terms"
                    items={resignationChecklist}
                    color="teal"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <InteractiveChecklist
                    title="Networking Checklist"
                    description="Build a powerful professional network"
                    items={networkingChecklist}
                    color="navy"
                  />
                  <InteractiveChecklist
                    title="Graduate Job Search"
                    description="Special checklist for new graduates"
                    items={graduateJobSearchChecklist}
                    color="gold"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <InteractiveChecklist
                    title="Career Change Checklist"
                    description="Successfully transition to a new field"
                    items={careerChangeChecklist}
                    color="teal"
                  />
                  <InteractiveChecklist
                    title="Remote Work Setup"
                    description="Set yourself up for remote work success"
                    items={remoteJobChecklist}
                    color="navy"
                  />
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Download All Section */}
                <DownloadAllChecklists />

                {/* Printable Instructions */}
                <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Download className="h-6 w-6 text-brand-teal" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-navy text-lg mb-2">
                        Download Options Available
                      </h3>
                      <p className="text-muted-foreground">
                        Each checklist can be downloaded as a{" "}
                        <strong>PDF</strong> (great for printing) or{" "}
                        <strong>Excel spreadsheet</strong> (fillable with status
                        tracking, dates, and notes columns). You can also print
                        directly from your browser.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Printable Accordion Sections */}
                <div className="space-y-4">
                  <AccordionSection
                    title="Job Search Preparation Checklist"
                    icon={Search}
                    defaultOpen={true}
                  >
                    <PrintableChecklist
                      title="Job Search Preparation"
                      items={jobSearchChecklist.map((i) => i.text)}
                    />
                  </AccordionSection>

                  <AccordionSection
                    title="Interview Preparation Checklist"
                    icon={MessageSquare}
                  >
                    <PrintableChecklist
                      title="Interview Preparation"
                      items={interviewPrepChecklist.map((i) => i.text)}
                    />
                  </AccordionSection>

                  <AccordionSection
                    title="First Day at Work Checklist"
                    icon={Building2}
                  >
                    <PrintableChecklist
                      title="First Day at Work"
                      items={firstDayChecklist.map((i) => i.text)}
                    />
                  </AccordionSection>

                  <AccordionSection
                    title="Resignation Checklist"
                    icon={FileCheck}
                  >
                    <PrintableChecklist
                      title="Professional Resignation"
                      items={resignationChecklist.map((i) => i.text)}
                    />
                  </AccordionSection>

                  <AccordionSection title="Networking Checklist" icon={Users}>
                    <PrintableChecklist
                      title="Professional Networking"
                      items={networkingChecklist.map((i) => i.text)}
                    />
                  </AccordionSection>

                  <AccordionSection
                    title="Graduate Job Search Checklist"
                    icon={GraduationCap}
                  >
                    <PrintableChecklist
                      title="Graduate Job Search"
                      items={graduateJobSearchChecklist.map((i) => i.text)}
                    />
                  </AccordionSection>

                  <AccordionSection
                    title="Career Change Checklist"
                    icon={TrendingUp}
                  >
                    <PrintableChecklist
                      title="Career Change"
                      items={careerChangeChecklist.map((i) => i.text)}
                    />
                  </AccordionSection>

                  <AccordionSection
                    title="Remote Work Setup Checklist"
                    icon={Globe}
                  >
                    <PrintableChecklist
                      title="Remote Work Setup"
                      items={remoteJobChecklist.map((i) => i.text)}
                    />
                  </AccordionSection>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-navy text-center mb-12">
              Pro Tips for Using Checklists Effectively
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="bg-white rounded-xl p-6 border border-gray-200"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-brand-teal" />
                </div>
                <h3 className="font-bold text-brand-navy mb-2">
                  Set Deadlines
                </h3>
                <p className="text-muted-foreground text-sm">
                  Assign a target date to each checklist item. Breaking down
                  your job search into daily tasks makes it more manageable.
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 border border-gray-200"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-brand-navy/10 rounded-xl flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-brand-navy" />
                </div>
                <h3 className="font-bold text-brand-navy mb-2">
                  Prioritize Ruthlessly
                </h3>
                <p className="text-muted-foreground text-sm">
                  Focus on high-impact items first. Updating your CV and
                  LinkedIn should come before ordering business cards.
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 border border-gray-200"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-brand-gold" />
                </div>
                <h3 className="font-bold text-brand-navy mb-2">
                  Celebrate Progress
                </h3>
                <p className="text-muted-foreground text-sm">
                  Job searching is hard. Celebrate completing each checklist -
                  small wins build momentum for bigger achievements.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Checklist Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                Essential Documents for SA Job Seekers
              </h2>
              <p className="text-muted-foreground">
                Make sure you have these documents ready before starting your
                job search
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-brand-teal" />
                  </div>
                  <h3 className="font-bold text-brand-navy">
                    Application Documents
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Updated CV (PDF format)",
                    "Cover letter template",
                    "Certified copy of ID",
                    "Certified copies of qualifications",
                    "Academic transcripts",
                    "Professional certifications",
                    "Reference letters",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-navy/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-brand-navy" />
                  </div>
                  <h3 className="font-bold text-brand-navy">
                    Employment Documents
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Proof of address (recent utility bill)",
                    "Bank confirmation letter",
                    "Tax number (SARS)",
                    "Driver's license (if required)",
                    "Police clearance certificate",
                    "Work permit (non-SA citizens)",
                    "Professional body registration",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-brand-navy" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-brand-gold/10 border border-brand-gold/20 rounded-xl">
              <p className="text-sm text-brand-navy flex items-start gap-2">
                <Star className="h-4 w-4 text-brand-gold mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Pro Tip:</strong> Keep digital copies of all documents
                  in a secure cloud folder (Google Drive, Dropbox). This allows
                  you to quickly send documents when requested and ensures you
                  never lose important certificates.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-navy text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "How long should a job search take?",
                  a: "On average, job searches in South Africa take 3-6 months. This varies based on industry, experience level, and economic conditions. Use these checklists to stay organized and maximize your chances of a quicker result.",
                },
                {
                  q: "Should I apply to jobs I'm not fully qualified for?",
                  a: "Yes! If you meet 60-70% of the requirements, apply anyway. Job descriptions often describe an 'ideal' candidate. Focus on transferable skills and willingness to learn in your application.",
                },
                {
                  q: "How many jobs should I apply to per week?",
                  a: "Quality over quantity. Aim for 5-10 well-tailored applications per week rather than 50 generic ones. Each application should be customized to the specific role and company.",
                },
                {
                  q: "What's the best time to apply for jobs?",
                  a: "Tuesday through Thursday mornings tend to have the best response rates. Avoid Mondays (inbox overload) and Fridays (weekend mindset). January-March and July-September are peak hiring seasons in SA.",
                },
                {
                  q: "Should I follow up after applying?",
                  a: "Wait at least one week, then send a polite follow-up email. If you applied through a recruiter, follow up with them. Don't follow up more than twice - respect their process.",
                },
              ].map((faq, index) => (
                <AccordionSection
                  key={index}
                  title={faq.q}
                  icon={MessageSquare}
                >
                  <p className="text-muted-foreground">{faq.a}</p>
                </AccordionSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-brand-navy to-brand-navy/90">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Help with Your Job Search?
            </h2>
            <p className="text-white/80 mb-8">
              Our professional CV writers can help you create a winning CV that
              gets past ATS systems and impresses recruiters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cv-services"
                className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                View CV Services
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://wa.me/27749201395?text=Hi%2C%20I%20need%20help%20with%20my%20job%20search"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-colors border border-white/20"
              >
                <Phone className="h-5 w-5" />
                WhatsApp Us
              </a>
            </div>

            <p className="text-white/60 text-sm mt-6">
              Contact us on WhatsApp: +27 74 920 1395 or +27 84 461 3158
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Printable Checklist Component with PDF and Excel downloads
function PrintableChecklist({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>${title} - CareerCVPro</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { color: #1e3a5f; border-bottom: 2px solid #0d9488; padding-bottom: 10px; }
            .item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid #eee; }
            .checkbox { width: 20px; height: 20px; border: 2px solid #1e3a5f; border-radius: 4px; flex-shrink: 0; margin-top: 2px; }
            .text { flex: 1; }
            .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          ${items
            .map(
              (item) => `
            <div class="item">
              <div class="checkbox"></div>
              <div class="text">${item}</div>
            </div>
          `
            )
            .join("")}
          <div class="footer">
            <p>CareerCVPro.co.za - Your Career Success Partner</p>
            <p>Downloaded: ${new Date().toLocaleDateString("en-ZA")}</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const checkboxSize = 5;
    const lineHeight = 10;
    let yPos = margin;

    // Header background
    doc.setFillColor(30, 58, 95); // brand-navy
    doc.rect(0, 0, pageWidth, 35, "F");

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, 22);

    // Subtitle
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("CareerCVPro.co.za - Your Career Success Partner", margin, 30);

    yPos = 50;

    // Reset text color for items
    doc.setTextColor(30, 58, 95);
    doc.setFontSize(11);

    items.forEach((item, index) => {
      // Check if we need a new page
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = margin;
      }

      // Draw checkbox (empty square)
      doc.setDrawColor(30, 58, 95);
      doc.setLineWidth(0.5);
      doc.rect(margin, yPos - 4, checkboxSize, checkboxSize);

      // Item number
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(13, 148, 136); // brand-teal
      doc.text(`${index + 1}.`, margin + checkboxSize + 3, yPos);

      // Item text (wrapped)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(30, 58, 95);
      const textWidth = pageWidth - margin * 2 - checkboxSize - 15;
      const splitText = doc.splitTextToSize(item, textWidth);
      doc.text(splitText, margin + checkboxSize + 12, yPos);

      // Calculate the actual height used by wrapped text
      const textHeight = splitText.length * 5;
      yPos += Math.max(lineHeight, textHeight) + 3;

      // Add a subtle line separator
      if (index < items.length - 1) {
        doc.setDrawColor(230, 230, 230);
        doc.setLineWidth(0.2);
        doc.line(margin, yPos - 2, pageWidth - margin, yPos - 2);
      }
    });

    // Footer
    yPos = pageHeight - 25;
    doc.setDrawColor(13, 148, 136);
    doc.setLineWidth(1);
    doc.line(margin, yPos, pageWidth - margin, yPos);

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Downloaded from CareerCVPro.co.za on ${new Date().toLocaleDateString(
        "en-ZA"
      )}`,
      margin,
      yPos + 8
    );
    doc.text("WhatsApp: +27 74 920 1395 | +27 84 461 3158", margin, yPos + 14);

    // Notes section hint
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Tip: Print this checklist or use it digitally to track your progress!",
      pageWidth - margin - 80,
      yPos + 14
    );

    // Save the PDF
    const fileName =
      title.toLowerCase().replace(/\s+/g, "-") + "-checklist.pdf";
    doc.save(fileName);
  };

  const handleDownloadExcel = () => {
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();

    // Create data array with headers and items
    const wsData = [
      // Header row with styling info
      ["", title.toUpperCase()],
      ["", "CareerCVPro.co.za - Your Career Success Partner"],
      ["", `Downloaded: ${new Date().toLocaleDateString("en-ZA")}`],
      [""], // Empty row
      ["✓", "Task", "Status", "Date Completed", "Notes"],
      // Checklist items
      ...items.map((item, index) => ["☐", item, "", "", ""]),
      [""], // Empty row
      [""], // Empty row
      ["", "Progress Tracker"],
      ["", `Total Items: ${items.length}`],
      ["", "Completed: [Count your checkmarks]"],
      ["", "Remaining: [Items without checkmarks]"],
      [""], // Empty row
      ["", "Contact CareerCVPro for professional CV services:"],
      ["", "WhatsApp: +27 74 920 1395 | +27 84 461 3158"],
      ["", "Website: careercvpro.co.za"],
    ];

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Set column widths
    ws["!cols"] = [
      { wch: 4 }, // Checkbox column
      { wch: 60 }, // Task column
      { wch: 15 }, // Status column
      { wch: 18 }, // Date column
      { wch: 30 }, // Notes column
    ];

    // Merge cells for header
    ws["!merges"] = [
      { s: { r: 0, c: 1 }, e: { r: 0, c: 4 } }, // Title
      { s: { r: 1, c: 1 }, e: { r: 1, c: 4 } }, // Subtitle
      { s: { r: 2, c: 1 }, e: { r: 2, c: 4 } }, // Date
    ];

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Checklist");

    // Create second sheet with instructions
    const instructionsData = [
      ["HOW TO USE THIS CHECKLIST"],
      [""],
      ["1. Replace ☐ with ✓ when you complete a task"],
      ["2. Add the date you completed each task"],
      ["3. Use the Notes column for any reminders"],
      ["4. Track your progress with the counter at the bottom"],
      [""],
      ["QUICK TIPS:"],
      ["• Work through items in order for best results"],
      ["• Set deadlines for each task"],
      ["• Celebrate your progress!"],
      [""],
      ["NEED HELP WITH YOUR CV?"],
      ["Contact CareerCVPro for professional CV writing services"],
      ["CV: R80 | Cover Letter: R30 | Combo: R100 | LinkedIn: R150"],
      [""],
      ["WhatsApp: +27 74 920 1395"],
      ["WhatsApp: +27 84 461 3158"],
      ["Website: careercvpro.co.za"],
    ];

    const wsInstructions = XLSX.utils.aoa_to_sheet(instructionsData);
    wsInstructions["!cols"] = [{ wch: 60 }];
    XLSX.utils.book_append_sheet(wb, wsInstructions, "Instructions");

    // Generate Excel file
    const fileName =
      title.toLowerCase().replace(/\s+/g, "-") + "-checklist.xlsx";
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-end mb-4">
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          <File className="h-4 w-4" />
          Download PDF
        </button>
        <button
          onClick={handleDownloadExcel}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Download Excel
        </button>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-brand-teal/90 transition-colors text-sm"
        >
          <Printer className="h-4 w-4" />
          Print
        </button>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-4 ${
              index !== items.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div className="w-5 h-5 border-2 border-brand-navy rounded flex-shrink-0 mt-0.5" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
