import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  HelpCircle, 
  Search, 
  BarChart3, 
  Map, 
  BookOpen, 
  LayoutDashboard,
  Github,
  Target,
  Zap,
  Shield,
  ArrowRight
} from "lucide-react";

export function Help() {
  const features = [
    {
      icon: Github,
      title: "GitHub Integration",
      description: "Connect your GitHub account to analyze your repositories and coding activity.",
      color: "from-gray-600 to-gray-800"
    },
    {
      icon: Search,
      title: "Repository Scanning",
      description: "We scan your repositories to detect languages, frameworks, and technologies you use.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: BarChart3,
      title: "Skill Analysis",
      description: "Get detailed insights into your skill levels based on your actual code contributions.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Map,
      title: "Personalized Roadmap",
      description: "Receive a customized learning path with skills organized by difficulty and dependencies.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access curated tutorials, courses, and documentation for each skill on your roadmap.",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: LayoutDashboard,
      title: "Progress Dashboard",
      description: "Track your learning journey with stats, achievements, and weekly goals.",
      color: "from-cyan-500 to-blue-600"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Enter GitHub Username",
      description: "Start by entering your GitHub username on the landing page. We'll fetch your public repositories and analyze your coding activity.",
      tips: ["Make sure your profile is public", "Repositories should contain code"]
    },
    {
      number: "02",
      title: "Scanning Process",
      description: "Our system analyzes your repositories, detecting programming languages, frameworks, and libraries you've used.",
      tips: ["Scanning takes 3-5 seconds", "We analyze commit history and file types"]
    },
    {
      number: "03",
      title: "Review Your Skills",
      description: "See detailed analysis of your detected skills with proficiency levels based on your repository activity.",
      tips: ["Skills are ranked by usage", "View language distribution charts"]
    },
    {
      number: "04",
      title: "Explore Your Roadmap",
      description: "Get a personalized learning roadmap with skills organized in a visual tree structure showing dependencies.",
      tips: ["Click nodes to see details", "Follow the suggested path"]
    },
    {
      number: "05",
      title: "Access Resources",
      description: "Browse curated learning resources for each skill, including tutorials, courses, and documentation.",
      tips: ["Filter by skill category", "Save favorites for later"]
    },
    {
      number: "06",
      title: "Track Progress",
      description: "Use the dashboard to monitor your learning hours, completed skills, and maintain your streak.",
      tips: ["Set weekly goals", "Earn achievements"]
    }
  ];

  const faqs = [
    {
      question: "How does skill detection work?",
      answer: "We analyze your GitHub repositories by examining file extensions, package dependencies, and commit patterns to determine which languages and frameworks you actively use."
    },
    {
      question: "Is my GitHub data secure?",
      answer: "Yes! We only read public repository data and don't store any sensitive information. We never access private repositories or require authentication."
    },
    {
      question: "How are skill levels calculated?",
      answer: "Skill levels are based on multiple factors including number of projects, lines of code, commit frequency, and repository stars."
    },
    {
      question: "Can I customize my learning roadmap?",
      answer: "The roadmap is personalized based on your current skills and common learning paths in the developer community. You can choose which skills to focus on next."
    },
    {
      question: "How often should I update my analysis?",
      answer: "We recommend re-scanning your GitHub profile every few weeks as you work on new projects to keep your skill analysis current."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">Help & Documentation</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about SkillPath-Open and how to make the most of your learning journey
          </p>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Key Features</h2>
            <p className="text-muted-foreground">Discover what makes SkillPath-Open powerful</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-muted-foreground">Follow these steps to get started</p>
          </div>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">{step.number}</span>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {step.tips.map((tip, tipIndex) => (
                            <Badge key={tipIndex} variant="secondary" className="text-xs">
                              <Zap className="h-3 w-3 mr-1" />
                              {tip}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Quick Tips for Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Keep your GitHub profile active with regular commits",
                  "Work on diverse projects to expand your skill set",
                  "Follow the recommended learning path for best results",
                  "Set realistic weekly learning goals and track them",
                  "Review your progress regularly to stay motivated",
                  "Complete one skill before moving to the next"
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Common questions about SkillPath-Open</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border-green-500/20 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Privacy & Security
              </CardTitle>
              <CardDescription>Your data is safe with us</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                • We only access public GitHub repository data
              </p>
              <p className="text-sm text-muted-foreground">
                • No authentication or login required
              </p>
              <p className="text-sm text-muted-foreground">
                • All data processing happens in your browser
              </p>
              <p className="text-sm text-muted-foreground">
                • We don't store or share your personal information
              </p>
              <p className="text-sm text-muted-foreground">
                • Open source and transparent implementation
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
