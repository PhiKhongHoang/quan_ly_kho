package com.ktn3_group.tieumoc.model.response.statistic;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductProfitDTO {
    private String productName;
    private Double profit;
}
