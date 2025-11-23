import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, Button } from 'reactstrap';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { listEmployees } from '../services/EmployeeService'; // uncomment when backend ready

const USE_BACKEND = false;

// Dummy employees used while backend is not connected
const dummyEmployees = [
  { empId: 1, empName: 'Gayathri', role: 'HR', empEmail: 'yg@gmail.com' },
  { empId: 2, empName: 'Kaivalya', role: 'Finance', empEmail: 'kai@gmail.com' },
  { empId: 3, empName: 'Vihaan', role: 'Employee', empEmail: 'vh@gmail.com' }
];

export default function Login() {
  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    userId: '',
    password: ''   // IGNORED FIELD
  });
  const [loading, setLoading] = useState(false);

  const changeHandler = (e, field) => {
    setLoginDetail({ ...loginDetail, [field]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (loginDetail.userId.trim() === '') {
      toast.error('userId required !!');
      return;
    }

    setLoading(true);
    try {
      let employees = [];

      if (USE_BACKEND) {
        // const res = await listEmployees();
        // const payload = res.data;
        // employees = Array.isArray(payload) ? payload : (payload.employees || []);
      } else {
        employees = dummyEmployees;
      }

      const found = employees.find(emp => Number(emp.empId) === Number(loginDetail.userId));

      if (!found) {
        toast.error('User not found');
        setLoading(false);
        return;
      }

      //Reading role
      const role = found.role ? String(found.role).trim() : '';

      if (!role) {
        toast.error('No role assigned to this user in backend (or dummy data)');
        setLoading(false);
        return;
      }

      // store temporary auth in localStorage
      const authData = {
        userId: String(found.empId),
        role: role,
        token: 'TEMP_TOKEN' // temporary token 
      };
      localStorage.setItem('auth', JSON.stringify(authData));
      console.log('Stored auth (localStorage):', authData);

      toast.success('Login successful');

      const rl = role.toLowerCase();
      if (rl === 'hr') navigate('/hr');
      else if (rl === 'finance') navigate('/finance');
      else navigate('/employee');

    } catch (error) {
      console.error('Login error', error);
      toast.error('Login failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const resetHandler = () => {
    setLoginDetail({ userId: '', password: '' });
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color='dark' inverse>
            <CardHeader>
              <h3>Login Here !!</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitHandler}>
                <FormGroup>
                  <Label for="id">Enter Employee Id</Label>
                  <Input id="id" placeholder="Enter ID" type="text"
                    value={loginDetail.userId}
                    onChange={(e) => changeHandler(e, 'userId')}
                    disabled={loading}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password">Enter Password</Label>
                  <Input id="password" placeholder="Enter password" type="password"
                    value={loginDetail.password}
                    onChange={(e) => changeHandler(e, 'password')}
                    disabled={loading}
                  />
                </FormGroup>

                <Container className='text-center'>
                  <Button type="submit" color="light" outline disabled={loading}>
                    {loading ? 'Logging in...' : 'Submit'}
                  </Button>
                  <Button className='ms-2' color="secondary" outline onClick={resetHandler} disabled={loading}>Reset</Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
