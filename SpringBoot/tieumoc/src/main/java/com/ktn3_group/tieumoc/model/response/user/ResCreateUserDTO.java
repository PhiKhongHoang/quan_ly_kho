package com.ktn3_group.tieumoc.model.response.user;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResCreateUserDTO {
    private long id;
    private String name;
    private boolean active;
    private Instant createdAt;
    private String createdBy;
}
