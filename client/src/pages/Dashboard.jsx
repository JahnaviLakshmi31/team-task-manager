import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Dashboard() {

  const [stats, setStats] = useState(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) return <h2>Loading...</h2>;

  return (
    <Layout>

      <div className="dashboard-container">

        <h1 className="dashboard-title">
          Dashboard
        </h1>

        <div className="dashboard-grid">

          {/* TOTAL TASKS */}
          <div className="dashboard-card">

            <h3>Total Tasks</h3>

            <div className="dashboard-number">
              {stats.totalTasks}
            </div>

          </div>

          {/* OVERDUE */}
          {(role === "Admin" || stats.overdueTasks > 0) && (
            <div className="dashboard-card">

              <h3>Overdue Tasks</h3>

              <div className="dashboard-number">
                {stats.overdueTasks}
              </div>

            </div>
          )}

          {/* STATUS */}
          <div className="dashboard-card">

            <h3>Status Breakdown</h3>

            {stats.statusBreakdown.map((s, i) => (
              <div className="status-item" key={i}>
                {s.status} : {s.count}
              </div>
            ))}

          </div>

          {/* USER STATS */}
          {role === "Admin" && (
            <div className="dashboard-card">

              <h3>User Task Stats</h3>

              {stats.userStats.map((u, i) => (
                <div className="user-item" key={i}>
                  {u.name} : {u.task_count}
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;