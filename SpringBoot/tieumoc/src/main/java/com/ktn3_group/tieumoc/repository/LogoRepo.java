package com.ktn3_group.tieumoc.repository;

import com.ktn3_group.tieumoc.model.Logo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogoRepo extends JpaRepository<Logo, Long> {
}
