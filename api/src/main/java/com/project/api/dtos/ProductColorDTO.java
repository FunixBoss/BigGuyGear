package com.project.api.dtos;

import com.project.api.entities.ProductColor;
import com.project.api.entities.ProductSize;
import lombok.Data;

@Data
public class ProductColorDTO {
    private Integer productColorId;
    private String colorName;
    private String colorType;

    public ProductColorDTO() {}
    public ProductColorDTO(ProductColor productColor) {
        this.productColorId = productColor.getProductColorId();
        this.colorName = productColor.getColorName();
        this.colorType = productColor.getColorType();

    }
}