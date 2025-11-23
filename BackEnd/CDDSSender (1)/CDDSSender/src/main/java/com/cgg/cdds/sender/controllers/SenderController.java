package com.cgg.cdds.sender.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cgg.cdds.sender.dto.DataPacket;
import com.cgg.cdds.sender.dto.DepartmentDTO;
import com.cgg.cdds.sender.entities.Department;
import com.cgg.cdds.sender.service.SenderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/sender")
@AllArgsConstructor
public class SenderController {

	private SenderService senderService;
	
	@PostMapping("/send")
	public ResponseEntity<String> sendData(@RequestBody DataPacket packet) {
		try {
			String result = senderService.forwardToReciever(packet);
			return ResponseEntity.status(HttpStatus.OK).body(result);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("Failed to send data to Receiver");
		}
	}
	
	@PostMapping("/create")
	public ResponseEntity<Boolean> registerDepartment(@RequestBody DepartmentDTO deptDto) {
		try {
			boolean result = senderService.registerDept(deptDto);
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.CONFLICT).body(false);
		}
	}
	
	@GetMapping("/depts")
	public ResponseEntity<List<Department>> getAllRegisteredDepartments() {
		try {
			List<Department> depts = senderService.getDepts();
			return ResponseEntity.ok(depts);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(Collections.emptyList());
		}
	}
	
	
	
}
