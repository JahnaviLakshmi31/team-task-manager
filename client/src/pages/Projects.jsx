// Projects.jsx

import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Projects() {

  const role = localStorage.getItem("role");

  const [projectName, setProjectName] = useState("");

  const [projects, setProjects] = useState([]);

  const [users, setUsers] = useState([]);

  const [members, setMembers] = useState([]);

  const [selectedProject, setSelectedProject] = useState("");

  const [selectedUser, setSelectedUser] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");


  // FETCH PROJECTS
  const fetchProjects = async () => {

    const res = await API.get("/projects/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setProjects(res.data);
  };


  // FETCH USERS
  const fetchUsers = async () => {

    const res = await API.get("/users/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setUsers(res.data);
  };


  // FETCH MEMBERS
  const fetchMembers = async (projectId) => {

  const res = await API.get(
    `/projectMembers/members/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  setSelectedProject(projectId);

  setMembers(res.data);
};


  useEffect(() => {

    fetchProjects();

    if (role === "Admin") {
      fetchUsers();
    }

  }, []);


  // CREATE PROJECT
  const handleCreateProject = async (e) => {

    e.preventDefault();

    const res = await API.post(
      "/projects/create",
      {
        project_name: projectName
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert(res.data.message);

    setProjectName("");

    fetchProjects();
  };


  // ADD MEMBER
  const handleAddMember = async () => {

    const res = await API.post(
      "/projectMembers/add-member",
      {
        project_id: selectedProject,
        user_id: selectedUser
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert(res.data.message);
    setSelectedProject("");
    setSelectedUser("");
    fetchMembers(selectedProject);
  };


  // REMOVE MEMBER
  const removeMember = async (userId) => {

    try {

      const res = await API.delete(
        "/projectMembers/remove-member",
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            project_id: selectedProject,
            user_id: userId
          }
        }
      );

      alert(res.data.message);

      fetchMembers(selectedProject);

    } catch (err) {

      alert(err.response.data.message);
    }
  };

return (
  <Layout>

    <div className="page-container">

      <h1 className="page-title">Projects</h1>

      {role === "Admin" && (
        <div className="top-card">

          <form
            onSubmit={handleCreateProject}
            className="form-row"
          >

            <input
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="input-field"
            />

            <button className="primary-btn">
              Create Project
            </button>

          </form>

        </div>
      )}

      <div className="top-card">

        <div className="form-row">

          <select
            value={selectedProject}
            onChange={(e) => {
              setSelectedProject(e.target.value);
              fetchMembers(e.target.value);
            }}
            className="select-field"
          >

            <option value="">Select Project</option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.project_name}
              </option>
            ))}

          </select>

          {role === "Admin" && selectedProject && (
            <>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="select-field"
              >

                <option value="">Select User</option>

                {users.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}

              </select>

              <button
                className="primary-btn"
                onClick={handleAddMember}
              >
                Add Member
              </button>
            </>
          )}

        </div>

      </div>

      <div className="project-grid">

        {projects.map((project) => (

          <div
            key={project.id}
            className="project-card"
          >

            <h3>{project.project_name}</h3>

            <button
              className="primary-btn"
              onClick={() => fetchMembers(project.id)}
            >
              View Members
            </button>

            {selectedProject == project.id && (

              <div className="member-box">

                {members.length === 0 ? (

                  <p>No members added</p>

                ) : (

                  members.map((member) => (

                    <div
                      key={member.id}
                      className="member-row"
                    >

                      <span>
                        {member.name}
                      </span>

                      {role === "Admin" && (
                        <button
                          className="remove-btn"
                          onClick={() => removeMember(member.id)}
                        >
                          Remove
                        </button>
                      )}

                    </div>
                  ))
                )}

              </div>
            )}

          </div>
        ))}

      </div>

      <br />

      <button
        className="primary-btn"
        onClick={() => navigate("/tasks")}
      >
        Go To Tasks
      </button>

    </div>

  </Layout>
);
}

export default Projects;