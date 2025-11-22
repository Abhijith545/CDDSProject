import React from "react";
import { Card, CardBody, CardTitle, Button, Container, Row, Col } from "reactstrap";
import { useFinanceContext } from "./context/FinanceContext";
import axios from "axios";

const ROLES = ["TSD", "SD", "PM"];
const API = "https://mocki.io/v1/dffa5d72-10f7-40d1-9f3b-b6df8958b57c";

const RoleSelection = ({ onRoleSelect }) => {
  const { allPayrollData, setAllPayrollData, setIsDataLoading, setDataFetchError } =
    useFinanceContext();

  const handleRoleSelectWithFetch = async (role) => {
    onRoleSelect(role);

    if (!allPayrollData[role]) {
      // Fetch initial data only for this role
      try {
        setIsDataLoading(true);
        const response = await axios.get(API);

        const initialData = response.data.map((emp) => ({
          ...emp,
          netSalary: 0,
          deduction: 0,
        }));

        setAllPayrollData((prev) => ({ ...prev, [role]: initialData }));
        setDataFetchError(null);
      } catch (error) {
        setDataFetchError(error.message || "Failed to fetch payroll data");
      } finally {
        setIsDataLoading(false);
      }
    }
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4 text-dark">Select Payroll Role</h2>
      <Row className="g-3 justify-content-start">
        {ROLES.map((role) => (
          <Col key={role} xs="12" sm="6" md="4" lg="4">
            <Card className="shadow-lg border-0" style={{ height: "250px" }}>
              <CardBody className="d-flex flex-column justify-content-center">
                <CardTitle tag="h5" className="fw-bold text-center text-secondary text-lg">
                  {role}
                </CardTitle>
                <div className="text-center">
                  <Button
                    color="primary"
                    onClick={() => handleRoleSelectWithFetch(role)}
                    className="w-auto m-2"
                  >
                    View Payroll
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RoleSelection
