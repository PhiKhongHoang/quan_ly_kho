package com.ktn3_group.tieumoc.service;

import com.ktn3_group.tieumoc.model.ExportGoods;
import com.ktn3_group.tieumoc.model.response.ResultPaginationDTO;
import com.ktn3_group.tieumoc.model.response.export_goods.ResExportGoodsDTO;
import com.ktn3_group.tieumoc.repository.ExportGoodsRepo;
import com.ktn3_group.tieumoc.service.mapper.ExportGoodsMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExportGoodsService {
    private final ExportGoodsRepo exportGoodsRepo;
    private final ExportGoodsMapper exportGoodsMapper;

    public ExportGoodsService(
            ExportGoodsRepo exportGoodsRepo,
            ExportGoodsMapper exportGoodsMapper) {
        this.exportGoodsMapper = exportGoodsMapper;
        this.exportGoodsRepo = exportGoodsRepo;
    }

    public ExportGoods handleCreateExportGoods(ExportGoods request) {
        return exportGoodsRepo.save(request);
    }

    public ResultPaginationDTO handleFetchAllExportGoods(
            Specification<ExportGoods> spec,
            Pageable pageable) {
        // Tạo đối tượng Sort để sắp xếp theo id giảm dần
        Sort sort = Sort.by(Sort.Order.desc("id"));

        // Kết hợp Pageable và Sort bằng cách sử dụng PageRequest.of
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

        Page<ExportGoods> pageExportGoods = exportGoodsRepo.findAll(spec, sortedPageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        ResultPaginationDTO.Meta mt = new ResultPaginationDTO.Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());
        mt.setPages(pageExportGoods.getTotalPages());
        mt.setTotal(pageExportGoods.getTotalElements());

        rs.setMeta(mt);

        // remove sensitive data
        List<ResExportGoodsDTO> listExportGoods = pageExportGoods.getContent()
                .stream().map(exportGoodsMapper::convertToResExportGoodsDTO)
                .collect(Collectors.toList());

        rs.setResult(listExportGoods);

        return rs;
    }


    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Ho_Chi_Minh")
    public void handleDeleteExportGoods() {
        List<ExportGoods> result = exportGoodsRepo.findAll();

        if (result != null && !result.isEmpty()) {
            for (ExportGoods exportGoods : result) {
                // Kiểm tra nếu thời gian hiện tại đã qua 1h =  60 giây * 60 phút kể từ createdAt
                if (!exportGoods.isActive() && Instant.now().isAfter(exportGoods.getCreatedAt().plusSeconds(60 * 60))) {
                    exportGoodsRepo.delete(exportGoods);
                    System.out.println("Deleted ExportGoods with ID: " + exportGoods.getId());
                }
            }
        }
    }


}
