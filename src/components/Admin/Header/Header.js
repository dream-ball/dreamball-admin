import React from "react";
import { replace, useNavigate } from "react-router-dom";
import "./Header.css";
import { Button } from "@mui/material";


const Header = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (token) {
        await fetch("http://localhost:8081/admin/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
      }

      localStorage.removeItem("adminToken");
      setIsAuthenticated(false);
      replace('/admin/login');
      navigate("/admin/login"); 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  return (
    <div className="header">

      <div className="logo">SportX</div>

      <div className="user-info">

        <Button onClick={handleLogout} variant="contained" color="primary">Log out</Button>
        
        <div className="profile">
          <span className="username">Admin</span>
          <img src="https://placehold.co/50" alt="profile"/>
        </div>
      
      </div>
    </div>
  );
};

export default Header;
