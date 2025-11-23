import React from "react";
import RoleSelection from "./RoleSelection";
import EmployeePayrollTable from "./EmployeePayrollTable";
import FinanceSidebar from "./FinanceSidebar";
import { useFinanceContext } from "./context/FinanceContext";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "../styles/financesidebar.css";

const FinanceLayout = () => {
  const { selectedRole, setSelectedRole } = useFinanceContext();
  const location = useLocation();

  // back-to-roles helper
  const handleBackToRoles = () => setSelectedRole(null);

  // We keep rendering logic inside nested routes:
  // - /finance or /finance/ -> RoleSelection
  // - /finance/salary -> EmployeePayrollTable 
  // - /finance/salary/calculate -> EmployeePayrollTable 
  return (
    <>
      <FinanceSidebar
        activeService="Payroll"
        setActiveService={() => {}}
        setSelectedRole={setSelectedRole}
      />

      <div
        style={{
          marginLeft: "250px",
          padding: "20px",
          height: "100vh",
          overflowY: "auto",
          background: "#f4f5fa",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<RoleSelection />}
          />
          <Route
            path="salary"
            element={<EmployeePayrollTable onBack={handleBackToRoles} />}
          />
          <Route
            path="salary/calculate"
            element={<EmployeePayrollTable onBack={handleBackToRoles} />}
          />
          {/* ensure navigation to role cards when hitting /finance directly */}
          <Route path="*" element={<Navigate to={location.pathname.endsWith("/salary") || location.pathname.endsWith("/salary/calculate") ? location.pathname : "/finance"} replace />} />
        </Routes>
      </div>
    </>
  );
};

export default FinanceLayout;
