import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
function Dashboard() {
  const [stats, setStats] = useState(null);
  const role = localStorage.getItem("role");
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token");

    const res = await API.get("/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setStats(res.data);
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="dashboard-grid">
        <div className="card">
          <h3>Total Tasks</h3>
          <h1>{stats.totalTasks}</h1>
        </div>

        {(role === "Admin" || stats.overdueTasks > 0) && (
          <div className="card">
            <h3>Overdue Tasks</h3>

            <h1>{stats.overdueTasks}</h1>
          </div>
        )}

        <div className="card">
          <h3>Status Breakdown</h3>
          {stats.statusBreakdown.map((s, i) => (
            <p key={i}>
              {s.status}: {s.count}
            </p>
          ))}
        </div>

        {role === "Admin" && (
          <div className="card">
            <h3>User Task Stats</h3>

            {stats.userStats.map((u, i) => (
              <p key={i}>
                {u.name}: {u.task_count}
              </p>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
export default Dashboard;
