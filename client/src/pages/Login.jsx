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
      const response = await API.post("/auth/login", { email, password });
      console.log(response.data);
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
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button>Login</button>
      </form>
      <p>
  Don't have an account?
  <span
    onClick={() => navigate("/register")}
    style={{ color: "blue", cursor: "pointer" }}
  >
    Register
  </span>
</p>
    </div>
  );
}
export default Login;
