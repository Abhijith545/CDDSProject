import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../services/EmployeeService';

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [empId, setEmpId] = useState(0);
  const [empName, setEmpName] = useState('');
  const [address, setAddress] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empDesignation, setEmpDesignation] = useState('');
  const [empLop, setEmpLop] = useState(0);
  const [deptId, setDeptId] = useState(0);
  const [deptName, setDeptName] = useState('');
  const[empBaseSalary,setEmpBaseSalary]=useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    // API
    getEmployeeById(id)
      .then(response => {
        const emp = response.data;
        prefill(emp);
        setError('');
      })
      .catch(err => {
        setError('Failed to load employee');
      })
      .finally(() => {
        setLoading(false);
      });
    
  }, [id]);

  function prefill(emp) {
    setEmpId(emp.empId ?? 0);
    setEmpName(emp.empName ?? '');
    setAddress(emp.address ?? '');
    setEmpEmail(emp.empEmail ?? '');
    setEmpDesignation(emp.empDesignation ?? '');
    setEmpLop(emp.empLop ?? 0);
    setDeptId(emp.department?.deptId ?? 0);
    setDeptName(emp.department?.deptName ?? '');
    setEmpBaseSalary(emp.empBaseSalary?? 0);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //this is the data that i send to backend
    const updatedEmp = {
      empId: empId,
      empName: empName.trim(),
      address: address.trim(),
      empEmail: empEmail.trim(),
      empDesignation: empDesignation.trim(),
      empLop: empLop,
      department: {
        deptId: deptId,
        deptName: deptName.trim()
      },
      empBaseSalary:empBaseSalary
    };

    //API
    updateEmployee(id, updatedEmp)
      .then((response) => {
        console.log(response.data);
        navigate('/employees');
      })
      .catch(() => {
        setError('Update failed');
      });
    
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className='container'>
      <h2 className='text-center'>Update Employee</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group mb-2">
          <label>Employee Id</label>
          <input
            type="number"
            value={empId}
            readOnly
            className="form-control"
          />
        </div>

        <div className="form-group mb-2">
          <label>Employee Name</label>
          <input
            type="text"
            value={empName}
            className="form-control"
            onChange={(e) => setEmpName(e.target.value)}
          />
        </div>

        <div className="form-group mb-2">
          <label>Address</label>
          <input
            type="text"
            value={address}
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group mb-2">
          <label>Email</label>
          <input
            type="email"
            value={empEmail}
            className="form-control"
            onChange={(e) => setEmpEmail(e.target.value)}
          />
        </div>

        <div className="form-group mb-2">
          <label>Designation</label>
          <input
            type="text"
            value={empDesignation}
            className="form-control"
            onChange={(e) => setEmpDesignation(e.target.value)}
          />
        </div>

        <div className="form-group mb-2">
          <label>LOP</label>
          <input
            type="number"
            value={empLop}
            className="form-control"
            onChange={(e) => setEmpLop(Number(e.target.value))}
          />
        </div>

        <div className="form-group mb-2">
          <label>Department Id</label>
          <input
            type="number"
            value={deptId}
            className="form-control"
            onChange={(e) => setDeptId(Number(e.target.value))}
          />
        </div>

        <div className="form-group mb-2">
          <label>Department Name</label>
          <input
            type="text"
            value={deptName}
            className="form-control"
            onChange={(e) => setDeptName(e.target.value)}
          />
        </div>

        <div className="form-group mb-2">
          <label>Base Salary</label>
          <input
            type="number"
            value={empBaseSalary}
            className="form-control"
            onChange={(e) => setEmpBaseSalary(Number(e.target.value))}
          />
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/employees')}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;