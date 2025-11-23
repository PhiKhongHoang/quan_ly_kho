package com.ktn3_group.tieumoc.model.response.export_goods_detail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ResExportGoodsDetailDTO {
    private long id;
    private int quantity;
    private double exportPrice;
    private double totalAmount;
    private double profit;
    private String createdBy;
    private Instant createdAt;

    private Product product;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Product {
        private long id;
        private String name;
    }
}
