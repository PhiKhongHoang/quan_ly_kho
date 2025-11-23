package com.ktn3_group.tieumoc.model.response.product;

import com.ktn3_group.tieumoc.model.Category;
import com.ktn3_group.tieumoc.model.Company;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ResProductDTO {
    private long id;
    private Category category;
    private Company company;
    private String name;
    private int quantity;
    private String description;
    private boolean active;
    private double latestImportPrice;
    private double exportPrice;
    private int numberWarning;
    private int quantitySold;
    private Instant createdAt;
    private Instant updatedAt;
    private String createdBy;
    private String updatedBy;
}
