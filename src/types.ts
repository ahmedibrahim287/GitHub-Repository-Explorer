export interface Repo {
  id: number;
  name: string;
  owner: { login: string };
  description?: string;
  stargazers_count: number;
  forks_count: number;
}
