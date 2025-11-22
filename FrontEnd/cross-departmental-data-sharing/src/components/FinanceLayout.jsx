import React, { useEffect, useState } from "react";
import RoleSelection from "./RoleSelection";
import EmployeePayrollTable from "./EmployeePayrollTable";
import FinanceSidebar from "./FinanceSidebar";
import { useFinanceContext } from "./context/FinanceContext";
import "../styles/sidebar.css";
const FinanceLayout = () => {

  const { selectedRole, setSelectedRole } = useFinanceContext();

  const [activeService, setActiveService] = useState("Payroll");

  const handleRoleSelect = (role) => setSelectedRole(role);
  const handleBackToRoles = () => setSelectedRole(null);

 
  const renderContent = () => {
    if (activeService === "Payroll") {
      if (!selectedRole) {
        return <RoleSelection onRoleSelect={handleRoleSelect} />;
      } else {
        return (
          <EmployeePayrollTable
            selectedRole={selectedRole}
            onBack={handleBackToRoles}
          />
        );
      }
    }

    return <p>Content for {activeService}</p>;
  };

  return (
    <>
      {/* FIXED SIDEBAR */}
      <FinanceSidebar
        activeService={activeService}
        setActiveService={setActiveService}
        setSelectedRole={setSelectedRole}
      />

      {/* MAIN CONTENT (RIGHT SIDE) */}
      <div
        style={{
          marginLeft: "250px",   // pushes content to the right
          padding: "20px",
          height: "100vh",
          overflowY: "auto",
          background: "#f4f5fa"
        }}
      >
        {renderContent()}
      </div>
    </>
  );
};

export default FinanceLayout;
