import { useEffect, useState } from "react";
import API from "../services/api";

function Tasks() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/tasks/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await API.post(
        "/tasks/create",
        {
          title,
          description,
          status: "Todo",
          priority: "High",
          due_date: "2026-05-20",
          project_id: 1,
          assigned_to: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert(response.data.message);
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };
  const updateTaskStatus = async (taskId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.put(
        `/tasks/update/${taskId}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert(response.data.message);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div>
        <h1>Tasks</h1>
        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <br />
          <button>Create Task</button>
        </form>
        <hr />
        {tasks.map((task) => (
          <div key={task.id} className="project-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => updateTaskStatus(task.id, "Done")}>
              Mark Done
            </button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
