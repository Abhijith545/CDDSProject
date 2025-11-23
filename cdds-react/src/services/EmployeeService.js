import axios from 'axios';

const REST_API_BASE_URL='http://localhost:9099/hr/employee';


//FETCHING EMPLOYEE-DYNAMIC TABLE
export const listEmployees=()=>{
    return axios.get(REST_API_BASE_URL);
}

//ADDING NEW EMPLOYEE
export const createEmployee=(employee)=>axios.post(REST_API_BASE_URL,employee);

//UPDATING EMPLOYEE FETCHING DETAILS
export const getEmployeeById=(empId)=>axios.get(REST_API_BASE_URL +'/' +empId);

//UPDATE EMPLOYEE--PASSING THE NEW FIELDS TO BACKEND
export const updateEmployee=(empId,employee)=>axios.put(REST_API_BASE_URL +'/' +empId, employee);

//DELETE EMPLOYEE
export const deleteEmployee=(empId)=>axios.delete(REST_API_BASE_URL + '/' +empId);
