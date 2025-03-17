import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/admin/dashboard" activeClassName="active">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin/match-update" activeClassName="active">Match Update</NavLink>
        </li>
        <li>
          <NavLink to="/admin/contest-update" activeClassName="active">Contest Update</NavLink>
        </li>
        <li>
          <NavLink to="/admin/compare" activeClassName="active">Compare</NavLink>
        </li>
        <li>
          <NavLink to="/admin/selected-match" activeClassName="active">Selected Match</NavLink>
        </li>
        <li>
          <NavLink to="/admin/live" activeClassName="active">Live Matches</NavLink>
        </li>
        <li>
          <NavLink to="/admin/ball-update" activeClassName="active">Ball Update</NavLink>
        </li>
      </ul>
    </div>
  );
};


export default Sidebar;
