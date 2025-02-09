import React from "react";
import styles from "./RepoCard.module.css";
import { useRepoStore } from "../../store/repoStore";
import StarButton from "../Buttons/StarButton";
import { FaStar, FaCodeBranch, FaRegStar } from "react-icons/fa";
import Loader from "../Loader/Loader";
import { RepoCardProps } from "../../types";

/**
 * Utility function to truncate text with ellipsis if it exceeds a given length
 */
const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const RepoCard: React.FC<RepoCardProps> = ({
  id,
  name,
  owner,
  description,
  stars,
  forks,
  avatar_url, // Add this field to RepoCardProps
}) => {
  const { starredRepos, loadingStar } = useRepoStore();

  return (
    <div className={`${styles.card}`}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h5 className={styles.title}>{truncateText(name, 10)}</h5>
          <p className={styles.owner}>
            <img
              src={avatar_url}
              alt={`${owner}'s avatar`}
              className={styles.ownerAvatar} // New class for styling the avatar
            />
            {truncateText(owner, 7)}
          </p>
        </div>

        <p className={styles.description} title={description}>
          {truncateText(description, 50)}
        </p>

        <div className={styles.stats}>
          <span className={styles.badge}>
            {loadingStar[id] ? (
              <Loader size={16} />
            ) : starredRepos[id] ? (
              <FaStar className={styles.goldStar} />
            ) : (
              <FaRegStar className={styles.defaultStar} />
            )}
            {stars}
          </span>
          <span className={styles.badge}>
            <FaCodeBranch className={styles.forkIcon} /> {forks}
          </span>
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
