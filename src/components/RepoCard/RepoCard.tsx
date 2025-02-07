import React from "react";
import styles from "./RepoCard.module.css";
import { useRepoStore } from "../../store/repoStore";
import StarButton from "../Buttons/StarButton";

interface RepoProps {
  id: number;
  name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
}

const RepoCard: React.FC<RepoProps> = ({
  id,
  name,
  owner,
  description,
  stars,
  forks,
}) => {
  const { starredRepos } = useRepoStore();

  return (
    <div className={`card ${styles.repoCard} shadow-sm`}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="text-muted">{owner}</p>
        <p className="small">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-warning">⭐ {stars}</span>
          <span className="badge bg-secondary">🍴 {forks}</span>
          <StarButton
            id={id}
            owner={owner}
            repo={name}
            starred={starredRepos[id]}
          />
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
