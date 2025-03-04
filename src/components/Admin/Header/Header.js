import React from "react";
import { useNavigate } from "react-router-dom";
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
      navigate("/admin/login"); 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  return (
    <div className="header">

      <div className="logo">SportX</div>

      <div className="user-info">

        <button onClick={handleLogout}>Log out</button>
        <Button>Hi</Button>
        <span className="username">Admin</span>
        <div className="profile-pic">
          <image href="https://placehold.co/600x400"/>
        </div>
      
      </div>
    </div>
  );
};

export default Header;
