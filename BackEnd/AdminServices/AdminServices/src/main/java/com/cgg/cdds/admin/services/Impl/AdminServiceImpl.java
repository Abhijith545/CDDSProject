package com.cgg.cdds.admin.services.Impl;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.cgg.cdds.admin.dto.DepartmentDTO;
import com.cgg.cdds.admin.services.AdminService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService{

	private WebClient webClient;
	
	
	@Override
	public String registerDept(Long deptId, String deptName) {
		String senderRegisterUrl = "http://localhost:8083/sender/create";
		DepartmentDTO departmentDTO = new DepartmentDTO(deptId, deptName);
		
		String response = webClient.post()
                .uri(senderRegisterUrl)
                .bodyValue(departmentDTO)
                .retrieve()
                .bodyToMono(String.class)
                .block();
		
		return response; 
	}

}
