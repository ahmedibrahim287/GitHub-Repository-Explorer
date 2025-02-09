import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  fetchRepositories,
  starRepo,
  unstarRepo,
  fetchStarredRepositories,
} from "../api/githubApi";
import { Repo, RepoState } from "../types";

export const useRepoStore = create<RepoState>()(
  devtools((set, get) => ({
    repositories: [],
    starredRepos: JSON.parse(localStorage.getItem("starredRepos") || "{}"),
    loadingRepos: false,
    loadingStar: {},
    error: null,

    setRepositories: (repos) =>
      set({ repositories: repos }, false, "SET_REPOSITORIES"),
    setLoadingRepos: (loading) =>
      set({ loadingRepos: loading }, false, "SET_LOADING_REPOS"),
    setError: (error) => set({ error }),

    fetchRepositories: async (keyword) => {
      set({ loadingRepos: true }, false, "FETCH_REPOSITORIES_START");

      try {
        const repos = await fetchRepositories(keyword);
        set({ repositories: repos }, false, "FETCH_REPOSITORIES_SUCCESS");
      } catch {
        console.error("Failed to fetch repositories");
      } finally {
        set({ loadingRepos: false }, false, "FETCH_REPOSITORIES_END");
      }
    },

    loadStarredRepos: async () => {
      set({ loadingRepos: true }, false, "LOAD_STARRED_REPOS_START");

      try {
        const starredRepos = await fetchStarredRepositories();
        const starredMap: Record<number, boolean> = {};

        starredRepos.forEach((repo: Repo) => {
          starredMap[repo.id] = true;
        });

        set({ starredRepos: starredMap }, false, "LOAD_STARRED_REPOS_SUCCESS");
        localStorage.setItem("starredRepos", JSON.stringify(starredMap));
      } catch {
        console.error("Failed to load starred repositories");
      } finally {
        set({ loadingRepos: false }, false, "LOAD_STARRED_REPOS_END");
      }
    },

    toggleStar: async (id, owner, repo) => {
      const isStarred = get().starredRepos[id];
      set(
        (state) => ({
          loadingStar: { ...state.loadingStar, [id]: true },
        }),
        false,
        `TOGGLE_STAR_START_${id}`
      );

      try {
        set(
          (state) => {
            const updatedStarredRepos = {
              ...state.starredRepos,
              [id]: !isStarred,
            };
            localStorage.setItem(
              "starredRepos",
              JSON.stringify(updatedStarredRepos)
            );
            return { starredRepos: updatedStarredRepos };
          },
          false,
          `TOGGLE_STAR_UPDATE_${id}`
        );

        if (isStarred) {
          await unstarRepo(owner, repo);
        } else {
          await starRepo(owner, repo);
        }
      } catch {
        console.error(`Failed to ${isStarred ? "unstar" : "star"} repository`);
        set(
          (state) => ({
            starredRepos: { ...state.starredRepos, [id]: isStarred },
          }),
          false,
          `TOGGLE_STAR_ERROR_${id}`
        );
      } finally {
        set(
          (state) => ({
            loadingStar: { ...state.loadingStar, [id]: false },
          }),
          false,
          `TOGGLE_STAR_END_${id}`
        );
      }
    },
  }))
);
