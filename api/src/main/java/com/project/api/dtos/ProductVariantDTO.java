package com.project.api.dtos;

import com.project.api.entities.Category;
import com.project.api.entities.Image;
import com.project.api.entities.ProductColor;
import com.project.api.entities.ProductVariant;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductVariantDTO {
    private Integer productVariantId;
    private int quantity;
    private BigDecimal price;
    private ProductColorDTO productColor;
    private ProductSizeDTO productSize;
    private String imageUrl;

    public ProductVariantDTO(ProductVariant variant) {
        this.productVariantId = variant.getProductVariantId();
        this.quantity = variant.getQuantity();
        this.price = variant.getPrice();
        this.productSize = new ProductSizeDTO(variant.getProductSize());
        this.productColor = new ProductColorDTO(variant.getProductColor());
        if(variant.getImage() != null) {
            this.imageUrl = variant.getImage().getImageUrl();
        }
    }
}