package com.ktn3_group.tieumoc.controller;

import com.ktn3_group.tieumoc.model.*;
import com.ktn3_group.tieumoc.model.request.export_goods_detail.ReqCreateExportGoodsDetailDTO;
import com.ktn3_group.tieumoc.model.request.export_goods_detail.ReqCreateExportGoodsDetailListDTO;
import com.ktn3_group.tieumoc.model.response.export_goods_detail.ResCreateExportGoodsDetailDTO;
import com.ktn3_group.tieumoc.model.response.export_goods_detail.ResExportGoodsDetailDTO;
import com.ktn3_group.tieumoc.model.response.export_goods_detail.ResProductReportDTO;
import com.ktn3_group.tieumoc.model.response.statistic.ProductProfitDTO;
import com.ktn3_group.tieumoc.repository.CompanyRepo;
import com.ktn3_group.tieumoc.repository.ExportGoodsRepo;
import com.ktn3_group.tieumoc.service.CompanyDetailService;
import com.ktn3_group.tieumoc.service.ExportGoodsDetailService;
import com.ktn3_group.tieumoc.service.ProductService;
import com.ktn3_group.tieumoc.service.mapper.ExportGoodsDetailMapper;
import com.ktn3_group.tieumoc.util.annotation.ApiMessage;
import com.ktn3_group.tieumoc.util.error.IdInvalidException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/export_goods_detail")
public class ExportGoodsDetailController {
    private final ExportGoodsDetailService exportGoodsDetailService;
    private final ExportGoodsDetailMapper exportGoodsDetailMapper;
    private final CompanyRepo companyRepo;
    private final ProductService productService;
    private final ExportGoodsRepo exportGoodsRepo;
    private final CompanyDetailService companyDetailService;

    public ExportGoodsDetailController(ExportGoodsDetailService exportGoodsDetailService,
                                       ExportGoodsDetailMapper exportGoodsDetailMapper,
                                       CompanyRepo companyRepo,
                                       ExportGoodsRepo exportGoodsRepo,
                                       ProductService productService,
                                       CompanyDetailService companyDetailService) {
        this.exportGoodsDetailService = exportGoodsDetailService;
        this.exportGoodsDetailMapper = exportGoodsDetailMapper;
        this.productService = productService;
        this.companyRepo = companyRepo;
        this.exportGoodsRepo = exportGoodsRepo;
        this.companyDetailService = companyDetailService;
    }

    @PostMapping("")
    @ApiMessage("Create a new exportGoodsDetail")
    public ResponseEntity<List<ResCreateExportGoodsDetailDTO>> createNewExportGoodsDetail(
            @Valid @RequestBody ReqCreateExportGoodsDetailListDTO request) throws IdInvalidException {
        // danh sách kết quả trả về
        List<ResCreateExportGoodsDetailDTO> results = new ArrayList<>();

        // Lặp qua từng phần tử trong danh sách
        for (ReqCreateExportGoodsDetailDTO.ExportGoodsDetail exportGoodsDetail : request.getExportGoodsDetails()) {
            Product product = productService.handleFetchProductById(exportGoodsDetail.getProduct().getId());
            int quantity = exportGoodsDetail.getQuantity();
            double exportPrice = exportGoodsDetail.getExportPrice();
            double totalAmount = quantity * exportPrice;

            // Tạo đối tượng DTO
            ExportGoodsDetail exportGoodsDetailEntity = new ExportGoodsDetail();
            exportGoodsDetailEntity.setQuantity(quantity);
            exportGoodsDetailEntity.setExportPrice(exportPrice);
            exportGoodsDetailEntity.setTotalAmount(totalAmount);
            exportGoodsDetailEntity.setExportGoods(request.getExportGoods());
            exportGoodsDetailEntity.setProduct(product);

            double profit = exportGoodsDetailService.profit(product.getId(), quantity, exportPrice);
            exportGoodsDetailEntity.setProfit(profit);

            // Xử lý tạo mới
            exportGoodsDetailEntity = exportGoodsDetailService.handleCreateExportGoodsDetail(exportGoodsDetailEntity);

            // Chuyển đổi entity sang DTO kết quả
            ResCreateExportGoodsDetailDTO result = exportGoodsDetailMapper.convertToResCreateExportGoodsDetailDTO(exportGoodsDetailEntity);

            // Thêm kết quả vào danh sách
            results.add(result);

            // thêm vào company detail
            ExportGoods exportGoods = exportGoodsRepo.findById(result.getExportGoods().getId()).orElse(null);
            Company company = exportGoods.getCompany();
            CompanyDetail companyDetail = companyDetailService.findByCompanyAndProduct(company, product);
            if (companyDetail == null) {
                CompanyDetail companyDetailResult = new CompanyDetail();

                companyDetailResult.setCompany(company);
                companyDetailResult.setProduct(product);
                companyDetailResult.setQuantity(quantity);
                companyDetailResult.setProfit(profit);

                companyDetailService.handleCreateCompanyDetail(companyDetailResult);

                // set quantity company
                company.setQuantity(company.getQuantity() + 1);

                companyRepo.save(company);
            } else {
                companyDetail.setQuantity(companyDetail.getQuantity() + quantity);
                companyDetail.setProfit(companyDetail.getProfit() + profit);

                companyDetailService.handleCreateCompanyDetail(companyDetail);
            }

        }

        // Trả về danh sách các sản phẩm đã được tạo
        return ResponseEntity.status(HttpStatus.CREATED).body(results);
    }

    @GetMapping("/profit/{date}")
    @ApiMessage("Fetch profit date")
    public double getTotalProfitForDay(@PathVariable("date") String date) {
        // Chuyển chuỗi ngày thành LocalDate
        LocalDate localDate = LocalDate.parse(date);

        // Gọi service để tính tổng lợi nhuận trong ngày
        return exportGoodsDetailService.getTotalProfitForDay(localDate);
    }

    @GetMapping("/daily/month")
    @ApiMessage("Fetch profit month")
    public ResponseEntity<Map<LocalDate, Double>> getDailyProfit(
            @RequestParam("startDate") LocalDate startDate) {
        Map<LocalDate, Double> dailyProfitMap = exportGoodsDetailService.getDailyProfit(startDate);
        return ResponseEntity.ok(dailyProfitMap);
    }

    @GetMapping("/monthly/year")
    @ApiMessage("Fetch profit year")
    public ResponseEntity<Map<String, Double>> getMonthlyProfit(
            @RequestParam("year") int year) {
        // Gọi service để tính lợi nhuận theo tháng
        Map<Month, Double> monthlyProfitMap = exportGoodsDetailService.getMonthlyProfit(Year.of(year));

        // Chuyển đổi sang LinkedHashMap để lưu th tự tháng
        Map<String, Double> orderedMonthlyProfitMap = new LinkedHashMap<>();
        for (Month month : Month.values()) {
            orderedMonthlyProfitMap.put(month.name(), monthlyProfitMap.getOrDefault(month, 0.0));
        }

        return ResponseEntity.ok(orderedMonthlyProfitMap);
    }


    @GetMapping("/detail/{id}")
    @ApiMessage("Fetch all exportGoodsDetail by exportGoods")
    public ResponseEntity<List<ExportGoodsDetail>> findAllByExportGoods(@PathVariable("id") long id) {
        ExportGoods exportGoods = exportGoodsRepo.findById(id).orElse(null);

        if (exportGoods != null) {
            List<ExportGoodsDetail> exportGoodsDetails = exportGoodsDetailService.findAllByExportGoods(exportGoods);

            return ResponseEntity.ok().body(exportGoodsDetails);
        }


        return ResponseEntity.ok(null);
    }

    //profit theo ngày
    @GetMapping("/product-total-amount-day")
    @ApiMessage("Fetch all ProductProfitDTO for statistic by day")
    public ResponseEntity<List<ProductProfitDTO>> getTotalAmountByProductForDate(
            @RequestParam("date") String date) {
        // Chuyển chuỗi ngày thành LocalDate
        LocalDate localDate = LocalDate.parse(date);

        List<ProductProfitDTO> result = exportGoodsDetailService.getProfitByProductForDate(localDate);

        return ResponseEntity.ok(result);
    }

    // profit theo tháng
    @GetMapping("/profit-by-month")
    @ApiMessage("Fetch all ProductProfitDTO for statistic by month")
    public ResponseEntity<List<ProductProfitDTO>> getProfitByProductForMonth(
            @RequestParam("month") int month,
            @RequestParam("year") int year) {
        List<ProductProfitDTO> result = exportGoodsDetailService.getProfitByProductForMonth(month, year);
        return ResponseEntity.ok(result);
    }

    // report by month
    @GetMapping("/report/month")
    @ApiMessage("Report by month")
    public ResponseEntity<List<ResProductReportDTO>> getProductReport(
            @RequestParam("month") int month,
            @RequestParam("year") int year) {
        List<ResProductReportDTO> report = exportGoodsDetailService.getProductReport(month, year);
        return ResponseEntity.ok(report);
    }

    // report by year
    @GetMapping("/report/year")
    @ApiMessage("Report by year")
    public ResponseEntity<List<ResProductReportDTO>> getProductReportByYear(
            @RequestParam("year") int year) {
        List<ResProductReportDTO> report = exportGoodsDetailService.getProductReportByYear(year);
        return ResponseEntity.ok(report);
    }

}
