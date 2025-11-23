package com.ktn3_group.tieumoc.service.mapper;

import com.ktn3_group.tieumoc.model.Company;
import com.ktn3_group.tieumoc.model.request.company.ReqCreateCompanyDTO;
import com.ktn3_group.tieumoc.model.request.company.ReqUpdateCompanyDTO;
import com.ktn3_group.tieumoc.model.response.company.ResCompanyDTO;
import com.ktn3_group.tieumoc.model.response.company.ResCreateCompanyDTO;
import com.ktn3_group.tieumoc.model.response.company.ResUpdateCompanyDTO;
import org.springframework.stereotype.Component;

@Component  // Thêm dòng này để Spring nhận diện lớp như một bean
public class CompanyMapper {

    public final ResCompanyDTO convertToResCompanyDTO(Company company) {
        ResCompanyDTO res = new ResCompanyDTO();

        res.setId(company.getId());
        res.setName(company.getName());
        res.setDescription(company.getDescription());
        res.setStatus(company.getStatus());
        res.setActive(company.isActive());
        res.setQuantity(company.getQuantity());
        res.setCreatedAt(company.getCreatedAt());
        res.setUpdatedAt(company.getUpdatedAt());

        return res;
    }

    public ResCreateCompanyDTO convertToResCreateCompanyDTO(Company company) {
        ResCreateCompanyDTO res = new ResCreateCompanyDTO();

        res.setId(company.getId());
        res.setName(company.getName());
        res.setDescription(company.getDescription());
        res.setStatus(company.getStatus());
        res.setActive(company.isActive());

        return res;
    }

    public ResUpdateCompanyDTO convertToResUpdateCompanyDTO(Company company) {
        ResUpdateCompanyDTO res = new ResUpdateCompanyDTO();

        res.setId(company.getId());
        res.setName(company.getName());
        res.setDescription(company.getDescription());
        res.setStatus(company.getStatus());
        res.setActive(company.isActive());


        return res;
    }

    public Company convertFromReqCreateCompanyDTO(ReqCreateCompanyDTO request) {
        Company company = new Company();

        company.setName(request.getName());
        company.setDescription(request.getDescription());
        company.setStatus(request.getStatus());
        company.setActive(true);

        return company;
    }

    public Company convertFromReqUpdateCompanyDTO(ReqUpdateCompanyDTO request) {
        Company company = new Company();

        company.setId(request.getId());
        company.setName(request.getName());
        company.setDescription(request.getDescription());
        company.setStatus(request.getStatus());
        company.setActive(request.isActive());

        return company;
    }
}
