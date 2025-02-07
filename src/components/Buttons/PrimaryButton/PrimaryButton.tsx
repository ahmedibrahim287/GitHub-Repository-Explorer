import React from "react";
import styles from "./PrimaryButton.module.css";

interface ButtonProps {
  onClick?: () => void | Promise<void>;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
}

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
