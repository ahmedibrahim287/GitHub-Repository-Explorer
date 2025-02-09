export interface Repo {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  stargazers_count: number;
  forks_count: number;
}

export interface RepoState {
  repositories: Repo[];
  starredRepos: Record<number, boolean>;
  loadingRepos: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  loadingStar: Record<number, boolean>;
  setRepositories: (repos: Repo[]) => void;
  setLoadingRepos: (loading: boolean) => void;
  fetchRepositories: (keyword: string) => Promise<void>;
  toggleStar: (id: number, owner: string, repo: string) => Promise<void>;
  loadStarredRepos: () => Promise<void>;
}

export interface StarButtonProps {
  id: number;
  owner: string;
  repo: string;
  starred: boolean;
  className?: string;
}

export interface ButtonProps {
  onClick?: () => void | Promise<void>;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
}

export interface LoaderProps {
  size?: number;
}

export interface RepoCardProps {
  id: number;
  name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
  avatar_url: string; // Add this field
}
