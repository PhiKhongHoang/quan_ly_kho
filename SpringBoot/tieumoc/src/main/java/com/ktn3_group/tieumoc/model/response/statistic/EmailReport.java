package com.ktn3_group.tieumoc.model.response.statistic;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailReport {
    private double total;
    private Report report;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Report {
        private int month;
        private int year;
        private List<ProductProfitDTO> list;
    }
}
