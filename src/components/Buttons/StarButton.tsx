import React from "react";
import styles from "./StarButton.module.css";
import { useRepoStore } from "../../store/repoStore";

interface StarButtonProps {
  id: number;
  owner: string;
  repo: string;
  starred: boolean;
}

const StarButton: React.FC<StarButtonProps> = ({
  id,
  owner,
  repo,
  starred,
}) => {
  const { toggleStar, loadingStar } = useRepoStore(); // ✅ Use loadingStar instead of loading

  return (
    <button
      className={`btn ${starred ? "btn-danger" : "btn-success"} ${
        styles.starButton
      }`}
      onClick={() => toggleStar(id, owner, repo)}
      disabled={loadingStar[id]} // ✅ Use loadingStar[id] instead of loading
    >
      {loadingStar[id] ? (
        <span className="spinner-border spinner-border-sm"></span>
      ) : starred ? (
        "Unstar"
      ) : (
        "Star"
      )}
    </button>
  );
};

export default StarButton;
