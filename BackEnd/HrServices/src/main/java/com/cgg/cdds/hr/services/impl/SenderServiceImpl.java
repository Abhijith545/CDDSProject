package com.cgg.cdds.hr.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cgg.cdds.hr.config.Receiver;
import com.cgg.cdds.hr.config.Sender;
import com.cgg.cdds.hr.dto.DataPacketDto;
import com.cgg.cdds.hr.dto.EmpLopSalDto;
import com.cgg.cdds.hr.dto.ReceiverDto;
import com.cgg.cdds.hr.services.EmployeeService;
import com.cgg.cdds.hr.services.SenderService;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Service
public class SenderServiceImpl implements SenderService {

	EmployeeService employeeService;
	DataPacketDto dataPacketDto;
	Sender sender;
	Receiver receiver;

	@Override
	public DataPacketDto forwadToReceiver(ReceiverDto receiverDto) {

		String encrytedMsg = new String();
		dataPacketDto.setSource(receiverDto.getSource());
		dataPacketDto.setDestination(receiverDto.getDestination());

		List<EmpLopSalDto> allLops = employeeService.getAllLops();

		try {
			encrytedMsg = sender.encrptMessage(allLops);
		} catch (Exception e) {
			e.printStackTrace();
		}
		dataPacketDto.setPayload(encrytedMsg);
		System.out.println(dataPacketDto);

		return dataPacketDto;
	}

	

}
