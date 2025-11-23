package com.ktn3_group.tieumoc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class TieumocApplication {

    public static void main(String[] args) {
        SpringApplication.run(TieumocApplication.class, args);
    }

}
