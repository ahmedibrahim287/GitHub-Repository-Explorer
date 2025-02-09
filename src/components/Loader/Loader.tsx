import React from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ size = 40 }) => {
  return (
    <div
      className={styles.spinner}
      style={{ width: size, height: size, borderWidth: size / 10 }}
    ></div>
  );
};

export default Loader;
