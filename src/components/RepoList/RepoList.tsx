import React from "react";
import styles from "./RepoList.module.css";
import { useRepoStore } from "../../store/repoStore";
import RepoCard from "../RepoCard/RepoCard";
import Loader from "../Loader/Loader";
import { MdErrorOutline } from "react-icons/md";
import { Repo } from "../../types";

const RepoList: React.FC = () => {
  const { repositories, loadingRepos, error } = useRepoStore();

  if (loadingRepos) {
    return (
      <div className={styles.loaderContainer}>
        <Loader size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorMessage}>
        <MdErrorOutline className={styles.errorIcon} /> {error}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row g-4">
        {repositories.length === 0 ? (
          <p className={styles.noResults}>No repositories found.</p>
        ) : (
          repositories.slice(0, 10).map((repo: Repo) => (
            <div
              className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
              key={repo.id}
            >
              <RepoCard
                key={repo.id}
                avatar_url={repo.owner.avatar_url}
                id={repo.id}
                name={repo.name || "Unknown Repo"}
                owner={repo.owner?.login || "Unknown Owner"}
                description={repo.description || "No description available"}
                stars={repo.stargazers_count ?? 0}
                forks={repo.forks_count ?? 0}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RepoList;
