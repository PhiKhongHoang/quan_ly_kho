package com.ktn3_group.tieumoc.controller;

import com.ktn3_group.tieumoc.model.*;
import com.ktn3_group.tieumoc.model.request.import_goods_detail.ReqCreateImportGoodsDetailDTO;
import com.ktn3_group.tieumoc.model.request.import_goods_detail.ReqCreateImportGoodsDetailListDTO;
import com.ktn3_group.tieumoc.model.response.import_goods_detail.ResProductReportDTO;
import com.ktn3_group.tieumoc.model.response.import_goods_detail.ResCreateImportGoodsDetailDTO;
import com.ktn3_group.tieumoc.model.response.import_goods_detail.ResImportGoodsDetailDTO;
import com.ktn3_group.tieumoc.repository.ExportGoodsRepo;
import com.ktn3_group.tieumoc.repository.ImportGoodsRepo;
import com.ktn3_group.tieumoc.service.CompanyDetailService;
import com.ktn3_group.tieumoc.service.ImportGoodsDetailService;
import com.ktn3_group.tieumoc.service.ProductService;
import com.ktn3_group.tieumoc.service.mapper.ImportGoodsDetailMapper;
import com.ktn3_group.tieumoc.util.annotation.ApiMessage;
import com.ktn3_group.tieumoc.util.error.IdInvalidException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/import_goods_detail")
public class ImportGoodsDetailController {
    private final ImportGoodsDetailService importGoodsDetailService;
    private final ImportGoodsDetailMapper importGoodsDetailMapper;
    private final ProductService productService;
    private final CompanyDetailService companyDetailService;
    private final ImportGoodsRepo importGoodsRepo;

    public ImportGoodsDetailController(ImportGoodsDetailService importGoodsDetailService,
                                       ImportGoodsDetailMapper importGoodsDetailMapper,
                                       ProductService productService,
                                       CompanyDetailService companyDetailService,
                                       ImportGoodsRepo importGoodsRepo) {
        this.importGoodsDetailService = importGoodsDetailService;
        this.importGoodsDetailMapper = importGoodsDetailMapper;
        this.productService = productService;
        this.companyDetailService = companyDetailService;
        this.importGoodsRepo = importGoodsRepo;
    }

    @PostMapping("")
    @ApiMessage("Create a new importGoodsDetail")
    public ResponseEntity<List<ResCreateImportGoodsDetailDTO>> createNewImportGoodsDetail(
            @Valid @RequestBody ReqCreateImportGoodsDetailListDTO request) throws IdInvalidException {
        // danh sách kết quả trả về
        List<ResCreateImportGoodsDetailDTO> results = new ArrayList<>();

        // Lặp qua từng phần tử trong danh sách
        for (ReqCreateImportGoodsDetailDTO.ImportGoodsDetail importGoodsDetail : request.getImportGoodsDetails()) {
            Product product = productService.handleFetchProductById(importGoodsDetail.getProduct().getId());
            int quantity = importGoodsDetail.getQuantity();
            double importPrice = importGoodsDetail.getImportPrice();
            double totalAmount = quantity * importPrice;

            // Tạo đối tượng DTO
            ImportGoodsDetail importGoodsDetailEntity = new ImportGoodsDetail();
            importGoodsDetailEntity.setQuantity(quantity);
            importGoodsDetailEntity.setImportPrice(importPrice);
            importGoodsDetailEntity.setTotalAmount(totalAmount);
            importGoodsDetailEntity.setImportGoods(request.getImportGoods());
            importGoodsDetailEntity.setProduct(product);

            // Xử lý tạo mới
            importGoodsDetailEntity = importGoodsDetailService.handleCreateImportGoodsDetail(importGoodsDetailEntity);

            // Chuyển đổi entity sang DTO kết quả
            ResCreateImportGoodsDetailDTO result = importGoodsDetailMapper.convertToResCreateImportGoodsDetailDTO(importGoodsDetailEntity);

            // Thêm kết quả vào danh sách
            results.add(result);

            // thêm số lượng vào company detail
            CompanyDetail companyDetail = companyDetailService.findByCompanyAndProduct(product.getCompany(), product);
            if (companyDetail != null) {
                companyDetail.setQuantity(companyDetail.getQuantity() + quantity);

                companyDetailService.handleCreateCompanyDetail(companyDetail);
            }

        }
        // Trả về danh sách các sản phẩm đã được tạo
        return ResponseEntity.status(HttpStatus.CREATED).body(results);
    }

    @GetMapping("/detail/{id}")
    @ApiMessage("Fetch all importGoodsDetail by importGoods")
    public ResponseEntity<List<ImportGoodsDetail>> findAllByImportGoods(@PathVariable("id") long id) {
        ImportGoods importGoods = importGoodsRepo.findById(id).orElse(null);

        if (importGoods != null) {
            List<ImportGoodsDetail> importGoodsDetails = importGoodsDetailService.findAllByImportGoods(importGoods);

            return ResponseEntity.ok().body(importGoodsDetails);
        }


        return ResponseEntity.ok(null);
    }

    // report by month
    @GetMapping("/report/month")
    @ApiMessage("Report by month")
    public ResponseEntity<List<ResProductReportDTO>> getProductReport(
            @RequestParam("month") int month,
            @RequestParam("year") int year) {
        List<ResProductReportDTO> report = importGoodsDetailService.getProductReport(month, year);
        return ResponseEntity.ok(report);
    }

    // report by year
    @GetMapping("/report/year")
    @ApiMessage("Report by year")
    public ResponseEntity<List<ResProductReportDTO>> getProductReportByYear(
            @RequestParam("year") int year) {
        List<ResProductReportDTO> report = importGoodsDetailService.getProductReportByYear(year);
        return ResponseEntity.ok(report);
    }

}
