import { create } from "zustand";
import {
  fetchRepositories,
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
  loadingRepos: boolean;
  loadingStar: Record<number, boolean>;
  setRepositories: (repos: Repo[]) => void;
  setLoadingRepos: (loading: boolean) => void;
  fetchRepositories: (keyword: string) => Promise<void>;
  toggleStar: (id: number, owner: string, repo: string) => Promise<void>;
  loadStarredRepos: () => Promise<void>;
}

export const useRepoStore = create<RepoState>((set, get) => ({
  repositories: [],
  starredRepos: JSON.parse(localStorage.getItem("starredRepos") || "{}"),
  loadingRepos: false,
  loadingStar: {},

  setRepositories: (repos) => set({ repositories: repos }),
  setLoadingRepos: (loading) => set({ loadingRepos: loading }),

  fetchRepositories: async (keyword) => {
    set({ loadingRepos: true });

    try {
      const repos = await fetchRepositories(keyword);
      set({ repositories: repos });
    } catch {
      console.error("Failed to fetch repositories"); // ✅ Logs error if fetch fails
    } finally {
      set({ loadingRepos: false });
    }
  },

  loadStarredRepos: async () => {
    set({ loadingRepos: true });

    try {
      const starredRepos = await fetchStarredRepositories();
      const starredMap: Record<number, boolean> = {};

      starredRepos.forEach((repo: Repo) => {
        starredMap[repo.id] = true;
      });

      set({ starredRepos: starredMap });
      localStorage.setItem("starredRepos", JSON.stringify(starredMap));
    } catch {
      console.error("Failed to load starred repositories"); // ✅ Logs error if fetch fails
    } finally {
      set({ loadingRepos: false });
    }
  },

  toggleStar: async (id, owner, repo) => {
    const isStarred = get().starredRepos[id];
    set((state) => ({
      loadingStar: { ...state.loadingStar, [id]: true },
    }));

    try {
      // Optimistically update UI
      set((state) => {
        const updatedStarredRepos = {
          ...state.starredRepos,
          [id]: !isStarred,
        };
        localStorage.setItem(
          "starredRepos",
          JSON.stringify(updatedStarredRepos)
        );
        return { starredRepos: updatedStarredRepos };
      });

      if (isStarred) {
        await unstarRepo(owner, repo);
      } else {
        await starRepo(owner, repo);
      }
    } catch {
      console.error(`Failed to ${isStarred ? "unstar" : "star"} repository`); // ✅ Logs error
      set((state) => ({
        starredRepos: { ...state.starredRepos, [id]: isStarred }, // Revert UI if error
      }));
    } finally {
      set((state) => ({
        loadingStar: { ...state.loadingStar, [id]: false },
      }));
    }
  },
}));
