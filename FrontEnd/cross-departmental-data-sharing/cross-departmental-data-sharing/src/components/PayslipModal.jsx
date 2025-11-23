import React from "react";
import { Modal, ModalHeader, ModalBody, Card, CardBody, Table } from "reactstrap";

const formatCurrency = (amount) => {
  const numericAmount = typeof amount === "number" ? amount : Number(amount) || 0;
  return `₹${numericAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

const PayslipModal = ({ isOpen, toggle, employee, payrollData }) => {
  if (!employee || !payrollData) return null;

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="md">
      <ModalHeader toggle={toggle} className="bg-primary text-white">
        Payslip for {employee.eid}
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm border-info">
          <CardBody>
            <h5 className="mb-3 text-center">PaySlip</h5>

            <Table borderless size="sm" className="mb-4">
              <tbody>
                <tr>
                  <th style={{ width: "40%" }}>Employee ID:</th>
                  <td>{employee.eid}</td>
                </tr>

                <tr>
                  <th>Role:</th>
                  <td>{employee.role}</td>
                </tr>

                <tr>
                  <th>LOP Days:</th>
                  <td>
                    <span className="fw-bold text-danger">{payrollData.lops}</span>
                  </td>
                </tr>
              </tbody>
            </Table>

            <Table bordered size="sm" className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Component</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monthly Basic Salary</td>
                  <td>{formatCurrency(payrollData.monthlyBasicSalary)}</td>
                </tr>

                <tr>
                  <td>LOP Deduction</td>
                  <td className="text-danger">{formatCurrency(payrollData.lopAmount)}</td>
                </tr>

                <tr className="table-info fw-bold">
                  <td>Net Salary </td>
                  <td>{formatCurrency(payrollData.netSalary)}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
};

export default PayslipModal;
