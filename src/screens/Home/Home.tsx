import React, { useEffect } from "react";
import Search from "../../components/Search/Search";
import RepoList from "../../components/RepoList/RepoList"; // ✅ Updated import
import { useRepoStore } from "../../store/repoStore";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const loadStarredRepos = useRepoStore((state) => state.loadStarredRepos);
  const starredRepos = useRepoStore((state) => state.starredRepos);

  useEffect(() => {
    if (Object.keys(starredRepos).length === 0) {
      loadStarredRepos();
    }
  }, [loadStarredRepos, starredRepos]);

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.pageTitle}>🚀 GitHub Repository Explorer</h1>
      <Search />
      <RepoList />
    </div>
  );
};

export default Home;
