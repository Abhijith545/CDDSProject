import React, { createContext, useContext, useState } from "react";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  // selectedRole holds the currently selected role (string or null)
  const [selectedRole, setSelectedRole] = useState(null);

  // allPayrollData is an object keyed by role name:
  // { TSD: [...employees], SD: [...], PM: [...] }
  const [allPayrollData, setAllPayrollData] = useState({});

  // global UI flags
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [dataFetchError, setDataFetchError] = useState(null);

  return (
    <FinanceContext.Provider
      value={{
        selectedRole,
        setSelectedRole,
        allPayrollData,
        setAllPayrollData,
        isDataLoading,
        setIsDataLoading,
        dataFetchError,
        setDataFetchError,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinanceContext = () => {
  const ctx = useContext(FinanceContext);
  return ctx;
};
