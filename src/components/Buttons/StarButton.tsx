import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import PrimaryButton from "./PrimaryButton/PrimaryButton";
import { useRepoStore } from "../../store/repoStore";
import Loader from "../Loader/Loader";
import styles from "./StarButton.module.css";
import { StarButtonProps } from "../../types";

const StarButton: React.FC<StarButtonProps> = ({
  id,
  owner,
  repo,
  starred,
  className,
}) => {
  const { toggleStar, loadingStar } = useRepoStore();

  return (
    <PrimaryButton
      onClick={() => toggleStar(id, owner, repo)}
      variant={starred ? "secondary" : "primary"}
      className={`${styles.starButton} ${className}`}
    >
      {loadingStar[id] ? (
        <Loader size={16} />
      ) : (
        <>
          {starred ? (
            <>
              <FaStar className={styles.goldStar} /> Unstar
            </>
          ) : (
            <>
              <FaRegStar className={styles.defaultStar} /> Star
            </>
          )}
        </>
      )}
    </PrimaryButton>
  );
};

export default StarButton;
