package com.ktn3_group.tieumoc.model.request.user;

import com.ktn3_group.tieumoc.model.Role;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReqUpdateUserDTO {
    private long id;
    private String name;
    private boolean active;
    private Role role;
}
