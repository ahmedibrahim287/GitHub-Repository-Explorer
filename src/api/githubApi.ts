import { Repo } from "../types";
import axiosInstance from "./axiosInstance";

// Fetch GitHub repositories by keyword
export const fetchRepositories = async (keyword: string) => {
  try {
    const response = await axiosInstance.get(
      `/search/repositories?q=${keyword}`
    );

    // Ensure we only keep repositories that have the required properties
    const filteredRepos = response.data.items
      ?.filter(
        (repo: Repo) =>
          repo.owner && repo.name && repo.stargazers_count !== undefined
      )
      .slice(0, 10);

    return filteredRepos || [];
  } catch (error) {
    console.error("Error fetching repositories", error);
    return [];
  }
};

// Fetch starred repositories (with caching)
export const fetchStarredRepositories = async () => {
  const cachedStarredRepos = localStorage.getItem("starredRepos");

  if (cachedStarredRepos) {
    return JSON.parse(cachedStarredRepos);
  }

  try {
    const response = await axiosInstance.get("/user/starred");
    localStorage.setItem("starredRepos", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Error fetching starred repositories", error);
    return [];
  }
};

// Star a repository
export const starRepo = async (owner: string, repo: string) => {
  try {
    await axiosInstance.put(`/user/starred/${owner}/${repo}`, {});
    console.log(`Starred: ${owner}/${repo}`);
  } catch (error) {
    console.error("Error starring repository", error);
  }
};

// Unstar a repository
export const unstarRepo = async (owner: string, repo: string) => {
  try {
    await axiosInstance.delete(`/user/starred/${owner}/${repo}`);
    console.log(`Unstarred: ${owner}/${repo}`);
  } catch (error) {
    console.error("Error unstarring repository", error);
  }
};
