import axios from "axios";

const gh = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  },
});

export interface RepoResult {
  name: string;
  description: string | null;
  topics: string[];
  languages: Record<string, number>;
}

export interface GitHubResult {
  username: string;
  name: string | null;
  bio: string | null;
  publicRepos: number;
  topLanguages: string[];
  repos: RepoResult[];
}

type GitHubProfile = {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
};

type GitHubRepo = {
  name: string;
  fork: boolean;
  description: string | null;
  topics?: string[];
};

async function getLanguages(
  owner: string,
  repo: string,
): Promise<Record<string, number>> {
  try {
    const { data } = await gh.get<Record<string, number>>(
      `/repos/${owner}/${repo}/languages`,
    );
    return data;
  } catch {
    return {};
  }
}

export async function fetchGitHubData(username: string): Promise<GitHubResult> {
  const [{ data: profile }, { data: rawRepos }] = await Promise.all([
    gh.get<GitHubProfile>(`/users/${username}`),
    gh.get<GitHubRepo[]>(`/users/${username}/repos`, {
      params: { per_page: 100, sort: "updated", type: "owner" },
    }),
  ]);

  const ownRepos = rawRepos.filter((repo) => !repo.fork).slice(0, 20);

  const langMaps = await Promise.all(
    ownRepos.map((repo) => getLanguages(username, repo.name)),
  );

  const repos: RepoResult[] = ownRepos.map((repo, index) => ({
    name: repo.name,
    description: repo.description ?? null,
    topics: repo.topics ?? [],
    languages: langMaps[index],
  }));

  const totals: Record<string, number> = {};

  for (const langMap of langMaps) {
    for (const [lang, bytes] of Object.entries(langMap)) {
      totals[lang] = (totals[lang] ?? 0) + bytes;
    }
  }

  const topLanguages = Object.entries(totals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([lang]) => lang);

  return {
    username: profile.login,
    name: profile.name ?? null,
    bio: profile.bio ?? null,
    publicRepos: profile.public_repos,
    topLanguages,
    repos,
  };
}
