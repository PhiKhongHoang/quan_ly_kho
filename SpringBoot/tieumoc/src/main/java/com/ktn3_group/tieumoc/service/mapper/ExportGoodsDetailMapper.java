package com.ktn3_group.tieumoc.service.mapper;

import com.ktn3_group.tieumoc.model.ExportGoodsDetail;
import com.ktn3_group.tieumoc.model.Product;
import com.ktn3_group.tieumoc.model.response.export_goods_detail.ResCreateExportGoodsDetailDTO;
import com.ktn3_group.tieumoc.model.response.export_goods_detail.ResExportGoodsDetailDTO;
import com.ktn3_group.tieumoc.repository.ExportGoodsRepo;
import com.ktn3_group.tieumoc.repository.ProductRepo;
import org.springframework.stereotype.Component;


@Component
public class ExportGoodsDetailMapper {
    private final ProductRepo productRepo;
    private final ExportGoodsRepo exportGoodsRepo;

    public ExportGoodsDetailMapper(ProductRepo productRepo,
                                   ExportGoodsRepo exportGoodsRep) {
        this.productRepo = productRepo;
        this.exportGoodsRepo = exportGoodsRep;
    }

    public final ResExportGoodsDetailDTO convertToResExportGoodsDetailDTO(ExportGoodsDetail exportGoodsDetail) {
        ResExportGoodsDetailDTO res = new ResExportGoodsDetailDTO();
        ResExportGoodsDetailDTO.Product product = new ResExportGoodsDetailDTO.Product();

        res.setId(exportGoodsDetail.getId());
        res.setQuantity(exportGoodsDetail.getQuantity());
        res.setExportPrice(exportGoodsDetail.getExportPrice());
        res.setTotalAmount(exportGoodsDetail.getTotalAmount());
        res.setProfit(exportGoodsDetail.getProfit());
        res.setCreatedAt(exportGoodsDetail.getCreatedAt());
        res.setCreatedBy(exportGoodsDetail.getCreatedBy());

        Product current_product = productRepo.findById(exportGoodsDetail.getProduct().getId()).orElse(null);
        if (current_product != null) {
            product.setId(current_product.getId());
            product.setName(current_product.getName());
        }
        res.setProduct(product);

        return res;
    }

    public ResCreateExportGoodsDetailDTO convertToResCreateExportGoodsDetailDTO(
            ExportGoodsDetail exportGoodsDetail) {
        ResCreateExportGoodsDetailDTO res = new ResCreateExportGoodsDetailDTO();

        res.setId(exportGoodsDetail.getId());
        res.setQuantity(exportGoodsDetail.getQuantity());
        res.setExportPrice(exportGoodsDetail.getExportPrice());
        res.setTotalAmount(exportGoodsDetail.getTotalAmount());
        res.setProfit(exportGoodsDetail.getProfit());
        res.setExportGoods(exportGoodsDetail.getExportGoods());
        res.setProduct(exportGoodsDetail.getProduct());

        return res;
    }

}
