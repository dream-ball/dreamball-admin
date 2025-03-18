import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from './Admin/Header/Header'
import MatchUpdate from "./Admin/MatchUpdate/MatchUpdate";
import ContestUpdate from "./Admin/contest/ContestUpdate";
import Compare from "./Admin/Compare/Compare";
import AdminLogin from "./Login/AdminLogin";
import SelectedMatch from "./Admin/SelectedMatch/SelectedMatch";
import Live from "./Admin/LiveMatches/LiveMatches";
import LiveMatchesUp from "./Admin/BallUpdate/LiveMatchesUp";
import WithdrawalRequest from "./Admin/Withdrawal/WithdrawalRequest";
import "./App.css";
import PanVerificationApproval from "./Admin/Pan/PanVerificationApproval";

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
            isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin setIsAuthenticated={setIsAuthenticated} />
          }
        />

        {/* Admin Panel Routes */}
        <Route
          path="/admin"
          element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Navigate to="/admin/login" />}
        />

        {/* Protected Admin Panel Routes */}
        <Route
          path="/admin/dashboard"
          element={isAuthenticated ? <AdminPanel handleLogout={handleLogout} /> : <Navigate to="/admin/login" />}
        />
        <Route path="/admin/match-update" element={isAuthenticated ? <MatchUpdate  handleLogout={handleLogout}/> : <Navigate to="/admin/login" />} />
        <Route path="/admin/contest-update" element={isAuthenticated ? <ContestUpdate handleLogout={handleLogout} /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/compare" element={isAuthenticated ? <Compare handleLogout={handleLogout}/> : <Navigate to="/admin/login" />} />
        <Route path="/admin/selected-match" element={isAuthenticated ? <SelectedMatch handleLogout={handleLogout}/> : <Navigate to="/admin/login" />} />
        <Route path="/admin/live" element={isAuthenticated ? <Live handleLogout={handleLogout} /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/ball-update" element={isAuthenticated ? <LiveMatchesUp handleLogout={handleLogout} /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/withdraw-request" element={<WithdrawalRequest/>} />
        <Route path="/admin/pan-verify" element={<PanVerificationApproval/>}/>
      </Routes>
    </Router>
  );
}

// Admin Panel with Navbar
const AdminPanel = ({ handleLogout }) => {
  return (
    <div className="admin-container">
      <Header handleLogout={handleLogout} />
      <div className="main-content">
        <div className="content">
          
          
          
          
          
          
          {/* The content is rendered based on the route */}
          {/* <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/match-update" element={<MatchUpdate />} />
            <Route path="/admin/contest-update" element={<ContestUpdate />} />
            <Route path="/admin/compare" element={<Compare />} />
            <Route path="/admin/selected-match" element={<SelectedMatch />} />
            <Route path="/admin/live" element={<Live />} />
            <Route path="/admin/ball-update" element={<LiveMatchesUp />} />
          </Routes> */}
        </div>
      </div>
    </div>
  );
};

export default App;
