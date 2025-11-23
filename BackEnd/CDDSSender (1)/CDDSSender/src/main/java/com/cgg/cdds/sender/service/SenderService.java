package com.cgg.cdds.sender.service;

import java.util.List;

import com.cgg.cdds.sender.dto.DataPacket;
import com.cgg.cdds.sender.dto.DepartmentDTO;
import com.cgg.cdds.sender.entities.Department;
import com.cgg.cdds.sender.enums.AuditStatus;
import com.cgg.cdds.sender.enums.FailureStatus;

public interface SenderService {
	public String forwardToReciever(DataPacket packet);
	public boolean registerDept(DepartmentDTO deptDto);
	public List<Department> getDepts();
	public void logAudit(String source, String target, AuditStatus auditStatus, FailureStatus failureStatus);
}
