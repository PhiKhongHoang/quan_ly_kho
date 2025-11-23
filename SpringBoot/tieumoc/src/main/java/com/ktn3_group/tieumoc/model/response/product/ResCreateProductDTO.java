package com.ktn3_group.tieumoc.model.response.product;

import com.ktn3_group.tieumoc.model.Category;
import com.ktn3_group.tieumoc.model.Company;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResCreateProductDTO {
    private long id;
    private Category category;
    private Company company;
    private String name;
    private String description;
    private boolean active;
    private double exportPrice;
    private int numberWarning;
}
