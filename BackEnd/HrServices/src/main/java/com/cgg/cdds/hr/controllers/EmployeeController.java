package com.cgg.cdds.hr.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.adapter.ForwardedHeaderTransformer;
import com.cgg.cdds.hr.dto.DataPacketDto;
import com.cgg.cdds.hr.dto.EmpLopSalDto;
import com.cgg.cdds.hr.dto.EmployeeDetailsDto;
import com.cgg.cdds.hr.dto.ReceiverDto;
import com.cgg.cdds.hr.services.DepartmentService;
import com.cgg.cdds.hr.services.EmployeeService;
import com.cgg.cdds.hr.services.SenderService;

import lombok.AllArgsConstructor;
import lombok.Data;

@RestController
@Data
@AllArgsConstructor
@RequestMapping("/hr")
@CrossOrigin(origins = {""})
public class EmployeeController {
	
	EmployeeService empService;
	DepartmentService departmentService;
	SenderService senderService;
	
	@PostMapping("/send")
	public ResponseEntity<DataPacketDto> receivedData(@RequestBody ReceiverDto receivedDetails){
		DataPacketDto forwadToReceiver = senderService.forwadToReceiver(receivedDetails);
		return ResponseEntity.of(Optional.of(forwadToReceiver));
	}
	

//  working
	@PutMapping("/employee/{id}")
	public ResponseEntity<EmployeeDetailsDto> updateEmployee(@PathVariable("id") int empId,@RequestBody EmployeeDetailsDto newDetails) {
	    EmployeeDetailsDto updatedEmployee = empService.updateEmployee(empId, newDetails);
	    return ResponseEntity.of(Optional.of(updatedEmployee));
	}
	
	// working
	@GetMapping("/employee")
	public ResponseEntity<List<EmployeeDetailsDto>> fetchAllEmployees(){
		List<EmployeeDetailsDto> allEmployee = empService.getAllEmployee();
		return ResponseEntity.of(Optional.of(allEmployee));
	}
	
	// working
	@PostMapping("/employee")
	public ResponseEntity<EmployeeDetailsDto> createEmployee(@RequestBody EmployeeDetailsDto empDetails){
		System.out.println(empDetails);
		 EmployeeDetailsDto employee = empService.addEmployee(empDetails);
		return ResponseEntity.of(Optional.of(employee));
	}
	
	// working
	@GetMapping("/employee/{id}")
	public ResponseEntity<EmployeeDetailsDto> viewEmployee(@PathVariable int id){
		EmployeeDetailsDto employeeById = empService.getEmployeeById(id);
		if(employeeById != null) {
			return ResponseEntity.of(Optional.of(employeeById));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	
	// working
	@DeleteMapping("/employee/{id}")
	public ResponseEntity<?> deleteEmpById(@PathVariable("id") int empId){
		if(empService.removeEmployeeById(empId)) {
			return ResponseEntity.status(HttpStatus.OK).build();
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
		
	@GetMapping("/departments")
	public ResponseEntity<List<String>> fetchDepartments(){
		List<String> departments = departmentService.getDepartments();
		return ResponseEntity.of(Optional.of(departments));
	}
	
	

}
