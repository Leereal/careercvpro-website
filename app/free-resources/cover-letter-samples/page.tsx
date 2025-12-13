"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ChevronDown,
  Copy,
  Check,
  Download,
  Briefcase,
  GraduationCap,
  Building2,
  Stethoscope,
  Monitor,
  ShoppingBag,
  Hammer,
  Users,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Star,
  Lightbulb,
  AlertCircle,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

interface CoverLetterSample {
  id: string;
  title: string;
  industry: string;
  icon: typeof Briefcase;
  description: string;
  forWho: string;
  content: string;
  tips: string[];
}

const coverLetterSamples: CoverLetterSample[] = [
  {
    id: "graduate-entry",
    title: "Graduate / Entry-Level",
    industry: "General",
    icon: GraduationCap,
    description:
      "Perfect for recent graduates with little to no work experience",
    forWho: "University/college graduates, first-time job seekers",
    content: `Dear [Hiring Manager's Name],

I am writing to express my strong interest in the [Job Title] position at [Company Name], as advertised on [Where You Found It]. As a recent [Degree] graduate from [University Name], I am eager to apply my academic knowledge and internship experience to contribute to your team.

During my studies, I developed strong skills in [Relevant Skill 1] and [Relevant Skill 2] through coursework and practical projects. My final year project on [Project Topic] required me to [Achievement/Skill Demonstrated], which directly relates to the requirements outlined in your job posting.

I completed a [Duration] internship at [Company Name] where I:
• [Achievement 1 with measurable result if possible]
• [Achievement 2]
• [Achievement 3]

What excites me most about [Company Name] is [Specific Reason - research the company]. I am particularly drawn to your [Company Initiative/Value/Project], and I believe my [Relevant Quality] would allow me to contribute meaningfully to your team.

I am confident that my academic foundation, combined with my enthusiasm for [Industry/Field], makes me a strong candidate for this role. I would welcome the opportunity to discuss how my skills and passion can benefit [Company Name].

Thank you for considering my application. I look forward to the possibility of contributing to your team.

Kind regards,
[Your Name]
[Phone Number]
[Email Address]`,
    tips: [
      "Focus on academic achievements, projects, and internships",
      "Show enthusiasm and willingness to learn",
      "Research the company and mention specific details",
      "Highlight transferable skills from studies",
    ],
  },
  {
    id: "career-changer",
    title: "Career Changer",
    industry: "General",
    icon: TrendingUp,
    description: "For professionals transitioning to a new industry or role",
    forWho: "People switching careers, industry changers",
    content: `Dear [Hiring Manager's Name],

I am excited to apply for the [Job Title] position at [Company Name]. While my background is in [Previous Industry/Role], I am eager to bring my transferable skills and fresh perspective to [New Industry/Field].

In my [X] years as a [Previous Role], I developed expertise in [Transferable Skill 1], [Transferable Skill 2], and [Transferable Skill 3]—all of which are directly applicable to this role. For example:

• At [Previous Company], I [Achievement that demonstrates transferable skill]
• I successfully [Another achievement showing relevant competency]
• My experience in [Area] taught me [Relevant lesson/skill]

My decision to transition into [New Field] stems from [Genuine Reason - passion, interest, career goal]. To prepare for this change, I have [Courses taken, certifications earned, volunteer work, or self-study completed].

What attracts me to [Company Name] specifically is [Research-based reason]. Your commitment to [Company Value/Initiative] aligns perfectly with my professional values, and I am confident I can bring a unique perspective from my diverse background.

I understand that transitioning industries requires dedication, and I am fully committed to this new path. I would appreciate the opportunity to discuss how my unique experience can add value to your team.

Thank you for your time and consideration.

Warm regards,
[Your Name]
[Phone Number]
[Email Address]`,
    tips: [
      "Emphasize transferable skills from your previous career",
      "Explain your motivation for the career change",
      "Mention any courses, certifications, or preparation you've done",
      "Show how your diverse background adds value",
    ],
  },
  {
    id: "admin-office",
    title: "Administrative / Office",
    industry: "Administration",
    icon: Building2,
    description:
      "For administrative assistants, receptionists, and office managers",
    forWho: "Admin assistants, receptionists, office coordinators, PAs",
    content: `Dear [Hiring Manager's Name],

I am writing to apply for the [Administrative Assistant/Office Manager] position at [Company Name]. With [X] years of experience in administrative support roles, I am confident in my ability to contribute to your team's efficiency and success.

In my current role at [Current/Previous Company], I have:

• Managed calendars and scheduled meetings for [Number] executives, reducing scheduling conflicts by [X]%
• Processed an average of [Number] documents/invoices/requests per month with 99% accuracy
• Coordinated [Type of events/meetings], including logistics, catering, and attendee communication
• Implemented [System/Process] that improved [Outcome] by [Percentage/Metric]

I am proficient in Microsoft Office Suite (Word, Excel, PowerPoint, Outlook), as well as [Other relevant software like SAP, Pastel, etc.]. My strong organizational skills and attention to detail ensure that all administrative tasks are completed accurately and on time.

What appeals to me about [Company Name] is [Specific reason from research]. I am particularly impressed by [Company achievement/value], and I am eager to support your team in achieving continued success.

I am available for an interview at your convenience and look forward to discussing how my administrative expertise can benefit [Company Name].

Thank you for considering my application.

Kind regards,
[Your Name]
[Phone Number]
[Email Address]`,
    tips: [
      "Highlight organizational and multitasking abilities",
      "Mention specific software proficiency",
      "Include metrics where possible (documents processed, meetings scheduled)",
      "Emphasize attention to detail and reliability",
    ],
  },
  {
    id: "retail-hospitality",
    title: "Retail / Hospitality",
    industry: "Retail & Hospitality",
    icon: ShoppingBag,
    description: "For sales associates, store managers, and hospitality staff",
    forWho:
      "Retail staff, store managers, waiters, hotel staff, customer service",
    content: `Dear [Hiring Manager's Name],

I am thrilled to apply for the [Job Title] position at [Company/Store Name]. With [X] years of experience in [retail/hospitality], I have developed a passion for delivering exceptional customer experiences and driving sales results.

At [Current/Previous Employer], I have consistently exceeded expectations:

• Achieved [X]% above sales targets for [Number] consecutive months
• Maintained a customer satisfaction rating of [X]% based on feedback surveys
• Trained and mentored [Number] new team members, improving team performance by [X]%
• Successfully handled customer complaints, turning [X]% of negative experiences into positive outcomes
• [Specific achievement relevant to the role]

I thrive in fast-paced environments and genuinely enjoy connecting with customers to understand and meet their needs. My [Language skills, if relevant] allow me to assist a diverse customer base effectively.

I have long admired [Company Name] for [Specific reason - brand values, customer focus, product quality]. The opportunity to represent your brand and contribute to your team's success is very exciting to me.

I am flexible with working hours, including weekends and public holidays, and am ready to bring my energy and customer-first attitude to [Company Name].

Thank you for considering my application. I would love the opportunity to discuss how I can contribute to your team.

Warm regards,
[Your Name]
[Phone Number]
[Email Address]`,
    tips: [
      "Showcase customer service skills and sales achievements",
      "Mention flexibility with working hours",
      "Include any upselling or target-beating results",
      "Highlight language skills if applicable",
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare / Nursing",
    industry: "Healthcare",
    icon: Stethoscope,
    description: "For nurses, healthcare assistants, and medical professionals",
    forWho: "Registered nurses, enrolled nurses, care workers, medical staff",
    content: `Dear [Hiring Manager's Name],

I am writing to apply for the [Registered Nurse/Healthcare Assistant] position at [Hospital/Clinic Name]. As a [Qualification] with [X] years of experience in [Specialty/Department], I am passionate about providing compassionate, patient-centered care.

My clinical experience includes:

• Providing direct patient care to [Number] patients daily in [Department/Setting]
• Administering medications and treatments in accordance with SANC regulations
• Collaborating with multidisciplinary teams to develop and implement care plans
• Maintaining accurate patient records and documentation
• [Specific achievement or specialization]

At [Current/Previous Facility], I was recognized for [Achievement - e.g., patient satisfaction scores, zero medication errors, training contributions]. I am committed to continuous professional development and recently completed [Course/Training] to enhance my skills in [Area].

I am drawn to [Facility Name] because of your reputation for [Specific quality - excellence in patient care, community focus, innovative treatments]. I share your commitment to [Value], and I am eager to contribute to your team.

I hold current SANC registration and am certified in [BLS/ACLS/Other relevant certifications]. I am available for shifts including nights, weekends, and public holidays.

Thank you for considering my application. I look forward to the opportunity to discuss how my clinical skills and dedication can benefit your patients and team.

Kind regards,
[Your Name]
SANC Registration Number: [Number]
[Phone Number]
[Email Address]`,
    tips: [
      "Include your SANC registration number",
      "Mention relevant certifications (BLS, ACLS, etc.)",
      "Highlight patient care achievements and safety record",
      "Show commitment to continuous professional development",
    ],
  },
  {
    id: "it-tech",
    title: "IT / Technology",
    industry: "Information Technology",
    icon: Monitor,
    description: "For developers, IT support, and tech professionals",
    forWho: "Software developers, IT support, system admins, data analysts",
    content: `Dear [Hiring Manager's Name],

I am excited to apply for the [Job Title] position at [Company Name]. As a [Your Role] with [X] years of experience in [Specific Tech Area], I am eager to contribute my technical expertise to your innovative team.

My technical skills and experience include:

• Programming Languages: [List relevant languages - Python, Java, JavaScript, C#, etc.]
• Frameworks/Technologies: [React, Angular, .NET, Django, etc.]
• Databases: [MySQL, PostgreSQL, MongoDB, etc.]
• Tools: [Git, Docker, AWS, Azure, etc.]

Key achievements in my current role at [Company]:

• Developed [Application/System] that [Measurable outcome - reduced processing time by X%, served X users]
• Implemented [Technical solution] resulting in [Benefit - improved performance, cost savings]
• Collaborated with cross-functional teams to deliver [Project] [on time/under budget]
• Resolved [Number]+ technical issues monthly with [X]% first-call resolution rate

I am particularly interested in [Company Name] because of [Specific reason - innovative products, tech stack, company culture, interesting challenges]. Your work on [Specific project/product] aligns with my interest in [Technical area].

I am committed to staying current with emerging technologies and recently [Certification earned, course completed, project built]. I thrive in collaborative environments and enjoy solving complex technical challenges.

Thank you for considering my application. I would welcome the opportunity to discuss how my technical skills can contribute to [Company Name]'s success.

Best regards,
[Your Name]
[Phone Number]
[Email Address]
GitHub: [If applicable]
LinkedIn: [If applicable]`,
    tips: [
      "List specific technologies and programming languages",
      "Include links to GitHub, portfolio, or LinkedIn",
      "Quantify achievements (performance improvements, users served)",
      "Show interest in the company's tech stack or products",
    ],
  },
  {
    id: "finance-accounting",
    title: "Finance / Accounting",
    industry: "Finance",
    icon: Briefcase,
    description: "For accountants, bookkeepers, and finance professionals",
    forWho: "Accountants, bookkeepers, financial analysts, auditors",
    content: `Dear [Hiring Manager's Name],

I am writing to express my interest in the [Job Title] position at [Company Name]. As a [Qualification - CA(SA), CIMA, etc.] with [X] years of experience in [Finance Area], I am confident in my ability to contribute to your financial operations and strategic goals.

In my current role as [Title] at [Company], I have:

• Managed month-end and year-end close processes, consistently meeting all deadlines
• Prepared financial statements and reports in compliance with IFRS/GAAP
• Conducted variance analysis, identifying [X] in cost savings opportunities
• Processed accounts payable/receivable totaling R[X] million annually
• [Specific achievement - audit findings, process improvements, etc.]

I am proficient in [Accounting software - Sage, SAP, QuickBooks, Pastel, etc.] and advanced Excel, including pivot tables, VLOOKUP, and financial modeling. My attention to detail and analytical skills ensure accuracy in all financial reporting.

[Company Name]'s reputation for [Specific quality - financial excellence, growth, industry leadership] makes this an exciting opportunity. I am particularly interested in [Specific aspect of the role or company].

I hold [Relevant qualification] and am registered with [SAICA/SAIPA/CIMA/Other]. I am committed to maintaining the highest standards of professional ethics and continuous development.

Thank you for considering my application. I look forward to discussing how my financial expertise can support [Company Name]'s objectives.

Kind regards,
[Your Name]
[Professional Registration Number]
[Phone Number]
[Email Address]`,
    tips: [
      "Include professional registration (SAICA, SAIPA, CIMA)",
      "Mention specific accounting software experience",
      "Highlight compliance knowledge (IFRS, tax regulations)",
      "Quantify financial achievements where possible",
    ],
  },
  {
    id: "construction-trades",
    title: "Construction / Trades",
    industry: "Construction",
    icon: Hammer,
    description: "For artisans, tradespeople, and construction workers",
    forWho: "Electricians, plumbers, builders, welders, site supervisors",
    content: `Dear [Hiring Manager's Name],

I am applying for the [Job Title] position at [Company Name]. As a qualified [Trade - Electrician/Plumber/Welder/etc.] with [X] years of experience, I am eager to bring my skills and work ethic to your team.

My qualifications and experience include:

• [Trade Certificate/Qualification] from [Institution]
• [X] years of hands-on experience in [Residential/Commercial/Industrial] projects
• Valid trade certificate and wireman's license (if applicable)
• Experience with [Specific equipment, techniques, or systems]

Key projects and achievements:

• Completed [Type of project] at [Location/Client], valued at R[X]
• Maintained an excellent safety record with zero incidents over [X] years
• Supervised a team of [Number] workers on [Project type]
• [Other relevant achievement]

I am familiar with OHSA regulations and committed to maintaining safe work practices. I hold a valid driver's license and am willing to travel to different sites as required.

What attracts me to [Company Name] is [Specific reason - reputation, project types, growth opportunities]. I am a reliable, hardworking professional who takes pride in quality workmanship.

I am available to start [Immediately/Date] and am flexible with working hours, including overtime when required.

Thank you for considering my application. I look forward to the opportunity to contribute to your projects.

Regards,
[Your Name]
[Trade Certificate Number]
[Phone Number]
[Email Address]`,
    tips: [
      "Include trade certificate and registration numbers",
      "Mention safety record and OHSA knowledge",
      "List specific equipment and techniques you're skilled in",
      "Indicate willingness to travel and work overtime",
    ],
  },
  {
    id: "hr-recruitment",
    title: "HR / Recruitment",
    industry: "Human Resources",
    icon: Users,
    description: "For HR officers, recruiters, and people managers",
    forWho: "HR officers, recruiters, HR managers, training coordinators",
    content: `Dear [Hiring Manager's Name],

I am writing to apply for the [HR Officer/Recruiter/HR Manager] position at [Company Name]. With [X] years of experience in human resources, I am passionate about creating positive workplace cultures and driving organizational success through effective people strategies.

My HR experience encompasses:

• Full-cycle recruitment: sourced, screened, and placed [Number]+ candidates across various roles
• Employee relations: managed disciplinary processes, grievances, and CCMA matters
• HR administration: maintained employee records, processed payroll inputs, and ensured compliance
• Training and development: coordinated training programs for [Number] employees
• [Additional relevant experience]

At [Current/Previous Company], I achieved:

• Reduced time-to-hire by [X]% through improved recruitment processes
• Achieved [X]% employee satisfaction score in engagement surveys
• Successfully resolved [X] workplace disputes through mediation
• Implemented [HR initiative] resulting in [Positive outcome]

I am well-versed in South African labour legislation, including the LRA, BCEA, and EEA, and have experience with HR systems such as [VIP, Sage, SAP HR, etc.].

[Company Name]'s commitment to [Employee wellbeing/Development/Diversity] resonates with my professional values. I am excited about the opportunity to contribute to your HR function.

Thank you for considering my application. I look forward to discussing how my HR expertise can support your organization.

Kind regards,
[Your Name]
[Phone Number]
[Email Address]`,
    tips: [
      "Highlight knowledge of SA labour laws (LRA, BCEA, EEA)",
      "Mention HR software experience",
      "Include recruitment metrics and employee satisfaction achievements",
      "Show understanding of current HR trends and best practices",
    ],
  },
];

const writingTips = [
  {
    title: "Research the Company",
    description:
      "Mention specific details about the company to show genuine interest",
  },
  {
    title: "Customize Every Letter",
    description:
      "Never send generic letters—tailor each one to the specific job",
  },
  {
    title: "Lead with Impact",
    description: "Start with a compelling hook, not 'I am writing to apply...'",
  },
  {
    title: "Show, Don't Tell",
    description: "Use specific examples and numbers instead of vague claims",
  },
  {
    title: "Keep it Concise",
    description:
      "One page maximum—recruiters spend seconds scanning cover letters",
  },
  {
    title: "End with Action",
    description: "Close with a clear call to action requesting an interview",
  },
];

const whatsappNumber = "27749201395";
const whatsappMessage = encodeURIComponent(
  "Hi! I'd like help with my cover letter. Can you write a professional, tailored cover letter for me?"
);

export default function CoverLetterSamplesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const copyToClipboard = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadAsText = (content: string, title: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}-cover-letter.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsDocx = async (content: string, title: string) => {
    // Split content into paragraphs
    const paragraphs = content.split("\n").map((line) => {
      // Check if line is a bullet point
      if (line.trim().startsWith("•")) {
        return new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 24, // 12pt
            }),
          ],
          spacing: { after: 120 },
          indent: { left: 360 }, // Indent bullet points
        });
      }
      return new Paragraph({
        children: [
          new TextRun({
            text: line,
            size: 24, // 12pt
          }),
        ],
        spacing: { after: line === "" ? 240 : 120 }, // More space after empty lines
      });
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(
      blob,
      `${title.toLowerCase().replace(/\s+/g, "-")}-cover-letter.docx`
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-teal/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-brand-teal/20 text-brand-teal px-4 py-2 rounded-full text-sm font-medium">
                <Mail className="h-4 w-4" />
                Free Resource
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Cover Letter{" "}
              <span className="text-brand-teal">Samples & Templates</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Free, professional cover letter examples for South African job
              seekers. Copy, customize, and land that interview.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-brand-gold" />
                <span>9 Industry Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-brand-teal" />
                <span>Copy or Download Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-brand-gold" />
                <span>Pro Tips Included</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-brand-gold/10 border-y border-brand-gold/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-brand-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-brand-navy font-medium">
                Important: These are templates, not copy-paste solutions!
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Always customize each cover letter for the specific job you're
                applying to. Replace all [bracketed text] with your own
                information. Generic cover letters rarely succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Letter Samples */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Choose Your Industry
              </h2>
              <p className="text-gray-600 text-lg">
                Click on any template to view, copy, or download
              </p>
            </motion.div>

            <div className="space-y-4">
              {coverLetterSamples.map((sample) => (
                <motion.div
                  key={sample.id}
                  variants={fadeInUp}
                  className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm"
                >
                  <button
                    onClick={() => toggleExpand(sample.id)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                        <sample.icon className="h-6 w-6 text-brand-teal" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-brand-navy text-lg">
                          {sample.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {sample.description}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                        expandedId === sample.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedId === sample.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-gray-100">
                          <div className="pt-4 space-y-4">
                            {/* For Who */}
                            <div className="bg-gray-50 rounded-xl p-4">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-brand-navy">
                                  Best for:
                                </span>{" "}
                                {sample.forWho}
                              </p>
                            </div>

                            {/* Cover Letter Content */}
                            <div className="bg-gray-50 rounded-xl p-6">
                              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                                {sample.content}
                              </pre>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                              <button
                                onClick={() =>
                                  copyToClipboard(sample.content, sample.id)
                                }
                                className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
                              >
                                {copiedId === sample.id ? (
                                  <>
                                    <Check className="h-4 w-4" />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-4 w-4" />
                                    Copy to Clipboard
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() =>
                                  downloadAsText(sample.content, sample.title)
                                }
                                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                              >
                                <Download className="h-4 w-4" />
                                Download .txt
                              </button>
                              <button
                                onClick={() =>
                                  downloadAsDocx(sample.content, sample.title)
                                }
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                              >
                                <FileText className="h-4 w-4" />
                                Download .docx
                              </button>
                            </div>

                            {/* Tips */}
                            <div className="bg-brand-gold/10 rounded-xl p-4 mt-4">
                              <h4 className="font-semibold text-brand-navy mb-2 flex items-center gap-2">
                                <Lightbulb className="h-4 w-4 text-brand-gold" />
                                Tips for {sample.title} Cover Letters
                              </h4>
                              <ul className="space-y-1">
                                {sample.tips.map((tip, index) => (
                                  <li
                                    key={index}
                                    className="text-sm text-gray-600 flex items-start gap-2"
                                  >
                                    <span className="text-brand-gold">•</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Writing Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Cover Letter Writing Tips
              </h2>
              <p className="text-gray-600 text-lg">
                Follow these guidelines to make your cover letter stand out
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {writingTips.map((tip, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="w-8 h-8 bg-brand-teal/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-brand-teal font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-brand-navy mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-teal to-brand-teal-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Need a Custom Cover Letter?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-teal-100 mb-8"
            >
              Let our experts write a tailored, job-specific cover letter for
              you. Just R30, delivered in under an hour.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-teal hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              >
                <MessageSquare className="h-5 w-5" />
                Get Custom Cover Letter - R30
              </a>
              <Link
                href="/cv-services/cover-letter-writing"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Learn More
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brand-navy mb-8">
              More Free Resources
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/free-resources/cv-samples"
                className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                CV Samples
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/free-resources/interview-questions"
                className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                Interview Questions
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/free-resources/career-checklists"
                className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                Career Checklists
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/career-tips/cv-guides"
                className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-brand-navy px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200"
              >
                CV Writing Guides
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
