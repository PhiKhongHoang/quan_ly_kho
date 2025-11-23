package com.ktn3_group.tieumoc.repository;

import com.ktn3_group.tieumoc.model.ImportGoods;
import com.ktn3_group.tieumoc.model.ImportGoodsDetail;
import com.ktn3_group.tieumoc.model.response.import_goods_detail.ResProductReportDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ImportGoodsDetailRepo extends JpaRepository<ImportGoodsDetail, Long>,
        JpaSpecificationExecutor<ImportGoodsDetail> {
    List<ImportGoodsDetail> findByOrderByIdAsc();

    List<ImportGoodsDetail> findAllByImportGoods(ImportGoods importGoods);

    // report by month
    @Query("SELECT new com.ktn3_group.tieumoc.model.response.import_goods_detail.ResProductReportDTO(e.product.id, e.product.name, " +
            "SUM(e.quantity), SUM(e.totalAmount) )" +
            "FROM ImportGoodsDetail e " +
            "WHERE FUNCTION('MONTH', e.createdAt) = :month AND FUNCTION('YEAR', e.createdAt) = :year " +
            "GROUP BY e.product.id, e.product.name")
    List<ResProductReportDTO> getProductReportByMonthAndYear(@Param("month") int month, @Param("year") int year);


    // report by year
    @Query("SELECT new com.ktn3_group.tieumoc.model.response.import_goods_detail.ResProductReportDTO(p.id, p.name, " +
            "SUM(e.quantity), SUM(e.totalAmount) )" +
            "FROM ImportGoodsDetail e " +
            "JOIN e.product p " +
            "WHERE FUNCTION('YEAR', e.createdAt) = :year " +
            "GROUP BY p.id, p.name")
    List<ResProductReportDTO> getProductReportByYear(@Param("year") int year);
}
