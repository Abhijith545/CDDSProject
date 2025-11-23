package com.cgg.cdds.receiver.service;

import com.cgg.cdds.receiver.dto.DataPacket;
import com.cgg.cdds.receiver.enums.AuditStatus;
import com.cgg.cdds.receiver.enums.FailureStatus;

public interface ReceiverService {
	public String forwardToDept(DataPacket packet);
	public void logAudit(String source, String target, AuditStatus auditStatus, FailureStatus failureStatus);
}
