package com.cgg.cdds.receiver.service.Impl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.cgg.cdds.receiver.dto.DataPacket;
import com.cgg.cdds.receiver.entities.ShareLog;
import com.cgg.cdds.receiver.enums.AuditStatus;
import com.cgg.cdds.receiver.enums.FailureStatus;
import com.cgg.cdds.receiver.repository.ShareLogRepository;
import com.cgg.cdds.receiver.service.ReceiverService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReceiverServiceImpl implements ReceiverService {

	private WebClient webClient;
	private ShareLogRepository shareLogRepository;

	public String forwardToDept(DataPacket packet) {

		String s = packet.getSource().toLowerCase();
		String t = packet.getTarget().toLowerCase();

		System.out.println("Receiver: Got data from " + s);
		System.out.println("Target Dept: " + t);

		String finalUrl = "http://localhost:8090/" + t + "/consume";

		String response = webClient
							.post()
							.uri(finalUrl)
							.bodyValue(packet.getPayload())
							.retrieve()
							.bodyToMono(String.class)
							.block();

		logAudit(s, t, AuditStatus.SUCCESS, FailureStatus.NULL);
		return "response: " + response;
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
