"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  Lightbulb,
  Star,
  Users,
  Briefcase,
  TrendingUp,
  Target,
  Clock,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Phone,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Building2,
  Zap,
} from "lucide-react";

// Question category type
interface Question {
  question: string;
  why: string;
  goodAnswer: string;
  badAnswer: string;
  tip?: string;
}

// Accordion Component
function QuestionAccordion({
  question,
  why,
  goodAnswer,
  badAnswer,
  tip,
}: Question) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between p-5 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-start gap-3 flex-1">
          <div className="w-8 h-8 bg-brand-teal/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <HelpCircle className="h-4 w-4 text-brand-teal" />
          </div>
          <span className="font-semibold text-brand-navy">{question}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0 ml-2"
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
            <div className="px-5 pb-5 space-y-4">
              {/* Why they ask */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-blue-900 text-sm">
                    Why They Ask This
                  </span>
                </div>
                <p className="text-blue-800 text-sm">{why}</p>
              </div>

              {/* Good Answer */}
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsUp className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-900 text-sm">
                    Good Answer Example
                  </span>
                </div>
                <p className="text-green-800 text-sm italic">
                  &quot;{goodAnswer}&quot;
                </p>
              </div>

              {/* Bad Answer */}
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsDown className="h-4 w-4 text-red-600" />
                  <span className="font-semibold text-red-900 text-sm">
                    Avoid Saying
                  </span>
                </div>
                <p className="text-red-800 text-sm italic">
                  &quot;{badAnswer}&quot;
                </p>
              </div>

              {/* Pro Tip */}
              {tip && (
                <div className="flex items-start gap-2 p-3 bg-brand-gold/10 rounded-lg">
                  <Star className="h-4 w-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-brand-navy">
                    <strong>Pro Tip:</strong> {tip}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Category Section Component
function CategorySection({
  title,
  icon: Icon,
  questions,
  description,
}: {
  title: string;
  icon: React.ElementType;
  questions: Question[];
  description: string;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-brand-navy/10 rounded-xl flex items-center justify-center">
          <Icon className="h-5 w-5 text-brand-navy" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-brand-navy">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-3">
        {questions.map((q, index) => (
          <QuestionAccordion key={index} {...q} />
        ))}
      </div>
    </div>
  );
}

// Question Data
const generalQuestions: Question[] = [
  {
    question: "Tell me about yourself",
    why: "They want a concise professional summary and to see how you communicate. It sets the tone for the interview.",
    goodAnswer:
      "I'm a marketing professional with 5 years of experience in digital campaigns. At my current role at XYZ Company, I increased social media engagement by 150% and led a team of 3. I'm passionate about data-driven marketing and I'm excited about this role because it combines my analytics skills with creative strategy.",
    badAnswer:
      "Well, I was born in Johannesburg, I have two dogs, I like watching rugby on weekends... Where should I start?",
    tip: "Keep it to 2 minutes. Use the Present-Past-Future formula: current role, relevant experience, why you want this job.",
  },
  {
    question: "Why do you want to work here?",
    why: "They're testing if you've researched the company and if your goals align with theirs.",
    goodAnswer:
      "I've followed your company's growth in the renewable energy sector, and your commitment to sustainability aligns with my values. Your recent expansion into solar solutions is exciting, and my experience in project management would help deliver those projects efficiently.",
    badAnswer:
      "I need a job and you're hiring. The salary looks good and your office is close to my house.",
    tip: "Research the company beforehand. Mention specific projects, values, or news about them.",
  },
  {
    question: "What are your greatest strengths?",
    why: "They want to know what you bring to the table and if your strengths match the role requirements.",
    goodAnswer:
      "My greatest strength is problem-solving under pressure. In my last role, when our main supplier suddenly closed, I identified three alternatives within 48 hours, negotiated contracts, and we didn't miss a single delivery deadline.",
    badAnswer:
      "I'm a perfectionist and I work too hard. I'm also a people person.",
    tip: "Choose strengths relevant to the job. Always back them up with a specific example.",
  },
  {
    question: "What is your greatest weakness?",
    why: "They're checking your self-awareness and ability to improve. It's not a trap - be honest but strategic.",
    goodAnswer:
      "I used to struggle with delegating because I wanted everything perfect. I've learned to trust my team more by setting clear expectations upfront and having regular check-ins. It's actually improved our team's output.",
    badAnswer:
      "I don't have any weaknesses. Or... I'm a perfectionist (overused and sounds fake).",
    tip: "Choose a real weakness that isn't critical to the job. Always explain what you're doing to improve.",
  },
  {
    question: "Where do you see yourself in 5 years?",
    why: "They want to know if you'll stick around and if your career goals align with what they can offer.",
    goodAnswer:
      "In 5 years, I see myself having grown into a senior role where I can mentor others and contribute to strategic decisions. I'm excited that this company promotes from within and invests in professional development.",
    badAnswer:
      "In your job! Just kidding. I don't know, maybe running my own business or travelling the world.",
    tip: "Show ambition but be realistic. Connect your goals to opportunities at the company.",
  },
];

const behavioralQuestions: Question[] = [
  {
    question: "Tell me about a time you faced a challenge at work",
    why: "They're assessing your problem-solving skills and resilience using the STAR method (Situation, Task, Action, Result).",
    goodAnswer:
      "When our team lost two members during a critical project (Situation), I had to ensure we still met the deadline (Task). I reorganized priorities, brought in a contractor for specialized work, and personally took on extra hours (Action). We delivered on time and the client renewed their contract (Result).",
    badAnswer:
      "Every day is a challenge, you know? I just deal with whatever comes up. I'm pretty flexible like that.",
    tip: "Use the STAR method: Situation, Task, Action, Result. Prepare 5-6 stories you can adapt.",
  },
  {
    question: "Describe a time you disagreed with your manager",
    why: "They want to see how you handle conflict professionally and whether you can stand your ground respectfully.",
    goodAnswer:
      "My manager wanted to launch a campaign I thought was premature. I requested a meeting, presented data showing our target audience wasn't ready, and suggested a phased approach. She appreciated the analysis and we compromised on a soft launch first, which proved successful.",
    badAnswer:
      "I just do what I'm told. It's not my place to disagree with management. Or: My last boss was terrible, we argued all the time.",
    tip: "Focus on the professional resolution, not the conflict. Never badmouth previous employers.",
  },
  {
    question: "Give an example of when you showed leadership",
    why: "Leadership isn't just for managers. They want to see initiative and the ability to influence others.",
    goodAnswer:
      "When I noticed our team meetings were unproductive, I proposed a new format with timed agendas and action items. I volunteered to facilitate the first few sessions. Meeting times dropped by 30% and follow-through improved significantly.",
    badAnswer:
      "I've never been a manager so I haven't really had leadership opportunities yet.",
    tip: "Leadership examples can come from any role - projects, committees, mentoring, or process improvements.",
  },
  {
    question: "Tell me about a mistake you made and how you handled it",
    why: "They're checking for accountability and your ability to learn from errors.",
    goodAnswer:
      "I once sent a client report with outdated figures. When I discovered the error, I immediately called the client to apologize, sent the corrected version, and implemented a double-check system. The client appreciated my honesty and we maintained the relationship.",
    badAnswer:
      "I can't think of any major mistakes. I'm usually very careful about my work.",
    tip: "Choose a real mistake (not too serious), own it completely, and emphasize what you learned.",
  },
];

const situationalQuestions: Question[] = [
  {
    question: "How would you handle an angry customer?",
    why: "They're testing your customer service skills, empathy, and ability to stay calm under pressure.",
    goodAnswer:
      "I'd first listen actively without interrupting, acknowledge their frustration, and apologize for their experience. Then I'd focus on finding a solution, clearly explain what I can do, and follow up to ensure they're satisfied. If needed, I'd escalate appropriately.",
    badAnswer:
      "I'd tell them to calm down. If they're being unreasonable, they need to understand our policies.",
    tip: "Use the LAST method: Listen, Apologize, Solve, Thank.",
  },
  {
    question: "What would you do if you had multiple urgent deadlines?",
    why: "They want to see your prioritization and time management skills.",
    goodAnswer:
      "I'd first assess each task's true urgency and impact. I'd communicate with stakeholders about realistic timelines, focus on high-impact items first, and delegate where possible. I'd also identify if any deadlines could be renegotiated.",
    badAnswer:
      "I'd just work overtime until everything's done. I'm used to pressure.",
    tip: "Show a systematic approach. Mention communication with stakeholders - that's often overlooked.",
  },
  {
    question:
      "How would you handle a colleague who isn't pulling their weight?",
    why: "They're checking your teamwork skills and whether you handle conflict directly or let it fester.",
    goodAnswer:
      "I'd first try to understand if there's an underlying issue - maybe they're struggling or unclear on expectations. I'd have a private, supportive conversation. If it continued, I'd focus on how it affects team goals and involve the manager only as a last resort.",
    badAnswer:
      "I'd report them to the manager immediately. It's not fair if they're not working and I am.",
    tip: "Show empathy first, then progressively escalate only if needed.",
  },
];

const saSpecificQuestions: Question[] = [
  {
    question: "What are your salary expectations?",
    why: "They need to know if you're within budget and want to see if you know your market value.",
    goodAnswer:
      "Based on my research of similar roles in Johannesburg and my 5 years of experience, I'm looking at a range of R35,000 to R42,000 per month. However, I'm open to discussing the total package including benefits.",
    badAnswer:
      "I'll take whatever you're offering. Or: I need at least R60,000 (without research to back it up).",
    tip: "Research on PayScale, Glassdoor, and LinkedIn. Give a range, not a fixed number. Consider total package.",
  },
  {
    question: "Are you willing to work overtime / weekends?",
    why: "Some SA roles expect flexibility. They're checking your availability and work ethic.",
    goodAnswer:
      "I understand that project demands sometimes require extra hours, and I'm committed to meeting deadlines. I've worked overtime when needed in my previous roles. I also believe in working efficiently during normal hours to minimize the need for it.",
    badAnswer:
      "No, I have a strict work-life balance policy. Or: Yes, I can work any hours, every weekend, no problem!",
    tip: "Be honest about your limits while showing flexibility. In SA, mentioning BCEA overtime laws is acceptable.",
  },
  {
    question: "Do you have reliable transport?",
    why: "This is common in SA due to public transport challenges. They need to know you'll be punctual.",
    goodAnswer:
      "Yes, I have my own vehicle and a valid license. I also have backup options including a reliable Uber account and family who can assist in emergencies.",
    badAnswer: "I'll figure something out. I usually manage to get to places.",
    tip: "Be honest. If you rely on public transport, emphasize your track record of punctuality.",
  },
  {
    question: "How do you handle load shedding when working?",
    why: "A very SA-specific question testing your adaptability and planning skills.",
    goodAnswer:
      "I've invested in a UPS for my laptop and have mobile data as internet backup. I also check the schedule and plan important calls around it. During extended outages, I have a backup location with power I can work from.",
    badAnswer:
      "I just wait for the power to come back on. Not much you can do about it.",
    tip: "This shows problem-solving. Having backup plans demonstrates professionalism.",
  },
  {
    question: "Why did you leave your previous job?",
    why: "They want to spot red flags and understand your motivations. Keep it positive.",
    goodAnswer:
      "I learned a lot at my previous company, but I've reached a ceiling in terms of growth. I'm looking for new challenges and opportunities to expand my skills, which this role offers with its focus on digital transformation.",
    badAnswer:
      "My boss was terrible and the company was disorganized. I couldn't stand it anymore.",
    tip: "Never badmouth previous employers. Focus on moving toward something, not away from something.",
  },
];

const closingQuestions: Question[] = [
  {
    question: "Do you have any questions for us?",
    why: "This tests your preparation and genuine interest. Always have questions ready!",
    goodAnswer:
      "Yes! I'd love to know what success looks like in this role after 6 months. Also, how would you describe the team culture? And what are the biggest challenges the team is currently facing?",
    badAnswer:
      "No, I think you've covered everything. Or: What's your leave policy? How soon can I take vacation?",
    tip: "Prepare 5+ questions. Ask about: role expectations, team dynamics, company growth, and challenges.",
  },
];

export default function InterviewQuestionsPage() {
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
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Free Interview Prep</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Interview Questions &{" "}
                <span className="text-brand-gold">Best Answers</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Master the most common interview questions asked by South
                African employers. Learn what to say, what to avoid, and why
                they ask each question.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                  <span className="text-2xl font-bold text-brand-gold">
                    20+
                  </span>
                  <p className="text-sm text-white/70">Questions Covered</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                  <span className="text-2xl font-bold text-brand-gold">5</span>
                  <p className="text-sm text-white/70">Categories</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                  <span className="text-2xl font-bold text-brand-gold">SA</span>
                  <p className="text-sm text-white/70">Focused</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tips Banner */}
      <section className="bg-brand-gold/10 border-b border-brand-gold/20 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Lightbulb className="h-4 w-4 text-brand-gold" />
            <span className="text-brand-navy">
              <strong>Interview Tip:</strong> Click on any question to see why
              interviewers ask it, good/bad answer examples, and pro tips!
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <CategorySection
              title="General Interview Questions"
              icon={MessageSquare}
              description="The classics you'll face in almost every interview"
              questions={generalQuestions}
            />

            <CategorySection
              title="Behavioral Questions (STAR Method)"
              icon={Users}
              description="'Tell me about a time when...' questions"
              questions={behavioralQuestions}
            />

            <CategorySection
              title="Situational Questions"
              icon={Target}
              description="'What would you do if...' scenarios"
              questions={situationalQuestions}
            />

            <CategorySection
              title="South Africa-Specific Questions"
              icon={Building2}
              description="Questions unique to the SA job market"
              questions={saSpecificQuestions}
            />

            <CategorySection
              title="Closing Questions"
              icon={CheckCircle2}
              description="How to end your interview strong"
              questions={closingQuestions}
            />
          </div>
        </div>
      </section>

      {/* STAR Method Explainer */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                Master the STAR Method
              </h2>
              <p className="text-muted-foreground">
                The secret to answering behavioral interview questions
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  letter: "S",
                  word: "Situation",
                  desc: "Set the scene. Where were you? What was the context?",
                  color: "bg-blue-500",
                },
                {
                  letter: "T",
                  word: "Task",
                  desc: "What was your responsibility? What needed to be done?",
                  color: "bg-green-500",
                },
                {
                  letter: "A",
                  word: "Action",
                  desc: "What did YOU do? Be specific about your actions.",
                  color: "bg-yellow-500",
                },
                {
                  letter: "R",
                  word: "Result",
                  desc: "What happened? Quantify if possible.",
                  color: "bg-red-500",
                },
              ].map((item) => (
                <motion.div
                  key={item.letter}
                  className="bg-white rounded-xl p-6 border border-gray-200 text-center"
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <span className="text-white text-xl font-bold">
                      {item.letter}
                    </span>
                  </div>
                  <h3 className="font-bold text-brand-navy mb-2">
                    {item.word}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-navy text-center mb-10">
              Interview Day Checklist
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Before the Interview
                </h3>
                <ul className="space-y-2">
                  {[
                    "Research the company thoroughly",
                    "Prepare 5+ questions to ask",
                    "Practice answers out loud",
                    "Plan your outfit (dress one level up)",
                    "Print extra CVs and references",
                    "Map the route, arrive 10-15 min early",
                    "Get a good night's sleep",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-brand-teal rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-brand-gold" />
                  During the Interview
                </h3>
                <ul className="space-y-2">
                  {[
                    "Make eye contact and smile",
                    "Give a firm (not crushing) handshake",
                    "Listen fully before answering",
                    "Take a breath before responding",
                    "Use specific examples, not vague claims",
                    "Show enthusiasm for the role",
                    "Ask thoughtful questions at the end",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-brand-navy to-brand-navy/90">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need More Interview Help?
            </h2>
            <p className="text-white/80 mb-8">
              A great CV gets you the interview. Our professional CV writers can
              help you stand out and land more interviews.
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
                href="https://wa.me/27749201395?text=Hi%2C%20I%20need%20help%20preparing%20for%20interviews"
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
