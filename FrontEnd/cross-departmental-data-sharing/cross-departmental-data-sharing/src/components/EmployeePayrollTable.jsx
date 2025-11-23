import React, { useState, useMemo } from "react";
import { Button, Table, Spinner, Alert } from "reactstrap";
import { useFinanceContext } from "./context/FinanceContext";
import PayslipModal from "./PayslipModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://mocki.io/v1/dffa5d72-10f7-40d1-9f3b-b6df8958b57c";

const EmployeePayrollTable = ({ onBack }) => {
  const {
    allPayrollData,
    setAllPayrollData,
    selectedRole,
    isDataLoading,
    setIsDataLoading,
    dataFetchError,
    setDataFetchError,
  } = useFinanceContext();

  const navigate = useNavigate();

  // local modal state
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // filteredData is role-specific from context (empty array if role not set)
  const filteredData = allPayrollData[selectedRole] || [];

  // Determine whether salary generation has already happened for this role:
  // if any employee in role has a netSalary > 0, consider it generated/persisted.
  const isGeneratedForRole = useMemo(() => {
    return filteredData.some((emp) => Number(emp.netSalary) > 0);
  }, [filteredData]);

  // Generate salary for the selected role: fetch from API, filter by role and update only that role
  const handleGenerateSalary = async () => {
    // Immediately change URL to reflect "calculate" action (no role in URL)
    navigate("/finance/salary/calculate", { replace: true });

    setIsDataLoading(true);
    setDataFetchError(null);

    try {
      const response = await axios.get(API);
      const allEmployees = response.data || [];

      // filter only employees of this role
      const roleFiltered = allEmployees.filter((emp) => emp.role === selectedRole);

      // Use netSalary/deduction values from API response (assuming API returns them)
      const updatedData = roleFiltered.map((emp) => ({
        ...emp,
        deduction: emp.deduction,
        netSalary: emp.netSalary,
      }));

      // store only for the current role (persisted across navigation)
      setAllPayrollData((prev) => ({
        ...prev,
        [selectedRole]: updatedData,
      }));
    } catch (err) {
      setDataFetchError(err?.message || "Failed to fetch payroll data");
    } finally {
      setIsDataLoading(false);
    }
  };

  const openSlipModal = (emp) => {
    // only allow when generate has happened for this role
    if (!isGeneratedForRole) return;
    setSelectedEmployee(emp);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h3>Payroll for Role: {selectedRole}</h3>
        <div>
          {/* Back should go to RoleSelection page */}
          <Button
            color="secondary"
            onClick={() => {
              // go back to the RoleSelection UI and URL /finance (which renders role cards)
              navigate("/finance", { replace: true });
              if (onBack) onBack();
            }}
            className="me-2"
          >
            Back
          </Button>

          <Button color="danger" onClick={handleGenerateSalary}>
            Generate Salary
          </Button>
        </div>
      </div>

      {dataFetchError && (
        <Alert color="danger" className="mt-2">
          {dataFetchError}
        </Alert>
      )}

      {isDataLoading && (
        <div className="my-3">
          <Spinner color="primary" /> Fetching payroll data...
        </div>
      )}

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>EID</th>
            <th>Role</th>
            <th>Basic Salary</th>
            <th>LOP</th>
            <th>Deduction</th>
            <th>Net Salary</th>
            <th>Txn Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((emp) => (
            <tr key={emp.sid}>
              <td>{emp.eid}</td>
              <td>{emp.role}</td>
              <td>{emp.basicSalary}</td>
              <td>{emp.lop}</td>
              <td>{emp.deduction}</td>
              <td>{emp.netSalary}</td>
              <td>{emp.txnDate}</td>
              <td>
                <Button color="primary" size="sm" disabled={!isGeneratedForRole} onClick={() => openSlipModal(emp)}>
                  View Payslip
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Payslip Modal */}
      <PayslipModal
        isOpen={isModalOpen}
        toggle={closeModal}
        employee={selectedEmployee}
        payrollData={
          selectedEmployee
            ? {
                monthlyBasicSalary: selectedEmployee.basicSalary,
                lops: selectedEmployee.lop,
                lopAmount: selectedEmployee.deduction,
                netSalary: selectedEmployee.netSalary,
              }
            : null
        }
      />
    </div>
  );
};

export default EmployeePayrollTable;
