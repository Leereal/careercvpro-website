// Free downloadable CV templates shown on /free-resources/cv-samples.
// Files live in /public/cv-templates, page previews in /public/cv-templates/previews.
// Shared by the page (client) and its layout (SEO structured data).

export type TemplateFormat = "word" | "pdf";

export interface FreeCVTemplate {
  slug: string;
  name: string;
  format: TemplateFormat;
  pages: number;
  /** Page preview images, in page order. */
  previews: string[];
  file: string;
  /** Name the browser saves the file as. */
  downloadName: string;
  style: string;
  tagline: string;
  description: string;
  bestFor: string[];
  features: string[];
  hasPhoto: boolean;
  fonts: string;
  accent: string;
}

const previewPaths = (slug: string, pages: number) =>
  Array.from(
    { length: pages },
    (_, i) => `/cv-templates/previews/${slug}-${i + 1}.webp`,
  );

const make = (
  t: Omit<FreeCVTemplate, "previews" | "file" | "downloadName">,
): FreeCVTemplate => {
  const ext = t.format === "word" ? "docx" : "pdf";
  return {
    ...t,
    previews: previewPaths(t.slug, t.pages),
    file: `/cv-templates/careercvpro-${t.slug}-cv-template.${ext}`,
    downloadName: `CareerCVPro - ${t.name} CV Template.${ext}`,
  };
};

export const freeCVTemplates: FreeCVTemplate[] = [
  make({
    slug: "emerald-sidebar",
    name: "Emerald Sidebar",
    format: "word",
    pages: 1,
    style: "Modern · Sidebar",
    tagline: "Bold green sidebar that fits everything on one page",
    description:
      "A confident one-page CV with a deep emerald sidebar for your contact details, key skills, languages and references. Serif headings keep it professional while the sidebar keeps it modern.",
    bestFor: [
      "Administration & Office",
      "Operations",
      "Banking & Finance",
      "Government & NGOs",
    ],
    features: [
      "Fits a full career on one page",
      "Sidebar for contact, skills, languages and references",
      "Monogram initials badge",
      "Language proficiency dots",
      "Fully editable in Microsoft Word",
    ],
    hasPhoto: false,
    fonts: "Georgia & Calibri",
    accent: "#14532d",
  }),
  make({
    slug: "burgundy-classic",
    name: "Burgundy Classic",
    format: "word",
    pages: 2,
    style: "Classic · Traditional",
    tagline: "Timeless, elegant and easy for recruiters to read",
    description:
      "A traditional centred layout with burgundy accents and a clear date column. Clean, readable and conservative: the safe choice for corporate and formal applications.",
    bestFor: [
      "Finance & Accounting",
      "Legal",
      "Government & Public Service",
      "Senior & Management Roles",
    ],
    features: [
      "Classic single-flow reading order",
      "Areas of expertise grid",
      "Dates in a separate column for quick scanning",
      "Page numbers in the footer",
      "Fully editable in Microsoft Word",
    ],
    hasPhoto: false,
    fonts: "Garamond",
    accent: "#7f1d1d",
  }),
  make({
    slug: "teal-grid-minimal",
    name: "Teal Grid Minimal",
    format: "word",
    pages: 2,
    style: "Minimal · Modern",
    tagline: "Clean lines, lots of white space, no clutter",
    description:
      "A crisp, minimal design with section labels on the left and a tidy expertise grid. It feels modern without being loud and keeps the focus on your experience.",
    bestFor: [
      "IT & Technology",
      "Engineering",
      "Consulting",
      "Graduates & Young Professionals",
    ],
    features: [
      "Minimal two-zone layout",
      "Expertise grid with short descriptions",
      "Right-aligned dates",
      "Generous white space",
      "Fully editable in Microsoft Word",
    ],
    hasPhoto: false,
    fonts: "Century Gothic",
    accent: "#0f766e",
  }),
  make({
    slug: "slate-orange-infographic",
    name: "Slate & Orange Infographic",
    format: "word",
    pages: 2,
    style: "Infographic · Bold",
    tagline: "Numbers and skill bars that grab attention fast",
    description:
      "A striking slate header with orange highlights, achievement stat boxes (years of experience, team size, projects) and skill bars. Shows your impact at a glance.",
    bestFor: [
      "Sales & Marketing",
      "Project Management",
      "Logistics & Supply Chain",
      "Technical & Trade Supervisors",
    ],
    features: [
      "Headline stats row for your biggest numbers",
      "Skill bars and language dots",
      "Timeline-style work experience",
      "Education cards",
      "Fully editable in Microsoft Word",
    ],
    hasPhoto: false,
    fonts: "Segoe UI",
    accent: "#ea580c",
  }),
  make({
    slug: "ivory-serif-elegance",
    name: "Ivory Serif Elegance",
    format: "pdf",
    pages: 1,
    style: "Elegant · Executive",
    tagline: "Refined cream-and-gold design with a premium feel",
    description:
      "An elegant one-page design on a soft ivory background with gold accents, a monogram and refined serif typography. Looks premium printed or on screen.",
    bestFor: [
      "Executives & Managers",
      "Executive Assistants",
      "Hospitality & Events",
      "Client-Facing Professionals",
    ],
    features: [
      "Monogram header with gold accents",
      "Expertise, education and languages column",
      "Training section and references row",
      "One page, print-ready A4",
    ],
    hasPhoto: false,
    fonts: "Playfair Display & Lato",
    accent: "#b08d57",
  }),
  make({
    slug: "aurora-gradient-modern",
    name: "Aurora Gradient Modern",
    format: "pdf",
    pages: 1,
    style: "Modern · Colourful",
    tagline: "Vibrant purple-to-teal header that stands out",
    description:
      "A modern design with a purple-to-teal gradient header, highlight stat cards, skill bars and card-style sections. Ideal when you want your CV to look current.",
    bestFor: [
      "Tech & Digital",
      "Marketing & Communications",
      "Project Coordinators",
      "Start-ups",
    ],
    features: [
      "Gradient header with contact chips",
      "Highlight stat cards",
      "Skill percentage bars",
      "Training tags and details panel",
      "One page, print-ready A4",
    ],
    hasPhoto: false,
    fonts: "Montserrat",
    accent: "#6d28d9",
  }),
  make({
    slug: "rose-creative-sidebar",
    name: "Rose Creative Sidebar",
    format: "pdf",
    pages: 1,
    style: "Creative · With Photo",
    tagline: "Warm, friendly design with space for your photo",
    description:
      "A warm rose design with a photo circle in the sidebar, a personal quote and script-style headings. Great for people-facing roles where personality matters.",
    bestFor: [
      "Hospitality & Tourism",
      "Beauty & Wellness",
      "Customer Service & Retail",
      "Teaching & HR",
    ],
    features: [
      "Photo placeholder",
      "Personal quote banner",
      "Skill and language rating dots",
      "Contact icons in the sidebar",
      "One page, print-ready A4",
    ],
    hasPhoto: true,
    fonts: "Playfair Display & Poppins",
    accent: "#be123c",
  }),
];

export interface FAQ {
  question: string;
  answer: string;
}

export const cvWritingTips = [
  {
    title: "Use Action Verbs",
    description:
      "Start bullet points with powerful verbs: Developed, Implemented, Managed, Achieved, Increased, Streamlined.",
  },
  {
    title: "Quantify Achievements",
    description:
      "Use numbers: 'Increased sales by 35%' is stronger than 'Improved sales significantly'.",
  },
  {
    title: "Tailor Each Application",
    description:
      "Customise your CV for each job by including keywords from the job advert.",
  },
  {
    title: "Keep it Concise",
    description:
      "2 pages maximum for experienced professionals, 1 page for graduates.",
  },
  {
    title: "Use Clear Headings",
    description:
      "Stick to standard section headings (Profile, Experience, Education, Skills) and readable fonts so recruiters and ATS software can scan it.",
  },
  {
    title: "Proofread Thoroughly",
    description:
      "Spelling mistakes are one of the top reasons CVs get rejected. Read it twice, then ask someone else to check.",
  },
];

export const WHATSAPP_NUMBER = "27844613158";
export const WHATSAPP_DISPLAY = "+27 84 461 3158";

export const cvTemplateFaqs: FAQ[] = [
  {
    question: "Are these CV templates really free?",
    answer:
      "Yes. All 7 templates are 100% free to download and use for your own job applications. There's no sign-up, no email required and no watermark. Download as many as you like.",
  },
  {
    question: "Which template should I choose: Word or PDF?",
    answer:
      "Choose a Word (.docx) template if you want to edit everything yourself. They open in Microsoft Word, Google Docs and WPS Office. The PDF templates are design-led layouts; they're best if you're comfortable editing PDFs, or if you'd like us to fill them in for you.",
  },
  {
    question: "How do I edit the PDF templates?",
    answer:
      "Open the PDF in Microsoft Word (File → Open). Word converts it into an editable document, but some design elements may shift, so check the layout before you save. You can also use Canva or Adobe Acrobat. Or send us your details on WhatsApp and we'll fill it in for you professionally.",
  },
  {
    question: "Can I edit the templates on my phone?",
    answer:
      "Yes. The Word templates work in the free Microsoft Word, WPS Office or Google Docs apps on Android and iPhone. A computer is easier for the PDF templates. If you only have a phone, WhatsApp us and we'll do it for you.",
  },
  {
    question: "Can you fill in a template for me?",
    answer: `Yes! Send your current CV (or just your details) and the name of the template you like to us on WhatsApp at ${WHATSAPP_DISPLAY}. Our writers will rewrite and format your CV in that design for R80, usually the same day.`,
  },
  {
    question: "What is the best CV format for South Africa?",
    answer:
      "The best CV format depends on your industry. For corporate roles (finance, legal, government), use a classic layout like Burgundy Classic. For tech, marketing and creative roles, a modern design such as Teal Grid Minimal or Aurora Gradient Modern works well. Whichever you pick, use clear section headings and include keywords from the job ad.",
  },
  {
    question: "How long should a CV be in South Africa?",
    answer:
      "In South Africa, a CV should usually be 1–2 pages. Graduates and those with less than 5 years' experience should aim for 1 page. Experienced professionals can use 2 pages. Senior executives may extend to 3 pages if necessary.",
  },
  {
    question: "Should I include a photo on my CV?",
    answer:
      "Photos are optional in South Africa and depend on the industry. Customer-facing roles, hospitality and creative industries often welcome a photo (try Rose Creative Sidebar). For corporate, government and technical roles it's generally not necessary. If you include one, use a professional headshot.",
  },
  {
    question: "What should I include in a South African CV?",
    answer:
      "Include your contact details, a short professional summary, work experience with achievements, education and qualifications, skills, and references (or 'available on request'). Add your ID number only if the job ad asks for it.",
  },
  {
    question: "What is ATS and why does it matter?",
    answer:
      "ATS (Applicant Tracking System) is software many large South African companies use to screen CVs before a person reads them. To get through, use standard section headings like Experience, Education and Skills, include keywords from the job ad, and keep your layout clean. If you're applying mainly through online portals, ask us for an ATS-friendly version.",
  },
];
