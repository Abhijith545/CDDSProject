package com.cgg.cdds.sender.entities;

import java.time.LocalDateTime;

import com.cgg.cdds.sender.enums.AuditStatus;
import com.cgg.cdds.sender.enums.FailureStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class ShareLog {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long logId;
	private String source;
	private String target;
	@Enumerated(EnumType.STRING)
	private AuditStatus auditStatus;
	@Enumerated(EnumType.STRING)
	private FailureStatus failureStatus;
	private LocalDateTime timeStamp;
}
