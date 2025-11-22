import React from "react";
import "../styles/sidebar.css"

const FinanceSidebar = ({ activeService, setActiveService, setSelectedRole }) => {
  return (
    <div className="sidebar">
      <h4 className="sidebar-title">Finance Services</h4>

      <button
        className="sidebar-button"
        onClick={() => {
          setSelectedRole(null);
          setActiveService("Payroll");
        }}
      >
        Payroll
      </button>
    </div>
  );
};

export default FinanceSidebar;
