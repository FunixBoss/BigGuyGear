package com.project.api.dtos;

import com.project.api.entities.ProductSaleType;
import com.project.api.entities.ProductStyle;
import lombok.Data;

@Data
public class ProductStyleDTO {
    private Integer productStyleId;
    private String styleName;

    public ProductStyleDTO() {}
    public ProductStyleDTO(ProductStyle productStyle) {
        this.productStyleId = productStyle.getProductStyleId();
        this.styleName = productStyle.getStyleName();

    }
}