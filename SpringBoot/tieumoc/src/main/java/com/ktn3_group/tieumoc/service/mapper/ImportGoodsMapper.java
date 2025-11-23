package com.ktn3_group.tieumoc.service.mapper;

import com.ktn3_group.tieumoc.model.Company;
import com.ktn3_group.tieumoc.model.ImportGoods;
import com.ktn3_group.tieumoc.model.request.import_goods.ReqCreateImportGoodsDTO;
import com.ktn3_group.tieumoc.model.response.import_goods.ResCreateImportGoodsDTO;
import com.ktn3_group.tieumoc.model.response.import_goods.ResImportGoodsDTO;
import com.ktn3_group.tieumoc.repository.CompanyRepo;
import org.springframework.stereotype.Component;


@Component
public class ImportGoodsMapper {
    private final CompanyRepo companyRepo;

    public ImportGoodsMapper(CompanyRepo companyRepo) {
        this.companyRepo = companyRepo;
    }

    public final ResImportGoodsDTO convertToResImportGoodsDTO(ImportGoods importGoods) {
        ResImportGoodsDTO res = new ResImportGoodsDTO();
        ResImportGoodsDTO.Company company = new ResImportGoodsDTO.Company();

        res.setId(importGoods.getId());
        res.setDescription(importGoods.getDescription());
        res.setActive(importGoods.isActive());
        res.setCreatedAt(importGoods.getCreatedAt());

        Company current_company = companyRepo.findById(importGoods.getCompany().getId()).orElse(null);
        if (current_company != null) {
            company.setId(current_company.getId());
            company.setName(current_company.getName());
        }
        res.setCompany(company);

        return res;
    }

    public ResCreateImportGoodsDTO convertToResCreateImportGoodsDTO(ImportGoods importGoods) {
        ResCreateImportGoodsDTO res = new ResCreateImportGoodsDTO();

        res.setId(importGoods.getId());
        res.setDescription(importGoods.getDescription());
        res.setCreatedBy(importGoods.getCreatedBy());
        res.setCreatedAt(importGoods.getCreatedAt());
        res.setCompany(importGoods.getCompany());

        return res;
    }

    public ImportGoods convertFromReqCreateImportGoodsDTO(ReqCreateImportGoodsDTO request) {
        ImportGoods importGoods = new ImportGoods();

        Company company = companyRepo.findById(request.getCompany().getId()).orElse(null);

        if (company != null) {
            importGoods.setCompany(company);
        }

        importGoods.setDescription(request.getDescription());
        importGoods.setActive(false);

        return importGoods;
    }

}
