package com.cgg.cdds.sender.service.Impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.cgg.cdds.sender.dto.DataPacket;
import com.cgg.cdds.sender.dto.DepartmentDTO;
import com.cgg.cdds.sender.entities.Department;
import com.cgg.cdds.sender.entities.ShareLog;
import com.cgg.cdds.sender.enums.AuditStatus;
import com.cgg.cdds.sender.enums.FailureStatus;
import com.cgg.cdds.sender.repositories.SenderRepository;
import com.cgg.cdds.sender.repositories.ShareLogRepository;
import com.cgg.cdds.sender.service.SenderService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SenderServiceImpl implements SenderService{

	private WebClient webClient;
	private SenderRepository senderRepository;
	private ShareLogRepository shareLogRepository;
	
	private final String revieverUrl = "http://localhost:8084/receiver/receive";
	
	@Override
	public String forwardToReciever(DataPacket packet) {
		System.out.println("Packet Coming From: " + packet.getSource());
		
		String s = packet.getSource().toLowerCase();
		String t = packet.getTarget().toLowerCase();
		
		Department source = senderRepository.findByDeptName(s);
		Department target = senderRepository.findByDeptName(t);
		
		if (source == null) {
			logAudit(s, t, AuditStatus.FAILURE, FailureStatus.MISSING_SOURCE);
			return "Source Department Not Found";
		}
		if (target == null) {
			logAudit(s, t, AuditStatus.FAILURE, FailureStatus.MISSING_TARGET);
			return "Target Department Not Found";
		}
		
		
		String response = webClient.post()
                .uri(revieverUrl)
                .bodyValue(packet)
                .retrieve()
                .bodyToMono(String.class)
                .block();
		
		return "sender -> reciever Response: " + response;
	}

	@Override
	public boolean registerDept(DepartmentDTO deptDto) {
		Department d = senderRepository.findById(deptDto.getDeptId()).orElse(null);
		if (d == null) {
			Department department = new Department();
			department.setDeptId(deptDto.getDeptId());
			department.setDeptName(deptDto.getDeptName().toLowerCase());
			senderRepository.save(department);
			logAudit(deptDto.getDeptName().toLowerCase(), null, AuditStatus.REGISTERED, FailureStatus.NULL);
			return true;
		}
		return false;
	}

	@Override
	public List<Department> getDepts() {
		return senderRepository.findAll();
	}

	@Override
	public void logAudit(String source, String target, AuditStatus auditStatus, FailureStatus failureStatus) {
		ShareLog log = new ShareLog();
	    log.setSource(source);
	    log.setTarget(target);
	    log.setAuditStatus(auditStatus);
	    log.setFailureStatus(failureStatus);
	    log.setTimeStamp(LocalDateTime.now());

	    shareLogRepository.save(log);
	}

}
