import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      alert(response.data.message);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      navigate("/dashboard");

      setEmail("");
      setPassword("");

    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1 className="login-title">Login</h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <span
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;