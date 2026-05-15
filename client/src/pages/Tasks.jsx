import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Tasks() {
  const role = localStorage.getItem("role");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [dueDate, setDueDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);

  const token = localStorage.getItem("token");

  // FETCH TASKS
  const fetchTasks = async () => {
    const res = await API.get("/tasks/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  // FETCH PROJECTS
  const fetchProjects = async () => {
    const res = await API.get("/projects/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects(res.data);
  };

  // FETCH MEMBERS OF PROJECT
  const fetchMembers = async (projectId) => {
    const res = await API.get(`/projectMembers/members/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMembers(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  // CREATE TASK
  const handleCreateTask = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];

    if (dueDate < today) {
      alert("Due date cannot be in the past");
      return;
    }
    await API.post(
      "/tasks/create",
      {
        title,
        description,
        priority,
        due_date: dueDate,
        project_id: projectId,
        assigned_to: assignedTo,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    setTitle("");
    setDescription("");
    setPriority("High");
    setDueDate("");
    setAssignedTo("");
    setProjectId("");
    setMembers([]);

    fetchTasks();
  };

  // UPDATE STATUS
  const updateTaskStatus = async (id, status) => {
    await API.put(
      `/tasks/update/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    fetchTasks();
  };

  return (
    <Layout>
      <div className="page-content">
        <h2>Tasks</h2>

        {/* CREATE TASK (ADMIN ONLY) */}
        {role === "Admin" && (
          <div className="card">
            <form onSubmit={handleCreateTask}>
              <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <select
                value={projectId}
                onChange={(e) => {
                  setProjectId(e.target.value);
                  fetchMembers(e.target.value);
                }}
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.project_name}
                  </option>
                ))}
              </select>

              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="">Assign User</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>

              <button>Create Task</button>
            </form>
          </div>
        )}

        {/* TASK LIST */}
        <div>
          {tasks.map((task) => (
            <div className="card" key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <p>Priority: {task.priority}</p>
              <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>

              {/* STATUS CONTROL */}
              <select
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              {role === "Admin" && <p>Assigned To: {task.assigned_user}</p>}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Tasks;
