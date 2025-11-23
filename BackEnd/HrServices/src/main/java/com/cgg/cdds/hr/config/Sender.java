package com.cgg.cdds.hr.config;

import java.io.ByteArrayOutputStream;
import java.util.Base64;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

@Component
public class Sender {
    private static final String BASE64_KEY = "W9F+7EzJmRFGcJH0q5uE6A=="; // shared key

    public static String encrptMessage(Object obj) throws Exception {

        SecretKey key = new SecretKeySpec(
                Base64.getDecoder().decode(BASE64_KEY),
                "AES"
        );

       
        byte[] objectBytes = CryptoUtils.serialize(obj);

        // Generate a new random IV
        byte[] iv = CryptoUtils.generateIV();

        // Encrypt object
        byte[] encryptedData = CryptoUtils.encrypt(objectBytes, key, iv);

        // Combine IV + encrypted bytes
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        output.write(iv);                // first 16 bytes
        output.write(encryptedData);     // remaining bytes

        String finalData = Base64.getEncoder().encodeToString(output.toByteArray());

        System.out.println("Send this: " + finalData);
        
        return finalData;
    }
}
