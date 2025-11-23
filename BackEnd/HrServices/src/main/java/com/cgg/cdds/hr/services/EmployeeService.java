package com.cgg.cdds.hr.services;

import java.util.List;

import com.cgg.cdds.hr.dto.EmpLopSalDto;
import com.cgg.cdds.hr.dto.EmployeeDetailsDto;

public interface EmployeeService {
	
	List<EmpLopSalDto> getAllLops();
	
	List<EmployeeDetailsDto> getAllEmployee();
	
	EmployeeDetailsDto getEmployeeById(int id);
	
	EmployeeDetailsDto addEmployee(EmployeeDetailsDto emp);
	
	EmployeeDetailsDto updateEmployee(int empId, EmployeeDetailsDto newDetails);
	
	boolean removeEmployeeById(int id);
	
}
