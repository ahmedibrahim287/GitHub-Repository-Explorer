import React from "react";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
