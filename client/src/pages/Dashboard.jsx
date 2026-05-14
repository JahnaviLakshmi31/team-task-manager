import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
function Dashboard() {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchDashboardData();
  }, []);
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>

        <div className="content-wrapper">

            <div className="dashboard-header">

                <div>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Welcome back to your workspace
                    </p>

                </div>

                <button
                    onClick={() =>
                        navigate("/projects")
                    }
                >
                    View Projects
                </button>

            </div>

            <div className="dashboard-cards">

                <div className="dashboard-card">

                    <h3>
                        Total Tasks
                    </h3>

                    <h1>
                        {stats.totalTasks || 0}
                    </h1>

                </div>

                <div className="dashboard-card">

                    <h3>
                        Completed
                    </h3>

                    <h1>
                        {stats.completedTasks || 0}
                    </h1>

                </div>

                <div className="dashboard-card">

                    <h3>
                        Pending
                    </h3>

                    <h1>
                        {stats.pendingTasks || 0}
                    </h1>

                </div>

                <div className="dashboard-card">

                    <h3>
                        Overdue
                    </h3>

                    <h1>
                        {stats.overdueTasks || 0}
                    </h1>

                </div>

            </div>

        </div>

    </Layout>
  );
}
export default Dashboard;
