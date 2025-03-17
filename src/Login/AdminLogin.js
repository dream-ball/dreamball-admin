import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import server from '../utils/utils.js';
import Loading from "../Utils/Loading.js";

const AdminLogin = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      CheckTokenValidity(token);
    }
  }, []);

  const CheckTokenValidity = async (token) => {
    try {
      setLoading(true);
      server.pathname = "/admin/protected";

      const response = await fetch(server, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        navigate("/admin");
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("adminToken");
      }
    } catch (err) {
      console.error("Token validation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Username and Password are required!");
      setLoading(false);
      return;
    }

    try {
      server.pathname = "/admin/login";

      const response = await fetch(server, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", result.token);
        setIsAuthenticated(true);
        navigate("/admin");
      } else {
        throw new Error(result.message || "Invalid credentials!");
      }
    } catch (err) {
      setError(err.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
