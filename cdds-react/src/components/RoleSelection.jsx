import React from "react";
import { Card, CardBody, CardTitle, Button, Container, Row, Col } from "reactstrap";
import { useFinanceContext } from "./context/FinanceContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ROLES = ["TSD", "SD"];
const API = "https://mocki.io/v1/dffa5d72-10f7-40d1-9f3b-b6df8958b57c";

const RoleSelection = () => {
  const { allPayrollData, setAllPayrollData, setIsDataLoading, setDataFetchError, setSelectedRole } =
    useFinanceContext();
  const navigate = useNavigate();

  const handleRoleSelectWithFetch = async (role) => {
    // update context selected role immediately
    setSelectedRole(role);

    // update URL to /finance/salary 
    navigate("/finance/salary", { replace: true });

    // fetch role data only if not present already
    if (!allPayrollData[role]) {
      try {
        setIsDataLoading(true);
        const response = await axios.get(API);

        // filter API payload for this role and initialize netSalary/deduction = 0
        const roleData = (response.data || [])
          .filter((emp) => emp.role === role)
          .map((emp) => ({
            ...emp,
            netSalary: 0,
            deduction: 0,
          }));

        setAllPayrollData((prev) => ({ ...prev, [role]: roleData }));
        setDataFetchError(null);
      } catch (err) {
        setDataFetchError(err?.message || "Failed to fetch payroll data");
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
                  <Button color="primary" onClick={() => handleRoleSelectWithFetch(role)} className="w-auto m-2">
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

export default RoleSelection;