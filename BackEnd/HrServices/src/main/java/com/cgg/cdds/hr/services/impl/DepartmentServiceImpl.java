package com.cgg.cdds.hr.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cgg.cdds.hr.entities.Department;
import com.cgg.cdds.hr.repo.DepartmentRepo;
import com.cgg.cdds.hr.services.DepartmentService;

import lombok.AllArgsConstructor;
import lombok.Data;

@Service
@Data
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService{
	
	DepartmentRepo departmentRepo;
	
	@Override
	public List<String> getDepartments(){
		List<Department> allDetails = departmentRepo.findAll();
		List<String> collectedData = allDetails.stream().map(dept -> dept.getDeptName()).collect(Collectors.toList());
		return collectedData;
	}

}
