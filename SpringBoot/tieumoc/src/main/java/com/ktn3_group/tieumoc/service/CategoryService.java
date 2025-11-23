package com.ktn3_group.tieumoc.service;

import com.ktn3_group.tieumoc.model.Category;
import com.ktn3_group.tieumoc.model.Company;
import com.ktn3_group.tieumoc.model.User;
import com.ktn3_group.tieumoc.model.response.ResultPaginationDTO;
import com.ktn3_group.tieumoc.model.response.category.ResCategoryDTO;
import com.ktn3_group.tieumoc.model.response.user.ResUserDTO;
import com.ktn3_group.tieumoc.repository.CategoryRepo;
import com.ktn3_group.tieumoc.service.mapper.CategoryMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepo categoryRepo;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepo categoryRepo, CategoryMapper categoryMapper) {
        this.categoryMapper = categoryMapper;
        this.categoryRepo = categoryRepo;
    }

    public Category handleCreateCategory(Category request) {
        return categoryRepo.save(request);
    }

    public Category handleFetchCategoryById(long id) {
        Optional<Category> categoryOptional = categoryRepo.findById(id);
        return categoryOptional.orElse(null);
    }

    public boolean existsByName(String name) {
        return categoryRepo.existsByName(name);
    }

    public Category handleUpdateCategory(Category request) {
        Category currentCategory = handleFetchCategoryById(request.getId());
        if (currentCategory != null) {
            currentCategory.setName(request.getName());
            currentCategory.setDescription(request.getDescription());

            // update
            currentCategory = categoryRepo.save(currentCategory);
        }
        return currentCategory;
    }

    public ResultPaginationDTO handleFetchAllCategory(
            Specification<Category> spec,
            Pageable pageable) {
        Page<Category> pageCategory = categoryRepo.findAll(spec, pageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        ResultPaginationDTO.Meta mt = new ResultPaginationDTO.Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());

        mt.setPages(pageCategory.getTotalPages());
        mt.setTotal(pageCategory.getTotalElements());

        rs.setMeta(mt);

        // remove sensitive data
        List<ResCategoryDTO> listCategory = pageCategory.getContent()
                .stream().map(categoryMapper::convertToResCategoryDTO)
                .collect(Collectors.toList());

        rs.setResult(listCategory);

        return rs;
    }

    public List<ResCategoryDTO> handleFetchAllCategory() {
        List<Category> categories = categoryRepo.findAll();

        // remove sensitive data
        List<ResCategoryDTO> listCategory = categories
                .stream().map(categoryMapper::convertToResCategoryDTO)
                .collect(Collectors.toList());

        return listCategory;
    }

}
