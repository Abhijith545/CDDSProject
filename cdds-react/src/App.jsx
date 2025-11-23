import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/Login";
import ListEmployee from "./components/ListEmployee";
import AddEmployee from "./components/AddEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import ViewEmployee from "./components/ViewEmployee";

// Finance imports
import FinanceLayout from "./components/FinanceLayout";
import { FinanceProvider } from "./components/context/FinanceContext";

import RequireAuth from "./components/RequireAuth";


export default function App() {
  return (
    <>
    <ToastContainer/>
    <Routes>
      {/* default */}
      <Route path="/" element={<Navigate to="/employees" replace />} />

      {/* login */}
      <Route path="/login" element={<Login />} />

      {/* HR routes */}
      <Route
        path="/employees"
        element={
          <RequireAuth allowedRoles={['HR']}>
            <ListEmployee />
          </RequireAuth>
        }
      />
      <Route
        path="/add-employee"
        element={
          <RequireAuth allowedRoles={['HR']}>
            <AddEmployee />
          </RequireAuth>
        }
      />
      <Route
        path="/edit-employee/:id"
        element={
          <RequireAuth allowedRoles={['HR']}>
            <UpdateEmployee />
          </RequireAuth>
        }
      />
      <Route
        path="/view-employee/:id"
        element={
          <RequireAuth allowedRoles={['HR']}>
            <ViewEmployee />
          </RequireAuth>
        }
      />

      {/* Finance */}
      <Route
        path="/finance/*"
        element={
          <RequireAuth allowedRoles={['Finance']}>
            <FinanceProvider>
              <FinanceLayout />
            </FinanceProvider>
          </RequireAuth>
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/employees" replace />} />
    </Routes>
    </>
  );
}


