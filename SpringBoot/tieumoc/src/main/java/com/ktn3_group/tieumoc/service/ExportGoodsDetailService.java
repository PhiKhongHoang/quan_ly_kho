
package com.ktn3_group.tieumoc.service;

import com.ktn3_group.tieumoc.model.*;
import com.ktn3_group.tieumoc.model.response.export_goods_detail.ResProductReportDTO;
import com.ktn3_group.tieumoc.model.response.statistic.EmailReport;
import com.ktn3_group.tieumoc.model.response.statistic.ProductProfitDTO;
import com.ktn3_group.tieumoc.repository.*;
import com.ktn3_group.tieumoc.service.mapper.ExportGoodsDetailMapper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.*;

@Service
public class ExportGoodsDetailService {
    private final ExportGoodsDetailRepo exportGoodsDetailRepo;
    private final ExportGoodsDetailMapper exportGoodsDetailMapper;
    private final ProductRepo productRepo;
    private final ImportGoodsDetailRepo importGoodsDetailRepo;
    private final ExportGoodsRepo exportGoodsRepo;
    private final EmailService emailService;

    public ExportGoodsDetailService(ExportGoodsDetailRepo exportGoodsDetailRepo, ExportGoodsDetailMapper exportGoodsDetailMapper,
                                    ProductRepo productRepo,
                                    CompanyRepo companyRepo,
                                    ImportGoodsDetailRepo importGoodsDetailRepo,
                                    ExportGoodsRepo exportGoodsRepo,
                                    EmailService emailService) {
        this.exportGoodsDetailMapper = exportGoodsDetailMapper;
        this.exportGoodsDetailRepo = exportGoodsDetailRepo;
        this.productRepo = productRepo;
        this.importGoodsDetailRepo = importGoodsDetailRepo;
        this.exportGoodsRepo = exportGoodsRepo;
        this.emailService = emailService;
    }

    public ExportGoodsDetail handleCreateExportGoodsDetail(ExportGoodsDetail request) {
        // update quantity for product
        Product product = productRepo.findById(request.getProduct().getId()).orElse(null);
        if (product != null) {
            int quantity = product.getQuantity() - request.getQuantity();
            product.setQuantity(quantity);
            product.setQuantitySold(request.getQuantity() + product.getQuantitySold());
        }

        // enable exportGoods
        ExportGoods exportGoods = exportGoodsRepo.findById(request.getExportGoods().getId()).orElse(null);
        if (exportGoods != null) {
            exportGoods.setActive(true);
        }

        return exportGoodsDetailRepo.save(request);
    }

    public double profit(long id, int quantity, double price) {
        List<ImportGoodsDetail> importGoodsDetails = importGoodsDetailRepo.findByOrderByIdAsc();
        int remainingQuantity = quantity;
        double totalCost = 0.0;

        for (ImportGoodsDetail importItem : importGoodsDetails) {
            if (importItem.getProduct().getId() == id) {
                if (remainingQuantity <= 0)
                    break;

                if (importItem.getQuantity() > 0) {
                    int usedQuantity = Math.min(importItem.getQuantity(), remainingQuantity);
                    totalCost += usedQuantity * importItem.getImportPrice();

                    // Cập nhật số lượng còn lại của lần nhập
                    importItem.setQuantity(importItem.getQuantity() - usedQuantity);
                    importGoodsDetailRepo.save(importItem);

                    remainingQuantity -= usedQuantity;
                }
            }

        }

        if (remainingQuantity > 0) {
            throw new RuntimeException("Không đủ hàng để bán!");
        }

        double revenue = quantity * price;
        double profit = revenue - totalCost;

        return profit;
    }

    // Tính tổng lợi nhuận ngày
    public double getTotalProfitForDay(LocalDate date) {
        // Chuyển LocalDate thành Instant để làm mốc thời gian
        Instant startOfDay = date.atStartOfDay(ZoneId.of("Asia/Ho_Chi_Minh")).toInstant(); // 00:00:00
        Instant endOfDay = date.atTime(23, 59, 59).atZone(ZoneId.of("Asia/Ho_Chi_Minh")).toInstant(); // 23:59:59

        // Gọi repository để lấy danh sách chi tiết xuất khẩu trong ngày và tính tổng lợi nhuận
        List<ExportGoodsDetail> details = exportGoodsDetailRepo.findByCreatedAtBetween(startOfDay, endOfDay);

        // Tính tổng lợi nhuận
        return details.stream()
                .mapToDouble(ExportGoodsDetail::getProfit)
                .sum();
    }

    // profit theo tháng
    public Map<LocalDate, Double> getDailyProfit(LocalDate startDate) {
        Map<LocalDate, Double> dailyProfitMap = new HashMap<>();

        // Tính ngày kết thúc là một tháng sau
        LocalDate endDate = startDate.plusMonths(1);

        // Lặp qua từng ngày trong khoảng từ startDate đến endDate
        for (LocalDate date = startDate; date.isBefore(endDate); date = date.plusDays(1)) {
            // Lấy tổng lợi nhuận từng ngày
            double profit = getTotalProfitForDay(date);
            dailyProfitMap.put(date, profit);
        }

        return dailyProfitMap;
    }

    //    lợi nhuận theo năm
    public Map<Month, Double> getMonthlyProfit(Year year) {
        Map<Month, Double> monthlyProfitMap = new HashMap<>();

        // Lặp qua từng tháng trong năm
        for (Month month : Month.values()) {
            // Xác định ngày bắt đầu và ngày kết thúc của tháng
            LocalDate startDate = year.atMonth(month).atDay(1);
            LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

            // Tính tổng lợi nhuận trong tháng
            double monthlyProfit = 0.0;
            for (LocalDate date = startDate; date.isBefore(endDate.plusDays(1)); date = date.plusDays(1)) {
                monthlyProfit += getTotalProfitForDay(date);
            }

            monthlyProfitMap.put(month, monthlyProfit);
        }

        return monthlyProfitMap;
    }

    public List<ExportGoodsDetail> findAllByExportGoods(ExportGoods exportGoods) {
        return exportGoodsDetailRepo.findAllByExportGoods(exportGoods);
    }

    // thống kê sp theo ngày
    public List<ProductProfitDTO> getProfitByProductForDate(LocalDate date) {
        return exportGoodsDetailRepo.findProfitByProductForDate(date);
    }

    // thống kê sp theo tháng
    public List<ProductProfitDTO> getProfitByProductForMonth(int month, int year) {
        return exportGoodsDetailRepo.findProfitByProductForMonth(month, year);
    }

    // send mail
    @Async // xử lý bất đồng bộ
    @Scheduled(cron = "0 0 7 1 * ?", zone = "Asia/Ho_Chi_Minh")
    public void sendEmail() {
        // Lấy múi giờ hiện tại
        ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");

        // Lấy ngày giờ hiện tại tại múi giờ cụ thể
        LocalDateTime now = LocalDateTime.ofInstant(Instant.now(), zoneId);

        // Lấy tháng và năm
        int month = now.getMonthValue(); // Giá trị tháng (1-12)
        int year = now.getYear(); // Giá trị năm

        List<ProductProfitDTO> list = this.getProfitByProductForMonth(month, year);

        double totalProfit = list.stream().mapToDouble(ProductProfitDTO::getProfit).sum();

        EmailReport.Report report = new EmailReport.Report(month, year, list);

        EmailReport emailReport = new EmailReport(totalProfit, report);

        if (!list.isEmpty()) {
            emailService.sendEmailFromTemplateSync(
                    "phik07tx02102002@gmail.com",
                    "Báo cáo lợi nhuận tháng " + month + " - năm " + year,
                    "report",
                    "Chi tiết báo cáo:",
                    emailReport
            );
        }
    }

    // report by month
    public List<ResProductReportDTO> getProductReport(int month, int year) {
        return exportGoodsDetailRepo.getProductReportByMonthAndYear(month, year);
    }

    // report by year
    public List<ResProductReportDTO> getProductReportByYear(int year) {
        return exportGoodsDetailRepo.getProductReportByYear(year);
    }

}
