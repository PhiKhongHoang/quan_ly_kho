package com.ktn3_group.tieumoc.model;

import com.ktn3_group.tieumoc.util.SecurityUtil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "export_goods_detail")
@Getter
@Setter
public class ExportGoodsDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int quantity;
    private double exportPrice;
    private double totalAmount;
    private double profit;

    private Instant createdAt;
    private String createdBy;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "exportGoods_id")
    private ExportGoods exportGoods;

    @PrePersist
    public void handleBeforeCreate() {
        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";

        this.createdAt = Instant.now();
    }

}
