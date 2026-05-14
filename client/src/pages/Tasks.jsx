import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Tasks() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Todo");
    const [priority, setPriority] = useState("High");
    const [dueDate, setDueDate] = useState("");

    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await API.get(
                    "/tasks/all",
                    {
                        headers: {
                            Authorization:
                            `Bearer ${token}`,
                        },
                    }
                );

            setTasks(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchTasks();

    }, []);

    const handleCreateTask = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await API.post(
                    "/tasks/create",
                    {
                        title,
                        description,
                        status,
                        priority,
                        due_date: dueDate,
                        project_id: 1,
                        assigned_to: 1,
                    },
                    {
                        headers: {
                            Authorization:
                            `Bearer ${token}`,
                        },
                    }
                );

            alert(response.data.message);

            setTitle("");
            setDescription("");
            setStatus("Todo");
            setPriority("High");
            setDueDate("");

            fetchTasks();

        }
        catch (error) {

            console.log(error);

        }

    };

    const updateTaskStatus =
    async (taskId, status) => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await API.put(
                    `/tasks/update/${taskId}`,
                    {
                        status,
                    },
                    {
                        headers: {
                            Authorization:
                            `Bearer ${token}`,
                        },
                    }
                );

            alert(response.data.message);

            fetchTasks();

        }
        catch (error) {

            console.log(error);

        }

    };

    return (

        <Layout>

            <div className="content-wrapper">

                <h1>
                    Tasks
                </h1>

                <div className="card">

                    <form
                        onSubmit={
                            handleCreateTask
                        }
                    >

                        <input
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                        />

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value
                                )
                            }
                        >

                            <option value="Todo">
                                Todo
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Done">
                                Done
                            </option>

                        </select>

                        <select
                            value={priority}
                            onChange={(e) =>
                                setPriority(
                                    e.target.value
                                )
                            }
                        >

                            <option value="High">
                                High
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="Low">
                                Low
                            </option>

                        </select>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) =>
                                setDueDate(
                                    e.target.value
                                )
                            }
                        />

                        <button>
                            Create Task
                        </button>

                    </form>

                </div>

                <div className="tasks-list">

                    {
                        tasks.map((task) => (

                            <div
                                key={task.id}
                                className="card"
                            >

                                <h3>
                                    {task.title}
                                </h3>

                                <p>
                                    {task.description}
                                </p>

                                <p>
                                    Status:
                                    {" "}
                                    {task.status}
                                </p>

                                <p>
                                    Priority:
                                    {" "}
                                    {task.priority}
                                </p>

                                <p>
                                    Due Date:
                                    {" "}
                                    {task.due_date}
                                </p>

                                <button
                                    onClick={() =>
                                        updateTaskStatus(
                                            task.id,
                                            "Done"
                                        )
                                    }
                                >
                                    Mark Done
                                </button>

                            </div>

                        ))
                    }

                </div>

            </div>

        </Layout>

    );

}

export default Tasks;