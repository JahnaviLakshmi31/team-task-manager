import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert(response.data.message);

      setName("");
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1 className="login-title">
          Register
        </h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter name"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn">
            Register
          </button>

        </form>

        <p className="register-text">
          Already have an account?{" "}

          <span
            className="register-link"
            onClick={() => navigate("/")}
          >
            Login
          </span>

        </p>

      </div>
    </div>
  );
}

export default Register;