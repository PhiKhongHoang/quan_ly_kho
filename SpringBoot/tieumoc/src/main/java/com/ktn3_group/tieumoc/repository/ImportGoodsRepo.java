package com.ktn3_group.tieumoc.repository;

import com.ktn3_group.tieumoc.model.ImportGoods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ImportGoodsRepo extends JpaRepository<ImportGoods, Long>,
        JpaSpecificationExecutor<ImportGoods> {
}
