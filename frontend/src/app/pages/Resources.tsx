import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BookOpen, Video, FileCode, ExternalLink, Search, Star } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "documentation" | "video" | "project" | "exercise";
  skill: string;
  rating: number;
  duration?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  url: string;
}

export function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const resources: Resource[] = [
    {
      id: "1",
      title: "React Official Documentation",
      description: "Comprehensive guide to React concepts and API reference",
      type: "documentation",
      skill: "React",
      rating: 5,
      difficulty: "Intermediate",
      url: "#",
    },
    {
      id: "2",
      title: "Advanced React Patterns",
      description: "Learn compound components, render props, and hooks patterns",
      type: "video",
      skill: "React",
      rating: 4.8,
      duration: "3h 45m",
      difficulty: "Advanced",
      url: "#",
    },
    {
      id: "3",
      title: "Build a Task Manager App",
      description: "Full-stack project using React, Node.js, and MongoDB",
      type: "project",
      skill: "React",
      rating: 4.5,
      duration: "8h",
      difficulty: "Intermediate",
      url: "#",
    },
    {
      id: "4",
      title: "TypeScript Deep Dive",
      description: "Master TypeScript from basics to advanced types",
      type: "documentation",
      skill: "TypeScript",
      rating: 4.9,
      difficulty: "Advanced",
      url: "#",
    },
    {
      id: "5",
      title: "State Management with Redux",
      description: "Complete course on Redux toolkit and best practices",
      type: "video",
      skill: "State Management",
      rating: 4.6,
      duration: "5h 20m",
      difficulty: "Intermediate",
      url: "#",
    },
    {
      id: "6",
      title: "Testing React Components",
      description: "Practice exercises for unit and integration testing",
      type: "exercise",
      skill: "Testing",
      rating: 4.7,
      difficulty: "Intermediate",
      url: "#",
    },
    {
      id: "7",
      title: "CSS Grid and Flexbox Mastery",
      description: "Interactive tutorials for modern CSS layouts",
      type: "exercise",
      skill: "CSS",
      rating: 4.8,
      difficulty: "Beginner",
      url: "#",
    },
    {
      id: "8",
      title: "Build a Social Media Clone",
      description: "End-to-end project with authentication and real-time features",
      type: "project",
      skill: "React",
      rating: 4.9,
      duration: "12h",
      difficulty: "Advanced",
      url: "#",
    },
  ];

  const getTypeIcon = (type: Resource["type"]) => {
    switch (type) {
      case "documentation":
        return BookOpen;
      case "video":
        return Video;
      case "project":
      case "exercise":
        return FileCode;
    }
  };

  const getTypeColor = (type: Resource["type"]) => {
    switch (type) {
      case "documentation":
        return "from-blue-500 to-indigo-600";
      case "video":
        return "from-purple-500 to-pink-600";
      case "project":
        return "from-green-500 to-emerald-600";
      case "exercise":
        return "from-orange-500 to-red-600";
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.skill.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
          <p className="text-muted-foreground">
            Curated resources to help you master each skill on your roadmap
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-input-background"
                  />
                </div>
                <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full md:w-auto">
                  <TabsList className="grid grid-cols-5 w-full md:w-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="documentation">Docs</TabsTrigger>
                    <TabsTrigger value="video">Videos</TabsTrigger>
                    <TabsTrigger value="project">Projects</TabsTrigger>
                    <TabsTrigger value="exercise">Practice</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => {
            const Icon = getTypeIcon(resource.type);
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${getTypeColor(resource.type)} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <Badge variant="outline">{resource.skill}</Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-end space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{resource.rating}</span>
                      </div>
                      <Badge variant="secondary">{resource.difficulty}</Badge>
                    </div>
                    {resource.duration && (
                      <p className="text-sm text-muted-foreground">
                        Duration: {resource.duration}
                      </p>
                    )}
                    <Button variant="outline" className="w-full group">
                      View Resource
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No resources found matching your search.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
