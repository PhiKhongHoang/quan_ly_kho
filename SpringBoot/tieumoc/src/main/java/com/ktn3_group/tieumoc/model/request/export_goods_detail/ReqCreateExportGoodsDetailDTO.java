package com.ktn3_group.tieumoc.model.request.export_goods_detail;

import com.ktn3_group.tieumoc.model.ExportGoods;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqCreateExportGoodsDetailDTO {
    private ExportGoods exportGoods;
    private ExportGoodsDetail exportGoodsDetail;

    @Getter
    @Setter
    public static class ExportGoodsDetail {
        private Product product;
        private int quantity;
        private double exportPrice;

        @Getter
        @Setter
        public static class Product {
            private long id;
        }
    }
}
