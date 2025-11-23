package com.cgg.cdds.hr.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.cgg.cdds.hr.dto.DepartmentDto;
import com.cgg.cdds.hr.dto.EmpLopSalDto;
import com.cgg.cdds.hr.dto.EmployeeDetailsDto;
import com.cgg.cdds.hr.entities.Department;
import com.cgg.cdds.hr.entities.Employee;
import com.cgg.cdds.hr.repo.DepartmentRepo;
import com.cgg.cdds.hr.repo.EmployeeRepo;
import com.cgg.cdds.hr.services.EmployeeService;

import lombok.AllArgsConstructor;
import lombok.Data;

@Service
@Data
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	EmployeeRepo employeeRepo;
	ModelMapper modelMapper;
	DepartmentRepo departmentRepo;

	@Override
	public List<EmpLopSalDto> getAllLops() {
		return employeeRepo.getLopAndSal();
	}

	@Override
	public List<EmployeeDetailsDto> getAllEmployee() {
		List<Employee> allEmployees = employeeRepo.findAll();
		System.out.println(allEmployees);
		List<EmployeeDetailsDto> collectedDetails = allEmployees.stream()
				.map(emp -> modelMapper.map(emp, EmployeeDetailsDto.class)).collect(Collectors.toList());
		System.out.println(collectedDetails);
		return collectedDetails;
	}

	@Override
	public EmployeeDetailsDto getEmployeeById(int id) {
		Employee employee = employeeRepo.findById(id).get();
		return modelMapper.map(employee, EmployeeDetailsDto.class);
	}

	@Override
	public EmployeeDetailsDto updateEmployee(int empId, EmployeeDetailsDto newDetails) {

		Employee newEmp = modelMapper.map(newDetails, Employee.class);
		Employee updatedEmp = new Employee();
		Optional<Employee> existingEmployeeOpt = employeeRepo.findById(empId);
		if (existingEmployeeOpt.isPresent()) {
			Employee existingEmp = existingEmployeeOpt.get();

			DepartmentDto department = newDetails.getDepartment();
			Department mappedDepart = modelMapper.map(department, Department.class);
			Optional<Department> deptObj = departmentRepo.findById(mappedDepart.getDeptId());
			existingEmp.setEmpName(newEmp.getEmpName());
			existingEmp.setEmpLop(newEmp.getEmpLop());
			existingEmp.setAddress(newEmp.getAddress());
			existingEmp.setEmpDesignation(newEmp.getEmpDesignation());
			existingEmp.setEmpEmail(newEmp.getEmpEmail());
			if (deptObj.isPresent()) {
				existingEmp.setDepartment(newEmp.getDepartment());
			}
			updatedEmp = employeeRepo.save(existingEmp);
		}
		return modelMapper.map(updatedEmp, EmployeeDetailsDto.class);
	}

	@Override
	public EmployeeDetailsDto addEmployee(EmployeeDetailsDto empDto) {
		// 1️⃣ Handle Department
		Department department;
		DepartmentDto deptDto = empDto.getDepartment();

		if (deptDto != null && deptDto.getDeptId() != 0 && departmentRepo.existsById(deptDto.getDeptId())) {
			department = departmentRepo.findById(deptDto.getDeptId()).get();
		} else {
			department = modelMapper.map(deptDto, Department.class);
		}

		Employee employee = modelMapper.map(empDto, Employee.class);

		employee.setDepartment(department);

		Employee savedEmp = employeeRepo.save(employee);

		EmployeeDetailsDto savedDto = modelMapper.map(savedEmp, EmployeeDetailsDto.class);
		return savedDto;
	}

	@Override
	public boolean removeEmployeeById(int id) {

		if (employeeRepo.existsById(id)) {
			System.out.println(id);
			employeeRepo.deleteById(id);
			return true;
		}
		return false;

	}

}