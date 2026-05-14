import { useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    return (

        <div className="sidebar">

            <h2>Task Manager</h2>

            <button
                onClick={() =>
                    navigate("/dashboard")
                }
            >
                Dashboard
            </button>

            <button
                onClick={() =>
                    navigate("/projects")
                }
            >
                Projects
            </button>

            <button
                onClick={() =>
                    navigate("/tasks")
                }
            >
                Tasks
            </button>

        </div>

    );

}

export default Sidebar;