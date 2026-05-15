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

      <h1>Projects</h1>

      {/* CREATE PROJECT */}
      {role === "Admin" && (
        <form onSubmit={handleCreateProject}>

          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <button>Create Project</button>

        </form>
      )}


      <hr />


      {/* SELECT PROJECT */}
      <select
        value={selectedProject}
        onChange={(e) => {

          setSelectedProject(e.target.value);

          fetchMembers(e.target.value);
        }}
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


      {/* ADD MEMBER */}
      {role === "Admin" && selectedProject && (

        <div>

          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
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

          <button onClick={handleAddMember}>
            Add Member
          </button>

        </div>
      )}


<hr />

<h2>Projects With Members</h2>

{projects.map((project) => (

  <div
    key={project.id}
    className="project-card"
    style={{
      border: "1px solid gray",
      padding: "15px",
      marginBottom: "20px"
    }}
  >

    <h3>{project.project_name}</h3>

    <button
      onClick={() => fetchMembers(project.id)}
    >
      View Members
    </button>

    {/* SHOW MEMBERS OF CURRENT PROJECT */}
    {selectedProject == project.id && (

      <div style={{ marginTop: "10px" }}>

        {members.length === 0 ? (

          <p>No members added</p>

        ) : (

          members.map((member) => (

            <div
              key={member.id}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "10px"
              }}
            >

              <span>
                {member.name} ({member.email})
              </span>

              {role === "Admin" && (

                <button
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


      {/* ALL PROJECTS */}
      <div>

        {projects.map((project) => (

          <div
            key={project.id}
            className="project-card"
          >

            <h3>{project.project_name}</h3>

          </div>
        ))}

      </div>


      <button onClick={() => navigate("/tasks")}>
        Go To Tasks
      </button>

    </Layout>
  );
}

export default Projects;