import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Target, TrendingUp, Award, Clock, ArrowRight, Calendar, Flame } from "lucide-react";

export function Dashboard() {
  const weeklyActivity = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 3.0 },
    { day: "Wed", hours: 1.5 },
    { day: "Thu", hours: 4.0 },
    { day: "Fri", hours: 2.0 },
    { day: "Sat", hours: 5.0 },
    { day: "Sun", hours: 3.5 },
  ];

  const currentSkills = [
    { name: "State Management", progress: 65, status: "In Progress" },
    { name: "Advanced React", progress: 80, status: "Almost Done" },
  ];

  const recentAchievements = [
    { title: "First Week Complete", date: "2 days ago", icon: Calendar },
    { title: "5 Skills Mastered", date: "1 week ago", icon: Award },
    { title: "10 Hour Streak", date: "2 weeks ago", icon: Flame },
  ];

  const upcomingSkills = [
    { name: "Testing", category: "Quality", difficulty: "Intermediate" },
    { name: "Performance Optimization", category: "Advanced", difficulty: "Advanced" },
    { name: "TypeScript", category: "Advanced", difficulty: "Advanced" },
  ];

  const stats = [
    { label: "Total Learning Hours", value: "47.5", change: "+12.3%", icon: Clock, gradient: "from-blue-500 to-indigo-600" },
    { label: "Skills Completed", value: "4/10", change: "40%", icon: Target, gradient: "from-purple-500 to-pink-600" },
    { label: "Current Streak", value: "7 days", change: "Best!", icon: Flame, gradient: "from-orange-500 to-red-600" },
    { label: "Roadmap Progress", value: "40%", change: "+5%", icon: TrendingUp, gradient: "from-green-500 to-emerald-600" },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and stay motivated</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Learning Activity</CardTitle>
                  <CardDescription>Your learning hours this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="day" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <defs>
                        <linearGradient id="lineChartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop key="stop-0" offset="0%" stopColor="#6366f1" />
                          <stop key="stop-1" offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="#6366f1"
                        strokeWidth={2}
                        dot={{ fill: "#6366f1", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Current Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Skills in Progress</CardTitle>
                      <CardDescription>Your current focus areas</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentSkills.map((skill, index) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{skill.name}</h4>
                          <p className="text-sm text-muted-foreground">{skill.status}</p>
                        </div>
                        <span className="text-sm font-semibold">{skill.progress}%</span>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Your latest milestones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAchievements.map((achievement, index) => (
                    <div
                      key={achievement.title}
                      className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <achievement.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommended Next Skill */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Recommended Next</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-bold text-xl mb-2">Testing</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn unit testing, integration testing, and end-to-end testing practices
                    </p>
                    <Badge>Quality Assurance</Badge>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent group">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Goal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Goal</CardTitle>
                  <CardDescription>5 hours learning</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={85} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">4.25 / 5 hours</span>
                    <span className="font-semibold text-primary">85%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Great job! You're almost there. Just 45 minutes to go!
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Up Next</CardTitle>
                  <CardDescription>Skills on your roadmap</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{skill.name}</p>
                        <p className="text-xs text-muted-foreground">{skill.category}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {skill.difficulty}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}