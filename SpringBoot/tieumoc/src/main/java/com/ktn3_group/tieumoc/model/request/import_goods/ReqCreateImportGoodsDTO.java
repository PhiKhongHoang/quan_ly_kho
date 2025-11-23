package com.ktn3_group.tieumoc.model.request.import_goods;

import com.ktn3_group.tieumoc.model.Company;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqCreateImportGoodsDTO {
    private String description;
    private Company company;
}
