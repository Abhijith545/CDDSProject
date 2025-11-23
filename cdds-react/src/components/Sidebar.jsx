import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <h5 className="sidebar-title">HR SERVICES</h5>
      <nav className="sidebar-nav">
        <NavLink to="/employees" className={({isActive}) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          Employee Management
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
