package com.ktn3_group.tieumoc.model.request.user;

import com.ktn3_group.tieumoc.model.Role;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReqCreateUserDTO {
    private String name;
    private String email;
    private String password;
    private Role role;
}
