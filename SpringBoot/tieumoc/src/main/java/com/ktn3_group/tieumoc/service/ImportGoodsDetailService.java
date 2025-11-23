
package com.ktn3_group.tieumoc.service;

import com.ktn3_group.tieumoc.model.*;
import com.ktn3_group.tieumoc.model.response.import_goods_detail.ResProductReportDTO;
import com.ktn3_group.tieumoc.repository.*;
import com.ktn3_group.tieumoc.service.mapper.ImportGoodsDetailMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImportGoodsDetailService {
    private final ImportGoodsDetailRepo importGoodsDetailRepo;
    private final ImportGoodsDetailMapper importGoodsDetailMapper;
    private final ProductRepo productRepo;
    private final CompanyRepo companyRepo;
    private final ImportGoodsRepo importGoodsRepo;

    public ImportGoodsDetailService(ImportGoodsDetailRepo importGoodsDetailRepo, ImportGoodsDetailMapper importGoodsDetailMapper,
                                    ProductRepo productRepo,
                                    CompanyRepo companyRepo,
                                    ImportGoodsRepo importGoodsRepo) {
        this.importGoodsDetailMapper = importGoodsDetailMapper;
        this.importGoodsDetailRepo = importGoodsDetailRepo;
        this.productRepo = productRepo;
        this.companyRepo = companyRepo;
        this.importGoodsRepo = importGoodsRepo;
    }

    public ImportGoodsDetail handleCreateImportGoodsDetail(ImportGoodsDetail request) {
        // update quantity and latestImportPrice for product
        Product product = productRepo.findById(request.getProduct().getId()).orElse(null);
        if (product != null) {
            int quantity = product.getQuantity() + request.getQuantity();
            double latestImportPrice = request.getImportPrice();
            product.setQuantity(quantity);
            product.setLatestImportPrice(latestImportPrice);
        }

        // enable importGoods
        ImportGoods importGoods = importGoodsRepo.findById(request.getImportGoods().getId()).orElse(null);
        if (importGoods != null) {
            importGoods.setActive(true);
        }


        return importGoodsDetailRepo.save(request);
    }

    public List<ImportGoodsDetail> findAllByImportGoods(ImportGoods importGoods) {
        return importGoodsDetailRepo.findAllByImportGoods(importGoods);
    }

    // report by month
    public List<ResProductReportDTO> getProductReport(int month, int year) {
        return importGoodsDetailRepo.getProductReportByMonthAndYear(month, year);
    }

    // report by year
    public List<ResProductReportDTO> getProductReportByYear(int year) {
        return importGoodsDetailRepo.getProductReportByYear(year);
    }
}
