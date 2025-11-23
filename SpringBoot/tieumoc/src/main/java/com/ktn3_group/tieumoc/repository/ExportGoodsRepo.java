package com.ktn3_group.tieumoc.repository;

import com.ktn3_group.tieumoc.model.ExportGoods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ExportGoodsRepo extends JpaRepository<ExportGoods, Long>,
        JpaSpecificationExecutor<ExportGoods> {
}
