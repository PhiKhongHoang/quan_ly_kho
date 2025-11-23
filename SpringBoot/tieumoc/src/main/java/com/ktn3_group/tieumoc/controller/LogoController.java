package com.ktn3_group.tieumoc.controller;

import com.ktn3_group.tieumoc.model.Logo;
import com.ktn3_group.tieumoc.service.LogoService;
import com.ktn3_group.tieumoc.util.annotation.ApiMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/logo")
public class LogoController {
    private final LogoService logoService;

    public LogoController(LogoService logoService) {
        this.logoService = logoService;
    }

    @PostMapping("")
    @ApiMessage("Create a new logo")
    public ResponseEntity<Logo> createLogo(@RequestBody Logo request) {
        Logo result = logoService.createLogo(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(result);
    }

    @GetMapping("")
    @ApiMessage("Get a logo")
    public ResponseEntity<List<Logo>> getLogo() {
        return ResponseEntity.ok().body(logoService.getLogo());
    }
}
