package com.ktn3_group.tieumoc.controller;

import com.ktn3_group.tieumoc.model.Company;
import com.ktn3_group.tieumoc.model.request.company.ReqCreateCompanyDTO;
import com.ktn3_group.tieumoc.model.request.company.ReqUpdateCompanyDTO;
import com.ktn3_group.tieumoc.model.response.ResultPaginationDTO;
import com.ktn3_group.tieumoc.model.response.company.ResCompanyDTO;
import com.ktn3_group.tieumoc.model.response.company.ResCreateCompanyDTO;
import com.ktn3_group.tieumoc.model.response.company.ResUpdateCompanyDTO;
import com.ktn3_group.tieumoc.service.CompanyService;
import com.ktn3_group.tieumoc.service.mapper.CompanyMapper;
import com.ktn3_group.tieumoc.util.annotation.ApiMessage;
import com.ktn3_group.tieumoc.util.error.IdInvalidException;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/companies")
public class CompanyController {
    private final CompanyService companyService;
    private final CompanyMapper companyMapper;

    public CompanyController(CompanyService companyService, CompanyMapper companyMapper) {
        this.companyService = companyService;
        this.companyMapper = companyMapper;
    }

    @PostMapping("")
    @ApiMessage("Create a new company")
    public ResponseEntity<ResCreateCompanyDTO> createNewUser(
            @Valid @RequestBody ReqCreateCompanyDTO request) throws IdInvalidException {
        boolean isEmailExist = companyService.existsByName(request.getName());
        if (isEmailExist) {
            throw new IdInvalidException(
                    "Tên công ty " + request.getName() + " đã tồn tại. Vui lòng chọn một tên khác!");
        }

        Company company = companyMapper.convertFromReqCreateCompanyDTO(request);

        company = companyService.handleCreateCompany(company);

        ResCreateCompanyDTO result = companyMapper.convertToResCreateCompanyDTO(company);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(result);
    }

    @PutMapping("")
    @ApiMessage("Update a company")
    public ResponseEntity<ResUpdateCompanyDTO> updateUser(
            @RequestBody ReqUpdateCompanyDTO request)
            throws IdInvalidException {
        Company company = companyMapper.convertFromReqUpdateCompanyDTO(request);

        Company currentCompany = companyService.handleUpdateCompany(company);
        if (currentCompany == null) {
            throw new IdInvalidException("Công ty với id = " + request.getId() + " không tồn tại!");
        }

        ResUpdateCompanyDTO result = companyMapper.convertToResUpdateCompanyDTO(currentCompany);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    @ApiMessage("delete company by id")
    public ResponseEntity<Void> handleDeleteCompanyById(@PathVariable("id") long id) {
        companyService.handleDeleteCompanyById(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("")
    @ApiMessage("Fetch all companies")
    public ResponseEntity<ResultPaginationDTO> getAllCompany(
            @Filter Specification<Company> spec,
            Pageable pageable) {

        return ResponseEntity.status(HttpStatus.OK).body(
                companyService.handleFetchAllCompany(spec, pageable));
    }

    @GetMapping("/sell")
    @ApiMessage("Fetch all companies sell")
    public ResponseEntity<List<Company>> getAllCompanySell() {

        return ResponseEntity.status(HttpStatus.OK).body(
                companyService.getCompaniesWithSellStatus());
    }

    @GetMapping("/buy")
    @ApiMessage("Fetch all companies buy")
    public ResponseEntity<List<Company>> getAllCompanyBuy() {

        return ResponseEntity.status(HttpStatus.OK).body(
                companyService.getCompaniesWithBuyStatus());
    }

    @GetMapping("/active/sell")
    @ApiMessage("Fetch all companies sell and active true")
    public ResponseEntity<List<Company>> getAllCompanySellAndActiveTrue() {

        return ResponseEntity.status(HttpStatus.OK).body(
                companyService.getCompaniesWithSellStatusAndActiveTrue());
    }

    @GetMapping("/active/buy")
    @ApiMessage("Fetch all companies buy and active true")
    public ResponseEntity<List<Company>> getAllCompanyBuyAndActiveTrue() {

        return ResponseEntity.status(HttpStatus.OK).body(
                companyService.getCompaniesWithBuyStatusAndActiveTrue());
    }

}
