import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { ArrowRight, GitBranch, Star, Code } from "lucide-react";

export function SkillAnalysis() {
  const navigate = useNavigate();

  const skills = [
    { name: "JavaScript", level: 95, color: "from-yellow-500 to-yellow-600", projects: 12 },
    { name: "TypeScript", level: 88, color: "from-blue-500 to-blue-600", projects: 8 },
    { name: "React", level: 92, color: "from-cyan-500 to-cyan-600", projects: 10 },
    { name: "Node.js", level: 85, color: "from-green-500 to-green-600", projects: 7 },
    { name: "Python", level: 70, color: "from-indigo-500 to-indigo-600", projects: 5 },
    { name: "CSS", level: 80, color: "from-pink-500 to-pink-600", projects: 9 },
    { name: "HTML", level: 95, color: "from-orange-500 to-orange-600", projects: 11 },
    { name: "Git", level: 90, color: "from-red-500 to-red-600", projects: 15 },
  ];

  const languageData = [
    { language: "JavaScript", percentage: 35 },
    { language: "TypeScript", percentage: 28 },
    { language: "Python", percentage: 15 },
    { language: "CSS", percentage: 12 },
    { language: "HTML", percentage: 10 },
  ];

  const radarData = [
    { skill: "Frontend", value: 90 },
    { skill: "Backend", value: 75 },
    { skill: "DevOps", value: 60 },
    { skill: "Testing", value: 70 },
    { skill: "Design", value: 65 },
    { skill: "Database", value: 55 },
  ];

  const topRepositories = [
    { name: "react-portfolio", language: "TypeScript", stars: 24, contributions: 156 },
    { name: "ecommerce-platform", language: "JavaScript", stars: 18, contributions: 203 },
    { name: "python-ml-toolkit", language: "Python", stars: 12, contributions: 89 },
    { name: "design-system", language: "TypeScript", stars: 9, contributions: 67 },
    { name: "api-gateway", language: "Node.js", stars: 7, contributions: 45 },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Skill Analysis Complete</h1>
              <p className="text-muted-foreground">Based on your GitHub activity</p>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Skills", value: "8", icon: Code, gradient: "from-blue-500 to-indigo-600" },
            { label: "Repositories", value: "15", icon: GitBranch, gradient: "from-purple-500 to-pink-600" },
            { label: "Total Stars", value: "70", icon: Star, gradient: "from-amber-500 to-orange-600" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Detected Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${skill.color}`} />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {skill.projects} projects
                        </span>
                        <span className="text-sm font-semibold">{skill.level}%</span>
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Language Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
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

            {/* Skill Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={radarData}>
                    <PolarGrid className="stroke-muted" />
                    <PolarAngleAxis dataKey="skill" className="text-xs" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                    <Radar
                      name="Skills"
                      dataKey="value"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
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
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <GitBranch className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-semibold">{repo.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {repo.contributions} contributions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">{repo.language}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        <span>{repo.stars}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            onClick={() => navigate("/roadmap")}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 group"
          >
            View Your Personalized Roadmap
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}