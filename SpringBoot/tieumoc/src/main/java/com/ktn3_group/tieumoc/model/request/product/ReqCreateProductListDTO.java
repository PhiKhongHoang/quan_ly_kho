package com.ktn3_group.tieumoc.model.request.product;

import com.ktn3_group.tieumoc.model.Category;
import com.ktn3_group.tieumoc.model.Company;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReqCreateProductListDTO {
    private Company company;
    private Category category;
    private List<ReqCreateProductDTO.Product> products;

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

