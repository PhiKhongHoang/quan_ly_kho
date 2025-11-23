package com.ktn3_group.tieumoc.model.request.category;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReqUpdateCategoryDTO {
    private long id;
    private String name;
    private String description;
}
