package com.cgg.cdds.sender.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cgg.cdds.sender.entities.Department;

public interface SenderRepository extends JpaRepository<Department, Long> {
	public Department findByDeptName(String deptName); 
}
