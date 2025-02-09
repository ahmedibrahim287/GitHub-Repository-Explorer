import React from "react";
import styles from "./PrimaryButton.module.css";
import { ButtonProps } from "../../../types";

const PrimaryButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  className,
  disabled,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
