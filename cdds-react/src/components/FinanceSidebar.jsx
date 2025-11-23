import React from "react";
import "../styles/financesidebar.css";
import { useNavigate } from "react-router-dom";

const FinanceSidebar = ({ activeService, setActiveService, setSelectedRole }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h4 className="sidebar-title">Finance Services</h4>

      <button
        className="sidebar-button"
        onClick={() => {
          setSelectedRole(null);
          navigate("/finance", { replace: true });
        }}
      >
        Payroll
      </button>
    </div>
  );
};

export default FinanceSidebar;
