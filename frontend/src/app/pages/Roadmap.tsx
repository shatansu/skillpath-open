import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Check, Lock, Circle, BookOpen, ExternalLink } from "lucide-react";

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
  category: string;
}

export function Roadmap() {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);

  const roadmapNodes: RoadmapNode[] = [
    { id: "1", title: "HTML Fundamentals", description: "Master semantic HTML and document structure", status: "completed", category: "Foundation" },
    { id: "2", title: "CSS Basics", description: "Learn styling, layouts, and responsive design", status: "completed", category: "Foundation" },
    { id: "3", title: "JavaScript Essentials", description: "Variables, functions, and DOM manipulation", status: "completed", category: "Foundation" },
    { id: "4", title: "React Fundamentals", description: "Components, props, and state management", status: "completed", category: "Frontend" },
    { id: "5", title: "Advanced React", description: "Hooks, context, and custom hooks", status: "current", category: "Frontend" },
    { id: "6", title: "State Management", description: "Redux, Zustand, or Context API patterns", status: "current", category: "Frontend" },
    { id: "7", title: "Testing", description: "Jest, React Testing Library, E2E testing", status: "locked", category: "Quality" },
    { id: "8", title: "Performance Optimization", description: "Code splitting, lazy loading, memoization", status: "locked", category: "Advanced" },
    { id: "9", title: "TypeScript", description: "Type safety and advanced TypeScript patterns", status: "locked", category: "Advanced" },
    { id: "10", title: "Next.js / SSR", description: "Server-side rendering and static generation", status: "locked", category: "Advanced" },
  ];

  const getStatusIcon = (status: RoadmapNode["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="h-5 w-5 text-white" />;
      case "current":
        return <Circle className="h-5 w-5 text-white fill-white" />;
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

  const completedCount = roadmapNodes.filter((n) => n.status === "completed").length;
  const progressPercentage = (completedCount / roadmapNodes.length) * 100;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Your Learning Roadmap</h1>
          <p className="text-muted-foreground">
            Follow this personalized path to achieve your Frontend development goals
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Overall Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedCount} of {roadmapNodes.length} skills completed
                  </p>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {Math.round(progressPercentage)}%
                </div>
              </div>
              <div className="h-3 bg-background/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Roadmap */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50" />

              <div className="space-y-6">
                {roadmapNodes.map((node, index) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Node Icon */}
                    <div className="absolute left-0 top-0">
                      <div
                        className={`h-12 w-12 rounded-full bg-gradient-to-br ${getStatusColor(
                          node.status
                        )} flex items-center justify-center shadow-lg`}
                      >
                        {getStatusIcon(node.status)}
                      </div>
                    </div>

                    {/* Node Card */}
                    <div className="ml-20">
                      <Card
                        className={`cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
                          selectedNode?.id === node.id
                            ? "border-primary shadow-lg"
                            : node.status === "locked"
                            ? "opacity-60"
                            : ""
                        }`}
                        onClick={() => setSelectedNode(node)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{node.title}</CardTitle>
                              <CardDescription>{node.description}</CardDescription>
                            </div>
                            <Badge
                              variant={
                                node.status === "completed"
                                  ? "default"
                                  : node.status === "current"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {node.category}
                            </Badge>
                          </div>
                        </CardHeader>
                        {node.status === "current" && (
                          <CardContent className="pt-0">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full group"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <BookOpen className="h-4 w-4 mr-2" />
                              Start Learning
                              <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Button>
                          </CardContent>
                        )}
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`h-10 w-10 rounded-full bg-gradient-to-br ${getStatusColor(
                            selectedNode.status
                          )} flex items-center justify-center`}
                        >
                          {getStatusIcon(selectedNode.status)}
                        </div>
                        <Badge>{selectedNode.category}</Badge>
                      </div>
                      <CardTitle>{selectedNode.title}</CardTitle>
                      <CardDescription>{selectedNode.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Status</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedNode.status === "completed" &&
                            "You've completed this skill! Great job!"}
                          {selectedNode.status === "current" &&
                            "This is your current focus. Start learning now!"}
                          {selectedNode.status === "locked" &&
                            "Complete previous skills to unlock this one."}
                        </p>
                      </div>

                      {selectedNode.status === "completed" && (
                        <div>
                          <h4 className="font-semibold mb-2">Resources</h4>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-between">
                              Review Materials
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {selectedNode.status === "current" && (
                        <div>
                          <h4 className="font-semibold mb-2">Learning Resources</h4>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-between">
                              Documentation
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" className="w-full justify-between">
                              Video Tutorials
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" className="w-full justify-between">
                              Practice Projects
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {selectedNode.status !== "locked" && (
                        <Button className="w-full bg-gradient-to-r from-primary to-accent">
                          {selectedNode.status === "completed" ? "Review" : "Start Learning"}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">
                      Click on a roadmap node to see details
                    </p>
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
