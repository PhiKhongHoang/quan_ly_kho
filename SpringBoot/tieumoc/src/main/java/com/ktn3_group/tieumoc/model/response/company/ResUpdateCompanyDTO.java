package com.ktn3_group.tieumoc.model.response.company;

import com.ktn3_group.tieumoc.util.constant.CompanyEnum;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ResUpdateCompanyDTO {
    private long id;
    private String name;
    private String description;
    private CompanyEnum status;
    private boolean active;
}
