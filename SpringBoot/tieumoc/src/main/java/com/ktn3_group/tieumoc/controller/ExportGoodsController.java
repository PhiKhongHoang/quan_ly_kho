package com.ktn3_group.tieumoc.controller;

import com.ktn3_group.tieumoc.model.ExportGoods;
import com.ktn3_group.tieumoc.model.request.export_goods.ReqCreateExportGoodsDTO;
import com.ktn3_group.tieumoc.model.response.ResultPaginationDTO;
import com.ktn3_group.tieumoc.model.response.export_goods.ResCreateExportGoodsDTO;
import com.ktn3_group.tieumoc.model.response.export_goods.ResExportGoodsDTO;
import com.ktn3_group.tieumoc.service.ExportGoodsService;
import com.ktn3_group.tieumoc.service.mapper.ExportGoodsMapper;
import com.ktn3_group.tieumoc.util.annotation.ApiMessage;
import com.ktn3_group.tieumoc.util.error.IdInvalidException;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/export_goods")
public class ExportGoodsController {
    private final ExportGoodsService exportGoodsService;
    private final ExportGoodsMapper exportGoodsMapper;

    public ExportGoodsController(ExportGoodsService exportGoodsService, ExportGoodsMapper exportGoodsMapper) {
        this.exportGoodsService = exportGoodsService;
        this.exportGoodsMapper = exportGoodsMapper;
    }

    @PostMapping("")
    @ApiMessage("Create a new exportGoods")
    public ResponseEntity<ResCreateExportGoodsDTO> createNewExportGoods(
            @Valid @RequestBody ReqCreateExportGoodsDTO request) throws IdInvalidException {

        ExportGoods exportGoods = exportGoodsMapper.convertFromReqCreateExportGoodsDTO(request);

        exportGoodsService.handleCreateExportGoods(exportGoods);

        ResCreateExportGoodsDTO result = exportGoodsMapper.convertToResCreateExportGoodsDTO(exportGoods);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(result);
    }

    @GetMapping("")
    @ApiMessage("Fetch all export_goods")
    public ResponseEntity<ResultPaginationDTO> getAllExportGoods(
            @Filter Specification<ExportGoods> spec,
            Pageable pageable) {

        return ResponseEntity.status(HttpStatus.OK).body(
                exportGoodsService.handleFetchAllExportGoods(spec, pageable));
    }

}
