// Job Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  province: string;
  type:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Temporary"
    | "Internship"
    | "Learnership";
  category: string;
  salary?: string;
  postedDate: string;
  description: string;
  requirements: string[];
  featured?: boolean;
  urgent?: boolean;
}

// Province data
export interface Province {
  name: string;
  slug: string;
  cities: string[];
}

export const provinceData: Province[] = [
  {
    name: "Gauteng",
    slug: "gauteng",
    cities: [
      "Johannesburg",
      "Pretoria",
      "Sandton",
      "Midrand",
      "Centurion",
      "Soweto",
      "Randburg",
    ],
  },
  {
    name: "Western Cape",
    slug: "western-cape",
    cities: [
      "Cape Town",
      "Stellenbosch",
      "Paarl",
      "Somerset West",
      "Bellville",
      "Century City",
    ],
  },
  {
    name: "KwaZulu-Natal",
    slug: "kwazulu-natal",
    cities: [
      "Durban",
      "Pietermaritzburg",
      "Richards Bay",
      "Newcastle",
      "Umhlanga",
      "Ballito",
    ],
  },
  {
    name: "Eastern Cape",
    slug: "eastern-cape",
    cities: [
      "Port Elizabeth",
      "East London",
      "Mthatha",
      "Grahamstown",
      "Uitenhage",
    ],
  },
  {
    name: "Limpopo",
    slug: "limpopo",
    cities: [
      "Polokwane",
      "Tzaneen",
      "Thohoyandou",
      "Louis Trichardt",
      "Mokopane",
    ],
  },
  {
    name: "Mpumalanga",
    slug: "mpumalanga",
    cities: ["Nelspruit", "Witbank", "Middelburg", "Secunda", "Ermelo"],
  },
  {
    name: "North West",
    slug: "north-west",
    cities: ["Rustenburg", "Potchefstroom", "Klerksdorp", "Mahikeng", "Brits"],
  },
  {
    name: "Free State",
    slug: "free-state",
    cities: ["Bloemfontein", "Welkom", "Bethlehem", "Kroonstad", "Sasolburg"],
  },
  {
    name: "Northern Cape",
    slug: "northern-cape",
    cities: ["Kimberley", "Upington", "Springbok", "De Aar", "Kuruman"],
  },
];

// Dummy jobs data
export const dummyJobs: Job[] = [
  {
    id: "security-officer-jhb-1",
    title: "Security Officer",
    company: "Fidelity Services Group",
    location: "Sandton, Johannesburg",
    province: "Gauteng",
    type: "Full-time",
    category: "Security",
    salary: "R8,000 - R12,000/month",
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "We are looking for reliable Security Officers to join our team in Sandton. PSIRA Grade C required. Shifts available 24/7.",
    requirements: [
      "PSIRA Grade C or higher",
      "Clear criminal record",
      "South African ID",
      "Willing to work shifts",
    ],
    featured: true,
    urgent: true,
  },
  {
    id: "call-centre-agent-cpt-1",
    title: "Call Centre Agent",
    company: "Teleperformance South Africa",
    location: "Century City, Cape Town",
    province: "Western Cape",
    type: "Full-time",
    category: "Call Centre",
    salary: "R7,500 - R10,000/month",
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Join our growing call centre team! No experience required - full training provided. Medical aid and pension benefits.",
    requirements: [
      "Matric certificate",
      "Good communication skills",
      "Computer literate",
      "Available for shifts",
    ],
    featured: true,
  },
  {
    id: "retail-cashier-dbn-1",
    title: "Retail Cashier",
    company: "Shoprite Holdings",
    location: "Gateway Mall, Durban",
    province: "KwaZulu-Natal",
    type: "Full-time",
    category: "Retail",
    salary: "R5,500 - R7,000/month",
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Shoprite is hiring cashiers for our Gateway Mall store. Training provided. Staff discount benefits.",
    requirements: [
      "Matric certificate",
      "Basic math skills",
      "Customer service oriented",
      "Available weekends",
    ],
  },
  {
    id: "admin-clerk-pta-1",
    title: "Admin Clerk",
    company: "Department of Home Affairs",
    location: "Pretoria Central",
    province: "Gauteng",
    type: "Full-time",
    category: "Government",
    salary: "R12,000 - R15,000/month",
    postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Government position for Admin Clerk. Excellent benefits including medical aid and pension. South African citizens only.",
    requirements: [
      "Matric with admin subjects",
      "Computer skills (MS Office)",
      "SA Citizen",
      "No criminal record",
    ],
    featured: true,
  },
  {
    id: "driver-code10-jhb-1",
    title: "Code 10 Driver",
    company: "DSV South Africa",
    location: "Midrand, Johannesburg",
    province: "Gauteng",
    type: "Full-time",
    category: "Driving",
    salary: "R10,000 - R14,000/month",
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Logistics company seeking experienced Code 10 drivers. PDP required. Local and long-distance routes available.",
    requirements: [
      "Valid Code 10 license",
      "PDP (Professional Driving Permit)",
      "2+ years experience",
      "Clean driving record",
    ],
  },
  {
    id: "learnership-it-cpt-1",
    title: "IT Support Learnership",
    company: "Capitec Bank",
    location: "Stellenbosch, Cape Town",
    province: "Western Cape",
    type: "Learnership",
    category: "IT",
    salary: "R5,000/month stipend",
    postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "12-month IT Support learnership with qualification. For unemployed youth aged 18-35. Stipend paid monthly.",
    requirements: [
      "Matric with Maths",
      "Age 18-35",
      "Currently unemployed",
      "SA Citizen",
    ],
    urgent: true,
  },
  {
    id: "nurse-auxiliary-pe-1",
    title: "Auxiliary Nurse",
    company: "Life Healthcare",
    location: "Port Elizabeth",
    province: "Eastern Cape",
    type: "Full-time",
    category: "Healthcare",
    salary: "R9,000 - R12,000/month",
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Private hospital seeking registered Auxiliary Nurses. Day and night shifts available. Medical aid provided.",
    requirements: [
      "SANC registered",
      "Auxiliary Nurse qualification",
      "1 year experience",
      "Available for shifts",
    ],
  },
  {
    id: "general-worker-polokwane-1",
    title: "General Worker",
    company: "Build It",
    location: "Polokwane",
    province: "Limpopo",
    type: "Full-time",
    category: "Construction",
    salary: "R4,500 - R6,000/month",
    postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Hardware store looking for general workers. Loading, packing, and customer assistance. Physical fitness required.",
    requirements: [
      "Grade 10 minimum",
      "Physically fit",
      "Reliable",
      "Own transport preferred",
    ],
  },
  {
    id: "waiter-nelspruit-1",
    title: "Waiter/Waitress",
    company: "Spur Steak Ranches",
    location: "Nelspruit",
    province: "Mpumalanga",
    type: "Part-time",
    category: "Hospitality",
    salary: "R3,500 + tips",
    postedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Family restaurant hiring friendly waiters. Tips on top of salary. Flexible hours for students.",
    requirements: [
      "Matric or studying",
      "Friendly personality",
      "Available evenings and weekends",
      "Food handling certificate a plus",
    ],
  },
  {
    id: "accountant-bloemfontein-1",
    title: "Junior Accountant",
    company: "PwC South Africa",
    location: "Bloemfontein",
    province: "Free State",
    type: "Full-time",
    category: "Finance",
    salary: "R18,000 - R22,000/month",
    postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Big 4 accounting firm seeking junior accountants. SAICA articles available. Excellent career growth.",
    requirements: [
      "BCom Accounting degree",
      "Working towards CA(SA)",
      "Strong academics",
      "Computer proficiency",
    ],
  },
  {
    id: "miner-rustenburg-1",
    title: "Rock Drill Operator",
    company: "Anglo American Platinum",
    location: "Rustenburg",
    province: "North West",
    type: "Full-time",
    category: "Mining",
    salary: "R15,000 - R20,000/month",
    postedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Platinum mine hiring rock drill operators. Housing allowance and medical aid included. Transport provided.",
    requirements: [
      "Mining certificate",
      "Blasting certificate advantageous",
      "Medically fit",
      "2+ years underground experience",
    ],
  },
  {
    id: "farm-worker-upington-1",
    title: "Farm Worker",
    company: "Orange River Cellars",
    location: "Upington",
    province: "Northern Cape",
    type: "Temporary",
    category: "Agriculture",
    salary: "R4,000 - R5,500/month",
    postedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Wine farm hiring seasonal workers for harvest. Accommodation provided. 3-month contract with renewal option.",
    requirements: [
      "Physical fitness",
      "Willing to work outdoors",
      "Available immediately",
      "Farm experience preferred",
    ],
  },
  {
    id: "sales-rep-jhb-1",
    title: "Sales Representative",
    company: "Vodacom",
    location: "Rosebank, Johannesburg",
    province: "Gauteng",
    type: "Full-time",
    category: "Retail",
    salary: "R8,000 + commission",
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Top cellphone network hiring sales reps. Basic plus uncapped commission. OTE R15,000+. Training provided.",
    requirements: [
      "Matric certificate",
      "Sales experience preferred",
      "Own transport",
      "Target driven",
    ],
    featured: true,
  },
  {
    id: "receptionist-sandton-1",
    title: "Receptionist",
    company: "Regus",
    location: "Sandton City, Johannesburg",
    province: "Gauteng",
    type: "Full-time",
    category: "Admin",
    salary: "R10,000 - R13,000/month",
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Professional serviced office seeking front desk receptionist. Smart appearance and excellent communication essential.",
    requirements: [
      "Matric certificate",
      "Reception experience",
      "MS Office proficient",
      "Professional appearance",
    ],
  },
  {
    id: "cleaner-cpt-1",
    title: "Office Cleaner",
    company: "Bidvest Services",
    location: "V&A Waterfront, Cape Town",
    province: "Western Cape",
    type: "Full-time",
    category: "Cleaning",
    salary: "R4,500 - R5,500/month",
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Cleaning company hiring cleaners for office buildings. Day shift. UIF and benefits included.",
    requirements: [
      "Cleaning experience preferred",
      "Reliable and punctual",
      "Physical fitness",
      "SA ID",
    ],
  },
  {
    id: "internship-marketing-jhb-1",
    title: "Marketing Internship",
    company: "Ogilvy South Africa",
    location: "Bryanston, Johannesburg",
    province: "Gauteng",
    type: "Internship",
    category: "Marketing",
    salary: "R6,000/month stipend",
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Award-winning agency offering 12-month internship. Learn from industry leaders. Possible permanent placement.",
    requirements: [
      "Marketing/Communications degree",
      "Creative mindset",
      "Social media savvy",
      "Recent graduate",
    ],
    urgent: true,
  },
];

// Helper to get jobs by province
export function getJobsByProvince(province: string): Job[] {
  return dummyJobs.filter(
    (job) =>
      job.province.toLowerCase().replace(/\s+/g, "-") === province.toLowerCase()
  );
}

// Helper to count jobs by province
export function getJobCountByProvince(province: string): number {
  return getJobsByProvince(province).length;
}

// Helper to get a job by ID
export function getJobById(id: string): Job | undefined {
  return dummyJobs.find((job) => job.id === id);
}

// Helper to get unique categories
export function getCategories(): string[] {
  return [...new Set(dummyJobs.map((job) => job.category))].sort();
}

// Helper to get unique provinces from jobs
export function getProvinces(): string[] {
  return [...new Set(dummyJobs.map((job) => job.province))].sort();
}
