package com.cgg.cdds.hr.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpLopSalDto implements Serializable {
	private int empId;
	private double empBaseSalary;
	private int empLop;

}
