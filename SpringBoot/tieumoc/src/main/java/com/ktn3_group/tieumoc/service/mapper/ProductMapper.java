package com.ktn3_group.tieumoc.service.mapper;

import com.ktn3_group.tieumoc.model.Category;
import com.ktn3_group.tieumoc.model.Company;
import com.ktn3_group.tieumoc.model.Product;
import com.ktn3_group.tieumoc.model.request.product.ReqUpdateProductDTO;
import com.ktn3_group.tieumoc.model.response.product.ResCreateProductDTO;
import com.ktn3_group.tieumoc.model.response.product.ResProductDTO;
import com.ktn3_group.tieumoc.model.response.product.ResUpdateProductDTO;
import com.ktn3_group.tieumoc.repository.*;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
    private final CompanyRepo companyRepo;
    private final CategoryRepo categoryRepo;
    private final ProductRepo productRepo;

    public ProductMapper(CategoryRepo categoryRepo,
                         ProductRepo productRepo,
                         CompanyRepo companyRepo) {
        this.categoryRepo = categoryRepo;
        this.productRepo = productRepo;
        this.companyRepo = companyRepo;
    }

    public final ResProductDTO convertToResProductDTO(Product product) {
        ResProductDTO res = new ResProductDTO();

        res.setId(product.getId());
        res.setCategory(product.getCategory());
        res.setCompany(product.getCompany());
        res.setName(product.getName());
        res.setQuantity(product.getQuantity());
        res.setDescription(product.getDescription());
        res.setActive(product.isActive());
        res.setQuantitySold(product.getQuantitySold());
        res.setNumberWarning(product.getNumberWarning());
        res.setExportPrice(product.getExportPrice());
        res.setLatestImportPrice(product.getLatestImportPrice());
        res.setCreatedAt(product.getCreatedAt());
        res.setUpdatedAt(product.getUpdatedAt());
        res.setCreatedBy(product.getCreatedBy());
        res.setUpdatedBy(product.getUpdatedBy());

        return res;
    }

    public ResCreateProductDTO convertToResCreateProductDTO(Product product) {
        ResCreateProductDTO res = new ResCreateProductDTO();

        res.setId(product.getId());
        res.setCategory(product.getCategory());
        res.setCompany(product.getCompany());
        res.setName(product.getName());
        res.setDescription(product.getDescription());
        res.setActive(product.isActive());
        res.setExportPrice(product.getExportPrice());
        res.setNumberWarning(product.getNumberWarning());

        return res;
    }

    public ResUpdateProductDTO convertToResUpdateProductDTO(Product product) {
        ResUpdateProductDTO res = new ResUpdateProductDTO();

        res.setId(product.getId());
        res.setCategory(product.getCategory());
        res.setCompany(product.getCompany());
        res.setName(product.getName());
        res.setDescription(product.getDescription());
        res.setActive(product.isActive());
        res.setExportPrice(product.getExportPrice());
        res.setNumberWarning(product.getNumberWarning());

        return res;
    }

    public Product convertFromReqUpdateProductDTO(
            ReqUpdateProductDTO request) {
        Product product = new Product();
        Category category = categoryRepo.findById(request.getCategory().getId()).orElse(null);
        Company company = companyRepo.findById(request.getCompany().getId()).orElse(null);

        if (category != null) {
            product.setCategory(category);
        }

        if (company != null) {
            product.setCompany(company);
        }

        product.setId(request.getId());
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setActive(request.isActive());
        product.setExportPrice(request.getExportPrice());
        product.setNumberWarning(request.getNumberWarning());

        return product;
    }

}
