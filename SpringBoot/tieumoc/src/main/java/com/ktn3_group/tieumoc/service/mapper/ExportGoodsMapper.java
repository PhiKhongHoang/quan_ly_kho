package com.ktn3_group.tieumoc.service.mapper;

import com.ktn3_group.tieumoc.model.Company;
import com.ktn3_group.tieumoc.model.ExportGoods;
import com.ktn3_group.tieumoc.model.request.export_goods.ReqCreateExportGoodsDTO;
import com.ktn3_group.tieumoc.model.response.export_goods.ResCreateExportGoodsDTO;
import com.ktn3_group.tieumoc.model.response.export_goods.ResExportGoodsDTO;
import com.ktn3_group.tieumoc.repository.CompanyRepo;
import org.springframework.stereotype.Component;


@Component
public class ExportGoodsMapper {
    private final CompanyRepo companyRepo;

    public ExportGoodsMapper(CompanyRepo companyRepo) {
        this.companyRepo = companyRepo;
    }

    public final ResExportGoodsDTO convertToResExportGoodsDTO(ExportGoods exportGoods) {
        ResExportGoodsDTO res = new ResExportGoodsDTO();
        ResExportGoodsDTO.Company company = new ResExportGoodsDTO.Company();

        res.setId(exportGoods.getId());
        res.setDescription(exportGoods.getDescription());
        res.setActive(exportGoods.isActive());
        res.setCreatedAt(exportGoods.getCreatedAt());

        Company current_company = companyRepo.findById(exportGoods.getCompany().getId()).orElse(null);
        if (current_company != null) {
            company.setId(current_company.getId());
            company.setName(current_company.getName());
        }
        res.setCompany(company);

        return res;
    }

    public ResCreateExportGoodsDTO convertToResCreateExportGoodsDTO(ExportGoods exportGoods) {
        ResCreateExportGoodsDTO res = new ResCreateExportGoodsDTO();

        res.setId(exportGoods.getId());
        res.setDescription(exportGoods.getDescription());
        res.setCreatedBy(exportGoods.getCreatedBy());
        res.setCreatedAt(exportGoods.getCreatedAt());
        res.setCompany(exportGoods.getCompany());

        return res;
    }

    public ExportGoods convertFromReqCreateExportGoodsDTO(ReqCreateExportGoodsDTO request) {
        ExportGoods exportGoods = new ExportGoods();

        Company company = companyRepo.findById(request.getCompany().getId()).orElse(null);

        if (company != null) {
            exportGoods.setCompany(company);
        }

        exportGoods.setDescription(request.getDescription());
        exportGoods.setActive(false);

        return exportGoods;
    }

}
