package com.ktn3_group.tieumoc.service;

import com.ktn3_group.tieumoc.model.Company;
import com.ktn3_group.tieumoc.model.response.ResultPaginationDTO;
import com.ktn3_group.tieumoc.model.response.company.ResCompanyDTO;
import com.ktn3_group.tieumoc.repository.CompanyRepo;
import com.ktn3_group.tieumoc.service.mapper.CompanyMapper;
import com.ktn3_group.tieumoc.util.constant.CompanyEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompanyService {
    private final CompanyRepo companyRepo;
    private final CompanyMapper companyMapper;

    public CompanyService(CompanyRepo companyRepo, CompanyMapper companyMapper) {
        this.companyMapper = companyMapper;
        this.companyRepo = companyRepo;
    }

    public Company handleCreateCompany(Company request) {
        return companyRepo.save(request);
    }

    public Company handleFetchCompanyById(long id) {
        Optional<Company> companyOptional = companyRepo.findById(id);
        return companyOptional.orElse(null);
    }

    public void handleDeleteCompanyById(long id) {
        companyRepo.deleteById(id);
    }

    public boolean existsByName(String name) {
        return companyRepo.existsByName(name);
    }

    public Company handleUpdateCompany(Company request) {
        Company currentCompany = handleFetchCompanyById(request.getId());
        if (currentCompany != null) {
            currentCompany.setName(request.getName());
            currentCompany.setDescription(request.getDescription());
            currentCompany.setStatus(request.getStatus());
            currentCompany.setActive(request.isActive());

            // update
            currentCompany = companyRepo.save(currentCompany);
        }
        return currentCompany;
    }

    public ResultPaginationDTO handleFetchAllCompany(
            Specification<Company> spec,
            Pageable pageable) {
        Page<Company> pageCompany = companyRepo.findAll(spec, pageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        ResultPaginationDTO.Meta mt = new ResultPaginationDTO.Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());

        mt.setPages(pageCompany.getTotalPages());
        mt.setTotal(pageCompany.getTotalElements());

        rs.setMeta(mt);

        // remove sensitive data
        List<ResCompanyDTO> listCompany = pageCompany.getContent()
                .stream().map(companyMapper::convertToResCompanyDTO)
                .collect(Collectors.toList());

        rs.setResult(listCompany);

        return rs;
    }

    public List<Company> getCompaniesWithSellStatus() {
        return companyRepo.findByStatus(CompanyEnum.SELL);
    }

    public List<Company> getCompaniesWithBuyStatus() {
        return companyRepo.findByStatus(CompanyEnum.BUY);
    }

    public List<Company> getCompaniesWithSellStatusAndActiveTrue() {
        return companyRepo.findByStatusAndActiveTrue(CompanyEnum.SELL);
    }

    public List<Company> getCompaniesWithBuyStatusAndActiveTrue() {
        return companyRepo.findByStatusAndActiveTrue(CompanyEnum.BUY);
    }

}
