package com.ktn3_group.tieumoc.service;

import com.ktn3_group.tieumoc.model.OtpDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private ConcurrentHashMap<String, OtpDetails> otpStorage = new ConcurrentHashMap<>();

    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Tạo và gửi OTP
    public void generateAndSendOtp(String email) {
        String otp = generateOtp();
        emailService.sendOtpEmail(email, otp);

        String hashOtp = passwordEncoder.encode(otp);
        OtpDetails otpDetails = new OtpDetails(hashOtp, LocalDateTime.now().plusMinutes(5)); // OTP có hiệu lực trong 5 phút
        otpStorage.put(email, otpDetails);
    }

    // Tạo OTP ngẫu nhiên 6 chữ số
    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // tạo OTP 6 chữ số
        return String.valueOf(otp);
    }

    // Kiểm tra OTP
    public boolean verifyOtp(String email, String enteredOtp) {
        OtpDetails otpDetails = otpStorage.get(email);

        if (otpDetails == null) {
            return false; // Không tìm thấy OTP
        }

        if (otpDetails.isExpired()) {
            otpStorage.remove(email); // Xóa OTP nếu hết hạn
            return false; // OTP hết hạn
        }

        return passwordEncoder.matches(enteredOtp, otpDetails.getOtp()); // decode otp và ktra otp
//        return otpDetails.getOtp().equals(enteredOtp); // Kiểm tra OTP
    }
}
