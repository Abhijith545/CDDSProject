import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { getEmployeeById } from '../services/EmployeeService';

const dummyData = [
  { empId: 1, empName: 'Gayathri', address: 'Hyderabad', empDesignation: 'TSD', empEmail: 'yg@gmail.com', empLop: 0, department: { deptId: 1, deptName: 'HR' } },
  { empId: 2, empName: 'Kaivalya', address: 'Vizag', empDesignation: 'SD', empEmail: 'kai@gmail.com', empLop: 0, department: { deptId: 2, deptName: 'Finance' } },
  { empId: 3, empName: 'Vihaan', address: 'Vijayawada', empDesignation: 'TSD', empEmail: 'vh@gmail.com', empLop: 0, department: { deptId: 1, deptName: 'HR' } }
];

const ViewEmployee = () => {

  const { id } = useParams();   
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // API CALL
    // getEmployeeById(id)
    //   .then(res => { setEmployee(res.data); setError(''); })
    //   .catch(() => setError('Failed to load employee'));
    

    // Dummy data 
    const emp = dummyData.find(e => Number(e.empId) === Number(id));

    if (!emp) {
      setError('Employee not found');
      setEmployee(null);
    } else {
      setEmployee(emp);
      setError('');
    }
  }, [id]);

  if (error) return <div className="text-danger">{error}</div>;
  if (!employee) return <div>Loading...</div>;

  // IMAGE (initials)
  const initials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Employee Details</h2>

      <div className="card p-3">
        <div className="d-flex align-items-center mb-3">

          {/* Circle Image */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#007bff',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 'bold',
              marginRight: 16
            }}
          >
            {initials(employee.empName)}
          </div>

          {/* Basic Info */}
          <div>
            <h4 style={{ margin: 0 }}>{employee.empName}</h4>
            <div style={{ color: '#666' }}>{employee.empDesignation}</div>
            <div style={{ color: '#666' }}>{employee.empEmail}</div>
          </div>
        </div>

        {/* All fields */}
        <div className="row">

          <div className="col-md-6 mb-2">
            <label className="form-label">Employee Id</label>
            <input type="number" className="form-control" value={employee.empId} readOnly />
          </div>

          <div className="col-md-6 mb-2">
            <label className="form-label">LOP</label>
            <input type="number" className="form-control" value={employee.empLop} readOnly />
          </div>

          <div className="col-md-6 mb-2">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" value={employee.address} readOnly />
          </div>

          <div className="col-md-6 mb-2">
            <label className="form-label">Department Id</label>
            <input type="number" className="form-control" value={employee.department?.deptId ?? ''} readOnly />
          </div>

          <div className="col-md-6 mb-2">
            <label className="form-label">Department Name</label>
            <input type="text" className="form-control" value={employee.department?.deptName ?? ''} readOnly />
          </div>

          <div className="col-md-6 mb-2">
            <label className="form-label">Designation</label>
            <input type="text" className="form-control" value={employee.empDesignation} readOnly />
          </div>

          {/* Buttons */}
          <div className="col-12 mt-3">

            <button 
              type="button" 
              className="btn btn-secondary me-2" 
              onClick={() => navigate('/employees')}
            >
              Back
            </button>

            <button 
              type="button" 
              className="btn btn-primary me-2" 
              onClick={() => navigate(`/edit-employee/${employee.empId}`)}
            >
              Edit
            </button>

            <button 
              type="button" 
              className="btn btn-dark" 
              onClick={() => navigate('/employees')}
            >
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
