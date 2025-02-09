import React from "react";
import styles from "./RepoCard.module.css";
import { useRepoStore } from "../../store/repoStore";
import StarButton from "../Buttons/StarButton";
import { FaStar, FaCodeBranch, FaUser, FaRegStar } from "react-icons/fa";
import Loader from "../Loader/Loader";
import { RepoCardProps } from "../../types";

const RepoCard: React.FC<RepoCardProps> = ({
  id,
  name,
  owner,
  description,
  stars,
  forks,
}) => {
  const { starredRepos, loadingStar } = useRepoStore();

  return (
    <div className={`${styles.card}  `}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h5 className={styles.title}>
            {name.length > 10 ? `${name.substring(0, 10)}...` : name}
          </h5>
          <p className={styles.owner}>
            <FaUser className={styles.ownerIcon} />
            {owner.length > 7 ? `${name.substring(0, 7)}...` : owner}
          </p>
        </div>

        <p className={styles.description} title={description}>
          {description.length > 50
            ? `${description.substring(0, 50)}...`
            : description}
        </p>

        <div className={styles.stats}>
          <span className={styles.badge}>
            {loadingStar[id] ? (
              <Loader size={16} />
            ) : starredRepos[id] ? (
              <>
                <FaStar className={styles.goldStar} />
              </>
            ) : (
              <>
                <FaRegStar className={styles.defaultStar} />
              </>
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
