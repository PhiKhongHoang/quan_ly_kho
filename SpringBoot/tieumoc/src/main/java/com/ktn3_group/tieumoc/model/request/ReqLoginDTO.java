package com.ktn3_group.tieumoc.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqLoginDTO {
    @NotBlank(message = "Username không được để trống.")
    private String username;

    @NotBlank(message = "Password không được để trống.")
    private String password;

}

