import React, { useEffect } from "react";
import Search from "./components/Search";
import RepoList from "./components/RepoList";
import { useRepoStore } from "./store/repoStore";
import "./styles/styles.css"; // Custom Styles

const App: React.FC = () => {
  const loadStarredRepos = useRepoStore((state) => state.loadStarredRepos);
  const starredRepos = useRepoStore((state) => state.starredRepos);

  useEffect(() => {
    // Fetch from API only if local storage is empty
    if (Object.keys(starredRepos).length === 0) {
      loadStarredRepos();
    }
  }, [loadStarredRepos, starredRepos]);

  return (
    <div className="container">
      <h1 className="text-center my-4">🚀 GitHub Repository Explorer</h1>
      <Search />
      <RepoList />
    </div>
  );
};

export default App;
