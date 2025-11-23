package com.ktn3_group.tieumoc.model.response.import_goods_detail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResProductReportDTO {
    private long idProduct;
    private String productName;
    private long totalQuantity;
    private double totalAmount;
}
