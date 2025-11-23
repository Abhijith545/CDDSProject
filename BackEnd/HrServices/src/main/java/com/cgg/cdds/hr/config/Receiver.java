package com.cgg.cdds.hr.config;

import java.util.Arrays;
import java.util.Base64;
import java.util.List;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

import com.cgg.cdds.hr.dto.EmpLopSalDto;

@Component
public class Receiver {
    private static final String BASE64_KEY = "W9F+7EzJmRFGcJH0q5uE6A=="; // same shared key

    public static List<EmpLopSalDto> decrypteMessage(String encryptedMessage) throws Exception {

        SecretKey key = new SecretKeySpec(
                Base64.getDecoder().decode(BASE64_KEY),
                "AES"
        );

        // Incoming message from sender
        String incomingBase64 = encryptedMessage;

        byte[] allBytes = Base64.getDecoder().decode(incomingBase64);

        // Extract IV (first 16 bytes)
        byte[] iv = Arrays.copyOfRange(allBytes, 0, 16);

        // Extract encrypted object bytes
        byte[] cipherBytes = Arrays.copyOfRange(allBytes, 16, allBytes.length);

        // Decrypt
        byte[] decrypted = CryptoUtils.decrypt(cipherBytes, key, iv);

        List<EmpLopSalDto> allEmployeeDetails =  (List<EmpLopSalDto>) CryptoUtils.deserialize(decrypted);

        System.out.println("Decrypted object: " + allEmployeeDetails);
        
        return allEmployeeDetails;
    }
}
