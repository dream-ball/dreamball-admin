import React from "react";
import "./Sidebar.css";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
        <li onClick={() => setActivePage("matchUpdate")}>Match Update</li>
        <li onClick={() => setActivePage("selectedMatch")}>Selected Match</li>
        <li onClick={() => setActivePage("contestUpdate")}>Contest</li>
        <li onClick={() => setActivePage("compare")}>Compare</li>
        <li onClick={()=> setActivePage("live")}>Live</li>
      </ul>
    </div>
  );
};

export default Sidebar;
