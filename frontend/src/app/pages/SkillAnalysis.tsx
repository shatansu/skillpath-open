import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  clearStoredAnalysis,
  getLanguageDistribution,
  getPrimaryLanguage,
  getProjectsUsingSkill,
  getSkillScore,
  loadStoredAnalysis,
} from "../lib/analysisStore";
import { Progress } from "../components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowRight, GitBranch, Star, Code, RotateCcw } from "lucide-react";

const skillColors = [
  "from-yellow-500 to-yellow-600",
  "from-blue-500 to-blue-600",
  "from-cyan-500 to-cyan-600",
  "from-green-500 to-green-600",
  "from-indigo-500 to-indigo-600",
  "from-pink-500 to-pink-600",
  "from-orange-500 to-orange-600",
  "from-red-500 to-red-600",
];

export function SkillAnalysis() {
  const navigate = useNavigate();
  const [analysis] = useState(() => loadStoredAnalysis());

  if (!analysis) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-xl">
          <CardContent className="space-y-4 p-8 text-center">
            <h1 className="text-2xl font-bold">No analysis found</h1>
            <p className="text-muted-foreground">
              Start from the landing page and run a GitHub analysis first.
            </p>
            <Button onClick={() => navigate("/")}>Go to Landing Page</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const skills = analysis.ai.detectedSkills.map((skill, index) => ({
    ...skill,
    levelScore: getSkillScore(skill.level, skill.confidence),
    projects: getProjectsUsingSkill(analysis.github.repos, skill.name),
    color: skillColors[index % skillColors.length],
  }));

  const languageData = getLanguageDistribution(analysis.github.repos);
  const topRepositories = analysis.github.repos.slice(0, 5).map((repo) => ({
    name: repo.name,
    language: getPrimaryLanguage(repo.languages),
    topicCount: repo.topics.length,
    languageCount: Object.keys(repo.languages).length,
    description: repo.description,
  }));

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
              <Code className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Skill Analysis Complete</h1>
              <p className="text-muted-foreground">
                Based on {analysis.github.username}&apos;s GitHub activity using {analysis.model}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { label: "Detected Skills", value: String(analysis.ai.detectedSkills.length), icon: Code, gradient: "from-blue-500 to-indigo-600" },
            { label: "Repositories", value: String(analysis.github.repos.length), icon: GitBranch, gradient: "from-purple-500 to-pink-600" },
            { label: "Roadmap Steps", value: String(analysis.ai.roadmap.length), icon: Star, gradient: "from-amber-500 to-orange-600" },
          ].map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Detected Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${skill.color}`} />
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="outline">{skill.level}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{skill.evidence}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-semibold">{skill.levelScore}%</p>
                        <p className="text-muted-foreground">{skill.projects} repos</p>
                      </div>
                    </div>
                    <Progress value={skill.levelScore} className="h-2" />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Language Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={languageData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="language" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <defs>
                      <linearGradient id="barChartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop key="stop-0" offset="0%" stopColor="#6366f1" />
                        <stop key="stop-1" offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <Bar dataKey="percentage" fill="url(#barChartGradient)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Summary</CardTitle>
                <CardDescription>{analysis.ai.recommendedRole}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm text-muted-foreground">{analysis.ai.summary}</p>
                <div>
                  <h3 className="mb-2 font-semibold">Strengths</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.ai.strengths.map((strength) => (
                      <Badge key={strength} variant="secondary">{strength}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Gaps</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.ai.gaps.map((gap) => (
                      <Badge key={gap} variant="outline">{gap}</Badge>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{analysis.ai.confidenceNote}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Top Repositories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRepositories.map((repo, index) => (
                  <motion.div
                    key={repo.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-center justify-between rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted"
                  >
                    <div className="flex items-center gap-4">
                      <GitBranch className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-semibold">{repo.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {repo.description || `${repo.languageCount} languages detected`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">{repo.language}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        <span>{repo.topicCount} topics</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              clearStoredAnalysis();
              navigate("/");
            }}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Start New Analysis
          </Button>
          <Button size="lg" onClick={() => navigate("/roadmap")} className="group bg-gradient-to-r from-primary to-accent hover:opacity-90">
            View Your Personalized Roadmap
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
