package com.ktn3_group.tieumoc.controller;

import com.ktn3_group.tieumoc.model.Category;
import com.ktn3_group.tieumoc.model.request.category.ReqCreateCategoryDTO;
import com.ktn3_group.tieumoc.model.request.category.ReqUpdateCategoryDTO;
import com.ktn3_group.tieumoc.model.response.ResultPaginationDTO;
import com.ktn3_group.tieumoc.model.response.category.ResCategoryDTO;
import com.ktn3_group.tieumoc.model.response.category.ResCreateCategoryDTO;
import com.ktn3_group.tieumoc.model.response.category.ResUpdateCategoryDTO;
import com.ktn3_group.tieumoc.service.CategoryService;
import com.ktn3_group.tieumoc.service.mapper.CategoryMapper;
import com.ktn3_group.tieumoc.util.annotation.ApiMessage;
import com.ktn3_group.tieumoc.util.error.IdInvalidException;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    public CategoryController(CategoryService categoryService, CategoryMapper categoryMapper) {
        this.categoryService = categoryService;
        this.categoryMapper = categoryMapper;
    }

    @PostMapping("")
    @ApiMessage("Create a new category")
    public ResponseEntity<ResCreateCategoryDTO> createNewUser(
            @Valid @RequestBody ReqCreateCategoryDTO request) throws IdInvalidException {
        boolean isEmailExist = categoryService.existsByName(request.getName());
        if (isEmailExist) {
            throw new IdInvalidException(
                    "The name " + request.getName() + " already exists. Please use a different name!");
        }

        Category category = categoryMapper.convertFromReqCreateCategoryDTO(request);

        category = categoryService.handleCreateCategory(category);

        ResCreateCategoryDTO result = categoryMapper.convertToResCreateCategoryDTO(category);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(result);
    }

    @PutMapping("")
    @ApiMessage("Update a category")
    public ResponseEntity<ResUpdateCategoryDTO> updateUser(
            @RequestBody ReqUpdateCategoryDTO request)
            throws IdInvalidException {
        Category category = categoryMapper.convertFromReqUpdateCategoryDTO(request);

        Category currentCategory = categoryService.handleUpdateCategory(category);
        if (currentCategory == null) {
            throw new IdInvalidException("Category with id = " + request.getId() + " does not exits!");
        }

        ResUpdateCategoryDTO result = categoryMapper.convertToResUpdateCategoryDTO(currentCategory);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/pagination")
    @ApiMessage("Fetch all categories by pagination")
    public ResponseEntity<ResultPaginationDTO> getAllCategory(
            @Filter Specification<Category> spec,
            Pageable pageable) {

        return ResponseEntity.status(HttpStatus.OK).body(
                categoryService.handleFetchAllCategory(spec, pageable));
    }

    @GetMapping("")
    @ApiMessage("Fetch all categories")
    public ResponseEntity<List<ResCategoryDTO>> getAllCategory() {

        return ResponseEntity.status(HttpStatus.OK).body(
                categoryService.handleFetchAllCategory());
    }

}
