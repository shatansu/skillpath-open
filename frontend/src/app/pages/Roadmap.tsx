import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { loadStoredAnalysis } from "../lib/analysisStore";
import { Check, Lock, Circle, BookOpen, ExternalLink } from "lucide-react";

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
  category: string;
  actions: string[];
}

export function Roadmap() {
  const navigate = useNavigate();
  const [analysis] = useState(() => loadStoredAnalysis());

  const roadmapNodes = useMemo<RoadmapNode[]>(() => {
    if (!analysis) {
      return [];
    }

    const completed = analysis.ai.detectedSkills.slice(0, 3).map((skill, index) => ({
      id: `skill-${index}`,
      title: skill.name,
      description: skill.evidence,
      status: "completed" as const,
      category: `${skill.level} skill`,
      actions: ["Review your existing projects", "Document what you already know", "Use this skill as a base for the next step"],
    }));

    const planned = analysis.ai.roadmap.map((step, index) => ({
      id: `roadmap-${index}`,
      title: step.title,
      description: step.why,
      status: index === 0 ? ("current" as const) : ("locked" as const),
      category: `${step.priority} priority`,
      actions: step.actions,
    }));

    return [...completed, ...planned];
  }, [analysis]);

  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(roadmapNodes[0] ?? null);

  if (!analysis) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-xl">
          <CardContent className="space-y-4 p-8 text-center">
            <h1 className="text-2xl font-bold">No roadmap available</h1>
            <p className="text-muted-foreground">Run a GitHub analysis first to generate your roadmap.</p>
            <Button onClick={() => navigate("/")}>Go to Landing Page</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusIcon = (status: RoadmapNode["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="h-5 w-5 text-white" />;
      case "current":
        return <Circle className="h-5 w-5 fill-white text-white" />;
      case "locked":
        return <Lock className="h-5 w-5 text-white" />;
    }
  };

  const getStatusColor = (status: RoadmapNode["status"]) => {
    switch (status) {
      case "completed":
        return "from-green-500 to-emerald-600";
      case "current":
        return "from-primary to-accent animate-pulse";
      case "locked":
        return "from-gray-400 to-gray-500";
    }
  };

  const completedCount = roadmapNodes.filter((node) => node.status === "completed").length;
  const progressPercentage = roadmapNodes.length ? (completedCount / roadmapNodes.length) * 100 : 0;

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Your Learning Roadmap</h1>
          <p className="text-muted-foreground">
            Recommended path toward {analysis.ai.recommendedRole} for your {analysis.goal || "current"} goal.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="mb-8">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold">Overall Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedCount} of {roadmapNodes.length} roadmap nodes already backed by your GitHub history
                  </p>
                </div>
                <div className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-bold text-transparent">
                  {Math.round(progressPercentage)}%
                </div>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-background/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute bottom-0 left-6 top-0 w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50" />

              <div className="space-y-6">
                {roadmapNodes.map((node, index) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute left-0 top-0">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${getStatusColor(node.status)} shadow-lg`}>
                        {getStatusIcon(node.status)}
                      </div>
                    </div>

                    <div className="ml-20">
                      <Card
                        className={`cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${
                          selectedNode?.id === node.id ? "border-primary shadow-lg" : node.status === "locked" ? "opacity-60" : ""
                        }`}
                        onClick={() => setSelectedNode(node)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{node.title}</CardTitle>
                              <CardDescription>{node.description}</CardDescription>
                            </div>
                            <Badge variant={node.status === "completed" ? "default" : node.status === "current" ? "secondary" : "outline"}>
                              {node.category}
                            </Badge>
                          </div>
                        </CardHeader>
                        {node.status === "current" ? (
                          <CardContent className="pt-0">
                            <Button size="sm" variant="outline" className="group w-full" onClick={(e) => e.stopPropagation()}>
                              <BookOpen className="mr-2 h-4 w-4" />
                              Focus on this next
                              <ExternalLink className="ml-2 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                            </Button>
                          </CardContent>
                        ) : null}
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {selectedNode ? (
                <motion.div key={selectedNode.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <Card>
                    <CardHeader>
                      <div className="mb-2 flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${getStatusColor(selectedNode.status)}`}>
                          {getStatusIcon(selectedNode.status)}
                        </div>
                        <Badge>{selectedNode.category}</Badge>
                      </div>
                      <CardTitle>{selectedNode.title}</CardTitle>
                      <CardDescription>{selectedNode.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="mb-2 font-semibold">Status</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedNode.status === "completed" && "Evidence already exists in your GitHub work. Use it as a strong foundation."}
                          {selectedNode.status === "current" && "This is the highest-priority next step based on your current profile."}
                          {selectedNode.status === "locked" && "This step becomes more valuable after you complete the current focus area."}
                        </p>
                      </div>

                      <div>
                        <h4 className="mb-2 font-semibold">Suggested Actions</h4>
                        <div className="space-y-2">
                          {selectedNode.actions.map((action) => (
                            <div key={action} className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedNode.status !== "locked" ? (
                        <Button className="w-full bg-gradient-to-r from-primary to-accent">
                          {selectedNode.status === "completed" ? "Review Strength" : "Start Learning"}
                        </Button>
                      ) : null}
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">Click on a roadmap node to see details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
