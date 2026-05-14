import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

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
    <div className="container">
      <h3>Total Tasks: {stats.totalTasks}</h3>
      <h3>Completed Tasks: {stats.completedTasks}</h3>
      <h3>Pending Tasks: {stats.pendingTasks}</h3>
      <h3>Overdue Tasks: {stats.overdueTasks}</h3>
      <button onClick={() => navigate("/projects")}>Go To Projects</button>
    </div>
  );
}
export default Dashboard;
