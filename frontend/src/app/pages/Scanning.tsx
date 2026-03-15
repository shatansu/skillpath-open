import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import {
  clearPendingAnalysis,
  getApiBaseUrl,
  getPrimaryLanguage,
  loadPendingAnalysis,
  saveStoredAnalysis,
  StoredAnalysis,
} from "../lib/analysisStore";
import { Check, Loader2, GitBranch, Code, FileCode, Map } from "lucide-react";

interface ScanStep {
  id: string;
  label: string;
  icon: typeof GitBranch;
  status: "pending" | "active" | "complete";
}

const initialSteps: ScanStep[] = [
  { id: "fetch", label: "Fetching repositories", icon: GitBranch, status: "active" },
  { id: "detect", label: "Detecting languages", icon: Code, status: "pending" },
  { id: "extract", label: "Extracting AI insights", icon: FileCode, status: "pending" },
  { id: "build", label: "Building roadmap", icon: Map, status: "pending" },
];

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function Scanning() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(5);
  const [steps, setSteps] = useState<ScanStep[]>(initialSteps);
  const [repositories, setRepositories] = useState<{ name: string; language: string }[]>([]);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const visibleRepositories = useMemo(
    () => repositories.slice(0, Math.max(1, Math.ceil((progress / 100) * Math.max(repositories.length, 1)))),
    [progress, repositories],
  );

  useEffect(() => {
    let cancelled = false;

    const setActiveStep = (activeIndex: number) => {
      if (cancelled) {
        return;
      }

      setSteps((prev) =>
        prev.map((step, index) => ({
          ...step,
          status: index < activeIndex ? "complete" : index === activeIndex ? "active" : "pending",
        })),
      );
    };

    const setAllComplete = () => {
      if (cancelled) {
        return;
      }

      setSteps((prev) => prev.map((step) => ({ ...step, status: "complete" })));
    };

    const run = async () => {
      const pending = loadPendingAnalysis();

      if (!pending) {
        navigate("/", { replace: true });
        return;
      }

      setUsername(pending.githubUsername);
      setError("");

      try {
        setProgress(12);
        setActiveStep(0);
        await sleep(400);

        const response = await fetch(`${getApiBaseUrl()}/analyze/github/ai`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ githubUsername: pending.githubUsername }),
        });

        const payload = (await response.json()) as Partial<StoredAnalysis> & { error?: string };

        if (!response.ok) {
          throw new Error(payload.error || "Analysis failed");
        }

        const result = payload as StoredAnalysis;

        if (cancelled) {
          return;
        }

        setRepositories(
          result.github.repos.map((repo) => ({
            name: repo.name,
            language: getPrimaryLanguage(repo.languages),
          })),
        );

        setProgress(46);
        setActiveStep(1);
        await sleep(400);

        setProgress(72);
        setActiveStep(2);
        await sleep(400);

        setProgress(90);
        setActiveStep(3);
        await sleep(400);

        saveStoredAnalysis({
          ...result,
          goal: pending.goal,
          analyzedAt: new Date().toISOString(),
        });
        clearPendingAnalysis();
        setAllComplete();
        setProgress(100);

        window.setTimeout(() => {
          navigate("/analysis");
        }, 700);
      } catch (err) {
        if (cancelled) {
          return;
        }

        setError(err instanceof Error ? err.message : "Failed to analyze GitHub profile");
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 blur-3xl"
        />
      </div>

      <div className="w-full max-w-4xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 text-center"
        >
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
          <h1 className="text-3xl font-bold">Analyzing {username || "your"} GitHub Profile</h1>
          <p className="text-muted-foreground">
            Fetching repositories, reading language signals, and generating an AI roadmap.
          </p>
          {error ? (
            <div className="space-y-3">
              <p className="text-sm text-destructive">{error}</p>
              <Button variant="outline" onClick={() => navigate("/")}>Back to Landing</Button>
            </div>
          ) : null}
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="space-y-4 p-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
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
                    <p className={step.status === "active" ? "font-semibold" : undefined}>{step.label}</p>
                  </div>
                  {step.status === "active" ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : null}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-semibold">Repositories Detected</h3>
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {visibleRepositories.map((repo, index) => (
                    <motion.div
                      key={repo.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{repo.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{repo.language}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {!visibleRepositories.length && !error ? (
                  <div className="rounded-lg bg-muted/40 p-4 text-sm text-muted-foreground">
                    Waiting for repository data...
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
