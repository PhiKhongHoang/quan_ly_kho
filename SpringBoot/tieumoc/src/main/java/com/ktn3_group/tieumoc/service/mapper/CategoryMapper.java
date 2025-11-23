package com.ktn3_group.tieumoc.service.mapper;

import com.ktn3_group.tieumoc.model.Category;
import com.ktn3_group.tieumoc.model.Product;
import com.ktn3_group.tieumoc.model.request.category.ReqCreateCategoryDTO;
import com.ktn3_group.tieumoc.model.request.category.ReqUpdateCategoryDTO;
import com.ktn3_group.tieumoc.model.response.category.ResCategoryDTO;
import com.ktn3_group.tieumoc.model.response.category.ResCreateCategoryDTO;
import com.ktn3_group.tieumoc.model.response.category.ResUpdateCategoryDTO;
import com.ktn3_group.tieumoc.repository.ProductRepo;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component  // Thêm dòng này để Spring nhận diện lớp như một bean
public class CategoryMapper {
    private final ProductRepo productRepo;

    public CategoryMapper(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    public final ResCategoryDTO convertToResCategoryDTO(Category category) {
        ResCategoryDTO res = new ResCategoryDTO();
        List<ResCategoryDTO.Products> products = new ArrayList<>();

        if (category.getProducts() != null) {
            for (Product product : category.getProducts()) {
                ResCategoryDTO.Products current_product = new ResCategoryDTO.Products();
                current_product.setId(product.getId());
                current_product.setName(product.getName());
                current_product.setDescription(product.getDescription());

                products.add(current_product);
            }
            res.setProducts(products);
        }

        res.setId(category.getId());
        res.setName(category.getName());
        res.setDescription(category.getDescription());
        res.setQuantity(productRepo.countByCategoryId(category.getId()));
        res.setCreatedAt(category.getCreatedAt());
        res.setUpdatedAt(category.getUpdatedAt());

        return res;
    }

    public ResCreateCategoryDTO convertToResCreateCategoryDTO(Category category) {
        ResCreateCategoryDTO res = new ResCreateCategoryDTO();

        res.setId(category.getId());
        res.setName(category.getName());
        res.setDescription(category.getDescription());

        return res;
    }

    public ResUpdateCategoryDTO convertToResUpdateCategoryDTO(Category category) {
        ResUpdateCategoryDTO res = new ResUpdateCategoryDTO();

        res.setId(category.getId());
        res.setName(category.getName());
        res.setDescription(category.getDescription());

        return res;
    }

    public Category convertFromReqCreateCategoryDTO(ReqCreateCategoryDTO request) {
        Category category = new Category();

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        return category;
    }

    public Category convertFromReqUpdateCategoryDTO(ReqUpdateCategoryDTO request) {
        Category category = new Category();

        category.setId(request.getId());
        category.setName(request.getName());
        category.setDescription(request.getDescription());

        return category;
    }
}
