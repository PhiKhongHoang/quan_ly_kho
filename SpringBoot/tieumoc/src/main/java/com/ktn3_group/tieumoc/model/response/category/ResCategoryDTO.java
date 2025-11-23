package com.ktn3_group.tieumoc.model.response.category;

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
public class ResCategoryDTO {
    private long id;
    private String name;
    private int quantity;
    private String description;
    private Instant updatedAt;
    private Instant createdAt;
    private String createdBy;
    private String updatedBy;

    private List<Products> products;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Products {
        private long id;
        private String name;
        private String description;
    }
}
