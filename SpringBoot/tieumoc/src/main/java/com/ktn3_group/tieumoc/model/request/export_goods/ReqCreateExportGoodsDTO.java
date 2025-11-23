package com.ktn3_group.tieumoc.model.request.export_goods;

import com.ktn3_group.tieumoc.model.Company;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqCreateExportGoodsDTO {
    private String description;
    private Company company;
}
