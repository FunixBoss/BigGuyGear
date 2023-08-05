package com.project.api.dtos;

import com.project.api.entities.ProductColor;
import com.project.api.entities.ProductSaleType;
import lombok.Data;

@Data
public class ProductSaleTypeDTO {
    private Integer productSaleTypeId;
    private String typeName;

    public ProductSaleTypeDTO() {}
    public ProductSaleTypeDTO(ProductSaleType productSaleType) {
        this.productSaleTypeId = productSaleType.getProductSaleTypeId();
        this.typeName = productSaleType.getTypeName();

    }
}