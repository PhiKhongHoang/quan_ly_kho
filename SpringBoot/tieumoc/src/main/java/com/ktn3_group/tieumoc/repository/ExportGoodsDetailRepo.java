package com.ktn3_group.tieumoc.repository;

import com.ktn3_group.tieumoc.model.ExportGoods;
import com.ktn3_group.tieumoc.model.ExportGoodsDetail;
import com.ktn3_group.tieumoc.model.response.export_goods_detail.ResProductReportDTO;
import com.ktn3_group.tieumoc.model.response.statistic.ProductProfitDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public interface ExportGoodsDetailRepo extends JpaRepository<ExportGoodsDetail, Long>,
        JpaSpecificationExecutor<ExportGoodsDetail> {

    // Lấy tất cả ExportGoodsDetail theo khoảng thời gian
    List<ExportGoodsDetail> findByCreatedAtBetween(Instant startDate, Instant endDate);

    List<ExportGoodsDetail> findAllByExportGoods(ExportGoods exportGoods);

    // profit theo ngày
    @Query("SELECT new com.ktn3_group.tieumoc.model.response.statistic.ProductProfitDTO(d.product.name, SUM(d.profit)) " +
            "FROM ExportGoodsDetail d " +
            "WHERE FUNCTION('DATE', d.createdAt) = :date " +
            "GROUP BY d.product.name")
    List<ProductProfitDTO> findProfitByProductForDate(@Param("date") LocalDate date);

    // profit theo tháng
    @Query("SELECT new com.ktn3_group.tieumoc.model.response.statistic.ProductProfitDTO(d.product.name, SUM(d.profit)) " +
            "FROM ExportGoodsDetail d " +
            "WHERE FUNCTION('MONTH', d.createdAt) = :month AND FUNCTION('YEAR', d.createdAt) = :year " +
            "GROUP BY d.product.name")
    List<ProductProfitDTO> findProfitByProductForMonth(@Param("month") int month, @Param("year") int year);

    // report by month
    @Query("SELECT new com.ktn3_group.tieumoc.model.response.export_goods_detail.ResProductReportDTO(e.product.id, e.product.name, " +
            "SUM(e.quantity), SUM(e.totalAmount), SUM(e.profit)) " +
            "FROM ExportGoodsDetail e " +
            "WHERE FUNCTION('MONTH', e.createdAt) = :month AND FUNCTION('YEAR', e.createdAt) = :year " +
            "GROUP BY e.product.id, e.product.name")
    List<ResProductReportDTO> getProductReportByMonthAndYear(@Param("month") int month, @Param("year") int year);


    // report by year
    @Query("SELECT new com.ktn3_group.tieumoc.model.response.export_goods_detail.ResProductReportDTO(p.id, p.name, " +
            "SUM(e.quantity), SUM(e.totalAmount), SUM(e.profit)) " +
            "FROM ExportGoodsDetail e " +
            "JOIN e.product p " +
            "WHERE FUNCTION('YEAR', e.createdAt) = :year " +
            "GROUP BY p.id, p.name")
    List<ResProductReportDTO> getProductReportByYear(@Param("year") int year);

}
