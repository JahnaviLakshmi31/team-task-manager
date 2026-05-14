import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
function Projects() {
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/projects/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await API.post(
        "/projects/create",
        {
          project_name: projectName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert(response.data.message);
      setProjectName("");
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1>Projects</h1>
      <form onSubmit={handleCreateProject}>
        <input
          type="text"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button>Create Project</button>
      </form>
      <hr />
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          <h3>{project.project_name}</h3>
        </div>
      ))}
      <button onClick={() => navigate("/tasks")}>Go To Tasks</button>
    </Layout>
  );
}
export default Projects;
