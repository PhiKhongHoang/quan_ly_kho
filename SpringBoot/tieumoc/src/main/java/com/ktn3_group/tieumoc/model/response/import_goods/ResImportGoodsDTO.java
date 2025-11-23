package com.ktn3_group.tieumoc.model.response.import_goods;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ResImportGoodsDTO {
    private long id;
    private String description;
    private boolean active;
    private Instant createdAt;

    private Company company;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Company {
        private long id;
        private String name;
    }
}
