package com.cgg.cdds.hr.services;

import java.util.List;

import com.cgg.cdds.hr.dto.DataPacketDto;
import com.cgg.cdds.hr.dto.EmpLopSalDto;
import com.cgg.cdds.hr.dto.ReceiverDto;

public interface SenderService {
	
	public DataPacketDto forwadToReceiver(ReceiverDto receiverDto);
	

}
