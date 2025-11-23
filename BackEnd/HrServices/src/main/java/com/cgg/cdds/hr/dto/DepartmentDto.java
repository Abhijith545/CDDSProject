package com.cgg.cdds.hr.dto;

import java.util.List;

import com.cgg.cdds.hr.entities.Employee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentDto {
	private int deptId;
	private String deptName;
}
