import { Request, Response, Router } from "express";
import { analyzeGithubWithAI } from "../services/aiAnalysisService";
import { fetchGitHubData } from "../services/githubService";

const router = Router();

function getValidatedUsername(value: unknown) {
  if (!value || typeof value !== "string") {
    return { error: "githubUsername is required" } as const;
  }

  const username = value.trim();

  if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(username)) {
    return { error: "Invalid GitHub username" } as const;
  }

  return { username } as const;
}

router.post("/ai", async (req: Request, res: Response) => {
  const validated = getValidatedUsername(req.body?.githubUsername);

  if ("error" in validated) {
    return res.status(400).json({ error: validated.error });
  }

  try {
    const github = await fetchGitHubData(validated.username);
    const ai = await analyzeGithubWithAI(github);

    return res.json({
      github,
      ai: ai.analysis,
      model: ai.model,
    });
  } catch (err: any) {
    const status = err?.response?.status;

    if (status === 404) {
      return res.status(404).json({ error: `User '${validated.username}' not found` });
    }

    if (status === 403) {
      return res.status(403).json({
        error: "GitHub rate limit hit or provider rejected the request",
      });
    }

    console.error("[github-ai] error:", err?.message ?? err);
    return res.status(500).json({ error: err?.message ?? "Failed to analyze GitHub data with AI" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const validated = getValidatedUsername(req.body?.githubUsername);

  if ("error" in validated) {
    return res.status(400).json({ error: validated.error });
  }

  try {
    const data = await fetchGitHubData(validated.username);
    return res.json(data);
  } catch (err: any) {
    const status = err?.response?.status;

    if (status === 404) {
      return res.status(404).json({ error: `User '${validated.username}' not found` });
    }

    if (status === 403) {
      return res.status(403).json({
        error: "GitHub rate limit hit. Set GITHUB_TOKEN in .env",
      });
    }

    console.error("[github] error:", err?.message ?? err);
    return res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
});

export default router;
