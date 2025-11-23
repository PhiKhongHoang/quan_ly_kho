package com.ktn3_group.tieumoc.service;

import com.ktn3_group.tieumoc.model.Company;
import com.ktn3_group.tieumoc.model.CompanyDetail;
import com.ktn3_group.tieumoc.model.Product;
import com.ktn3_group.tieumoc.repository.CompanyDetailRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyDetailService {
    private final CompanyDetailRepo companyDetailRepo;

    public CompanyDetailService(CompanyDetailRepo companyDetailRepo) {
        this.companyDetailRepo = companyDetailRepo;
    }

    public CompanyDetail handleCreateCompanyDetail(CompanyDetail request) {
        return companyDetailRepo.save(request);
    }

    public CompanyDetail findById(long id) {
        return companyDetailRepo.findById(id).orElse(null);
    }

    public CompanyDetail findByCompanyAndProduct(Company company, Product product) {
        return companyDetailRepo.findByCompanyAndProduct(company, product).orElse(null);
    }

    public List<CompanyDetail> findAllByCompany(Company company) {
        return companyDetailRepo.findAllByCompany(company);
    }
}
