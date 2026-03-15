import "dotenv/config";
import cors from "cors";
import express from "express";
import githubRouter from "./routes/github";

const app = express();
const port = Number(process.env.PORT ?? 5000);

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "skillpath-backend",
    endpoints: [
      "GET /health",
      "POST /analyze/github",
      "POST /analyze/github/ai",
    ],
  });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/analyze/github", githubRouter);

app.listen(port, () => {
  console.log(`Backend -> http://localhost:${port}`);
  console.log(`Endpoints -> POST /analyze/github, POST /analyze/github/ai`);
  console.log(`GitHub token -> ${process.env.GITHUB_TOKEN ? "loaded" : "missing"}`);
  console.log(`OpenRouter key -> ${process.env.OPENROUTER_API_KEY ? "loaded" : "missing"}`);
});
