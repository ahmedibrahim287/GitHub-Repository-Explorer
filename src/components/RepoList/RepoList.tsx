import React from "react";
import { useRepoStore } from "../../store/repoStore";
import Loader from "../Loader/Loader";
import RepoCard from "../RepoCard/RepoCard";
import styles from "./RepoList.module.css";

const RepoList: React.FC = () => {
  const { repositories, loadingRepos } = useRepoStore(); // ✅ Removed `error`

  return (
    <div className="container mt-4">
      {loadingRepos && <Loader />} {/* ✅ Show Loader while searching */}
      {repositories.length === 0 && !loadingRepos && (
        <div className="alert alert-warning text-center" role="alert">
          No repositories found. Try searching for something else.
        </div>
      )}
      <div className="row">
        {repositories.map((repo) => (
          <div key={repo.id} className={`col-md-6 mb-3 ${styles.repoItem}`}>
            <RepoCard
              id={repo.id}
              name={repo.name}
              owner={repo.owner.login}
              description={repo.description}
              stars={repo.stargazers_count}
              forks={repo.forks_count}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
