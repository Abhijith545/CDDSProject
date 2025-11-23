import React, { useEffect, useState } from 'react'
import { deleteEmployee, listDepartments, listEmployees, sendDepartmentTransfer } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const ListEmployee = () => {

    const SIDEBAR_WIDTH = 220;
    
    //MODAL DETAILS
    const [showModal, setShowModal] = useState(false);
    const [departments, setDepartments] = useState([]); 
    const [selectedDept, setSelectedDept] = useState(''); 
    const [loadingDepts, setLoadingDepts] = useState(false);
    const [sending, setSending] = useState(false);
    const [modalError, setModalError] = useState('');

    //API CALL
    const[employees,setEmployees]=useState([]);
    const navigator=useNavigate();
    useEffect(()=>{
        getAllEmployees();
    },[])

    //ADD EMPLOYEE HANDLER
    function getAllEmployees(){
        //API CALL RELATED CODE
        listEmployees()
        .then((response)=>{
            setEmployees(response.data);
        }).catch(error=>{
            console.error(error);
        })
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
        deleteEmployee(empId).then((response)=>{
            getAllEmployees();
        }).catch(error=>{
            console.error(error);
        })
    }
    function handleView(empId){
        navigator(`/view-employee/${empId}`)
    }

    const source='HR';

    function openSendModal(){
        setModalError('');
        setSelectedDept('');
        setShowModal(true);
        setLoadingDepts(true);

        //API CALL
        listDepartments()
        .then((response)=>{
            setDepartments(response.data.departments || []);
        })
        .catch(error=>{
            console.error(error);
            setModalError('Failed to load departments');
        })
        .finally(()=>setLoadingDepts(false));

    }
     
    
    function closeModal(){
        setShowModal(false);
    }

    function handleSend() {
    if (!selectedDept) {
        setModalError('Please select a destination department');
        return;
    }

    const requestBody = {
        source: source,
        destination: selectedDept
    };

    setSending(true);
    setModalError('');

    // API CALL (when ready)
    sendDepartmentTransfer(requestBody)
      .then((response) => {
        console.log('sent', response.data);
        setShowModal(false);
      })
      .catch(error => {
        console.error(error);
        setModalError('send failed');
      })
      .finally(() => setSending(false));
    }

  return (
    <div className='d-flex'>
     <Sidebar/>
      <div style={{ marginLeft: SIDEBAR_WIDTH, padding: 20, width: '100%' }}>
        <h2 className='text-center'>Employee Management</h2>
        <button className='btn btn-primary m-2' onClick={addNewEmployee}>Add Employee</button>
        <button className='btn btn-primary m-2' onClick={openSendModal}>Send data</button>
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
                    employees.map(employee=>
                        <tr key={employee.empId}>
                            <td>{employee.empId}</td>
                            <td>{employee.empName}</td>
                            <td>{employee.empEmail}</td>
                            <td>{employee.empLop}</td>
                            <td>
                                <button className='btn btn-info me-4 ms-4' onClick={()=>handleView(employee.empId)}>View</button>
                                <button className='btn btn-info me-4 ms-4' onClick={()=>handleUpdate(employee.empId)}>Update</button>
                                <button className='btn btn-info me-4 ms-4' onClick={()=>handleDelete(employee.empId)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
                
            </tbody>
        </table>

        {/* MODAL COMPONENT */}
       {showModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Send Data — Choose Department</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
              </div>

              <div className="modal-body">
                <div>
                  <label className="form-label">Source</label>
                  <input className="form-control" value={source} readOnly /> 
                </div>

                <div className="mt-3">
                  <label className="form-label">Destination</label>
                  {loadingDepts ? (
                    <div>Loading departments...</div>
                  ) : (
                    <select className="form-select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                      <option value="">-- Select department --</option>
                      {departments.map((dept, idx) => (
                        <option key={idx} value={dept}>{dept}</option> 
                      ))}
                    </select>
                  )}
                </div>

                {modalError && <div className="text-danger mt-2">{modalError}</div>}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal} disabled={sending}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSend} disabled={sending || loadingDepts}>
                  {sending ? 'Sending...' : 'Send'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
        </div>
        </div>

)
}

export default ListEmployee