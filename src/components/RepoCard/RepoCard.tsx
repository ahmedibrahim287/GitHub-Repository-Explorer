import React from "react";
import styles from "./RepoCard.module.css";
import { useRepoStore } from "../../store/repoStore";
import StarButton from "../Buttons/StarButton";

interface RepoCardProps {
  id: number;
  name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
}

const RepoCard: React.FC<RepoCardProps> = ({
  id,
  name,
  owner,
  description,
  stars,
  forks,
}) => {
  const { starredRepos } = useRepoStore();

  return (
    <div className={`${styles.card} fade-in`}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h5 className={styles.title}>{name}</h5>
          <p className={styles.owner}>👤 {owner}</p>
        </div>

        <p className={styles.description}>
          {description || "No description available"}
        </p>

        <div className={styles.stats}>
          <span className={styles.badge}>⭐ {stars}</span>
          <span className={styles.badge}>🍴 {forks}</span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <StarButton
          id={id}
          owner={owner}
          repo={name}
          starred={!!starredRepos[id]}
          className={styles.starButton}
        />
      </div>
    </div>
  );
};

export default RepoCard;
