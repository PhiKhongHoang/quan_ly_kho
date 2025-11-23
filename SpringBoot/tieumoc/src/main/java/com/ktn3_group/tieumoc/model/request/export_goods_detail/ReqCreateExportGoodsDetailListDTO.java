package com.ktn3_group.tieumoc.model.request.export_goods_detail;

import com.ktn3_group.tieumoc.model.ExportGoods;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReqCreateExportGoodsDetailListDTO {
    private ExportGoods exportGoods;

    private List<ReqCreateExportGoodsDetailDTO.ExportGoodsDetail> exportGoodsDetails;

    @Getter
    @Setter
    public static class ExportGoodsDetail {
        private int quantity;
        private double exportPrice;
        private Product product;

        @Getter
        @Setter
        public static class Product {
            private long id;
        }
    }
}
