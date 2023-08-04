package com.project.api.dtos.request;

import com.project.api.dtos.ProductColorDTO;
import com.project.api.dtos.ProductSizeDTO;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequestDTO {
    private Integer productId;
    private String productName;
    private ProductSizeDTO productSize;
    private ProductColorDTO productColor;
    private BigDecimal price;
    private Integer quantity;

    public ProductRequestDTO() {}

    public ProductRequestDTO(Integer productId, String productName, ProductSizeDTO productSize, ProductColorDTO productColor, BigDecimal price, Integer quantity) {
        this.productId = productId;
        this.productName = productName;
        this.productSize = productSize;
        this.productColor = productColor;
        this.price = price;
        this.quantity = quantity;
    }
}
