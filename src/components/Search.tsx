import React, { useState } from "react";
import { fetchRepositories } from "../api";
import { useRepoStore } from "../store";

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const setRepositories = useRepoStore((state) => state.setRepositories);

  const handleSearch = async () => {
    if (keyword.trim() === "") return;
    const repos = await fetchRepositories(keyword);
    setRepositories(repos);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search GitHub Repositories..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
