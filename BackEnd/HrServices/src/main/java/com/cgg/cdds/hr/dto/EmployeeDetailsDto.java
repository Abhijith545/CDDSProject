package com.cgg.cdds.hr.dto;

import java.time.LocalDate;

import com.cgg.cdds.hr.entities.Department;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDetailsDto {

	private int empId;
	private String empName;
	private String empEmail;
	private String address;
	private String empDesignation;
	private double empBaseSalary;
	private int empLop;
	private DepartmentDto department;

}
