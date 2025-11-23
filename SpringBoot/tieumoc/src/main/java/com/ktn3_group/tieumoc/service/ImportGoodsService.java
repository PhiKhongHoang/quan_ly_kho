package com.ktn3_group.tieumoc.service;

import com.ktn3_group.tieumoc.model.ImportGoods;
import com.ktn3_group.tieumoc.model.response.ResultPaginationDTO;
import com.ktn3_group.tieumoc.model.response.import_goods.ResImportGoodsDTO;
import com.ktn3_group.tieumoc.repository.ImportGoodsRepo;
import com.ktn3_group.tieumoc.service.mapper.ImportGoodsMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImportGoodsService {
    private final ImportGoodsRepo importGoodsRepo;
    private final ImportGoodsMapper importGoodsMapper;

    public ImportGoodsService(ImportGoodsRepo importGoodsRepo, ImportGoodsMapper importGoodsMapper) {
        this.importGoodsMapper = importGoodsMapper;
        this.importGoodsRepo = importGoodsRepo;
    }

    public ImportGoods handleCreateImportGoods(ImportGoods request) {
        return importGoodsRepo.save(request);
    }

    public ImportGoods handleFetchImportGoodsById(long id) {
        Optional<ImportGoods> importGoodsOptional = importGoodsRepo.findById(id);
        return importGoodsOptional.orElse(null);
    }

    public ResultPaginationDTO handleFetchAllImportGoods(
            Specification<ImportGoods> spec,
            Pageable pageable) {
        // Tạo đối tượng Sort để sắp xếp theo id giảm dần
        Sort sort = Sort.by(Sort.Order.desc("id"));

        // Kết hợp Pageable và Sort bằng cách sử dụng PageRequest.of
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

        Page<ImportGoods> pageImportGoods = importGoodsRepo.findAll(spec, sortedPageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        ResultPaginationDTO.Meta mt = new ResultPaginationDTO.Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());

        mt.setPages(pageImportGoods.getTotalPages());
        mt.setTotal(pageImportGoods.getTotalElements());

        rs.setMeta(mt);

        // remove sensitive data
        List<ResImportGoodsDTO> listImportGoods = pageImportGoods.getContent()
                .stream().map(importGoodsMapper::convertToResImportGoodsDTO)
                .collect(Collectors.toList());

        rs.setResult(listImportGoods);

        return rs;
    }


    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Ho_Chi_Minh")
    public void handleDeleteImportGoods() {
        List<ImportGoods> result = importGoodsRepo.findAll();

        if (result != null && !result.isEmpty()) {
            for (ImportGoods importGoods : result) {
                // Kiểm tra nếu thời gian hiện tại đã qua 1h =  60 giây * 60 phút kể từ createdAt
                if (!importGoods.isActive() && Instant.now().isAfter(importGoods.getCreatedAt().plusSeconds(60 * 60))) {
                    importGoodsRepo.delete(importGoods);
                    System.out.println("Deleted ImportGoods with ID: " + importGoods.getId());
                }
            }
        }
    }


}
