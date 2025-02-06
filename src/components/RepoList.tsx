import React from "react";
import { useRepoStore } from "../store";
import { starRepo, unstarRepo } from "../api";

const RepoList: React.FC = () => {
  const { repositories, starredRepos, toggleStar } = useRepoStore();

  return (
    <ul>
      {repositories.map((repo) => (
        <li key={repo.id}>
          <h3>{repo.name}</h3>
          <p>Owner: {repo.owner.login}</p>
          <p>{repo.description}</p>
          <p>
            ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
          </p>
          <button
            onClick={() => {
              toggleStar(repo.id);
              starredRepos[repo.id]
                ? unstarRepo(repo.owner.login, repo.name)
                : starRepo(repo.owner.login, repo.name);
            }}
          >
            {starredRepos[repo.id] ? "Unstar" : "Star"}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
