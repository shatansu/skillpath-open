export interface GitHubRepoData {
  name: string;
  description: string | null;
  topics: string[];
  languages: Record<string, number>;
}

export interface GitHubData {
  username: string;
  name: string | null;
  bio: string | null;
  publicRepos: number;
  topLanguages: string[];
  repos: GitHubRepoData[];
}

export interface DetectedSkill {
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  evidence: string;
  confidence: number;
}

export interface RoadmapStep {
  title: string;
  priority: "high" | "medium" | "low";
  why: string;
  actions: string[];
}

export interface AiAnalysis {
  summary: string;
  recommendedRole: string;
  confidenceNote: string;
  strengths: string[];
  gaps: string[];
  detectedSkills: DetectedSkill[];
  roadmap: RoadmapStep[];
}

export interface StoredAnalysis {
  github: GitHubData;
  ai: AiAnalysis;
  model: string;
  goal?: string;
  analyzedAt?: string;
}

export interface PendingAnalysisRequest {
  githubUsername: string;
  goal: string;
}

const PENDING_ANALYSIS_KEY = "skillpath-pending-analysis";
const STORED_ANALYSIS_KEY = "skillpath-analysis";
const API_BASE_URL = "http://localhost:5000";

function getStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage;
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export function savePendingAnalysis(request: PendingAnalysisRequest) {
  const storage = getStorage();
  storage?.setItem(PENDING_ANALYSIS_KEY, JSON.stringify(request));
}

export function loadPendingAnalysis(): PendingAnalysisRequest | null {
  const storage = getStorage();
  const value = storage?.getItem(PENDING_ANALYSIS_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as PendingAnalysisRequest;
  } catch {
    return null;
  }
}

export function clearPendingAnalysis() {
  const storage = getStorage();
  storage?.removeItem(PENDING_ANALYSIS_KEY);
}

export function saveStoredAnalysis(result: StoredAnalysis) {
  const storage = getStorage();
  storage?.setItem(STORED_ANALYSIS_KEY, JSON.stringify(result));
}

export function loadStoredAnalysis(): StoredAnalysis | null {
  const storage = getStorage();
  const value = storage?.getItem(STORED_ANALYSIS_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as StoredAnalysis;
  } catch {
    return null;
  }
}

export function clearStoredAnalysis() {
  const storage = getStorage();
  storage?.removeItem(STORED_ANALYSIS_KEY);
}

export function getPrimaryLanguage(languages: Record<string, number>) {
  const [language] = Object.entries(languages).sort(([, a], [, b]) => b - a)[0] ?? [];
  return language ?? "Unknown";
}

export function getLanguageDistribution(repos: GitHubRepoData[]) {
  const totals: Record<string, number> = {};

  for (const repo of repos) {
    for (const [language, bytes] of Object.entries(repo.languages)) {
      totals[language] = (totals[language] ?? 0) + bytes;
    }
  }

  const totalBytes = Object.values(totals).reduce((sum, bytes) => sum + bytes, 0);

  return Object.entries(totals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([language, bytes]) => ({
      language,
      percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0,
    }));
}

export function getSkillScore(level: DetectedSkill["level"], confidence: number) {
  const base =
    level === "advanced"
      ? 88
      : level === "intermediate"
      ? 68
      : 42;

  return Math.max(5, Math.min(99, Math.round(base + confidence * 10 - 5)));
}

export function getProjectsUsingSkill(repos: GitHubRepoData[], skillName: string) {
  const normalized = skillName.toLowerCase();

  return repos.filter((repo) =>
    Object.keys(repo.languages).some((language) => language.toLowerCase() === normalized) ||
    repo.topics.some((topic) => topic.toLowerCase() === normalized)
  ).length;
}
