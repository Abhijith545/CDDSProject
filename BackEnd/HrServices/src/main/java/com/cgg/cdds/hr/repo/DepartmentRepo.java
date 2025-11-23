package com.cgg.cdds.hr.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cgg.cdds.hr.entities.Department;

@Repository
public interface DepartmentRepo extends JpaRepository<Department, Integer> {
	
	// Custom method to find department by name
    Optional<Department> findByDeptName(String deptName);

}
