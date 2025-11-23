package com.cgg.cdds.receiver.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cgg.cdds.receiver.dto.DataPacket;
import com.cgg.cdds.receiver.service.ReceiverService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/receiver")
@AllArgsConstructor
public class ReceiverController {
	
	private ReceiverService receiverService;
	
	@PostMapping("/receive")
	public ResponseEntity<String> receiveData(@RequestBody DataPacket packet) {
	    try {
	        String result = receiverService.forwardToDept(packet);
	        return ResponseEntity.status(HttpStatus.OK).body(result);
	    } catch (Exception e) {
	    		e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Error while processing received data");
	    }
	}

}
