import React from "react";
import PrimaryButton from "./PrimaryButton/PrimaryButton";
import { useRepoStore } from "../../store/repoStore";

interface StarButtonProps {
  id: number;
  owner: string;
  repo: string;
  starred: boolean;
  className?: string;
}

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
      className={className}
    >
      {loadingStar[id] ? (
        <span className="spinner-border spinner-border-sm"></span>
      ) : starred ? (
        "⭐ Unstar"
      ) : (
        "🌟 Star"
      )}
    </PrimaryButton>
  );
};

export default StarButton;
