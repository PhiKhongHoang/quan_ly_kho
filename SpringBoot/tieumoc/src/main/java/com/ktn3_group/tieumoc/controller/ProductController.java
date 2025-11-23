package com.ktn3_group.tieumoc.controller;

import com.ktn3_group.tieumoc.model.*;
import com.ktn3_group.tieumoc.model.request.product.ReqCreateProductDTO;
import com.ktn3_group.tieumoc.model.request.product.ReqCreateProductListDTO;
import com.ktn3_group.tieumoc.model.request.product.ReqUpdateProductDTO;
import com.ktn3_group.tieumoc.model.response.ResultPaginationDTO;
import com.ktn3_group.tieumoc.model.response.product.ResCreateProductDTO;
import com.ktn3_group.tieumoc.model.response.product.ResProductDTO;
import com.ktn3_group.tieumoc.model.response.product.ResUpdateProductDTO;
import com.ktn3_group.tieumoc.service.*;
import com.ktn3_group.tieumoc.service.mapper.ProductMapper;
import com.ktn3_group.tieumoc.util.annotation.ApiMessage;
import com.ktn3_group.tieumoc.util.error.IdInvalidException;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    private final ProductService productService;
    private final ProductMapper productMapper;
    private final CompanyDetailService companyDetailService;
    private final ImportGoodsService importGoodsService;
    private final CompanyService companyService;
    private final CategoryService categoryService;

    public ProductController(ProductService productService
            , ProductMapper productMapper,
                             CompanyDetailService companyDetailService,
                             ImportGoodsService importGoodsService,
                             CompanyService companyService,
                             CategoryService categoryService) {
        this.productService = productService;
        this.productMapper = productMapper;
        this.companyDetailService = companyDetailService;
        this.importGoodsService = importGoodsService;
        this.companyService = companyService;
        this.categoryService = categoryService;
    }

    @PostMapping("")
    @ApiMessage("Create multiple products")
    public ResponseEntity<List<ResCreateProductDTO>> createNewProducts(
            @Valid @RequestBody ReqCreateProductListDTO request) throws IdInvalidException {

        // Danh sách kết quả trả về
        List<ResCreateProductDTO> results = new ArrayList<>();

        // Lặp qua từng phần tử trong danh sách sản phẩm
        for (ReqCreateProductDTO.Product product : request.getProducts()) {
            String name = product.getName();
            String description = product.getDescription();
            double exportPrice = product.getExportPrice();
            int numberWarning = product.getNumberWarning();

            // Kiểm tra nếu tên sản phẩm đã tồn tại
            boolean isNameExist = productService.existsByProductName(name);
            if (isNameExist) {
                throw new IdInvalidException(
                        "Sản phẩm " + name + " đã tồn tại. Vui lòng chọn một tên khác!");
            }

            // Tạo đối tượng Product DTO
            Product productEntity = new Product();
            productEntity.setName(name);
            productEntity.setDescription(description);
            productEntity.setExportPrice(exportPrice);
            productEntity.setNumberWarning(numberWarning);
            productEntity.setCategory(request.getCategory());
            productEntity.setCompany(request.getCompany());
            productEntity.setActive(true);

            // Xử lý tạo mới sản phẩm
            productEntity = productService.handleCreateProduct(productEntity);

            // Chuyển đổi entity sang DTO kết quả
            ResCreateProductDTO result = productMapper.convertToResCreateProductDTO(productEntity);

            // Thêm kết quả vào danh sách
            results.add(result);

            // tạo mới company detail
            CompanyDetail companyDetail = new CompanyDetail();

            companyDetail.setCompany(request.getCompany());
            companyDetail.setProduct(productEntity);

            companyDetailService.handleCreateCompanyDetail(companyDetail);


        }

        // Trả về danh sách các sản phẩm đã được tạo
        return ResponseEntity.status(HttpStatus.CREATED).body(results);
    }

    @PutMapping("")
    @ApiMessage("Update a product")
    public ResponseEntity<ResUpdateProductDTO> updateProduct(
            @RequestBody ReqUpdateProductDTO request)
            throws IdInvalidException {
        Product product = productMapper.convertFromReqUpdateProductDTO(request);

        Product currentProduct = productService.handleUpdateProduct(product);
        if (currentProduct == null) {
            throw new IdInvalidException("Sản phẩm với id = " + request.getId() + " không tồn tại!");
        }

        ResUpdateProductDTO result = productMapper.convertToResUpdateProductDTO(currentProduct);

        return ResponseEntity.ok(result);
    }

    @GetMapping("")
    @ApiMessage("Fetch all products")
    public ResponseEntity<List<ResProductDTO>> getAllProductDetail() {

        return ResponseEntity.status(HttpStatus.OK).body(
                productService.handleFetchAllProduct());
    }

    @DeleteMapping("/{id}")
    @ApiMessage("Delete product by id")
    public ResponseEntity<Void> deleteProductById(@PathVariable("id") long id) {
        productService.handleDeleteProduct(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/pagination")
    @ApiMessage("Fetch all products by pagination")
    public ResponseEntity<ResultPaginationDTO> getAllProductDetail(
            @Filter Specification<Product> spec,
            Pageable pageable) {

        return ResponseEntity.status(HttpStatus.OK).body(
                productService.handleFetchAllProduct(spec, pageable));
    }

    @GetMapping("/active")
    @ApiMessage("Fetch all products active")
    public ResponseEntity<ResultPaginationDTO> getAllProductActive(
            @Filter Specification<Product> spec,
            Pageable pageable) {

        return ResponseEntity.status(HttpStatus.OK).body(
                productService.handleFetchAllProductActive(spec, pageable));
    }

    @GetMapping("/low-stock")
    @ApiMessage("Fetch all products low stock")
    public ResponseEntity<List<ResProductDTO>> getAllProductLowStock() {

        return ResponseEntity.status(HttpStatus.OK).body(
                productService.handleFetchAllProductLowStock());
    }

    @GetMapping("/low-stock/pagination")
    @ApiMessage("Fetch all products low stock by pagination")
    public ResponseEntity<ResultPaginationDTO> getAllProductLowStock(
            @Filter Specification<Product> spec,
            Pageable pageable) {

        return ResponseEntity.status(HttpStatus.OK).body(
                productService.handleFetchAllProductLowStock(spec, pageable));
    }

    @GetMapping("/follow")
    @ApiMessage("Fetch all products follow")
    public ResponseEntity<ResultPaginationDTO> getAllProductFollow(
            @Filter Specification<Product> spec,
            Pageable pageable) {

        return ResponseEntity.status(HttpStatus.OK).body(
                productService.handleFetchAllProductByCategoryOfTopFollowed(spec, pageable));
    }

    // lấy tất cả sp theo import goods
    @GetMapping("/fetch-by-import-goods/{id}")
    @ApiMessage("Fetch all products by import goods ")
    public ResponseEntity<List<Product>> fetchAllProductByImportGoods(@PathVariable("id") long id) {
        ImportGoods importGoods = importGoodsService.handleFetchImportGoodsById(id);

        Company company = companyService.handleFetchCompanyById(importGoods.getCompany().getId());

        List<Product> products = productService.findAllByCompany(company);

        return ResponseEntity.ok(products);
    }

    @GetMapping("/fetch-by-category/{id}")
    @ApiMessage("Fetch all products by category")
    public ResponseEntity<List<Product>> fetchAllProductByCategory(@PathVariable("id") long id) {
        Category category = categoryService.handleFetchCategoryById(id);

        List<Product> products = productService.findAllByCategory(category);

        return ResponseEntity.ok(products);
    }

}
