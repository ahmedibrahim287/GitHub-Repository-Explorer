import { create } from "zustand";
import {
  starRepo,
  unstarRepo,
  fetchStarredRepositories,
} from "../api/githubApi";

interface Repo {
  id: number;
  name: string;
  owner: { login: string };
  description: string;
  stargazers_count: number;
  forks_count: number;
}

interface RepoState {
  repositories: Repo[];
  starredRepos: Record<number, boolean>;
  loading: boolean;
  error: string | null;
  setRepositories: (repos: Repo[]) => void;
  toggleStar: (id: number, owner: string, repo: string) => void;
  loadStarredRepos: () => Promise<void>;
}

export const useRepoStore = create<RepoState>((set, get) => ({
  repositories: [],
  starredRepos: JSON.parse(localStorage.getItem("starredRepos") || "{}"),
  loading: false,
  error: null,

  setRepositories: (repos) => set({ repositories: repos }),

  toggleStar: async (id, owner, repo) => {
    const isStarred = get().starredRepos[id];
    set({ loading: true, error: null });

    try {
      if (isStarred) {
        await unstarRepo(owner, repo);
      } else {
        await starRepo(owner, repo);
      }

      set((state) => {
        const updatedStarredRepos = {
          ...state.starredRepos,
          [id]: !isStarred,
        };
        localStorage.setItem(
          "starredRepos",
          JSON.stringify(updatedStarredRepos)
        );
        return { starredRepos: updatedStarredRepos, loading: false };
      });

      console.log(`${isStarred ? "Unstarred" : "Starred"}: ${owner}/${repo}`);
    } catch (error) {
      set({ error: "Failed to update repository star status", loading: false });
      console.error(
        `Error ${isStarred ? "unstarring" : "starring"} repo`,
        error
      );
    }
  },

  loadStarredRepos: async () => {
    set({ loading: true, error: null });

    try {
      const starredRepos = await fetchStarredRepositories();
      const starredMap: Record<number, boolean> = {};

      starredRepos.forEach((repo: Repo) => {
        starredMap[repo.id] = true;
      });

      set({ starredRepos: starredMap, loading: false });
      localStorage.setItem("starredRepos", JSON.stringify(starredMap));
      console.log("Loaded starred repositories:", starredMap);
    } catch (error) {
      set({ error: "Failed to load starred repositories", loading: false });
      console.error("Failed to load starred repositories", error);
    }
  },
}));
