package com.ktn3_group.tieumoc.model.request.category;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReqCreateCategoryDTO {
    private String name;
    private String description;
}
