package com.ktn3_group.tieumoc.controller;

import com.ktn3_group.tieumoc.model.Company;
import com.ktn3_group.tieumoc.model.CompanyDetail;
import com.ktn3_group.tieumoc.model.Product;
import com.ktn3_group.tieumoc.service.CompanyDetailService;
import com.ktn3_group.tieumoc.service.CompanyService;
import com.ktn3_group.tieumoc.util.annotation.ApiMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/companies_detail")
public class CompanyDetailController {
    private final CompanyDetailService companyDetailService;
    private final CompanyService companyService;

    public CompanyDetailController(CompanyDetailService companyDetailService,
                                   CompanyService companyService) {
        this.companyDetailService = companyDetailService;
        this.companyService = companyService;
    }

    @GetMapping("/{id}")
    @ApiMessage("Fetch all products by company")
    public ResponseEntity<List<CompanyDetail>> findAllByCompany(@PathVariable("id") long id) {
        Company company = companyService.handleFetchCompanyById(id);

        if (company != null) {
            List<CompanyDetail> companyDetails = companyDetailService.findAllByCompany(company);

            return ResponseEntity.ok().body(companyDetails);
        }

        return ResponseEntity.ok(null);
    }
}
