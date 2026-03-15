import axios from "axios";
import { GitHubResult } from "./githubService";

type SkillLevel = "beginner" | "intermediate" | "advanced";
type Priority = "high" | "medium" | "low";

export interface DetectedSkill {
  name: string;
  level: SkillLevel;
  evidence: string;
  confidence: number;
}

export interface RoadmapStep {
  title: string;
  priority: Priority;
  why: string;
  actions: string[];
}

export interface AiGithubAnalysis {
  summary: string;
  recommendedRole: string;
  confidenceNote: string;
  strengths: string[];
  gaps: string[];
  detectedSkills: DetectedSkill[];
  roadmap: RoadmapStep[];
}

const openRouter = axios.create({
  baseURL: process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1",
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": process.env.FRONTEND_URL ?? "http://localhost:5173",
    "X-Title": "SkillPath Open",
  },
});

const modelFallbacks = [
  "stepfun/step-3.5-flash:free",
  "arcee-ai/trinity-large-preview:free",
  "upstage/solar-pro-3:free",
];

function summarizeLanguages(languages: Record<string, number>) {
  return Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)
    .map(([name, bytes]) => ({ name, bytes }));
}

function buildPromptPayload(github: GitHubResult) {
  const repoSummaries = github.repos.slice(0, 8).map((repo) => ({
    name: repo.name,
    description: repo.description,
    topics: repo.topics.slice(0, 5),
    topLanguages: summarizeLanguages(repo.languages),
  }));

  const topicCounts = new Map<string, number>();
  for (const repo of github.repos) {
    for (const topic of repo.topics) {
      topicCounts.set(topic, (topicCounts.get(topic) ?? 0) + 1);
    }
  }

  const topTopics = [...topicCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([topic, count]) => ({ topic, count }));

  return {
    profile: {
      username: github.username,
      name: github.name,
      bio: github.bio,
      publicRepos: github.publicRepos,
      topLanguages: github.topLanguages,
    },
    topTopics,
    repoSummaries,
  };
}

function extractTextContent(content: unknown) {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (
          item &&
          typeof item === "object" &&
          "text" in item &&
          typeof (item as { text: unknown }).text === "string"
        ) {
          return (item as { text: string }).text;
        }

        return "";
      })
      .join("\n");
  }

  return "";
}

function extractJson(text: string) {
  const fencedMatch = text.match(/```json\s*([\s\S]*?)\s*```/i);
  if (fencedMatch?.[1]) {
    return fencedMatch[1];
  }

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1);
  }

  return text;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function clampConfidence(value: unknown) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0.5;
  }

  return Math.min(1, Math.max(0, value));
}

function normalizeAnalysis(raw: any): AiGithubAnalysis {
  const detectedSkills = Array.isArray(raw?.detectedSkills)
    ? raw.detectedSkills
        .filter((item: any) => item && typeof item.name === "string")
        .map((item: any) => ({
          name: item.name,
          level:
            item.level === "advanced" || item.level === "intermediate" || item.level === "beginner"
              ? item.level
              : "beginner",
          evidence: typeof item.evidence === "string" ? item.evidence : "Derived from repository data",
          confidence: clampConfidence(item.confidence),
        }))
    : [];

  const roadmap = Array.isArray(raw?.roadmap)
    ? raw.roadmap
        .filter((item: any) => item && typeof item.title === "string")
        .map((item: any) => ({
          title: item.title,
          priority:
            item.priority === "high" || item.priority === "medium" || item.priority === "low"
              ? item.priority
              : "medium",
          why: typeof item.why === "string" ? item.why : "Important next step",
          actions: asStringArray(item.actions),
        }))
    : [];

  return {
    summary: typeof raw?.summary === "string" ? raw.summary : "Public GitHub activity based analysis generated.",
    recommendedRole:
      typeof raw?.recommendedRole === "string" ? raw.recommendedRole : "Software Developer",
    confidenceNote:
      typeof raw?.confidenceNote === "string"
        ? raw.confidenceNote
        : "This result is based only on public GitHub data.",
    strengths: asStringArray(raw?.strengths),
    gaps: asStringArray(raw?.gaps),
    detectedSkills,
    roadmap,
  };
}

export async function analyzeGithubWithAI(github: GitHubResult) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is missing in .env");
  }

  const payload = buildPromptPayload(github);
  const errors: string[] = [];

  const messages = [
    {
      role: "system",
      content:
        "You are a career and engineering skill analyst. Analyze only the provided public GitHub data. Do not invent private experience. If evidence is weak, explicitly lower confidence. Return only valid JSON with keys: summary, recommendedRole, confidenceNote, strengths, gaps, detectedSkills, roadmap.",
    },
    {
      role: "user",
      content: `Analyze this GitHub profile and return strict JSON only.\n\nJSON shape:\n{\n  \"summary\": string,\n  \"recommendedRole\": string,\n  \"confidenceNote\": string,\n  \"strengths\": string[],\n  \"gaps\": string[],\n  \"detectedSkills\": [{\n    \"name\": string,\n    \"level\": \"beginner\" | \"intermediate\" | \"advanced\",\n    \"evidence\": string,\n    \"confidence\": number\n  }],\n  \"roadmap\": [{\n    \"title\": string,\n    \"priority\": \"high\" | \"medium\" | \"low\",\n    \"why\": string,\n    \"actions\": string[]\n  }]\n}\n\nGitHub data:\n${JSON.stringify(payload, null, 2)}`,
    },
  ];

  for (const model of modelFallbacks) {
    try {
      const { data } = await openRouter.post("/chat/completions", {
        model,
        messages,
        temperature: 0.2,
      });

      const content = extractTextContent(data?.choices?.[0]?.message?.content);
      const parsed = JSON.parse(extractJson(content));

      return {
        model,
        analysis: normalizeAnalysis(parsed),
      };
    } catch (error: any) {
      errors.push(`${model}: ${error?.response?.data?.error?.message ?? error?.message ?? "Unknown error"}`);
    }
  }

  throw new Error(`All OpenRouter models failed. ${errors.join(" | ")}`);
}
