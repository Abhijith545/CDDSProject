package com.cgg.cdds.hr.dto;

import java.time.Month;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceiverDto {
	private String source;
	private String destination;
}
