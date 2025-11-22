import React, { useState } from "react";
import { Button, Table, Spinner, Alert } from "reactstrap";
import { useFinanceContext } from "./context/FinanceContext";
import PayslipModal from "./PayslipModal";
import axios from "axios";

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

  const [isGenerated, setIsGenerated] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = allPayrollData[selectedRole] || [];

  const handleGenerateSalary = async () => {
    setIsDataLoading(true);
    setDataFetchError(null);
    try {
      const response = await axios.get(API);

      // Update only selected role with real netSalary/deduction
      const updatedData = response.data.map((emp) => ({
        ...emp,
        deduction: emp.deduction,
        netSalary: emp.netSalary,
      }));

      setAllPayrollData((prev) => ({
        ...prev,
        [selectedRole]: updatedData,
      }));

      setIsGenerated(true);
    } catch (error) {
      setDataFetchError(error.message || "Failed to fetch payroll data");
    } finally {
      setIsDataLoading(false);
    }
  };

  const openSlipModal = (emp) => {
    if (!isGenerated) return;
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
          <Button color="secondary" onClick={onBack} className="me-2">Back</Button>
          <Button color="danger" onClick={handleGenerateSalary}>Generate Salary</Button>
        </div>
      </div>

      {dataFetchError && <Alert color="danger" className="mt-2">{dataFetchError}</Alert>}
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
                <Button
                  color="primary"
                  size="sm"
                  disabled={!isGenerated}
                  onClick={() => openSlipModal(emp)}
                >
                  View Payslip
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
