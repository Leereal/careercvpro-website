"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Target,
  Users,
  Video,
  Phone,
  Building2,
  ChevronDown,
  Clock,
  Star,
  Zap,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Brain,
  Mic,
  Eye,
  Smile,
  Frown,
  HelpCircle,
  Award,
  Briefcase,
  Calendar,
  MapPin,
  DollarSign,
  TrendingUp,
  Shield,
  Heart,
  Handshake,
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

// Featured interview guide articles
const featuredArticles = [
  {
    title: "Complete Interview Preparation Guide for SA Job Seekers",
    description:
      "Everything you need to know before your interview - research, preparation, and what to bring.",
    readTime: "12 min read",
    icon: BookOpen,
    featured: true,
  },
  {
    title: "Top 20 Interview Questions Asked in South Africa",
    description:
      "The most common questions SA employers ask and how to answer them with confidence.",
    readTime: "15 min read",
    icon: HelpCircle,
    featured: true,
  },
  {
    title: "Virtual Interview Tips: Ace Your Online Interview",
    description:
      "How to succeed in Zoom, Teams, and Google Meet interviews - tech setup, lighting, and etiquette.",
    readTime: "8 min read",
    icon: Video,
  },
  {
    title: "Phone Interview Success Strategies",
    description:
      "First-round phone screening tips to get you to the next stage.",
    readTime: "6 min read",
    icon: Phone,
  },
  {
    title: "Panel Interview Survival Guide",
    description:
      "How to handle multiple interviewers and group assessment centres.",
    readTime: "10 min read",
    icon: Users,
  },
  {
    title: "Salary Negotiation: Know Your Worth",
    description:
      "How to negotiate salary in South Africa - market rates, timing, and scripts.",
    readTime: "9 min read",
    icon: DollarSign,
  },
];

// Common interview questions by category
const interviewQuestions = [
  {
    id: "about-you",
    category: "About You",
    icon: Users,
    questions: [
      {
        question: "Tell me about yourself",
        goodAnswer:
          "I'm a [job title] with [X years] experience in [industry]. I've successfully [key achievement with numbers]. I'm particularly skilled in [2-3 relevant skills]. I'm excited about this role because [specific reason related to company/position].",
        badAnswer:
          "Well, I was born in Johannesburg, went to school there, then studied at university. I like watching rugby and braaiing on weekends...",
        tip: "Keep it professional and relevant. Use the Present-Past-Future formula: current role, past experience, future goals.",
      },
      {
        question: "What are your strengths?",
        goodAnswer:
          "My key strength is [specific skill]. For example, in my previous role, I [specific achievement]. My colleagues often rely on me for [related task] because [reason].",
        badAnswer:
          "I'm a perfectionist, I work too hard, and I'm a people person.",
        tip: "Choose strengths relevant to the job. Always back them up with specific examples.",
      },
      {
        question: "What are your weaknesses?",
        goodAnswer:
          "I used to struggle with [genuine weakness]. I've been working on this by [specific action]. For instance, I recently [improvement example], and it's made a real difference.",
        badAnswer:
          "I don't really have any weaknesses. Or maybe I'm too much of a perfectionist.",
        tip: "Be honest but strategic. Show self-awareness and demonstrate how you're improving.",
      },
      {
        question: "Where do you see yourself in 5 years?",
        goodAnswer:
          "I see myself growing within [industry/field], taking on more responsibility in [specific area]. I'm particularly interested in developing expertise in [relevant skill]. I'd love to be in a position where I can [contribution to company].",
        badAnswer:
          "I want your job! Or: I'm not sure, I haven't really thought about it.",
        tip: "Show ambition while demonstrating commitment to the company. Be realistic.",
      },
    ],
  },
  {
    id: "experience",
    category: "Experience & Skills",
    icon: Briefcase,
    questions: [
      {
        question: "Why did you leave your last job?",
        goodAnswer:
          "I'm grateful for my time at [company] where I [achievement]. I'm now looking for [new opportunity/challenge] that aligns with my career goals in [area]. This position offers [specific aspect] which excites me.",
        badAnswer:
          "My boss was terrible. The company was disorganised. I wasn't paid enough.",
        tip: "Never badmouth previous employers. Focus on what you're moving toward, not away from.",
      },
      {
        question: "Tell me about a challenge you faced and how you overcame it",
        goodAnswer:
          "At [company], we faced [specific challenge]. I [action you took], which involved [specific steps]. The result was [quantifiable outcome]. I learned [lesson] from this experience.",
        badAnswer:
          "I can't really think of any challenges. Everything usually goes smoothly for me.",
        tip: "Use the STAR method: Situation, Task, Action, Result. Always quantify results where possible.",
      },
      {
        question: "Why should we hire you?",
        goodAnswer:
          "Based on what you've shared about this role, you need someone who can [key requirement]. I bring [relevant experience] and have demonstrated this through [specific achievement]. Additionally, my [unique skill/quality] would help [specific company goal].",
        badAnswer:
          "Because I need a job and I'll work hard. I'm a fast learner.",
        tip: "Connect your skills directly to their needs. Show you've done your research.",
      },
    ],
  },
  {
    id: "company",
    category: "Company & Role",
    icon: Building2,
    questions: [
      {
        question: "Why do you want to work here?",
        goodAnswer:
          "I've been following [company] for [time period]. I'm impressed by [specific thing - product, culture, achievement]. My experience in [area] aligns well with your [initiative/goal]. I'm particularly excited about [specific opportunity].",
        badAnswer:
          "The salary is good and it's close to my house. Plus you're hiring.",
        tip: "Research the company thoroughly. Mention specific facts, recent news, or company values.",
      },
      {
        question: "What do you know about our company?",
        goodAnswer:
          "I know [company] was founded in [year] and specialises in [industry/product]. I've read about your recent [news/achievement]. Your company values of [values] resonate with me because [personal connection].",
        badAnswer:
          "Um, you're a company that does [vague description]. I saw your job advert online.",
        tip: "Visit their website, LinkedIn, and recent news. Know their products, services, and competitors.",
      },
      {
        question: "What are your salary expectations?",
        goodAnswer:
          "Based on my research of the South African market and my [X years] of experience, I'm looking at a range of R[X] to R[Y]. However, I'm open to discussion based on the full compensation package and growth opportunities.",
        badAnswer:
          "I'll take whatever you offer. Or: I want R1 million per year.",
        tip: "Research salary ranges on PayScale, Glassdoor, or PNET. Give a range, not a fixed number.",
      },
    ],
  },
  {
    id: "behavioural",
    category: "Behavioural Questions",
    icon: Brain,
    questions: [
      {
        question: "Describe a time you worked in a team",
        goodAnswer:
          "In my role at [company], I was part of a team tasked with [project]. My specific responsibility was [role]. When [challenge arose], I [action]. We successfully [outcome], and I learned the importance of [lesson].",
        badAnswer:
          "I prefer working alone actually. But I can work in a team if I have to.",
        tip: "Highlight your specific contribution while acknowledging the team's collective success.",
      },
      {
        question: "Tell me about a time you made a mistake",
        goodAnswer:
          "In [situation], I made the mistake of [honest mistake]. I immediately [took responsibility]. To fix it, I [corrective action]. The experience taught me to [lesson learned], and I've since [preventive measure].",
        badAnswer: "I can't think of any mistakes I've made. I'm very careful.",
        tip: "Show accountability and learning. Choose a genuine mistake but not one that raises red flags.",
      },
      {
        question: "How do you handle pressure and stress?",
        goodAnswer:
          "I manage pressure by [specific technique - prioritising, breaking down tasks]. For example, during [stressful situation], I [specific action]. I find that [coping mechanism] helps me stay focused and deliver quality work.",
        badAnswer:
          "I don't really get stressed. Or: I tend to panic and need a lot of guidance.",
        tip: "Give specific examples and techniques. Show you can remain effective under pressure.",
      },
    ],
  },
];

// Interview do's and don'ts
const interviewDos = [
  {
    title: "Research the company thoroughly",
    description:
      "Know their products, services, recent news, company culture, and competitors.",
  },
  {
    title: "Arrive 10-15 minutes early",
    description:
      "For virtual interviews, log in 5 minutes early to test your setup.",
  },
  {
    title: "Dress professionally",
    description:
      "When in doubt, dress one level up from the company's dress code.",
  },
  {
    title: "Bring copies of your CV",
    description: "Have 3-5 printed copies, plus a pen and notebook.",
  },
  {
    title: "Prepare questions for them",
    description:
      "Ask about the role, team, company culture, and growth opportunities.",
  },
  {
    title: "Use the STAR method",
    description: "Structure your answers: Situation, Task, Action, Result.",
  },
  {
    title: "Make eye contact",
    description:
      "Look at the interviewer (or camera for virtual) to build connection.",
  },
  {
    title: "Send a thank-you email",
    description:
      "Within 24 hours, thank them for their time and reiterate your interest.",
  },
];

const interviewDonts = [
  {
    title: "Arrive late or too early",
    description:
      "Being late shows poor time management. Arriving 30+ minutes early is awkward.",
  },
  {
    title: "Badmouth previous employers",
    description:
      "Even if justified, it makes you look negative and unprofessional.",
  },
  {
    title: "Lie or exaggerate",
    description:
      "Dishonesty will catch up with you. Be truthful about your experience.",
  },
  {
    title: "Use your phone during the interview",
    description:
      "Put it on silent and keep it away. Don't even check the time on it.",
  },
  {
    title: "Give one-word answers",
    description:
      "Elaborate on your answers but don't ramble. Aim for 1-2 minutes per response.",
  },
  {
    title: "Ask about salary first",
    description:
      "Let them bring it up, usually in the second interview or when they make an offer.",
  },
  {
    title: "Appear desperate",
    description:
      "Show enthusiasm for the role, but maintain your professional composure.",
  },
  {
    title: "Forget to follow up",
    description:
      "Not following up can signal lack of interest. Always send a thank-you.",
  },
];

// Interview types
const interviewTypes = [
  {
    type: "Phone Screening",
    icon: Phone,
    duration: "15-30 minutes",
    description:
      "Initial screening call with HR or recruiter to verify basic qualifications.",
    tips: [
      "Find a quiet space with good reception",
      "Have your CV in front of you",
      "Keep notes ready",
      "Sound enthusiastic (smile while talking)",
      "Ask about next steps",
    ],
  },
  {
    type: "Video Interview",
    icon: Video,
    duration: "30-60 minutes",
    description: "Face-to-face interview via Zoom, Teams, or Google Meet.",
    tips: [
      "Test your tech beforehand",
      "Ensure good lighting (face a window)",
      "Use a plain, tidy background",
      "Look at the camera, not the screen",
      "Have a backup plan (phone number)",
    ],
  },
  {
    type: "One-on-One Interview",
    icon: Users,
    duration: "45-90 minutes",
    description: "Traditional in-person interview with the hiring manager.",
    tips: [
      "Bring printed CV copies",
      "Practice your handshake",
      "Mirror their energy level",
      "Take notes if appropriate",
      "Observe the office culture",
    ],
  },
  {
    type: "Panel Interview",
    icon: Building2,
    duration: "60-90 minutes",
    description:
      "Interview with multiple people (usually 3-5) from different departments.",
    tips: [
      "Get everyone's names and roles",
      "Make eye contact with all panelists",
      "Address the questioner, then others",
      "Remember each person's questions",
      "Thank each person individually",
    ],
  },
  {
    type: "Assessment Centre",
    icon: Target,
    duration: "Half day to full day",
    description: "Group exercises, presentations, and multiple interviews.",
    tips: [
      "Collaborate, don't compete",
      "Show leadership naturally",
      "Be professional with other candidates",
      "Prepare a presentation if required",
      "Stay energised throughout",
    ],
  },
  {
    type: "Technical Interview",
    icon: Brain,
    duration: "60-120 minutes",
    description: "Skills-based interview with practical tests or case studies.",
    tips: [
      "Review fundamentals in your field",
      "Practice problems aloud",
      "Explain your thought process",
      "Ask clarifying questions",
      "It's okay to say 'I don't know'",
    ],
  },
];

// Questions to ask the interviewer
const questionsToAsk = [
  {
    category: "About the Role",
    questions: [
      "What does a typical day look like in this role?",
      "What are the key priorities for this position in the first 90 days?",
      "How will success be measured in this role?",
      "What are the biggest challenges someone in this position would face?",
    ],
  },
  {
    category: "About the Team",
    questions: [
      "Can you tell me about the team I'd be working with?",
      "How would you describe the management style here?",
      "How does the team collaborate on projects?",
      "What's the team's current biggest project?",
    ],
  },
  {
    category: "About Growth",
    questions: [
      "What opportunities for professional development are available?",
      "Where have successful employees in this role progressed to?",
      "Does the company support further education or certifications?",
      "How often are performance reviews conducted?",
    ],
  },
  {
    category: "About the Company",
    questions: [
      "How would you describe the company culture?",
      "What do you enjoy most about working here?",
      "Where do you see the company in 5 years?",
      "How has the company adapted to remote/hybrid work?",
    ],
  },
];

// SA-specific interview tips
const saSpecificTips = [
  {
    title: "BEE & Employment Equity",
    description:
      "Be prepared for questions about your employment equity status. Companies may ask about this for compliance purposes.",
    icon: Shield,
  },
  {
    title: "Language Skills",
    description:
      "If you speak multiple South African languages, highlight this - it's a valuable asset in our diverse workplace.",
    icon: MessageCircle,
  },
  {
    title: "Load Shedding Planning",
    description:
      "For virtual interviews, have a backup plan for power cuts - charged devices, mobile data, or a different location.",
    icon: Zap,
  },
  {
    title: "Transport Considerations",
    description:
      "If asked about transport, be honest. Many SA employers are understanding about public transport challenges.",
    icon: MapPin,
  },
  {
    title: "Reference Checks",
    description:
      "South African employers typically do thorough reference checks. Ensure your referees are prepared.",
    icon: Award,
  },
  {
    title: "Criminal & Credit Checks",
    description:
      "Many positions require ITC and criminal record checks. Be upfront about any potential issues.",
    icon: Shield,
  },
];

export default function InterviewGuidesPage() {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "about-you"
  );

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

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
              <MessageSquare className="h-4 w-4" />
              Interview Preparation Guide
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ace Your <span className="text-brand-gold">Job Interview</span>
              <br />
              in South Africa
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Expert interview tips, common questions with model answers, and
              strategies to help you land your dream job. Updated for 2025/2026.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#questions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold hover:bg-yellow-500 text-brand-navy font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <HelpCircle className="h-5 w-5" />
                Common Questions
              </a>
              <a
                href="#tips"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300"
              >
                <Lightbulb className="h-5 w-5" />
                Interview Tips
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
                33%
              </p>
              <p className="text-sm text-muted-foreground">
                of hiring decisions made in first 90 seconds
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                47%
              </p>
              <p className="text-sm text-muted-foreground">
                fail interviews due to lack of company knowledge
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                3-5
              </p>
              <p className="text-sm text-muted-foreground">
                questions you should ask the interviewer
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-teal">
                24hrs
              </p>
              <p className="text-sm text-muted-foreground">
                time to send thank-you email
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
              📚 Interview Guide Articles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              In-depth guides to help you prepare for every type of interview
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
                  article.featured
                    ? "md:col-span-1 lg:col-span-1 ring-2 ring-brand-gold/50"
                    : ""
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

      {/* Interview Types */}
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
              🎯 Types of Interviews
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Know what to expect from each interview format
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {interviewTypes.map((type, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-card rounded-2xl border p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal">
                    <type.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{type.type}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {type.duration}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {type.description}
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-brand-navy">
                    Quick Tips:
                  </p>
                  <ul className="space-y-1">
                    {type.tips.slice(0, 3).map((tip, tipIndex) => (
                      <li
                        key={tipIndex}
                        className="text-xs text-muted-foreground flex items-start gap-2"
                      >
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Common Interview Questions */}
      <section id="questions" className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ❓ Common Interview Questions & Answers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Practice these questions with our model answers. Learn what to say
              and what to avoid.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {interviewQuestions.map((category) => (
              <motion.div
                key={category.id}
                className="bg-card rounded-2xl border overflow-hidden"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal">
                      <category.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{category.category}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.questions.length} common questions
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                      expandedCategory === category.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {expandedCategory === category.id && (
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
                      <div className="px-6 pb-6 space-y-4">
                        {category.questions.map((q, qIndex) => (
                          <motion.div
                            key={qIndex}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: qIndex * 0.05 }}
                            className="bg-muted/30 rounded-xl p-4 space-y-4"
                          >
                            <h4 className="font-semibold text-brand-navy flex items-center gap-2">
                              <HelpCircle className="h-4 w-4 text-brand-teal" />
                              {q.question}
                            </h4>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200 dark:border-green-900">
                                <div className="flex items-center gap-2 mb-2">
                                  <ThumbsUp className="h-4 w-4 text-green-600" />
                                  <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                                    Good Answer
                                  </span>
                                </div>
                                <p className="text-sm text-green-800 dark:text-green-300">
                                  {q.goodAnswer}
                                </p>
                              </div>

                              <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 border border-red-200 dark:border-red-900">
                                <div className="flex items-center gap-2 mb-2">
                                  <ThumbsDown className="h-4 w-4 text-red-600" />
                                  <span className="text-sm font-semibold text-red-700 dark:text-red-400">
                                    Avoid This
                                  </span>
                                </div>
                                <p className="text-sm text-red-800 dark:text-red-300">
                                  {q.badAnswer}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2 bg-brand-gold/10 rounded-lg p-3">
                              <Lightbulb className="h-4 w-4 text-brand-gold mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-brand-navy">
                                <strong>Pro Tip:</strong> {q.tip}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Do's and Don'ts */}
      <section id="tips" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ✅ Interview Do&apos;s and Don&apos;ts
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Essential tips to make a great impression
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Do's */}
            <motion.div
              className="bg-green-50 dark:bg-green-950/20 rounded-2xl p-6 border border-green-200 dark:border-green-900"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-500 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400">
                  Do&apos;s
                </h3>
              </div>
              <div className="space-y-4">
                {interviewDos.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-300">
                        {item.title}
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Don'ts */}
            <motion.div
              className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 border border-red-200 dark:border-red-900"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500 rounded-lg">
                  <XCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400">
                  Don&apos;ts
                </h3>
              </div>
              <div className="space-y-4">
                {interviewDonts.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-300">
                        {item.title}
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Questions to Ask */}
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
              🙋 Questions to Ask the Interviewer
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Asking thoughtful questions shows genuine interest and helps you
              evaluate if the role is right for you
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {questionsToAsk.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-card rounded-2xl border p-6"
              >
                <h3 className="font-bold text-lg mb-4 text-brand-navy">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.questions.map((question, qIndex) => (
                    <li key={qIndex} className="flex items-start gap-3 text-sm">
                      <MessageCircle className="h-4 w-4 text-brand-teal mt-0.5 flex-shrink-0" />
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
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
                    Questions to Avoid Asking First
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • &quot;What&apos;s the salary?&quot; (Wait for them to
                      bring it up)
                    </li>
                    <li>
                      • &quot;How much leave do I get?&quot; (Seems like
                      you&apos;re already planning time off)
                    </li>
                    <li>
                      • &quot;Can I work from home?&quot; (Unless they mentioned
                      it&apos;s hybrid/remote)
                    </li>
                    <li>• &quot;Did I get the job?&quot; (Shows impatience)</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* South Africa Specific Tips */}
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
              🇿🇦 South Africa-Specific Interview Tips
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unique considerations for the South African job market
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {saSpecificTips.map((tip, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-card rounded-2xl border p-6 hover:shadow-lg transition-all"
              >
                <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal w-fit mb-4">
                  <tip.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STAR Method */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-teal/10 to-brand-navy/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ⭐ The STAR Method
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Use this framework to structure your answers to behavioural
                questions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  letter: "S",
                  word: "Situation",
                  description:
                    "Set the scene. Describe the context and background.",
                  example:
                    "In my previous role as a Sales Rep at ABC Company...",
                  color: "bg-blue-500",
                },
                {
                  letter: "T",
                  word: "Task",
                  description:
                    "Explain your specific responsibility or challenge.",
                  example:
                    "I was tasked with increasing regional sales by 20%...",
                  color: "bg-green-500",
                },
                {
                  letter: "A",
                  word: "Action",
                  description: "Detail the specific steps YOU took.",
                  example: "I developed a new client outreach strategy and...",
                  color: "bg-yellow-500",
                },
                {
                  letter: "R",
                  word: "Result",
                  description: "Share the outcomes with numbers if possible.",
                  example: "This resulted in a 35% increase in sales and...",
                  color: "bg-red-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-2xl border p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}
                  >
                    {item.letter}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.word}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.description}
                  </p>
                  <p className="text-xs italic text-brand-teal">
                    &quot;{item.example}&quot;
                  </p>
                </motion.div>
              ))}
            </div>
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
              Need Help With Your CV First?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              A great interview starts with a great CV. Let our professionals
              craft a CV that gets you invited to interviews.
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
                href="/career-tips/cv-guides"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300"
              >
                <BookOpen className="h-5 w-5" />
                Read CV Writing Guide
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-white/60 text-sm">
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
