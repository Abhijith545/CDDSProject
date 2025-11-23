package com.cgg.cdds.hr.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cgg.cdds.hr.dto.EmpLopSalDto;
import com.cgg.cdds.hr.entities.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
	
	@Query("Select new com.cgg.cdds.hr.dto.EmpLopSalDto(emp.empId,emp.empBaseSalary,emp.empLop) from Employee as emp")
	List<EmpLopSalDto> getLopAndSal();

}
