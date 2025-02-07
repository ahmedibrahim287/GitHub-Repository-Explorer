import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});

export default axiosInstance;
