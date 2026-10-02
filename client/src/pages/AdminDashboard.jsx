import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

function AdminDashboard() {
  const [overview, setOverview] =
    useState(null);

  const [popular, setPopular] =
    useState([]);

  const [recent, setRecent] =
    useState([]);

  const token =
    localStorage.getItem("token");

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!user || user.role !== "admin") {
      window.location.href = "/";
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    Promise.all([
      fetch(
        `${API_URL}/api/analytics/overview`,
        { headers }
      ).then((res) => res.json()),

      fetch(
        `${API_URL}/api/analytics/popular-searches`,
        { headers }
      ).then((res) => res.json()),

      fetch(
        `${API_URL}/api/analytics/recent-searches`,
        { headers }
      ).then((res) => res.json()),
    ]).then(
      ([
        overviewData,
        popularData,
        recentData,
      ]) => {
        setOverview(overviewData);
        setPopular(popularData);
        setRecent(recentData);
      }
    );
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Indexora Admin</h1>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      {overview && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Documents</h3>
            <p>
              {overview.totalDocuments}
            </p>
          </div>

          <div className="stat-card">
            <h3>Users</h3>
            <p>
              {overview.totalUsers}
            </p>
          </div>

          <div className="stat-card">
            <h3>Searches</h3>
            <p>
              {overview.totalSearches}
            </p>
          </div>

          <div className="stat-card">
            <h3>Avg Search Time</h3>
            <p>
              {overview.averageSearchTime} ms
            </p>
          </div>
        </div>
      )}

      <section className="admin-section">
        <h2>Popular Searches</h2>

        <table>
          <thead>
            <tr>
              <th>Query</th>
              <th>Searches</th>
            </tr>
          </thead>

          <tbody>
            {popular.map((item, index) => (
              <tr key={index}>
                <td>{item._id}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="admin-section">
        <h2>Recent Searches</h2>

        <table>
          <thead>
            <tr>
              <th>Query</th>
              <th>User</th>
              <th>Results</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {recent.map((item) => (
              <tr key={item._id}>
                <td>{item.query}</td>

                <td>
                  {item.user
                    ? item.user.email
                    : "Guest"}
                </td>

                <td>
                  {item.resultCount}
                </td>

                <td>
                  {item.executionTime} ms
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminDashboard;