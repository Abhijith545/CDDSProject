import React, { createContext, useContext, useState } from "react";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [allPayrollData, setAllPayrollData] = useState({}); // role-wise
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

export const useFinanceContext = () => useContext(FinanceContext);
