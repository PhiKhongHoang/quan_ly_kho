package com.ktn3_group.tieumoc.service.mapper;

import com.ktn3_group.tieumoc.model.ImportGoods;
import com.ktn3_group.tieumoc.model.ImportGoodsDetail;
import com.ktn3_group.tieumoc.model.Product;
import com.ktn3_group.tieumoc.model.request.import_goods_detail.ReqCreateImportGoodsDetailDTO;
import com.ktn3_group.tieumoc.model.response.import_goods_detail.ResCreateImportGoodsDetailDTO;
import com.ktn3_group.tieumoc.model.response.import_goods_detail.ResImportGoodsDetailDTO;
import com.ktn3_group.tieumoc.repository.ImportGoodsRepo;
import com.ktn3_group.tieumoc.repository.ProductRepo;
import org.springframework.stereotype.Component;


@Component
public class ImportGoodsDetailMapper {
    private final ProductRepo productRepo;
    private final ImportGoodsRepo importGoodsRepo;

    public ImportGoodsDetailMapper(ProductRepo productRepo,
                                   ImportGoodsRepo importGoodsRep) {
        this.productRepo = productRepo;
        this.importGoodsRepo = importGoodsRep;
    }

    public final ResImportGoodsDetailDTO convertToResImportGoodsDetailDTO(ImportGoodsDetail importGoodsDetail) {
        ResImportGoodsDetailDTO res = new ResImportGoodsDetailDTO();
        ResImportGoodsDetailDTO.Product product = new ResImportGoodsDetailDTO.Product();

        res.setId(importGoodsDetail.getId());
        res.setQuantity(importGoodsDetail.getQuantity());
        res.setImportPrice(importGoodsDetail.getImportPrice());
        res.setTotalAmount(importGoodsDetail.getTotalAmount());
        res.setCreatedAt(importGoodsDetail.getCreatedAt());
        res.setCreatedBy(importGoodsDetail.getCreatedBy());

        Product current_product = productRepo.findById(importGoodsDetail.getProduct().getId()).orElse(null);
        if (current_product != null) {
            product.setId(current_product.getId());
            product.setName(current_product.getName());
        }
        res.setProduct(product);

        return res;
    }

    public ResCreateImportGoodsDetailDTO convertToResCreateImportGoodsDetailDTO(
            ImportGoodsDetail importGoodsDetail) {
        ResCreateImportGoodsDetailDTO res = new ResCreateImportGoodsDetailDTO();

        res.setId(importGoodsDetail.getId());
        res.setQuantity(importGoodsDetail.getQuantity());
        res.setImportPrice(importGoodsDetail.getImportPrice());
        res.setTotalAmount(importGoodsDetail.getTotalAmount());
        res.setImportGoods(importGoodsDetail.getImportGoods());
        res.setProduct(importGoodsDetail.getProduct());

        return res;
    }

}
