import { create } from "zustand";

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
  setRepositories: (repos: Repo[]) => void;
  toggleStar: (id: number) => void;
}

export const useRepoStore = create<RepoState>((set) => ({
  repositories: [],
  starredRepos: {},
  setRepositories: (repos) => set({ repositories: repos }),
  toggleStar: (id) =>
    set((state) => ({
      starredRepos: {
        ...state.starredRepos,
        [id]: !state.starredRepos[id],
      },
    })),
}));
