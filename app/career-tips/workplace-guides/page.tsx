"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  CheckCircle,
  XCircle,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Target,
  Users,
  Clock,
  Star,
  Zap,
  MessageCircle,
  Mail,
  Calendar,
  TrendingUp,
  Shield,
  Heart,
  Handshake,
  FileText,
  Briefcase,
  Award,
  Eye,
  Coffee,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  UserPlus,
  Trophy,
  Rocket,
  Brain,
  Smile,
  Frown,
  AlertCircle,
  Volume2,
  VolumeX,
  Scale,
  Banknote,
  GraduationCap,
  Laptop,
  Home,
  MapPin,
  Phone,
  HelpCircle,
  Timer,
  Gauge,
  BarChart3,
  PieChart,
  BadgeCheck,
  Sparkles,
  Network,
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

// Featured workplace articles
const featuredArticles = [
  {
    title: "First 90 Days: How to Succeed in Your New Job",
    description:
      "A complete guide to making a great impression and setting yourself up for success.",
    readTime: "15 min read",
    icon: Rocket,
    featured: true,
  },
  {
    title: "Office Politics: Navigate Without Getting Burnt",
    description:
      "How to build alliances, avoid drama, and advance your career professionally.",
    readTime: "12 min read",
    icon: Users,
    featured: true,
  },
  {
    title: "How to Ask for a Raise in South Africa",
    description:
      "Timing, preparation, and scripts for salary negotiation conversations.",
    readTime: "10 min read",
    icon: Banknote,
  },
  {
    title: "Remote Work Success Strategies",
    description:
      "Thrive while working from home - productivity, boundaries, and communication.",
    readTime: "8 min read",
    icon: Home,
  },
  {
    title: "Dealing with Difficult Colleagues",
    description:
      "Professional strategies for handling workplace conflict and challenging personalities.",
    readTime: "11 min read",
    icon: AlertCircle,
  },
  {
    title: "Getting Promoted: What It Really Takes",
    description:
      "Beyond doing your job well - visibility, relationships, and strategic positioning.",
    readTime: "14 min read",
    icon: Trophy,
  },
];

// First 90 days guide
const first90Days = [
  {
    period: "Days 1-30",
    title: "Learn & Observe",
    subtitle: "The Sponge Phase",
    tasks: [
      "Learn everyone's names and roles",
      "Understand company culture and unwritten rules",
      "Study processes, systems, and tools",
      "Listen more than you speak in meetings",
      "Build relationships with your immediate team",
      "Clarify expectations with your manager",
      "Identify quick wins you can deliver",
    ],
    avoid: [
      "Criticising how things are done",
      "Trying to change everything immediately",
      "Isolating yourself at your desk",
    ],
  },
  {
    period: "Days 31-60",
    title: "Contribute & Connect",
    subtitle: "The Contribution Phase",
    tasks: [
      "Start delivering on your core responsibilities",
      "Expand your network beyond your team",
      "Schedule one-on-ones with key stakeholders",
      "Share ideas thoughtfully in meetings",
      "Ask for feedback from your manager",
      "Document processes and learnings",
      "Volunteer for cross-functional projects",
    ],
    avoid: [
      "Overcommitting to too many projects",
      "Ignoring feedback or being defensive",
      "Working in silos without collaboration",
    ],
  },
  {
    period: "Days 61-90",
    title: "Add Value & Lead",
    subtitle: "The Impact Phase",
    tasks: [
      "Propose improvements based on observations",
      "Take ownership of significant projects",
      "Mentor newer team members if appropriate",
      "Build your personal brand internally",
      "Set goals for the next quarter",
      "Schedule a 90-day review with your manager",
      "Celebrate your wins (internally)",
    ],
    avoid: [
      "Becoming complacent",
      "Forgetting to document achievements",
      "Neglecting the relationships you've built",
    ],
  },
];

// Workplace communication tips
const communicationTips = [
  {
    scenario: "Email Communication",
    icon: Mail,
    dos: [
      "Use clear, descriptive subject lines",
      "Get to the point in the first paragraph",
      "Use bullet points for multiple items",
      "Proofread before sending",
      "Reply within 24 hours (even if just to acknowledge)",
    ],
    donts: [
      "Reply all unnecessarily",
      "Use ALL CAPS or excessive exclamation marks!!!",
      "Send emotional emails when upset",
      "Leave the subject line blank",
      "CC the world on every email",
    ],
  },
  {
    scenario: "Meeting Etiquette",
    icon: Users,
    dos: [
      "Arrive on time (5 minutes early is ideal)",
      "Come prepared with relevant materials",
      "Participate actively but don't dominate",
      "Take notes and follow up on action items",
      "Mute yourself when not speaking (virtual)",
    ],
    donts: [
      "Check your phone constantly",
      "Interrupt others mid-sentence",
      "Go off on tangents",
      "Have side conversations",
      "Eat loudly during virtual meetings",
    ],
  },
  {
    scenario: "Giving Feedback",
    icon: MessageCircle,
    dos: [
      "Be specific with examples",
      "Focus on behaviour, not personality",
      "Offer solutions, not just criticism",
      "Choose the right time and place",
      "Balance negative with positive",
    ],
    donts: [
      "Give feedback publicly if negative",
      "Make it personal or emotional",
      "Stockpile issues for one big conversation",
      "Use absolutes like 'always' or 'never'",
      "Give feedback when you're angry",
    ],
  },
  {
    scenario: "Receiving Feedback",
    icon: MessageSquare,
    dos: [
      "Listen without interrupting",
      "Ask clarifying questions",
      "Thank them for the feedback",
      "Reflect before responding",
      "Create an action plan for improvement",
    ],
    donts: [
      "Get defensive or make excuses",
      "Take it personally",
      "Dismiss it without consideration",
      "Argue during the conversation",
      "Seek revenge on the feedback giver",
    ],
  },
];

// Workplace challenges and solutions
const workplaceChallenges = [
  {
    challenge: "Imposter Syndrome",
    description:
      "Feeling like you don't deserve your position or will be 'found out'",
    icon: Brain,
    solutions: [
      "Keep a 'wins' document of your achievements",
      "Remember: you were hired for a reason",
      "Talk to trusted colleagues - most people feel this",
      "Focus on learning, not perfection",
      "Celebrate small victories",
    ],
  },
  {
    challenge: "Micromanaging Boss",
    description: "A manager who oversees every detail of your work",
    icon: Eye,
    solutions: [
      "Provide frequent updates before being asked",
      "Ask about their preferred communication style",
      "Build trust through consistent delivery",
      "Document your processes and decisions",
      "Have a direct conversation about autonomy",
    ],
  },
  {
    challenge: "Toxic Colleague",
    description: "Dealing with gossip, undermining, or negative behaviour",
    icon: AlertCircle,
    solutions: [
      "Document incidents with dates and details",
      "Keep interactions professional and brief",
      "Don't engage in gossip or complaining",
      "Set clear boundaries",
      "Escalate to HR if behaviour continues",
    ],
  },
  {
    challenge: "Work-Life Balance",
    description:
      "Struggling to disconnect from work and maintain personal time",
    icon: Scale,
    solutions: [
      "Set clear working hours and stick to them",
      "Turn off work notifications after hours",
      "Use your leave days - they exist for a reason",
      "Learn to say 'no' to non-essential tasks",
      "Schedule personal time like you schedule meetings",
    ],
  },
  {
    challenge: "Lack of Recognition",
    description: "Your contributions go unnoticed or uncredited",
    icon: Award,
    solutions: [
      "Make your work visible through updates",
      "Quantify your achievements with numbers",
      "Speak up in meetings about your contributions",
      "Ask for feedback and recognition directly",
      "Build relationships with decision-makers",
    ],
  },
  {
    challenge: "Career Stagnation",
    description: "Feeling stuck with no clear path forward",
    icon: TrendingUp,
    solutions: [
      "Have a career conversation with your manager",
      "Identify skills needed for the next level",
      "Volunteer for stretch assignments",
      "Find a mentor in your desired role",
      "Consider lateral moves to gain experience",
    ],
  },
];

// South African workplace culture
const saWorkplaceCulture = [
  {
    aspect: "Ubuntu in the Workplace",
    description:
      "The philosophy of 'I am because we are' - emphasising community, teamwork, and collective success over individual achievement.",
    tips: [
      "Celebrate team wins, not just personal achievements",
      "Help colleagues when you can",
      "Build genuine relationships beyond transactional work",
    ],
    icon: Heart,
  },
  {
    aspect: "Hierarchy & Respect",
    description:
      "Many SA workplaces have traditional hierarchies. Respect for seniority is important, though this is evolving.",
    tips: [
      "Address seniors appropriately initially",
      "Follow the chain of command for escalations",
      "Observe how colleagues interact before assuming familiarity",
    ],
    icon: Users,
  },
  {
    aspect: "Diversity & Inclusion",
    description:
      "SA workplaces are among the most diverse globally. Cultural awareness and sensitivity are essential.",
    tips: [
      "Learn about different cultural practices",
      "Be mindful of religious observances and holidays",
      "Avoid assumptions based on background",
    ],
    icon: Network,
  },
  {
    aspect: "Time & Punctuality",
    description:
      "'African time' is a stereotype. In corporate SA, punctuality is expected and valued.",
    tips: [
      "Arrive on time for meetings and work",
      "Communicate early if you'll be late",
      "Respect deadlines and deliver on commitments",
    ],
    icon: Clock,
  },
  {
    aspect: "Language Considerations",
    description:
      "While English is common in business, SA has 11 official languages. Multilingual ability is an asset.",
    tips: [
      "Learn greetings in other SA languages",
      "Be patient with non-native English speakers",
      "Don't make assumptions about home language",
    ],
    icon: MessageCircle,
  },
  {
    aspect: "Load Shedding Adaptations",
    description:
      "Power outages affect work. Successful employees adapt and plan around load shedding schedules.",
    tips: [
      "Keep devices charged and have backup power",
      "Schedule important work during on-grid hours",
      "Communicate proactively about impact on deliverables",
    ],
    icon: Zap,
  },
];

// Professional development resources
const developmentResources = [
  {
    category: "Free Online Learning",
    resources: [
      {
        name: "LinkedIn Learning",
        url: "https://www.linkedin.com/learning",
        description: "Free with LinkedIn Premium (trial available)",
      },
      {
        name: "Coursera",
        url: "https://www.coursera.org",
        description: "Free courses from top universities",
      },
      {
        name: "Google Digital Garage",
        url: "https://grow.google/intl/en_za/",
        description: "Free digital skills training",
      },
      {
        name: "HubSpot Academy",
        url: "https://academy.hubspot.com",
        description: "Free marketing and sales certifications",
      },
    ],
  },
  {
    category: "SA-Specific Resources",
    resources: [
      {
        name: "SETA Learnerships",
        url: "https://www.careerportal.co.za/learnerships",
        description: "Funded workplace training programmes",
      },
      {
        name: "National Skills Fund",
        url: "https://www.nsfas.org.za",
        description: "Government-funded training",
      },
      {
        name: "GetSmarter",
        url: "https://www.getsmarter.com",
        description: "UCT and other SA university short courses",
      },
      {
        name: "MICT SETA",
        url: "https://www.mict.org.za",
        description: "ICT sector training",
      },
    ],
  },
];

// Workplace rights in SA
const workplaceRights = [
  {
    right: "Working Hours",
    description:
      "Maximum 45 hours per week (9 hours/day for 5-day week). Overtime must be agreed and compensated.",
    icon: Clock,
  },
  {
    right: "Leave Entitlements",
    description:
      "Minimum 21 consecutive days annual leave, 6 weeks paid sick leave per 3-year cycle, 4 months maternity leave.",
    icon: Calendar,
  },
  {
    right: "Minimum Wage",
    description:
      "National minimum wage applies (check current rate). Some sectors have higher sectoral determinations.",
    icon: Banknote,
  },
  {
    right: "Protection from Discrimination",
    description:
      "Protected against discrimination based on race, gender, disability, religion, and other grounds under the EEA.",
    icon: Shield,
  },
  {
    right: "UIF Contributions",
    description:
      "Employer must contribute to UIF. You're entitled to benefits if retrenched or on maternity leave.",
    icon: BadgeCheck,
  },
  {
    right: "Safe Working Conditions",
    description:
      "Employers must provide safe working conditions. Report unsafe conditions to the Department of Labour.",
    icon: Shield,
  },
];

// FAQs
const faqs = [
  {
    question: "How soon is too soon to ask for a raise?",
    answer:
      "Generally, wait at least 6-12 months before asking for a raise, unless your role has significantly expanded. The best times are during performance reviews, after completing major projects, or when taking on additional responsibilities. Come prepared with documentation of your achievements and market salary data.",
  },
  {
    question: "Should I be friends with my colleagues?",
    answer:
      "Friendly, yes. Best friends, be careful. Building positive relationships is important for career success and job satisfaction. However, maintain professional boundaries. Avoid gossip, be mindful about sharing personal information, and remember that workplace dynamics can change. You can be warm and collegial without being best friends.",
  },
  {
    question: "How do I deal with being overlooked for promotion?",
    answer:
      "First, ask for specific feedback on why you weren't selected and what you need to improve. Create a development plan addressing those gaps. Make your achievements more visible to decision-makers. If you're consistently overlooked despite strong performance, consider whether this company values what you offer - it may be time to look elsewhere.",
  },
  {
    question: "What should I do if I witness workplace harassment?",
    answer:
      "Document what you witnessed with dates, times, and details. Check your company's policy on reporting. If comfortable, support the person affected and encourage them to report. You can report to HR or use anonymous channels if available. In serious cases, the CCMA or Department of Labour can assist. Remember: bystanders can make a difference.",
  },
  {
    question: "How do I say 'no' to extra work without damaging my reputation?",
    answer:
      "Be honest about your current workload: 'I'd love to help, but I'm currently focused on [X] which is due [date]. Can we discuss priorities?' Offer alternatives: 'I can't take this on fully, but I could [smaller commitment].' Don't make excuses - be direct but professional. Saying no to the wrong things lets you say yes to the right ones.",
  },
  {
    question: "Is it bad to job hunt while employed?",
    answer:
      "No, it's actually the ideal position to be in. You have leverage, can be selective, and aren't under pressure to accept anything. Just be discreet: don't use company resources for your search, schedule interviews outside work hours or take leave, and don't discuss your search with colleagues. Never badmouth your current employer in interviews.",
  },
  {
    question: "How do I handle a counter-offer from my current employer?",
    answer:
      "Consider why you wanted to leave in the first place - if it was only salary, a counter might work. But if it was culture, management, or growth, more money won't fix that. Statistics show most people who accept counter-offers leave within 18 months anyway. Consider: if they could pay you more, why did it take you leaving to get it?",
  },
  {
    question: "What are my rights during retrenchment in South Africa?",
    answer:
      "Your employer must follow a fair procedure (consultation, selection criteria, alternatives to retrenchment). You're entitled to severance pay of at least 1 week per completed year of service. You can claim UIF. If you believe the process was unfair, you can refer the matter to the CCMA within 30 days. Get everything in writing.",
  },
];

export default function WorkplaceGuidesPage() {
  const [expandedComm, setExpandedComm] = useState<string | null>(
    "Email Communication"
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-teal/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/20 rounded-full text-brand-gold text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Building2 className="h-4 w-4" />
              Workplace Success Guide
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Thrive in Your <span className="text-brand-gold">Workplace</span>
              <br />
              From Day One
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Professional guides for navigating South African workplaces - from
              your first 90 days to getting promoted. Updated for 2025/2026.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#first90"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold hover:bg-yellow-500 text-brand-navy font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Rocket className="h-5 w-5" />
                First 90 Days Guide
              </a>
              <a
                href="#challenges"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300"
              >
                <Shield className="h-5 w-5" />
                Handle Challenges
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

      {/* Quick Stats */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                90
              </p>
              <p className="text-sm text-muted-foreground">
                days to make your first impression
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                70%
              </p>
              <p className="text-sm text-muted-foreground">
                of promotions go to visible employees
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                1 week
              </p>
              <p className="text-sm text-muted-foreground">
                severance per year (minimum)
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                21
              </p>
              <p className="text-sm text-muted-foreground">
                days annual leave (minimum)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              📚 Workplace Guide Articles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              In-depth guides to help you succeed in your career
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredArticles.map((article, index) => (
              <motion.article
                key={index}
                variants={fadeInUp}
                className={`group bg-card rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  article.featured ? "ring-2 ring-brand-gold/50" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        article.featured
                          ? "bg-brand-gold/20 text-brand-gold"
                          : "bg-brand-teal/10 text-brand-teal"
                      }`}
                    >
                      <article.icon className="h-6 w-6" />
                    </div>
                    {article.featured && (
                      <span className="px-2 py-1 bg-brand-gold/20 text-brand-gold text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-brand-teal transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                    <span className="text-brand-teal text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Guide
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* First 90 Days */}
      <section id="first90" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🚀 Your First 90 Days
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A strategic approach to starting strong in your new role
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {first90Days.map((phase, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-2xl border p-6 relative overflow-hidden"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Phase number background */}
                  <div className="absolute top-0 right-0 text-8xl font-bold text-brand-teal/5 -mr-4 -mt-4">
                    {index + 1}
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs font-semibold text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full">
                      {phase.period}
                    </span>
                    <h3 className="text-xl font-bold mt-3 mb-1">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {phase.subtitle}
                    </p>

                    <div className="space-y-2 mb-4">
                      {phase.tasks.map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <p className="text-xs font-semibold text-red-600 mb-2">
                        ⚠️ Avoid:
                      </p>
                      <ul className="space-y-1">
                        {phase.avoid.map((item, avoidIndex) => (
                          <li
                            key={avoidIndex}
                            className="text-xs text-muted-foreground flex items-start gap-2"
                          >
                            <XCircle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Communication Tips */}
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
              💬 Workplace Communication
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Master professional communication in every scenario
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {communicationTips.map((tip) => (
              <motion.div
                key={tip.scenario}
                className="bg-card rounded-2xl border overflow-hidden"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <button
                  onClick={() =>
                    setExpandedComm(
                      expandedComm === tip.scenario ? null : tip.scenario
                    )
                  }
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal">
                      <tip.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg">{tip.scenario}</h3>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                      expandedComm === tip.scenario ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {expandedComm === tip.scenario && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2, ease: "easeInOut" },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-200 dark:border-green-900">
                            <div className="flex items-center gap-2 mb-3">
                              <ThumbsUp className="h-4 w-4 text-green-600" />
                              <span className="font-semibold text-green-700 dark:text-green-400">
                                Do&apos;s
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {tip.dos.map((item, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="text-sm flex items-start gap-2 text-green-800 dark:text-green-300"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-4 border border-red-200 dark:border-red-900">
                            <div className="flex items-center gap-2 mb-3">
                              <ThumbsDown className="h-4 w-4 text-red-600" />
                              <span className="font-semibold text-red-700 dark:text-red-400">
                                Don&apos;ts
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {tip.donts.map((item, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="text-sm flex items-start gap-2 text-red-800 dark:text-red-300"
                                >
                                  <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                  {item}
                                </motion.li>
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
        </div>
      </section>

      {/* Workplace Challenges */}
      <section id="challenges" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🛡️ Common Workplace Challenges
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Solutions to the most common workplace difficulties
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {workplaceChallenges.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-card rounded-2xl border p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold">{item.challenge}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-brand-navy">
                    Solutions:
                  </p>
                  {item.solutions.map((solution, solIndex) => (
                    <div
                      key={solIndex}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{solution}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SA Workplace Culture */}
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
              🇿🇦 South African Workplace Culture
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding the unique aspects of working in SA
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {saWorkplaceCulture.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-card rounded-2xl border p-6"
              >
                <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal w-fit mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">{item.aspect}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>
                <ul className="space-y-2">
                  {item.tips.map((tip, tipIndex) => (
                    <li
                      key={tipIndex}
                      className="text-sm flex items-start gap-2"
                    >
                      <Lightbulb className="h-4 w-4 text-brand-gold mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Workplace Rights */}
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
              ⚖️ Know Your Rights
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Basic employment rights under South African labour law
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {workplaceRights.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-card rounded-xl border p-5 flex items-start gap-4"
              >
                <div className="p-2 bg-brand-navy/10 rounded-lg text-brand-navy flex-shrink-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.right}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="bg-brand-gold/10 rounded-xl p-6 border border-brand-gold/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-brand-navy mb-2">
                    Need Help with a Workplace Issue?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Contact the CCMA (Commission for Conciliation, Mediation and
                    Arbitration) for free assistance with workplace disputes.
                    Call 0861 161 616 or visit ccma.org.za. You can also report
                    issues to the Department of Labour.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Development */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-teal/10 to-brand-navy/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              📈 Professional Development Resources
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Keep growing your skills and advancing your career
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {developmentResources.map((category, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-2xl border p-6"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-brand-teal" />
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.resources.map((resource, resIndex) => (
                    <a
                      key={resIndex}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium group-hover:text-brand-teal transition-colors">
                          {resource.name}
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-teal transition-colors" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {resource.description}
                      </p>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
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
              ❓ Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about workplace success
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto space-y-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-card rounded-xl border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2, ease: "easeInOut" },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-brand-navy to-brand-navy/90">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Looking for Your Next Role?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Whether you&apos;re starting fresh or ready for a change, make
              sure your CV opens doors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cv-services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold hover:bg-yellow-500 text-brand-navy font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Zap className="h-5 w-5" />
                Get a Professional CV - From R80
              </Link>
              <Link
                href="/career-tips/job-search-guides"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300"
              >
                <BookOpen className="h-5 w-5" />
                Job Search Guide
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-white/60 text-sm flex-wrap">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                ATS-Optimized
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                24-Hour Delivery
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                WhatsApp Support
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
