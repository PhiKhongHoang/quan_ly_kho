package com.ktn3_group.tieumoc.model.response.company;

import com.ktn3_group.tieumoc.util.constant.CompanyEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResCompanyDTO {
    private long id;
    private String name;
    private String description;
    private CompanyEnum status;
    private int quantity;
    private boolean active;
    private Instant updatedAt;
    private Instant createdAt;
    private String createdBy;
    private String updatedBy;
}
