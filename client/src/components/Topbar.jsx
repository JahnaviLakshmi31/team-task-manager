import { useNavigate } from "react-router-dom";

function Topbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <div className="topbar">

            <div>

                <h2 className="topbar-title">
                    Team Task Manager
                </h2>

                <p className="topbar-subtitle">
                    Manage projects and tasks
                </p>

            </div>

            <div className="topbar-right">

                <div className="profile-circle">
                    J
                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>

    );

}

export default Topbar;