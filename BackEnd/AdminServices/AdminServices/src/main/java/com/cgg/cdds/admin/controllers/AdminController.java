package com.cgg.cdds.admin.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cgg.cdds.admin.entities.Department;
import com.cgg.cdds.admin.services.AdminService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {
	
	private AdminService adminService;
	
	@PostMapping("/register")
	public ResponseEntity<String> registerDepartment(@RequestBody Department dept) {
	    try {
	        String result = adminService.registerDept(dept.getDeptId(), dept.getDeptName());
	        return ResponseEntity.status(HttpStatus.CREATED).body(result);
	    } catch (Exception e) {
	    		e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Department registration failed");
	    }
	}
	
}
