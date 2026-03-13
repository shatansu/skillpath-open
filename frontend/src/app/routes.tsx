import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Scanning } from "./pages/Scanning";
import { SkillAnalysis } from "./pages/SkillAnalysis";
import { Roadmap } from "./pages/Roadmap";
import { Resources } from "./pages/Resources";
import { Dashboard } from "./pages/Dashboard";
import { Help } from "./pages/Help";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Landing },
      { path: "scanning", Component: Scanning },
      { path: "analysis", Component: SkillAnalysis },
      { path: "roadmap", Component: Roadmap },
      { path: "resources", Component: Resources },
      { path: "dashboard", Component: Dashboard },
      { path: "help", Component: Help },
    ],
  },
]);