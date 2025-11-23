package com.cgg.cdds.receiver.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DataPacket {
	
	private String source;
	private String target;
	private Object payload;

}