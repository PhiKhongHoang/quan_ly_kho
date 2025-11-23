package com.ktn3_group.tieumoc.model.response.export_goods_detail;

import com.ktn3_group.tieumoc.model.ExportGoods;
import com.ktn3_group.tieumoc.model.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResCreateExportGoodsDetailDTO {
    private long id;
    private int quantity;
    private double exportPrice;
    private double totalAmount;
    private double profit;
    private ExportGoods exportGoods;
    private Product product;
}
