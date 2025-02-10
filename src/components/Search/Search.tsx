import React, { useState } from "react";
import styles from "./Search.module.css";
import { useRepoStore } from "../../store/repoStore";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import { FaSearch } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import Loader from "../Loader/Loader";
import { fetchRepositories } from "../../api/githubApi";

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [lastSearched, setLastSearched] = useState("");
  const [duplicateSearch, setDuplicateSearch] = useState(false);
  const {
    setRepositories,
    setLoadingRepos,
    loadingRepos,
    setError,
    repositories,
  } = useRepoStore();

  const handleSearch = async () => {
    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword === "") {
      setRepositories([]);
      setError(null);
      return;
    }

    if (trimmedKeyword.length < 2) {
      setError("Please enter at least 2 characters.");
      return;
    }

    if (trimmedKeyword === lastSearched) {
      setDuplicateSearch(true);
      return;
    }

    setLoadingRepos(true);
    setError(null);
    setLastSearched(trimmedKeyword);
    setDuplicateSearch(false);

    try {
      const repositories = await fetchRepositories(trimmedKeyword);
      setRepositories(repositories);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch repositories."
      );
      console.error("Error fetching repositories:", error);
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
      setDuplicateSearch(false);
    }
  };

  return (
    <>
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

        <PrimaryButton
          onClick={handleSearch}
          disabled={loadingRepos}
          className={styles.searchButtonMobile}
        >
          {loadingRepos ? <Loader size={16} /> : "Search"}
        </PrimaryButton>
      </div>
      {duplicateSearch && repositories.length > 0 && (
        <div className={styles.duplicateWarning}>
          <MdWarning className={styles.warningIcon} />
          Already searched "<strong>{lastSearched}</strong>" Try another!
        </div>
      )}
    </>
  );
};

export default Search;
