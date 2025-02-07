import React from "react";
import { useRepoStore } from "../store/repoStore";

const RepoList: React.FC = () => {
  const { repositories, starredRepos, toggleStar, loading, error } =
    useRepoStore();

  return (
    <div className="container mt-4">
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        {repositories.map((repo) => (
          <div key={repo.id} className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{repo.name}</h5>
                <p className="card-text text-muted">
                  Owner: {repo.owner.login}
                </p>
                <p className="small">{repo.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-warning me-2">
                    ⭐ {repo.stargazers_count}
                  </span>
                  <span className="badge bg-secondary">
                    🍴 {repo.forks_count}
                  </span>
                  <button
                    className={`btn ${
                      starredRepos[repo.id] ? "btn-danger" : "btn-success"
                    }`}
                    onClick={() =>
                      toggleStar(repo.id, repo.owner.login, repo.name)
                    }
                  >
                    {starredRepos[repo.id] ? "Unstar" : "Star"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
