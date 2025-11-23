package com.ktn3_group.tieumoc.repository;

import com.ktn3_group.tieumoc.model.Company;
import com.ktn3_group.tieumoc.model.CompanyDetail;
import com.ktn3_group.tieumoc.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyDetailRepo extends JpaRepository<CompanyDetail, Long> {
    Optional<CompanyDetail> findByCompanyAndProduct(Company company, Product product);

    List<CompanyDetail> findAllByCompany(Company company);
}
