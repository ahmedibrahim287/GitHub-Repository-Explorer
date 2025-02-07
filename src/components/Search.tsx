import React, { useState } from "react";
import { fetchRepositories } from "../api/githubApi";
import { useRepoStore } from "../store/repoStore";

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const setRepositories = useRepoStore((state) => state.setRepositories);

  const handleSearch = async () => {
    if (keyword.trim() === "") return;
    const repos = await fetchRepositories(keyword);
    setRepositories(repos);
  };

  return (
    <div className="container mt-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search GitHub Repositories..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
