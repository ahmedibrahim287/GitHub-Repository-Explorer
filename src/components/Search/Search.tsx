import React, { useState } from "react";
import styles from "./Search.module.css";
import { useRepoStore } from "../../store/repoStore";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import { FaSearch } from "react-icons/fa";

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const { setRepositories, setLoadingRepos, loadingRepos, setError } =
    useRepoStore();

  const handleSearch = async () => {
    if (keyword.trim() === "") {
      setRepositories([]);
      setError(null);
      return;
    }

    setLoadingRepos(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${keyword}`
      );
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("API rate limit exceeded. Please try again later.");
        } else if (response.status === 404) {
          throw new Error(
            "Repository not found. Please check the repository name."
          );
        } else {
          throw new Error("An unexpected error occurred. Please try again.");
        }
      }

      const data = await response.json();
      setRepositories(data.items || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoadingRepos(false);
    }
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
      setError(null);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          disabled={loadingRepos}
        />
        <FaSearch className={styles.searchIcon} />
      </div>

      {/* Show search button on mobile */}
      <PrimaryButton
        onClick={handleSearch}
        disabled={loadingRepos}
        className={styles.searchButtonMobile}
      >
        {loadingRepos ? (
          <span className="spinner-border spinner-border-sm"></span>
        ) : (
          "Search"
        )}
      </PrimaryButton>
    </div>
  );
};

export default Search;
