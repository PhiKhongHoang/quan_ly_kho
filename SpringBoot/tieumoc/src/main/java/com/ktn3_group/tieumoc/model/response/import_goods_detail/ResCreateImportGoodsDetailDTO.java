package com.ktn3_group.tieumoc.model.response.import_goods_detail;

import com.ktn3_group.tieumoc.model.ImportGoods;
import com.ktn3_group.tieumoc.model.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResCreateImportGoodsDetailDTO {
    private long id;
    private int quantity;
    private double importPrice;
    private double totalAmount;
    private ImportGoods importGoods;
    private Product product;
}
