package com.ktn3_group.tieumoc.model.response.export_goods;

import com.ktn3_group.tieumoc.model.Company;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ResCreateExportGoodsDTO {
    private long id;
    private String description;
    private Instant createdAt;
    private String createdBy;
    private Company company;
}
