import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "./Header.css";
import profileImage from '../../assets/profile.jpeg'

const Header = ({ handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAdminLoggedIn = localStorage.getItem("adminToken") !== null;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <header className="header">
      {/* Top Bar - Logo & Admin Controls */}
      <div className="top-bar">
        <div className="logo">SportX</div>

        {isAdminLoggedIn ? (
          <div className="admin-controls">
            <Button onClick={handleLogout} className="logout-btn" id="logout-btn" variant="contained" size="small">
              Log Out
            </Button>
            <span className="username">Admin</span>
            <img src={profileImage} alt="Admin Profile" className="profile-img" />
            
          </div>
        ) : (
          <div className="login-form">
            <form onSubmit={handleLogin}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" className="login-btn" fullWidth>
                Login
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Bottom Navigation - Visible Only When Logged In */}
      {isAdminLoggedIn && (
        <nav className="bottom-bar">
          <div className="nav-links">
            {[
              { path: "/admin/dashboard", label: "Dashboard" },
              { path: "/admin/match-update", label: "Match" },
              { path: "/admin/contest-update", label: "Contest" },
              { path: "/admin/ball-update", label: "Ball" },
              { path: "/admin/compare", label: "Compare" },
              { path: "/admin/selected-match", label: "Selected" },
              { path: "/admin/live", label: "Live" },
              { path: "/admin/withdraw-request", label: 'withdraw'},
              { path: "/admin/pan-verify", label: 'pan'}
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? "nav-link active" : "nav-link"}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
