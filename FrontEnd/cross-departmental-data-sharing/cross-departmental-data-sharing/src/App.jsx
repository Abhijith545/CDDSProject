import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { FinanceProvider } from "./components/context/FinanceContext";
import FinanceLayout from "./components/FinanceLayout";


function App() {
  return (
    <FinanceProvider>
      <Routes>
        <Route path="/finance/*" element={<FinanceLayout />} />
        {/* default redirect */}
        <Route path="*" element={<Navigate to="/finance" replace />} />
      </Routes>
    </FinanceProvider>
  );
}

export default App;
