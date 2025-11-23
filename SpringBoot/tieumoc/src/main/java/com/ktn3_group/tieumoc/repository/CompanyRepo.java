package com.ktn3_group.tieumoc.repository;

import com.ktn3_group.tieumoc.model.Company;
import com.ktn3_group.tieumoc.util.constant.CompanyEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepo extends JpaRepository<Company, Long>,
        JpaSpecificationExecutor<Company> {
    boolean existsByName(String name);

    List<Company> findByStatus(CompanyEnum status);

    List<Company> findByStatusAndActiveTrue(CompanyEnum status);
}
