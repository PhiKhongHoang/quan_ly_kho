package com.ktn3_group.tieumoc.model.response.export_goods;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ResExportGoodsDTO {
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
