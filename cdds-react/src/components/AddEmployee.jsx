import React, { useState } from 'react'
import { createEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    // empId: '',
    // empName: '',
    // address: '',
    // empEmail:'',
    // empDesignation: '',
    // empLop: 0,
    // department:{
    //   deptId:'',
    //   deptName:''
    // }
    
  const [empId, setEmpId] = useState(0);
  const [empName, setEmpName] = useState('');
  const [address, setAddress] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empDesignation, setEmpDesignation] = useState('');
  const [empLop, setEmpLop] = useState(0);

  const [deptId, setDeptId] = useState(0);
  const [deptName, setDeptName] = useState('');

  //VALIDATIONS
  const [errors, setErrors] = useState({
    empId: '',
    empName: '',
    address: '',
    empEmail:'',
    empDesignation: '',
    empLop: '',
    department:{
      deptId:'',
      deptName:''
    }
  });


  const navigator=useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(validateForm()){
    const newEmployee = {
    empId: Number(empId),
    empName,
    address,
    empEmail,
    empDesignation,
    empLop: Number(empLop),
    department: {
      deptId: Number(deptId),
      deptName
    }
  };

  console.log("Final Employee Object:", newEmployee);
  navigator('/employees')

  //API CALL
  // createEmployee(newEmployee).then((response)=>{
  //   console.log(response.data);
  //    navigator('/employees')
  // })
  }
  }

  function validateForm(){
    let valid=true;
    const errorsData={...errors}


    //ID VALIDATION
    if (empId <= 0) {
      errorsData.empId = 'Emp ID is required and must be greater than 0';
      valid = false;
    } else {
        errorsData.empId = '';
    }

    //NAME 
    if(empName.trim()){
      errorsData.empName='';
    }else{
      errorsData.empName='Employee name is required';
      valid=false;
    }

    //ADDRESS
    if(address.trim()){
      errorsData.address='';
    }else{
      errorsData.address='Address is required';
      valid=false;
    }

    //EMAIL
    if(empEmail.trim()){
      errorsData.empEmail='';
    }else{
      errorsData.empEmail='Email is required';
      valid=false;
    }

    //DESIGNATION
    if(empDesignation.trim()){
      errorsData.empDesignation='';
    }else{
      errorsData.empDesignation='Designation is required';
      valid=false;
    }

    //LOP
    if (empLop < 0 ) {
      errorsData.empLop= 'LOP cannot be negative';
      valid = false;
    } else {
        errorsData.empLop = '';
    }

    //DEPT ID
    if (deptId <= 0) {
      errorsData.department.deptId = 'Department ID is required and must be greater than 0';
      valid = false;
    } else {
        errorsData.department.deptId = '';
    }

    //DEPT NAME
    if(deptName.trim()){
      errorsData.department.deptName='';
    }else{
      errorsData.department.deptName='Department name  is required';
      valid=false;
    }
    setErrors(errorsData);
    return valid;
}

  return (
    <div className='container'>
        <br/><br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h2 className='text-center'>Add Employee</h2>
                <div className="card-body"></div>
                    <form>

                        {/* ID */}
                        <div className='form-group mb-2'>
                            <label className='form-label'>Employee Id</label>
                            <input
                                type="number"
                                placeholder='Enter employee Id'
                                name='empId'
                                value={empId}
                                className={`form-control ${errors.empId? 'is-invalid':''}`}
                                onChange={(e) => setEmpId(Number(e.target.value))}
                            />
                            {errors.empId && <div className='invalid-feedback'>{errors.empId}</div>}
                        </div>

                        {/* NAME */}
                        <div className='form-group mb-2'>
                            <label className='form-label'>Employee Name</label>
                            <input
                                type='text'
                                placeholder='Enter employee Name'
                                name='empName'
                                value={empName}
                                className={`form-control ${errors.empName? 'is-invalid':''}`}
                                onChange={(e) => setEmpName(e.target.value)}
                            />
                            {errors.empName && <div className='invalid-feedback'>{errors.empName}</div>}
                        </div>

                        {/* ADDRESS */}
                        <div className='form-group mb-2'>
                            <label className='form-label'>Address</label>
                            <input
                                type='text'
                                placeholder='Enter address'
                                name='address'
                                value={address}
                                className={`form-control ${errors.address? 'is-invalid':''}`}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
                        </div>

                        {/* EMAIL */}
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email</label>
                            <input
                                type='email'
                                placeholder='Enter email'
                                name='empEmail'
                                value={empEmail}
                                className={`form-control ${errors.empEmail? 'is-invalid':''}`}
                                onChange={(e) => setEmpEmail(e.target.value)}
                            />
                            {errors.empEmail && <div className='invalid-feedback'>{errors.empEmail}</div>}
                        </div>

                        {/* DESIGNATION */}
                        <div className='form-group mb-2'>
                            <label className='form-label'>Designation</label>
                            <input
                                type='text'
                                placeholder='Enter designation'
                                name='empDesignation'
                                value={empDesignation}
                                className={`form-control ${errors.empDesignation? 'is-invalid':''}`}
                                onChange={(e) => setEmpDesignation(e.target.value)}
                            />
                            {errors.empDesignation && <div className='invalid-feedback'>{errors.empDesignation}</div>}
                        </div>

                        {/* LOP */}
                        <div className='form-group mb-2'>
                            <label className='form-label'>LOP</label>
                            <input
                                type="number"
                                name='empLop'
                                value={empLop}
                                className={`form-control ${errors.empLop? 'is-invalid':''}`}
                                onChange={(e) => setEmpLop(Number(e.target.value))}
                            />
                            {errors.empLop && <div className='invalid-feedback'>{errors.empLop}</div>}
                        </div>

                        {/* DEPARTMENT ID */}
                        <div className='form-group mb-2'>
                            <label className='form-label'>Department Id</label>
                            <input
                                type="number"
                                name="deptId"
                                value={deptId}
                                className={`form-control ${errors.department.deptId? 'is-invalid':''}`}
                                onChange={(e) => setDeptId(Number(e.target.value))}
                            />
                            {errors.department.deptId && <div className='invalid-feedback'>{errors.department.deptId}</div>}
                        </div>

                        {/* DEPTARTMENT NAME */}
                        <div className='form-group mb-2'>
                            <label className='form-label'>Department Name</label>
                            <input
                                type="text"
                                name='deptName'
                                value={deptName}
                                className={`form-control ${errors.department.deptName? 'is-invalid':''}`}
                                onChange={(e) => setDeptName(e.target.value)}
                            />
                            {errors.department.deptName && <div className='invalid-feedback'>{errors.department.deptName}</div>}
                        </div>
                        <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
                    </form>
            </div>
        </div>
    </div>
  )
}

export default AddEmployee