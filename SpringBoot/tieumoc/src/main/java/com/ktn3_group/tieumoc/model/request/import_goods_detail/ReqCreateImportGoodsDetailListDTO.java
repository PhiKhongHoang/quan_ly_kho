package com.ktn3_group.tieumoc.model.request.import_goods_detail;

import com.ktn3_group.tieumoc.model.ImportGoods;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReqCreateImportGoodsDetailListDTO {
    private ImportGoods importGoods;

    private List<ReqCreateImportGoodsDetailDTO.ImportGoodsDetail> importGoodsDetails;

    @Getter
    @Setter
    public static class ImportGoodsDetail {
        private int quantity;
        private double importPrice;
        private Product product;

        @Getter
        @Setter
        public static class Product {
            private long id;
        }
    }
}
