import axios from "axios";

const API_URL = "https://api.github.com/search/repositories?q=";
const TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

export const fetchRepositories = async (keyword: string) => {
  try {
    const response = await axios.get(`${API_URL}${keyword}`, {
      headers: { Authorization: `token ${TOKEN}` },
    });
    return response.data.items.slice(0, 10); // Get only the first 10 results
  } catch (error) {
    console.error("Error fetching repositories", error);
    return [];
  }
};

export const starRepo = async (owner: string, repo: string) => {
  try {
    await axios.put(
      `https://api.github.com/user/starred/${owner}/${repo}`,
      {},
      {
        headers: { Authorization: `token ${TOKEN}` },
      }
    );
  } catch (error) {
    console.error("Error starring repository", error);
  }
};

export const unstarRepo = async (owner: string, repo: string) => {
  try {
    await axios.delete(`https://api.github.com/user/starred/${owner}/${repo}`, {
      headers: { Authorization: `token ${TOKEN}` },
    });
  } catch (error) {
    console.error("Error unstarring repository", error);
  }
};
