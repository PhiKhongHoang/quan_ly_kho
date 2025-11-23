package com.ktn3_group.tieumoc.repository;

import com.ktn3_group.tieumoc.model.Follow;
import com.ktn3_group.tieumoc.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepo extends JpaRepository<Follow, Long> {
    Optional<Follow> findByProductAndCreatedBy(Product product, String createdBy);

    List<Follow> findTop2ByCreatedByOrderByFollowDesc(String createdBy);
}
