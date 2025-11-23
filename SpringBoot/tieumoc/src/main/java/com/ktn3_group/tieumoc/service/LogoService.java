package com.ktn3_group.tieumoc.service;

import com.ktn3_group.tieumoc.model.Logo;
import com.ktn3_group.tieumoc.repository.LogoRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LogoService {
    private final LogoRepo logoRepo;

    public LogoService(LogoRepo logoRepo) {
        this.logoRepo = logoRepo;
    }

    public Logo createLogo(Logo logo) {
        return logoRepo.save(logo);
    }

    public List<Logo> getLogo() {
        return logoRepo.findAll();
    }
}
