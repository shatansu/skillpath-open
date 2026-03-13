import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Check, Loader2, GitBranch, Code, FileCode, Map } from "lucide-react";

interface ScanStep {
  id: string;
  label: string;
  icon: typeof GitBranch;
  status: "pending" | "active" | "complete";
}

export function Scanning() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const [steps, setSteps] = useState<ScanStep[]>([
    { id: "fetch", label: "Fetching repositories", icon: GitBranch, status: "active" },
    { id: "detect", label: "Detecting languages", icon: Code, status: "pending" },
    { id: "extract", label: "Extracting skills", icon: FileCode, status: "pending" },
    { id: "build", label: "Building roadmap", icon: Map, status: "pending" },
  ]);

  const [repositories] = useState([
    { name: "react-portfolio", language: "TypeScript", stars: 24 },
    { name: "node-api", language: "JavaScript", stars: 12 },
    { name: "python-ml", language: "Python", stars: 8 },
    { name: "flutter-app", language: "Dart", stars: 5 },
    { name: "rust-cli", language: "Rust", stars: 3 },
  ]);

  useEffect(() => {
    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/analysis"), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    // Update step statuses based on progress
    const stepProgress = progress / 25;
    const newCurrentStep = Math.min(Math.floor(stepProgress), 3);
    
    if (newCurrentStep !== currentStep) {
      setCurrentStep(newCurrentStep);
      setSteps((prev) =>
        prev.map((step, idx) => ({
          ...step,
          status:
            idx < newCurrentStep
              ? "complete"
              : idx === newCurrentStep
              ? "active"
              : "pending",
        }))
      );
    }
  }, [progress, currentStep]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
          <h1 className="text-3xl font-bold">Analyzing Your GitHub Profile</h1>
          <p className="text-muted-foreground">
            Scanning repositories and detecting your skills...
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6 space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                      step.status === "complete"
                        ? "bg-green-500/20 text-green-500"
                        : step.status === "active"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.status === "complete" ? (
                      <Check className="h-5 w-5" />
                    ) : step.status === "active" ? (
                      <step.icon className="h-5 w-5 animate-pulse" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`${
                      step.status === "active" ? "font-semibold" : ""
                    }`}>
                      {step.label}
                    </p>
                  </div>
                  {step.status === "active" && (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Repository Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Scanning Repositories</h3>
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {repositories.slice(0, Math.floor(progress / 20)).map((repo, index) => (
                    <motion.div
                      key={repo.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{repo.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {repo.language}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ⭐ {repo.stars}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
