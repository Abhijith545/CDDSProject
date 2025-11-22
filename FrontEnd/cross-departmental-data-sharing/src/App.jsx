import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
// import FinanceDashboard from './components/FinanceDashboard'
import FinanceLayout from "./components/FinanceLayout";
// import ProfileCard from './components/ProfileCard';
// import { AddingEmployee } from './components/AddingEmployee';
import { Route, Routes, Navigate } from "react-router-dom";
import { FinanceProvider } from "./components/context/FinanceContext";

// import FinanceProvider from './context/FinanceProvider'; // Adjust path
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/finance"
          element={
            <FinanceProvider>
              <FinanceLayout />
            </FinanceProvider>
          }
        />
        <Route path="*" element={<Navigate to="/finance" />} />
      </Routes>

      {/* <ProfileCard/> */}
      {/* <AddingEmployee/> */}
    </>
  );
}

export default App;
