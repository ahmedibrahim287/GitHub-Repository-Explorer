import React from "react";
import Search from "./components/Search";
import RepoList from "./components/RepoList";

const App: React.FC = () => {
  return (
    <div>
      <h1>GitHub Repository Explorer</h1>
      <Search />
      <RepoList />
    </div>
  );
};

export default App;
