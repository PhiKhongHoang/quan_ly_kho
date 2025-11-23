package com.ktn3_group.tieumoc.repository;

import com.ktn3_group.tieumoc.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long>,
        JpaSpecificationExecutor<Category> {
    boolean existsByName(String name);

}
