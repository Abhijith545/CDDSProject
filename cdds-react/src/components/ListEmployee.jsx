import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployee = () => {
    const navigator=useNavigate();
    const dummyData=[
        {
            "empId":1,
            "empName":"Gayathri",
            "address":"Hyderabad",
            "empDesignation":"TSD",
            "empEmail":"yg@gmail.com",
            "empLop":0,
            "department":{
                "deptId":1,
                "deptName":"HR"
            }

        },
        {
            "empId":2,
            "empName":"Kaivalya",
            "address":"Vizag",
            "empDesignation":"SD",
            "empEmail":"kai@gmail.com",
            "empLop":0,
            "department":{
                "deptId":2,
                "deptName":"Finance"
            }
            
        },
        {
            "empId":3,
            "empName":"Vihaan",
            "address":"Vijayawada",
            "empDesignation":"TSD",
            "empEmail":"vh@gmail.com",
            "empLop":0,
            "department":{
                "deptId":1,
                "deptName":"HR"
            }
            
        }
    ]
    //API CALL
    // const[employees,setEmployees]=useState([]);

    // const navigator=useNavigate();
    // useEffect(()=>{
    //     getAllEmployees();
    // },[])

    //ADD EMPLOYEE HANDLER
    function getAllEmployees(){
        //API CALL RELATED CODE
        // listEmployees()
        // .then((response)=>{
        //     setEmployees(response.data);
        // }).catch(error=>{
        //     console.error(error);
        // })
    }
    function addNewEmployee(){
        navigator('/add-employee')
    }

    //UPDATE EMPLOYEE HANDLER
    function handleUpdate(empId){
        navigator(`/edit-employee/${empId}`)
    }
    function handleDelete(empId){
        console.log(empId);

        //API CALL
        // deleteEmployee(empId).then((response)=>{
        //     getAllEmployees();
        // }).catch(error=>{
        //     console.error(error);
        // })
    }
    function handleView(empId){
        navigator(`/view-employee/${empId}`)
    }
  return (
    <div className='container'>
        <h2 className='text-center'>Employee Management</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee Name</th>
                    <th>Employee Email</th>
                    <th>LOP</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    //API CALL
                    // employees.map(employee=>
                    //     <tr key={employee.empId}>
                    //         <td>{employee.empId}</td>
                    //         <td>{employee.empName}</td>
                    //         <td>{employee.empEmail}</td>
                    //         <td>{employee.empLop}</td>
                    //     </tr>
                    // )
                    dummyData.map(employee=>
                        <tr key={employee.empId}>
                            <td>{employee.empId}</td>
                            <td>{employee.empName}</td>
                            <td>{employee.empEmail}</td>
                            <td>{employee.empLop}</td>
                            <td>
                                <button className='btn btn-info m-2' onClick={()=>handleView(employee.empId)}>View</button>
                                <button className='btn btn-info m-2' onClick={()=>handleUpdate(employee.empId)}>Update</button>
                                <button className='btn btn-info m-2' onClick={()=>handleDelete(employee.empId)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployee