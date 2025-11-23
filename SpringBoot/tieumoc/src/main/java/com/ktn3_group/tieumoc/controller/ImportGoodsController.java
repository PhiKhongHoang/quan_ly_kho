package com.ktn3_group.tieumoc.controller;

import com.ktn3_group.tieumoc.model.ImportGoods;
import com.ktn3_group.tieumoc.model.request.import_goods.ReqCreateImportGoodsDTO;
import com.ktn3_group.tieumoc.model.response.ResultPaginationDTO;
import com.ktn3_group.tieumoc.model.response.import_goods.ResCreateImportGoodsDTO;
import com.ktn3_group.tieumoc.model.response.import_goods.ResImportGoodsDTO;
import com.ktn3_group.tieumoc.service.ImportGoodsService;
import com.ktn3_group.tieumoc.service.mapper.ImportGoodsMapper;
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
@RequestMapping("/api/v1/import_goods")
public class ImportGoodsController {
    private final ImportGoodsService importGoodsService;
    private final ImportGoodsMapper importGoodsMapper;

    public ImportGoodsController(ImportGoodsService importGoodsService, ImportGoodsMapper importGoodsMapper) {
        this.importGoodsService = importGoodsService;
        this.importGoodsMapper = importGoodsMapper;
    }

    @PostMapping("")
    @ApiMessage("Create a new importGoods")
    public ResponseEntity<ResCreateImportGoodsDTO> createNewUser(
            @Valid @RequestBody ReqCreateImportGoodsDTO request) throws IdInvalidException {

        ImportGoods importGoods = importGoodsMapper.convertFromReqCreateImportGoodsDTO(request);

        importGoodsService.handleCreateImportGoods(importGoods);

        ResCreateImportGoodsDTO result = importGoodsMapper.convertToResCreateImportGoodsDTO(importGoods);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(result);
    }

    @GetMapping("")
    @ApiMessage("Fetch all import_goods")
    public ResponseEntity<ResultPaginationDTO> getAllImportGoods(
            @Filter Specification<ImportGoods> spec,
            Pageable pageable) {

        return ResponseEntity.status(HttpStatus.OK).body(
                importGoodsService.handleFetchAllImportGoods(spec, pageable));
    }

}
