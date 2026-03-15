import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { clearStoredAnalysis, savePendingAnalysis } from "../lib/analysisStore";
import { Github, Scan, MapPin, BookOpen, TrendingUp, ArrowRight, Sparkles } from "lucide-react";

export function Landing() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [goal, setGoal] = useState("Frontend");
  const [error, setError] = useState("");

  const handleAnalyze = () => {
    const githubUsername = username.trim();

    if (!githubUsername) {
      setError("Please enter your GitHub username.");
      return;
    }

    setError("");
    clearStoredAnalysis();
    savePendingAnalysis({ githubUsername, goal });
    navigate("/scanning");
  };

  const features = [
    {
      icon: Scan,
      title: "GitHub Skill Scanner",
      description: "Automatically analyze your repositories to detect languages, frameworks, and technical skills.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: MapPin,
      title: "Personalized Roadmap",
      description: "Get a custom learning path tailored to your current skills and career goals.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access curated tutorials, documentation, and projects for each skill on your roadmap.",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed statistics and achievement milestones.",
      gradient: "from-pink-500 to-rose-600",
    },
  ];

  const goals = ["Frontend", "Backend", "DevOps", "AI"];

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-accent/20 to-primary/20 blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm">Open Source Developer Learning Platform</span>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Your Personalized Developer
                <br />
                <span className="animate-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Roadmap Based on Your GitHub
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                SkillPath-Open analyzes your GitHub profile to understand your current skills
                and generates a personalized learning roadmap to help you reach your goals.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto max-w-2xl space-y-4"
            >
              <Card className="border-primary/10 shadow-xl">
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-2 text-left">
                    <label className="text-sm text-muted-foreground">GitHub Username</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter your GitHub username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                        className="h-12 bg-input-background pl-10"
                      />
                    </div>
                    {error ? <p className="text-sm text-destructive">{error}</p> : null}
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-sm text-muted-foreground">Learning Goal</label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {goals.map((g) => (
                        <button
                          key={g}
                          onClick={() => setGoal(g)}
                          className={`rounded-lg px-4 py-2 transition-all ${
                            goal === g
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    size="lg"
                    className="group h-12 w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Analyze My GitHub
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                level up your skills
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Comprehensive tools and resources to guide your developer journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <CardHeader>
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient}`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
              <CardContent className="space-y-6 p-12 text-center">
                <h3 className="text-3xl font-bold">Ready to start your journey?</h3>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  Join thousands of developers using SkillPath-Open to accelerate their learning and achieve their career goals.
                </p>
                <Button
                  onClick={() => document.querySelector("input")?.focus()}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
