import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Admin/Sidebar/Sidebar";
import Header from "./components/Admin/Header/Header";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import MatchUpdate from "./components/Admin/MatchUpdate/MatchUpdate";
import ContestUpdate from "./components/Admin/ContestUpdate";
import Compare from "./components/Admin/Compare/Compare";
import AdminLogin from "./components/Login/AdminLogin";
import SelectedMatch from "./components/Admin/SelectedMatch/SelectedMatch";
import Live from "./components/Admin/LiveMatches/LiveMatches";
import "./App.css";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Set null initially

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("adminToken");
      console.log("Token from localStorage:", token); // Debugging
      setIsAuthenticated(!!token);
    };

    checkAuth(); // Check auth on mount

    window.addEventListener("storage", checkAuth); // Sync authentication changes across tabs
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  // Prevent incorrect redirects during initial check
  if (isAuthenticated === null) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Redirect "/" to "/admin/login" */}
        <Route path="/" element={<Navigate to="/admin/login" />} />

        {/* Login Page */}
        <Route
          path="/admin/login"
          element={
            isAuthenticated ? <Navigate to="/admin" /> : <AdminLogin setIsAuthenticated={setIsAuthenticated} />
          }
        />

        {/* Admin Panel */}
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminPanel handleLogout={handleLogout} /> : <Navigate to="/admin/login" />}
        />
      </Routes>
    </Router>
  );
}

// Admin Panel with Sidebar Navigation
const AdminPanel = ({ handleLogout }) => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "matchUpdate":
        return <MatchUpdate />;
      case "selectedMatch":
        return <SelectedMatch />;
      case "contestUpdate":
        return <ContestUpdate />;
      case "compare":
        return <Compare />;
      case "live":
        return <Live />;
      default:
        return <Dashboard />;
    }
  };

  document.title = "Admin";
  
  return (
    <div className="admin-container">
      <Header handleLogout={handleLogout} />
      <div className="main-content">
        <Sidebar setActivePage={setActivePage} activePage={activePage} />
        <div className="content">{renderPage()}</div>
      </div>
    </div>
  );
};

export default App;
