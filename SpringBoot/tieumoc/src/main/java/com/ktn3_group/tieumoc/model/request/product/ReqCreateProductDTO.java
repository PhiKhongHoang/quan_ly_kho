package com.ktn3_group.tieumoc.model.request.product;

import com.ktn3_group.tieumoc.model.Category;
import com.ktn3_group.tieumoc.model.Company;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqCreateProductDTO {
    private Category category;
    private Company company;
    private Product product;

    @Getter
    @Setter
    public static class Product {
        private String name;

        @Lob
        private String description;

        private double exportPrice;
        private int numberWarning;
    }

}
