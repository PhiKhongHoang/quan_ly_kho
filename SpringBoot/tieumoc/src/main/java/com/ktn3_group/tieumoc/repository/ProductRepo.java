package com.ktn3_group.tieumoc.repository;

import com.ktn3_group.tieumoc.model.Category;
import com.ktn3_group.tieumoc.model.Company;
import com.ktn3_group.tieumoc.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long>,
        JpaSpecificationExecutor<Product> {
    boolean existsByName(String name);

    int countByCategoryId(Long id);

    List<Product> findAllByCompany(Company company);

    List<Product> findAllByCategory(Category category);

    List<Product> findAllByActiveTrue();
}
