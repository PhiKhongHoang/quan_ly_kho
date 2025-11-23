package com.ktn3_group.tieumoc.model;

import java.time.LocalDateTime;

public class OtpDetails {
    private String otp;
    private LocalDateTime expiryTime;

    public OtpDetails(String otp, LocalDateTime expiryTime) {
        this.otp = otp;
        this.expiryTime = expiryTime;
    }

    public String getOtp() {
        return otp;
    }

    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryTime);
    }
}
