import React, { useState } from "react";
import { useRepoStore } from "../../store/repoStore";
import styles from "./Search.module.css";

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const { setRepositories, setLoadingRepos, loadingRepos } = useRepoStore(); // ✅ Now setRepositories exists

  const handleSearch = async () => {
    if (keyword.trim() === "") {
      setRepositories([]);
      return;
    }

    setLoadingRepos(true);
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${keyword}`
    );
    const data = await response.json();
    setRepositories(data.items || []);
    setLoadingRepos(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);

    if (value.trim() === "") {
      setRepositories([]);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search GitHub Repositories..."
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          disabled={loadingRepos}
        />
        <button
          className="btn btn-primary"
          onClick={handleSearch}
          disabled={loadingRepos}
        >
          {loadingRepos ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            "Search"
          )}
        </button>
      </div>
    </div>
  );
};

export default Search;
