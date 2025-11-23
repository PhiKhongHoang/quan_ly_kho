package com.ktn3_group.tieumoc.model.request.import_goods_detail;

import com.ktn3_group.tieumoc.model.ImportGoods;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqCreateImportGoodsDetailDTO {
    private ImportGoods importGoods;
    private ImportGoodsDetail importGoodsDetail;

    @Getter
    @Setter
    public static class ImportGoodsDetail {
        private Product product;
        private int quantity;
        private double importPrice;

        @Getter
        @Setter
        public static class Product {
            private long id;
        }
    }
}
