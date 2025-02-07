import React from "react";
import styles from "./RepoList.module.css";
import { useRepoStore } from "../../store/repoStore";
import RepoCard from "../RepoCard/RepoCard";
import Loader from "../Loader/Loader";

const RepoList: React.FC = () => {
  const { repositories, loadingRepos, error } = useRepoStore();

  if (loadingRepos) {
    return <Loader />;
  }

  if (error) {
    return <p className={styles.errorMessage}>⚠️ {error}</p>;
  }

  return (
    <div className={styles.list}>
      {repositories.length === 0 ? (
        <p className={styles.noResults}>No repositories found.</p>
      ) : (
        repositories
          .slice(0, 10)
          .map((repo) => (
            <RepoCard
              key={repo.id}
              id={repo.id}
              name={repo.name}
              owner={repo.owner.login}
              description={repo.description}
              stars={repo.stargazers_count}
              forks={repo.forks_count}
            />
          ))
      )}
    </div>
  );
};

export default RepoList;
